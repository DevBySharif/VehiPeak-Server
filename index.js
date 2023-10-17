const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5005;

// middleware
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('VehiPeak server is running')
})

app.listen(port,()=>{
    console.log(`VehiPeak server is running on port ${port}`);
})



