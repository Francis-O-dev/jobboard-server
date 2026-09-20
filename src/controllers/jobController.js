const Job = require('../models/Job');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = async (req, res) => {
  const { title, company, location, description, salary, type, experience, skills } = req.body;

  const job = await Job.create({
    title,
    company,
    location,
    description,
    salary,
    type,
    experience,
    skills,
    postedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: job,
  });
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  const jobs = await Job.find({ status: 'active' })
    .populate('postedBy', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id).populate('postedBy', 'name email');

  if (!job) {
    res.status(404);
    throw new Error(`Job not found with id: ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    data: job,
  });
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = async (req, res) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error(`Job not found with id: ${req.params.id}`);
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: job,
  });
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error(`Job not found with id: ${req.params.id}`);
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Job removed successfully',
  });
};

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob };
