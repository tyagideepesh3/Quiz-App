const express = require('express')
const route = express.Router();
const { addNewquestion , getAllQuestions ,getQuestionById } = require('./controllers/pre.js')
const {makeAsubmission , checkSubmission , getCorrectAnswer} = require('./controllers/submission')
const {db , Predefined } = require('./db.js')


route.get('/' , async (req , res) => {
    const allQuestions = await getAllQuestions()
    let length = allQuestions.length
    allQuestions.forEach((ques) => {
        (ques._previousDataValues.question)
        
    })
    res.render('index',{
        length
    })
})
route.get('/question' , (req , res) => {
    res.render('provider')
})
route.post('/question' , async (req , res) => {
    // console.log(req.body.question)
    // console.log(req.body.option1)
    // console.log(req.body.option2)    
    // console.log(req.body.option3)
    // console.log(req.body.option4)    
    // console.log(req.body.answer)
    const ans = await addNewquestion(req.body.question , req.body.option1,req.body.option2,req.body.option3,req.body.option4,req.body.answer)
    // console.log(ans)
    res.render('provider')
})

route.get('/api/question/:id',async (req , res) => {
    // console.log('id for single search is : ', req.params.id)
    const singleQuestion = await getQuestionById(req.params.id)
    res.send(singleQuestion)
})
route.post('/api/checkSubmissions' , async (req , res) =>{
    const value = await checkSubmission(req.body.question)
    console.log("this the post value of check Authentication:- " , value)
    if(value == null){
        console.log("HI")
        res.send("true")
    }else{
        res.send("false")
    }
    // const value = await checkSubmission(req.body.question);
})

route.post('/api/submissions' , async (req , res) =>{
    const quesInfo = await getQuestionById(req.body.question)
    let correctAnswer;
    if(quesInfo.answer == req.body.yourAnswer){
        correctAnswer = "YES";
    }else{
        correctAnswer = "NO";
    }
    const ans = await makeAsubmission(req.body.question , req.body.attempt , req.body.yourAnswer,correctAnswer)
    res.send(ans)
})

route.post('/api/count' , async (req , res) =>{
    const count = await getCorrectAnswer();
    res.send(count)
})

module.exports = {
    route
}