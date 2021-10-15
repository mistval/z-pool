declare class ZZPool {
  constructor(size: number)

  enqueue: <TReturnType>(promiseFactory: () => Promise<TReturnType>) => Promise<TReturnType> 
}

export default ZZPool;