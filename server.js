const express = require('express') 
const app = express() 

const PORT = 3002

app.use(express.static('dist'))
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))