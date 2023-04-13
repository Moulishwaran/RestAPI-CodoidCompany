const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModels");
const app = express();

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

// create products
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getAll Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getSingle Product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Updat Product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find Any Product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find Any Product with ID ${id}` });
    }

    res.status(200).send({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DataBase Connection
mongoose
  .connect("mongodb://localhost:27017/NodeAPI")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error, "MongoDB Connection Failed");
  });

// PORT
const port = 4000;

app.listen(port, () =>
  console.log(`Server Connected Successfully on port:${port}`)
);
