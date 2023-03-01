export default function handler(req, res) {

    console.log("register api page called...");
   
    console.log("looking at the variables we got from the browser..");
    console.log(req.body);
  
    // Get just the username and password and put them into variables.
    const username = req.body.username;
    const pass = req.body.password;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const address = req.body.address;
    
  
    console.log("username is: "+ username);
    console.log("password  is: "+ pass);
    console.log("email  is: "+ email);
    console.log("telephone  is: "+ telephone);
    console.log("address  is: "+ address);
    
  
  
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
  
    var sql = "INSERT INTO `assignment1`.`users` (`username`, `pass`, `email`, `telephone`, `address`, `type`) VALUES ('"+username+"', '"+pass+"', '"+email+"', '"+telephone+"', '"+address+"', 'customer');"
    console.log(sql);
    // simple query
  connection.query(
    sql,
    function(err, results, fields) { // only runs after the sql

        if(err) {
            console.log(err);
            res.status(200).json("fail" + err.sqlMessage);
        return    
        }
   
      console.log(results); // results contains rows returned by server
  
    console.log(results.length);
        
    res.status(200).json("ok"); //inside the function: being sure to get this response back to the brownser 
      
       //sending back the result.
    if(results.length == 1){
  
        res.status(200).json("ok");
      } else {
       
        res.status(200).json("fail");
  
      }
     
    }
  );
}
