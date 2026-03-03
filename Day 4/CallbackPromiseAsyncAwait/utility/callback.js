export function getUser(cb) {
  setTimeout(() => {
    console.log("user fetched successfully.");
    cb();
  }, 500);
}

export function getOrders(cb) {
  setTimeout(() => {
    console.log("order fetched successfully.");
    cb();
  }, 500);
}

export function getOrdersProcess(cb) {
  setTimeout(() => {
    console.log("order process successfully.");
    cb();
  }, 500);
}

export function orderPlaced(cb) {
  setTimeout(() => {
    console.log("Order placed successfully.");
    cb("Order placed successfully.");
  }, 500);
}



