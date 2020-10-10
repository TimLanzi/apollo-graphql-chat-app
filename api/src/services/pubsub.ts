import Redis from "ioredis";
import { PubSub } from "apollo-server-express";
import { RedisPubSub } from "graphql-redis-subscriptions";
import config from "../config";

export type PubSubType = PubSub | RedisPubSub;

export class PubSubService {
  private pubsub: PubSubType;
  private readonly options = {
    ...config.redis,
    retryStrategy: (times: number) => Math.min(times * 50, 2000),
  };

  constructor() {
    this.pubsub = process.env.NODE_ENV === "production"
      ? new RedisPubSub({
          publisher: new Redis(this.options),
          subscriber: new Redis(this.options),
        })
      : new PubSub();
  }

  public asyncIterator(iter: string | string[]) {
    if (this.pubsub instanceof PubSub) {
      return (<PubSub>this.pubsub).asyncIterator(iter);
    } else {
      return (<RedisPubSub>this.pubsub).asyncIterator(iter);
    }
  }

  public publish(arg0: string, payload: any): Promise<void> {
    return this.pubsub.publish(arg0, payload);
  }
}

export default new PubSubService();