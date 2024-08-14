const Product = require("../models/product.model.js");

const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch(error)
    {
        res.status(500).json({message: error.message})
    }
};

const getProduct = async (req, res) => {
            try         
            {           
                const {id} = req.params;
                const product = await Product.findById(id);
                res.status(200).json(product)
            }catch(error){
                res.status(500).json({message: error.message})
            }
};

const createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        product.save();
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
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
};

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};