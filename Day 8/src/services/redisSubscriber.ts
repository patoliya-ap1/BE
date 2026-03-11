import redis from "redis";
import { eventEmitter } from "./eventEmitter.js";

export const initializeSubscriber = async () => {
  const subscriber = redis.createClient({
    url: "redis://localhost:6379",
  });

  await subscriber.connect();
  console.log("Subscriber connected to redis");

  await subscriber.subscribe("welcome-email", (eventData, channel) => {
    const data = JSON.parse(eventData);
    console.log(`Event ${data.event} emit for channel ${channel}`);
    eventEmitter.emit(data.event, data.payload);
  });
};
