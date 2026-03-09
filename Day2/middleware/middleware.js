export const middleware = (req, res, next) => {
  const reqData = req.body;
  console.log("-- Middleware Details --");
  console.log(reqData);
  next();
};
