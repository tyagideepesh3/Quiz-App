const { submission } = require('../db.js')
async function makeAsubmission(question , attempt,yourAnswer,correctAnswer){
    const submit = await submission.create({
        question,
        attempt,
        yourAnswer,
        correctAnswer
    })
    return submit
}
async function checkSubmission(question){
    const submit = await submission.findOne({where:{question}})
    return submit
}
async function getCorrectAnswer(){
    const count = await submission.findAll({where: {correctAnswer: "YES"}});
    return count;
}
module.exports = {
    makeAsubmission,
    checkSubmission,
    getCorrectAnswer
}