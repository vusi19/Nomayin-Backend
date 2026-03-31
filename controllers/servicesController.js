exports.getServices = async (req, res) => {
  res.status(200).json({ message: 'Get services endpoint ready' });
};

exports.createService = async (req, res) => {
  res.status(201).json({ message: 'Create service endpoint ready' });
};
