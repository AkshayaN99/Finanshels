const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


let tasks = [];
let nextId = 1;


app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    res.json(task);
});


app.post('/tasks', (req, res) => {
    const task = { id: nextId++, ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});


app.put('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Task not found.');
    tasks[index] = { id: tasks[index].id, ...req.body };
    res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Task not found.');
    tasks.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
