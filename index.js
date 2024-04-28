const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;


//middleWare 
app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
  res.send('Painting and Drawing Server connectttt')
})


app.get('/user', (req, res) => {
  res.send('user data here connectttt')
})

app.listen(port, () => {
  console.log(`Painting and Drawing Server running on port ${port}`)
})