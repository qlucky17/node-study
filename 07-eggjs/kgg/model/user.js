const Sequelize = require('sequelize')
module.exports = {
    schema: {
        name: { type: Sequelize.STRING(30), allowNull: false },
    },
    options:{
        timestamps: false
    }
}