const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;


//middleWare 
// app.use(cors())
//Must remove "/" from your production URL
//Must remove "/" from your production URL
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://painting-and-drawing-2f67c.web.app",
      "https://painting-and-drawing-2f67c.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json())



//mongoDB connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aq01puw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// console.log(uri);

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

    // Connect to the "insertDB" database and access its "haiku" collection
    const PaintDrawCollection = client.db("PaintDrawDB").collection("PaintDraw");
    

    //get 
    app.get('/user', async(req,res)=>{
        const cursor = PaintDrawCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    //single user get
    app.get('/user/:id', async(req,res)=>{
        const id= req.params.id; 
        const query = {_id :new ObjectId(id)} ;
        const result = await PaintDrawCollection.findOne(query);
        res.send(result);
    })

    // all caft get 
    app.get('/user',async(req,res)=>{
      const cursor = PaintDrawCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    //view single  caft get 

    app.get('/user/:id', async(req,res)=>{
      const id= req.params.id; 
      const query = {_id :new ObjectId(id)} ;
      const result = await PaintDrawCollection.findOne(query);
      res.send(result);
  })

  //my art and craft get api 

    app.get('/myProduct/:email', async(req, res)=>{
      console.log(req.params.email);

      const result =await PaintDrawCollection.find({email:req.params.email}).toArray();

      res.send(result);
    })


    //my art delete
    app.delete('/myProduct/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id :new ObjectId(id)};
      const result = await PaintDrawCollection.deleteOne(query);
      res.send(result);
    })

    //my art update update
    app.get('/myProduct/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id :new ObjectId(id)};
      const result = await PaintDrawCollection.findOne(query);
      res.send(result);
    })

    // my art update operation
    app.put('/user/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id :new ObjectId(id)};
      const options = { upsert: true };


      const {
        Name,
        ImageURL,
        Item_name,
        Subcategory_Name,
        Short_description,
        Price,
        Rating,
        Customization,
        StockStatus
      } = req.body;
    
     
      const updateItem = {
        $set: {
          Name,
          ImageURL,
          Item_name,
          Subcategory_Name,
          Short_description,
          Price,
          Rating,
          Customization,
          StockStatus
        },
      };

  
      const result = await PaintDrawCollection.updateOne(filter,updateItem,options);

      res.send(result);

    })


    //post 
    app.post('/user', async(req,res)=>{

        const data = req.body;
        const result = await PaintDrawCollection.insertOne(data);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Painting and Drawing Server connectttt')
})


app.get('/add', (req, res) => {
  res.send('user data here connectttt')
})

app.listen(port, () => {
  console.log(`Painting and Drawing Server running on port ${port}`)
})