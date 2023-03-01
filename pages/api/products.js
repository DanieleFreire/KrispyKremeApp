export default function handler(req, res) {

    
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
  
      var sql = "SELECT * FROM assignment1.product;"
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
        if(results.length >= 1){
    
          res.status(200).json(results);
        } else {
         
          res.status(200).json("fail");
    
        }
       
      }
    );
  
    console.log("after...");
  
         
  }
