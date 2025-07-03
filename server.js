// server.js
const express   = require('express');
const fs        = require('fs');
const cors      = require('cors');
const readline  = require('readline');
const path      = require('path');
const fetch     = require('node-fetch');      // ← install this

const app = express();
app.use(cors());

const PART_FILES = Array.from({ length: 13 }, (_, i) => `/data/users_part_${i + 1}.csv`);

// Your existing search endpoint
app.get('/search', async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const qLower = q.toLowerCase();
    const results = [];
    let count = 0;

    for (const file of PART_FILES) {
        const rl = readline.createInterface({
            input: fs.createReadStream(path.join(__dirname, file)),
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            const parts = line.split(',');
            if (parts.length < 5) continue;
            const [num, discordId, username, ip, timestamp] = parts;
            const cleanUsername = username ? username.split('#')[0] : '';
            if (!cleanUsername.trim()) continue;

            const discordIdMatch  = discordId === q;
            const usernameMatch   = cleanUsername.toLowerCase().includes(qLower);

            if (discordIdMatch || usernameMatch) {
                results.push({ discordId, username: cleanUsername, ip });
                count++;
                if (count >= 100) {
                    rl.close();
                    return res.json(results);
                }
            }
        }
    }

    res.json(results);
});

// New endpoint to leak the origin IP
app.get('/leak-origin', async (req, res) => {
    const target = req.query.target;
    if (!target || !/^https?:\/\//i.test(target)) {
        return res.status(400).json({ error: 'Invalid or missing `target` query parameter' });
    }

    try {
        // Perform the fetch from *this* server process
        const response = await fetch(target, { method: 'GET', redirect: 'manual' });
        // req.socket.localAddress is the server’s local (origin) IP
        const originIP = req.socket.localAddress;

        return res.status(200).json({
            originIP,
            fetchedStatus: response.status
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
