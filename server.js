
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const JAMENDO_CLIENT_ID = '931c0ca7';  // Replace this with your actual Client ID

// Serve the static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle song search
app.get('/search', async (req, res) => {
    const song = req.query.song;
    try {
        const response = await axios.get('https://api.jamendo.com/v3.0/tracks', {
            params: {
                client_id: JAMENDO_CLIENT_ID,
                format: 'json',
                limit: 10,
                namesearch: song
            }
        });
        const songs = response.data.results.map(song => ({
            name: song.name,
            artist_name: song.artist_name,
            download_link: song.audiodownload
        }));
        res.json({ results: songs });
    } catch (error) {
        res.status(500).send('Error fetching songs');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
