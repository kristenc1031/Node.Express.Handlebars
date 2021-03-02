//import orm.js here
const orm = require('../config/orm.js');
//create code that will call the ORM functions using burger specigic input for the ORM 
const burger = {
    all(cb) {
        orm.all('burgers', (res) => cb(res));
    },
    create(cols, vals, cb) {
        orm.create('burgers', cols, vals, (res) => cb(res));
    },
    update(objColsVals, condition, cb) {
        orm.update('burgers', objColsVals, condition, (res) => cb(res));
    },
    delete(condition, cb) {
        orm.delete('burgers', condition, (res) => cb(res));
    },
};
//export at the end of the burger.js file
module.exports = burger;