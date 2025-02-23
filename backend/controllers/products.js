const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//insert
const createProduct = async (req, res) => {
  const { product_id, name, description, price, category, image_url } =
    req.body;
  try {
    const prod = await prisma.products.create({
      data: {
        product_id,
        name,
        description,
        price,
        category,
        image_url,
      },
    });
    res.status(200).json({
      status: "success",
      message: `Product with id ${prod.product_id} created successfully`,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating the user",
      error: err.message,
    });
  }
};

//get all products
const getAllProducts = async (req, res) => {
  try {
    const prods = await prisma.products.findMany();
    res.json(prods);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving the products",
    });
  }
};

//get only one product by id
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await prisma.products.findUnique({
      where: {
        product_id: Number(id),
      },
    });
    if (!prod) {
      res.status(404).json({ message: `Product with id ${id} not found` });
    } else {
      res.status(200).json(prod);
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving the product",
      error: err.message,
    });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProduct = await prisma.products.findUnique({
      where: {
        product_id: Number(id),
      },
    });
    if (!existingProduct) {
      res.status(404).json({ message: `Product with id ${id} not found` });
    } else {
      await prisma.products.delete({
        where: {
          product_id: Number(id),
        },
      });
      res.status(200).json({
        status: "success",
        message: `Product with id ${id} deleted successfully`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error deleting the product",
      error: err.message,
    });
  }
};

//update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;
  try {
    const prod = await prisma.products.update({
      where: {
        product_id: Number(id),
      },
      data: {
        name,
        description,
        price,
        category,
        image_url,
      },
    });
    res.status(200).json({
      status: "success",
      message: `Product with id ${id} updated successfully`,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error updating the product",
      error: err.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
