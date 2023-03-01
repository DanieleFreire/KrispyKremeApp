export default function handler(req, res) {

    console.log("savecart.js api page called...");
   
    console.log("looking at the variables");
    console.log(req.body);
  
    // Get just the username and password and put them into variables.
    const userid = req.body.userid;
    const total = req.body.total;
    
  
    console.log("userid is: "+ userid);
    console.log("total  is: "+ total);
    
    
  
  
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
  
    
    var sql = "INSERT INTO `assignment1`.`order` (`userid`, `total`) VALUES ('"+userid+"', '"+total+"');"

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
