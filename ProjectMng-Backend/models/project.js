const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      unique: true
    },
    site: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 1024
    },
    image: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'DONE', 'CANCELLED'],
        minlength: 2,
        maxlength: 255,
        required: true
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
      }
    ],
    endDate: {
      type: Number,
      required: true,
      minlength: 9,
      maxlength: 10
    },
  },
  {
    timestamps: true,
  }
);
const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    image: Joi.string().min(11).max(1024).required(),
    brand: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
    price: Joi.number().min(100).max(5000).required(),
  }
  )
  return schema.validate(project);
}

exports.Project = Project;
exports.validateProject = validateProject;
