const Task = require('../models/Task');

exports.addTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const allowedStatuses = ['Pending', 'InProgress', 'Complete', 'Review'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const task = new Task({
            title,
            description,
            status,
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const { status } = req.params;
    const allowedStatuses = ['Pending', 'InProgress', 'Complete', 'Review', 'NewColumn'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }
    try {
        const tasks = await Task.find({ status });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
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

exports.completeTask = async (req, res) => {
    const { id } = req.params; // Get task ID from request parameters
    const updates = req.body; // Get all fields to be updated from the request body
  
    try {
        // Find the task by ID and update it with the fields provided in the request body
        const task = await Task.findByIdAndUpdate(id, { ...updates, updatedAt: Date.now() }, { new: true });
        
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        res.status(200).json(task); // Return the updated task
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle any errors
    }
};
