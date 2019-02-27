import redis from 'redis';

class Store {

  private static client: redis.RedisClient;

  public static init(options?: Object): Promise<Error | undefined> {

    this.client = options ? redis.createClient(options) : redis.createClient();
    return new Promise((resolve, reject) => {
      this.client.flushall((err: Error | null) => {
        if(err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

export default Store;
