// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

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

// simple query
connection.query(
  'SELECT * FROM `login`;',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    res.status(200).json(results);
  }
);


 
}
