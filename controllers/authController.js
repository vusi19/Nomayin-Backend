exports.register = async (req, res) => {
  res.status(201).json({ message: 'Register endpoint ready' });
};

exports.login = async (req, res) => {
  res.status(200).json({ message: 'Login endpoint ready' });
};
