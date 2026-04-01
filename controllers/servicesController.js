const Service = require("../models/Service");

// GET all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching services" });
  }
};

// CREATE a service
exports.createService = async (req, res) => {
  try {
    const { name, description, basePrice } = req.body;

    const newService = new Service({
      name,
      description,
      basePrice,
    });

    const savedService = await newService.save();

    res.status(201).json(savedService);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating service" });
  }
};
