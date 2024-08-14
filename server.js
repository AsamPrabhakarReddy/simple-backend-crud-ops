
const express = require("express")
const mongoose = require("mongoose")
const Product = require('./models/product.model.js')
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));


const PORT = 8080

app.get('/', (req,res)=>{
    res.send("hello from node api using nodeman")
})

// GET PRODUCTS
app.get('/api/products', async (req, res)=>{
    try{
        const products = await Product.find({});
       
        res.status(200).json(products)
    }
    catch(error)
    {
        res.status(500).json({message: error.message})
    }
})

// GET BY ID

app.get('/api/products/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// UPDATE 

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(updatedProduct);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE 

app.delete('/api/products/:id', async (req, res) => {
    try {
        console.log("ID received:", req.params.id);
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            console.log("Product not found");
            return res.status(404).json({ message: "Product not found" });
        }
        
        console.log("Product deleted:", product);
        res.status(200).json({ message: "Product deleted successfully" });
    } 
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
});


//POST 
app.post('/api/products', async (req,res)=>{
    // console.log(req.body)
    // res.send(req.body)
    try{
        const product = await Product.create(req.body);
        product.save();
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://asamprabhakarbala:Asam123@cluster0.xvign.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=>{
        console.log(`Port listening on ${PORT} successfully`)
    })
})
.catch((error)=>{
    console.log(`connection failed !! ${error}`)
})

