const { Predefined } = require('../db')
async function addNewquestion(question , option1 ,option2,option3,option4,answer) {
    const ques = await Predefined.create({
        question,
        option1,
        option2,
        option3,
        option4,
        answer
    })
    return ques
}
async function getAllQuestions(){
    const allQues = await Predefined.findAll();
    return allQues;
}
async function getQuestionById(id){
    const ques = await Predefined.findOne({where:{id}})
    return ques
}
module.exports = {
    addNewquestion,
    getAllQuestions,
    getQuestionById  
}