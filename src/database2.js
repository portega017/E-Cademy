var mysql = require('mysql');

var db =mysql.createConnection({
    host: 'localhost',
    user:'adminacad',
    password:'prueba@1A',
    database:'apilogin'
});
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySql2 Connected");
  });
  module.exports=db;