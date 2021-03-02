//In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. 
//These are the methods you will need to use in order to retrieve and store data in your database.
const connection = require('./connection.js');

const printQuestionMarks = (num) => {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs for SQL syntax
  const objToSql = (ob) => {
    const arr = [];
  
    for (const key in ob) {
        let value = ob[key];
        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
          // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
          if (typeof value === 'string' && value.indexOf(' ') >= 0) {
            value = `'${value}'`;
          }
          arr.push(`${key}=${value}`);
        }
      }
    
      // Translate array of strings to a single comma-separated string
      return arr.toString();
    };
  
  // Object for all our SQL statement functions.
  const orm = {
    all(tableInput, cb) {
      const queryString = `SELECT * FROM ${tableInput};`;
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    create(table, cols, vals, cb) {
      let queryString = `INSERT INTO ${table}`;
  
      queryString += ' (';
      queryString += cols.toString();
      queryString += ') ';
      queryString += 'VALUES (';
      queryString += printQuestionMarks(vals.length);
      queryString += ') ';
  
      console.log(queryString);
  
      connection.query(queryString, vals, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update(table, objColVals, condition, cb) {
      let queryString = `UPDATE ${table}`;
  
      queryString += ' SET ';
      queryString += objToSql(objColVals);
      queryString += ' WHERE ';
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
      },
    
      delete(table, condition, cb) {
        let queryString = `DELETE FROM ${table}`;
        queryString += ' WHERE ';
        queryString += condition;
    
        connection.query(queryString, (err, result) => {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      },
    };

  
  // Export the orm object for the model (cat.js).
module.exports = orm;
