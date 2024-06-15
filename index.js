const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
	{ id: 1, name: 'telugu' },
	{ id: 2, name: 'hindi' },
	{ id: 3, name: 'english' },
	{ id: 4, name: 'mathematics' },
];

app.get('/', (req, res) => {
	res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	const course = findCourse(req);
	if (!course) return res.status(404).send('The course with the given ID was not found');
	res.send(course);
});

app.post('/api/courses/', (req, res) => {
	const { error } = validateCourse(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
	const course = findCourse(req);
	if (!course) return res.status(404).send('The course with the given ID was not found');

	const { error } = validateCourse(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	course.name = req.body.name;
	res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
	// Look up the course
	// Not existing, return 404
	const course = findCourse(req, res);
	if (!course) return res.status(404).send('The course with the given ID was not found');

	// Delete
	const index = courses.indexOf(course);
	console.log(index);
	courses.splice(index, 1);
	// Return the same course
	res.send(course);
});

function validateCourse(course) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(course);
}

function findCourse(req, res) {
	return courses.find((c) => c.id === parseInt(req.params.id));
}

// PORT

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
