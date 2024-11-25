const express = require ('express')
const app = express()

app.get('/', (req, res) => { 
    res.send('Hello node API haha')

})
app.get('/API', (req, res) => { 
    res.send('this is our api s')

})
app.listen(3000, ()=> {
    console.log('Node API app is running or port 3000')
})