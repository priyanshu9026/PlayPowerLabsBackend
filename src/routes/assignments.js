const express = require('express');
const router = express.Router();


let assignments = [
  { id: 1, title: 'Assignment 1', description: 'Description of Assignment 1' },
  { id: 2, title: 'Assignment 2', description: 'Description of Assignment 2' },
];

router.get('/', (req, res) => {
  res.json(assignments);
});


router.get('/:id', (req, res) => {
  const assignment = assignments.find(a => a.id === parseInt(req.params.id));
  if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
  res.json(assignment);
});

router.post('/', (req, res) => {
  const newAssignment = {
    id: assignments.length + 1,
    title: req.body.title,
    description: req.body.description
  };
  assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});


router.put('/:id', (req, res) => {
  const assignment = assignments.find(a => a.id === parseInt(req.params.id));
  if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

  assignment.title = req.body.title;
  assignment.description = req.body.description;
  res.json(assignment);
});

router.delete('/:id', (req, res) => {
  assignments = assignments.filter(a => a.id !== parseInt(req.params.id));
  res.status(204).end();
});

module.exports = router;
