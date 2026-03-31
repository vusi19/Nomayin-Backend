exports.getJobs = async (req, res) => {
  res.status(200).json({ message: 'Get jobs endpoint ready' });
};

exports.createJob = async (req, res) => {
  res.status(201).json({ message: 'Create job endpoint ready' });
};
