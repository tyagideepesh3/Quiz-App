const {Sequelize , DataTypes , DATE} = require('sequelize')
//making of connection with the data base
const db = new Sequelize('quizdb' , 'root' , 'deepu' , {
    host: 'localhost',
    dialect: 'mysql'
})

const Predefined = db.define('predefined' , {
    question: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    option1: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    option2: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    option3: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    option4: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    answer: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
})
const submission = db.define('submission' , {
    question:{
        type: DataTypes.INTEGER,
        allowNull:false,
        unique: true
    },
    attempt:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 0
    },
    yourAnswer:{
        type: DataTypes.STRING(5),
        allowNull:false,
        default: "not attempted yet"
    },
    correctAnswer:{
        type: DataTypes.STRING(5),
        allowNull:false
    }
})

module.exports = {
    Predefined , db , submission
}