const Project = require("../models/projectModel");
const { validationResult } = require("express-validator");

exports.createProject = (req, res) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const project = new Project(req.body);
    //save owner of project
    project.owner = req.user.id;

    project.save();
    res.status(200).json(project);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//update project
exports.updateProject = async (req, res) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extract project info
  const { projectName } = req.body;
  const projectUpdated = {};

  if (projectName) projectUpdated.projectName = projectName;

  try {
    //check id
    const updatingProject = await Project.findById(req.params.id);

    // if (!updatingProject.projectName) {
    //   return res.status(404).json({
    //     msg: "Project not found",
    //   });
    // }

    //Verify user
    if (req.user.id !== updatingProject.owner.toString()) {
      return res.status(401).json({
        msg: "User not authorized",
      });
    }

    // update project
    const project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: projectUpdated },
      { new: true }
    );
    res.status(200).json({msg: "Project updated", project});
  } catch (error) {
    // console.log(error);
    res.status(500).send(error);
  }
};

exports.deleteProject = async (req, res) => {

  try {

    //check id
    const updatingProject = await Project.findById(req.params.id);

    // if (!updatingProject.projectName) {
    //   return res.status(404).json({
    //     msg: "Project not found",
    //   });
    // }

    //Verify user
    if (req.user.id !== updatingProject.owner.toString()) {
      return res.status(401).json({
        msg: "User not authorized",
      });
    }

    // delete project
    await Project.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Project removed" });
    console.log("Successfull Delete Request");
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}