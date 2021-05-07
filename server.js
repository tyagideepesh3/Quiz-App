const express = require('express')
const app = express();
const path = require('path')

const ejs = require('ejs')

const { db } = require('./db')
const { route } = require('./routes.js')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))

app.get('/' , route);

app.get('/question' , route);
app.post('/question' , route);

app.get('/api/question/:id' , route)

app.post('/api/submissions' , route)
app.post('/api/checkSubmissions' , route)
app.post('/api/count' , route);
db.sync().then(() => {
    app.listen('4000' , () => {
        console.log('server started on port 4000')
    })
}).catch((err) => {
    console.log(err)
})