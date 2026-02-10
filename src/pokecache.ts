
export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}


export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(num: number) {
    this.#interval = num; 
    this.#startReapLoop()
  }

  add<T>(key:string, val: T){
    this.#cache.set(key, {createdAt: Date.now(), val:val});
  };
  get<T>(key:string){
    if (!this.#cache.get(key)){
        return undefined;
    }
    return this.#cache.get(key)?.val;
  }
  #reap(){
    for (let item of this.#cache.entries()){
        if (item[1].createdAt < Date.now() - this.#interval){
            this.#cache.delete(item[0])
        }
    }
  };
  #startReapLoop() {
  this.#reapIntervalId = setInterval(() => {
    this.#reap();
  }, this.#interval);
};
stopReapLoop(){
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}