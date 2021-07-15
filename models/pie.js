const {DataTypes} = require('sequelize');
const db = require('../db');


const Pie = db.define('pie', {
    nameOfPie: {
        type: DataTypes.STRING,
        alloNull: false
    },
    baseOfPie: {
        type: DataTypes.STRING,
        alloNull: false
    },
    crust: {
        type: DataTypes.STRING,
        alloNull: false
    },
    timeToBake: {
        type: DataTypes.INTEGER,
        alloNull: false
    },
    servings: {
        type: DataTypes.INTEGER,
        alloNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        alloNull: false
    }
})

module.exports = Pie;