exports.getPayments = async (req, res) => {
  res.status(200).json({ message: 'Get payments endpoint ready' });
};

exports.createPayment = async (req, res) => {
  res.status(201).json({ message: 'Create payment endpoint ready' });
};
