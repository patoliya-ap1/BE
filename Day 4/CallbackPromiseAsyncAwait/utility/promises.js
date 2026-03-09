export function getUserPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("user fetched successfully.");
    }, 200);
  });
}

export function getOrdersPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("order fetched successfully.");
    }, 200);
  });
}

export function getOrdersProcessPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("order process successfully.");
    }, 200);
  });
}

export function orderPlacedPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Order placed successfully with Promise.");
    }, 200);
  });
}
