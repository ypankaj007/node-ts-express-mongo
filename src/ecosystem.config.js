module.exports = {
    apps : [{
      name        : "server",
      script      : "./build/index.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
        "PORT":"3000"
      }
    }]
  }