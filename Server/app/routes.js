const controllers = require("./controllers");
const config = require("../config");

module.exports.registerRoutes = app => {
  app.use("/search/:url", controllers.search);
  app.use("/inspect/:channel", controllers.inspect);
};

module.exports.registerErrorHandlers = app => {
  app.use(function(err, req, res, next) {
    console.error(err.message);
    res.status(err.status || 500);
    res.render("500", {
      message: err.message,
      error: config.env === "development" ? err : {}
    });
  });
};
