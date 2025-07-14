const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "localhost:9006",
      },
    },
  },
  outputDir: path.resolve(__dirname, "../public"),
};
