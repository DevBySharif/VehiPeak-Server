const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5005;

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ide5est.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const carsCollection = client.db('CarsDB').collection('cars')
    const cartDataCollection = client.db('CarsDB').collection("cartData")

    app.post('/cars',async(req,res)=>{
      const newCars = req.body
      console.log(newCars);
      const result = await carsCollection.insertOne(newCars)
      res.send(result)
    })

    

    app.get('/cars',async(req,res)=>{
      const cursor = carsCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/cars/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await carsCollection.findOne(query)
      res.send(result)
    })

    app.put('/cars/:id',async(req,res)=>{
      const id = req.params.id
      const car = req.body
      console.log(car);
      const filter = {_id: new ObjectId(id)}
      const options= {upsert:true}
      const updatedCar = {
        $set:{
          brandName:car.brandName,
      modelName:car.modelName,
      type:car.type,
      year:car.year,
      transmission:car.transmission,
      fuel:car.fuel,
      price:car.price,
      description:car.description,
      photo:car.photo,
      rating:car.rating,
        }
      }
      const result =await carsCollection.updateOne(filter,updatedCar,options)
      res.send(result)
    })

    // cart related API

    app.post('/cart',async(req,res)=>{
      const newCartData = req.body
      console.log(newCartData);
      const result = await cartDataCollection.insertOne(newCartData)
      res.send(result)
    })

    app.get('/cart',async(req,res)=>{
      const cursor = cartDataCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.delete('/cart/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await cartDataCollection.deleteOne(query)
      res.send(result)
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/',(req,res)=>{
    res.send('VehiPeak server is running')
})

app.listen(port,()=>{
    console.log(`VehiPeak server is running on port: ${port}`);
})



