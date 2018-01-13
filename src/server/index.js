"use strict";
let dotenv = require("dotenv");
dotenv.load();
let app = require("./app");
let port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log("API server running at:" + port);
});
