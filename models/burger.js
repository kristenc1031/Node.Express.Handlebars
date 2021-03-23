//import orm.js here
var orm = require("../config/orm");
var burger = {
    all: (cb) => {
        orm.all("burgers", res => {
            cb(res);
        });
    },
    create: (name, cb) => {
        orm.create("burgers", ["burger_name", "devoured"],
            [
                name, false
            ], cb);
    },
    update: (id, cb) => {
        var condition = "id=" + id;
        orm.update("burgers", {
            devoured: true
        }, condition, cb);
    }
}
module.exports = burger;