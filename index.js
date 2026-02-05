require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const Yarn = require('./models/yarn'); // Import the Yarn model

const express = require('express'); // Import Express framework

console.log("INDEX FILE LOADED");

const app = express(); // Create an Express application
const PORT = process.env.PORT || 4000; // Use port in environment or default to 4000

app.use(express.json()); // Middleware to parse JSON request bodies



// Health check endpoint

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Knitting API!');
});

app.get('/api/yarns', async (req, res) => {
    try { 
        const yarns = await Yarn.find();
        res.status(200).json(yarns);
    }   catch (error) {
        res.status(500).json({ message: 'Failed to fetch yarns, check connection to database' });
    }
});

app.post('/api/yarns', async (req, res) => {
    try {
        const newYarn = await Yarn.create(req.body);
        res.status(201).json(newYarn);
    } catch (error) {
        res.status(422).json({ message: 'Failed to create yarn, check data sent' });
    }
});

app.get('/api/yarns/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid yarn ID' });
    }
    try {
        const yarn = await Yarn.findById(id);

        if (!yarn) {
            return res.status(404).json({ message: 'Yarn not found' });
        }
        res.status(200).json(yarn);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch yarn, check connection to database' });
    }
});

app.patch('/api/yarns/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid yarn ID' });
    }

    try { 
        const updatedYarn = await Yarn.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedYarn) {
            return res.status(404).json({ message: 'Yarn not found' });
        }
        res.status(200).json(updatedYarn);

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(406).json({ message: 'Failed to update yarn, check data sent' });
        }
        res.status(500).json({ message: 'Failed to update yarn, check connection to database' });
    }
});

app.delete('/api/yarns/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid yarn ID' });
    }

    try {
        const deletedYarn = await Yarn.findByIdAndDelete(id);

        if (!deletedYarn) {
            return res.status(404).json({ message: 'Yarn not found' });
        }
        res.status(202).json({ message: 'Yarn deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete yarn, check connection to database' });
    }
});

// Connect to MongoDB and start the server

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
