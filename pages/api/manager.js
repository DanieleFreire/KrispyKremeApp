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
  
      var sql = "SELECT * FROM assignment1.order;"
  
       // simple query
      connection.query(
      sql,
      function(err, results, fields) {
  
          if(err) {
              console.log(err);
              res.status(200).json("fail with error: " + err.sqlMessage);
          return    
          }
          
          var total = 0.00;

          results.forEach(vprice => { 
           total += (vprice.total)
          })

          const dataManager = {
            results, total
          };
        
          console.log("This is dataManager: " + JSON.stringify(dataManager))
    
        
        // sending back the result.
        if(results.length >= 1){
    
          res.status(200).json(dataManager);

        } else {
         
          res.status(200).json("fail");
    
        }
       
      }
    );
  
    console.log("after...");
  
         
  }
