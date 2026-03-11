import redis from "redis";

export const initializeSubscriber = async () => {
  const subscriber = redis.createClient({
    url: "redis://localhost:6379",
  });

  await subscriber.connect();
  console.log("Subscriber connected to redis");

  await subscriber.subscribe("welcome-email", (event, channel) => {
    console.log(`Event ${event} emit for channel ${channel}`);
  });
};
