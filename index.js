const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();



app.use(bodyParser.urlencoded({extended:false}));
app.use('/www',express.static('public'))

app.use(router);


app.listen(3000,()=>{
    console.log('running...')
})