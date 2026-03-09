function one(cb) {
  setTimeout(() => {
    console.log("1");
    cb();
  }, 200);
}

function two(cb) {
  setTimeout(() => {
    console.log("2");
    cb();
  }, 300);
}

function three(cb) {
  setTimeout(() => {
    console.log("3");
    cb();
  }, 200);
}

function four(cb) {
  setTimeout(() => {
    console.log("4");
    cb();
  }, 300);
}

// with callback

one(() => {
  two(() => {
    three(() => {
      four(() => {
        console.log("callback hell");
      });
    });
  });
});
