const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//insert
const createCustomer = async (req, res) => {
  const { customer_id, first_name, last_name, address, email, phone_number } =
    req.body;
  try {
    const cust = await prisma.customers.create({
      data: {
        customer_id,
        first_name,
        last_name,
        address,
        email,
        phone_number,
      },
    });
    res.status(200).json({
      status: "success",
      message: `User with id ${cust.customer_id} created successfully`,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating the user",
      error: err.message,
    });
  }
};

//get all customers
const getAllCustomers = async (req, res) => {
  //   try {
  const custs = await prisma.customers.findMany();
  res.json(custs);
  //   } catch (err) {
  //     res.status(500).json({
  //       status: "error",
  //       message: "Error retrieving the customers",
  //       error: err.message,
  //     });
  //   }
};

//get only one customer by id
const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const cust = await prisma.customers.findUnique({
      where: {
        customer_id: Number(id),
      },
    });
    if (!cust) {
      res.status(404).json({ message: `Customer with id ${id} not found` });
    } else {
      res.status(200).json(cust);
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving the customer",
      error: err.message,
    });
  }
};

// delete customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    //ตรวจสอบว่ามี customer นี้อยู่หรือไม่
    const existingCustomer = await prisma.customers.findUnique({
      where: {
        customer_id: Number(id),
      },
    });
    if (!existingCustomer) {
      return res
        .status(404)
        .json({ message: `Customer with id ${id} not found` });
    }
    await prisma.customers.delete({
      where: {
        customer_id: Number(id),
      },
    });
    res.json({
      status: "ok",
      message: `Customer with id ${id} deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

//update customer
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, address, email, phone_number } = req.body;
  
    if (isNaN(Number(id))) {
      return res.status(400).json({ status: "error", message: "Invalid ID format" });
    }
  
    const data = {}; // ต้องประกาศก่อนใช้
    if (first_name) data.first_name = first_name;
    if (last_name) data.last_name = last_name;
    if (address) data.address = address;
    if (email) data.email = email;
    if (phone_number) data.phone_number = phone_number;
  
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ status: "error", message: "Please provide data to update" });
    }
  
    try {
      const cust = await prisma.customers.update({
        where: { customer_id: Number(id) },
        data,
      });
  
      res.json({
        status: "ok",
        message: `Customer with id ${id} updated successfully`,
        user: cust,
      });
    } catch (err) {
      if (err.code === "P2002") {
        return res.status(400).json({ status: "error", message: "Email already exists" });
      } else if (err.code === "P2025") {
        return res.status(404).json({ status: "error", message: `User with id = ${id} not found` });
      } else {
        console.error("Update customer error: ", err);
        res.status(500).json({ status: "error", message: "Error updating the customer", error: err.message });
      }
    }
  };
  

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
};
