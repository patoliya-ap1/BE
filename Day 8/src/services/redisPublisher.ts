import redis from "redis";
import { initializeSubscriber } from "./redisSubscriber.js";

export const publisher = redis.createClient({
  url: "redis://localhost:6379",
});

initializeSubscriber();

publisher.connect().then(() => {
  console.log("Publisher connected to redis");
});
