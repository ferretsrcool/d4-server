import redis from 'redis';

class Store {

  private static client: redis.RedisClient;

  private static validateClientInitialised(reject: CallableFunction): boolean {
    if(!this.client) {
      reject(Error('Client must be initialised before class can be used'));
      return false;
    }
    return true;
  }

  public static init(options?: Object): Promise<void> {

    this.client = options ? redis.createClient(options) : redis.createClient();
    return new Promise((resolve, reject) => {
      this.client.flushall((err: Error | null) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  public static addSample(sample: string): Promise<number> {
    return new Promise((resolve, reject) => {

      if (!this.validateClientInitialised(reject)) {
        return;
      }

      if (typeof sample !== 'string') {
        reject(TypeError('Parameter sample must be of type string'));
        return;
      }

      this.client.rpush('samples', sample, (err: Error | null, result: number) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  public static getSamples(): Promise<string[]> {
    return new Promise((resolve, reject) => {

      if (!this.validateClientInitialised(reject)) {
        return;
      }

      this.client.lrange('samples', 0, -1, (err: Error | null, samples: string[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(samples);
      });
    });
  }

  public static dropSamples(): Promise<void> {
    return new Promise((resolve, reject) => {

      if (!this.validateClientInitialised(reject)) {
        return;
      }

      this.client.del('samples', (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}

export default Store;
