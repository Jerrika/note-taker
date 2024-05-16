const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require('path'); // Import the 'path' module to handle file paths

// Define the file path to the 'db.json' file
const dbFilePath = path.join(__dirname, '../db/db.json');

// Define the GET request to the route endpoint '/api/notes'
router.get('/api/notes', (req, res) => {
    try {
        const dbJson = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
        res.json(dbJson);
    } catch (error) {
        console.error("Error reading 'db.json':", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define the POST request to the route endpoint '/api/notes'
router.post('/api/notes', (req, res) => {
    try {
        const dbJson = JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
        const newFeedback = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };
        dbJson.push(newFeedback);
        fs.writeFileSync(dbFilePath, JSON.stringify(dbJson));
        res.json(dbJson);
    } catch (error) {
        console.error("Error writing to 'db.json':", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define the DELETE request to the route endpoint '/api/notes/:id'
router.delete('/api/notes/:id', (req, res) => {
    try {
        let data = fs.readFileSync(dbFilePath, "utf8");
        const dataJSON = JSON.parse(data);
        const newNotes = dataJSON.filter((note) => {
            return note.id !== req.params.id;
        });
        fs.writeFileSync(dbFilePath, JSON.stringify(newNotes));
        res.json("Note deleted.");
    } catch (error) {
        console.error("Error deleting note from 'db.json':", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;