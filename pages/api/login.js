export default function handler(req, res) {

    console.log("login api page called...");
   
    console.log("looking at the variables we got from the browser..");
    console.log(req.body);
  
    // Get just the username and password and put them into variables.
    const username = req.body.username;
    const pass = req.body.password;
  
    console.log("username is: "+ username);
    console.log("password  is: "+ pass);
  
  
    // db
    // get the client
    const mysql = require('mysql2');
  
    // create the connection to database
    const connection = mysql.createConnection({
      host: '<hostname_connection>',
      user: '<username_connection>',
      password: '<password_connection>',
      port: 3306,
      database: '<databasename_connection>'
  });
  
    console.log("starting...");

    var sql = "SELECT * FROM users WHERE username = '"+username+"' AND pass = '"+pass+"' LIMIT 1;"
    console.log(sql);


    // simple query
  connection.query(
    sql,
    function(err, results, fields) {

      console.log("inside..");

        if(err) {
            console.log(err);
            res.status(200).json("fail" + err.sqlMessage);
        return    
        }
   
      console.log(results); // results contains rows returned by server
  
    console.log(results.length);
  
      
      // sending back the result.
      if(results.length == 1){

        //res.status(200).json("ok");

          // send back message based on acc type
          var type = results[0].type;
          if(type == 'customer'){
            res.status(200).json("customer")
          }
          else if(type == 'manager') {
            res.status(200).json("manager");
          }
     
       } else {
          res.status(200).json("fail");
      }
    }  
  );

  console.log("after...");
}
