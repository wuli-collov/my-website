const {
  User,
  Operation
} = require("./models")
const obj = {
  loginId: "user1",
  loginPwd: "akjsasfhhshfsj",
  name: "zhangsan",
  address: {
    province: "abb",
    city: "hefei"
  }
}

function init() {
  var u = new User(obj)
  u.save().then((result) => console.log(result));
}
init()
