const Task = require('../models/Task');

const addTask = async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;
        const allowedStatuses = ['Pending', 'InProgress', 'Complete', 'Review'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const task = new Task({
            title,
            description,
            status,
            projectId
        });

        await task.save();
        res.status(201).json({ task, message: "Task created successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getTasks = async (req, res) => {
    const { status } = req.params;
    const allowedStatuses = ['Pending', 'InProgress', 'Complete', 'Review', 'NewColumn'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }
    try {
        const tasks = await Task.find({ status, message: "Task data fetched successfully" });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const completeTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {

        const task = await Task.findByIdAndUpdate(id, { ...updates, updatedAt: Date.now() }, { new: true });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ task, message: "Task updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { addTask, getTasks, deleteTask, completeTask };