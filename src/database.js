var mysql =require('mysql');



var db =mysql.createConnection({
    host: 'localhost',
    user:'adminacad',
    password:'prueba@1A',
    database:'academia'
});
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySql Connected");
  });
  
  module.exports=db;
  