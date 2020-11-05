class Pool {
  constructor(size = 10) {
    this.size = size;
    this.waiting = [];
    this.inFlight = [];
  }

  async tryExecuteNext_() {
    if (this.inFlight.length < this.size && this.waiting.length > 0) {
      const next = this.waiting.shift();
      this.inFlight.push(next);

      try {
        const result = await next.promiseFunc();
        next.fulfill(result);
      } catch (err) {
        next.reject(err);
      } finally {
        const inFlightIndex = this.inFlight.indexOf(next);
        this.inFlight.splice(inFlightIndex, 1);
        this.tryExecuteNext_();
      }
    }
  }

  enqueue(promiseFunc) {
    const promise = new Promise((fulfill, reject) => {
      this.waiting.push({
        promiseFunc,
        fulfill,
        reject,
      });
    });

    this.tryExecuteNext_();

    return promise;
  }
}

module.exports = Pool;
