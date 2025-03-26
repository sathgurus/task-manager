const Project = require('../models/Project');
const Task = require('../models/Task');


const createProject = async (req, res) => {
    const { name, description } = req.body;
    try {
        const project = await Project.create({ name, description });
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create project' });
    }
};

const getProject = async (req, res) => {
    const { id } = req.params;
    console.log("id", id);

    try {

        const project = await Project.findById(id);
        const tasks = await Task.find({ projectId: id });

        const response = {
            ...project.toObject(),
            tasks,
        };

        res.status(200).json(response);
    } catch (error) {
        console.log("error", error)
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createProject, getProject }