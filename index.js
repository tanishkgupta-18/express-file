require('dotenv').config()
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = {
        id: nextId++,
        name,
        price
    }

    teaData.push(newTea);
    res.status(201).send(newTea);
})

// get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})

//get a tea by id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseInt(req.params.id)); // ← missing assignment

    if (!tea) {
        return res.status(404).send({ message: 'Tea not found' });
    } else {
        res.status(200).send(tea);
    }
});

//update tea

app.put('/teas/:id', (req, res) => {
    const teaId = req.params.id;
    const tea = teaData.find(tea => tea.id === parseInt(teaId));
    if (!tea) {
        return res.status(404).send({ message: 'Tea not found' });
    }

    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

// delete tea

app.delete('/teas/:id', (req, res) => {
    const teaId = req.params.id;
    const teaIndex = teaData.findIndex(tea => tea.id === parseInt(teaId));
    if (teaIndex === -1) {
        return res.status(404).send({ message: 'Tea not found' });
    }

    teaData.splice(teaIndex, 1);
    res.status(204).send('deleted');
}
)

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});

