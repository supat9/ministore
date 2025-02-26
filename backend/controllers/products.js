const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Insert
const createProduct = async (req, res) => {
  const { product_id, name, description, price, category, image_url } = req.body;

  try {
    // แปลง product_id เป็น Number
    const productIdInt = Number(product_id);

    // ตรวจสอบว่ามี product_id ซ้ำหรือไม่
    const existingProduct = await prisma.products.findUnique({
      where: { product_id: productIdInt },
    });

    if (existingProduct) {
      return res.status(400).json({
        status: "error",
        message: `Product with id ${product_id} already exists`,
      });
    }

    // สร้างสินค้าใหม่
    const prod = await prisma.products.create({
      data: { product_id: productIdInt, name, description, price, category, image_url },
    });

    res.status(201).json({
      status: "success",
      message: `Product with id ${prod.product_id} created successfully`,
      product: prod,
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating the product",
      error: err.message,
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const prods = await prisma.products.findMany();
    res.status(200).json(prods);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving the products",
      error: err.message,
    });
  }
};

// Get one product by id
const getProduct = async (req, res) => {
  const productIdInt = Number(req.params.id);
  try {
    const prod = await prisma.products.findUnique({
      where: { product_id: productIdInt },
    });

    if (!prod) {
      return res.status(404).json({ message: `Product with id ${productIdInt} not found` });
    }

    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving the product",
      error: err.message,
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const productIdInt = Number(req.params.id);
  try {
    const existingProduct = await prisma.products.findUnique({
      where: { product_id: productIdInt },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: `Product with id ${productIdInt} not found` });
    }

    await prisma.products.delete({ where: { product_id: productIdInt } });

    res.status(200).json({
      status: "success",
      message: `Product with id ${productIdInt} deleted successfully`,
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error deleting the product",
      error: err.message,
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const productIdInt = Number(req.params.id);
  const { name, description, price, category, image_url } = req.body;

  try {
    const existingProduct = await prisma.products.findUnique({
      where: { product_id: productIdInt },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: `Product with id ${productIdInt} not found` });
    }

    const updatedProd = await prisma.products.update({
      where: { product_id: productIdInt },
      data: { name, description, price, category, image_url },
    });

    res.status(200).json({
      status: "success",
      message: `Product with id ${productIdInt} updated successfully`,
      product: updatedProd,
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
