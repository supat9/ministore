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

module.exports = {
  createCustomer,
  getAllCustomers,
};
