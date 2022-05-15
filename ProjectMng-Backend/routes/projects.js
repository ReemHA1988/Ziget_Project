const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { Project, validateProject} = require('../models/project');
const auth = require('../middleware/auth');
const {isAuth} = require('../utils.js');
const router = express.Router();

// Get all the projects
  router.get(
  '/', isAuth,
  expressAsyncHandler(async (req, res) => {
    const projects = await Project.find({});
    res.send(projects);
  })
);

// Add project
router.post(
  '/',
  isAuth, async (req, res) => {
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let project = new Project({
      name: req.body.name,
      image: req.body.image
      ? req.body.image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        status: req.body.status,
      notes: [ { text: req.body.notes.text, image: req.body.notes.image, createdAt: req.body.notes.createdAt} ]
      
    });

    const createdProject = await project.save();
    res.send({ message: 'Product Created', project:  createdProject});
  }
);

// Add note to existing project
router.put(
  '/:addNote',
  auth, async (req, res) => {
    const projectName = req.params.name;
    const project = await Product.findById(projectName);
    if (project) {
      project.notes = req.body.note;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = router;