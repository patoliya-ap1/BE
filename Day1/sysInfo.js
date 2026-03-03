const os = require("os");

console.log(Object.getOwnPropertyNames(os));

console.log(`--- OS, Memory, UpTime---`);
console.log(`Platform: ${os.platform()} , Architecture ${os.arch()}`);
console.log(
  `Total Memory: ${Math.ceil(os.totalmem() / 1024 ** 3)}GB , Available Memory: ${Math.ceil(os.freemem() / 1024 ** 3)}GB`,
);
console.log(`Up Time: ${Math.floor(os.uptime() / (60 * 60))} Hours`);
console.log(`CPU: ${os.cpus()[0].model} , Total Core: ${os.cpus().length}`);
console.log(`OS Username: ${os.userInfo().username}`);
console.log(`OS Version: ${os.version()}`);
console.log(`-------------------------`);
