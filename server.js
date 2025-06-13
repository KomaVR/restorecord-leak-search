const express = require('express');
const fs = require('fs');
const cors = require('cors');
const readline = require('readline');
const path = require('path');

const app = express();
app.use(cors());

const PART_FILES = Array.from({ length: 13 }, (_, i) => `/data/users_part_${i + 1}.csv`);

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

            const discordIdMatch = discordId === q;
            const usernameMatch = cleanUsername.toLowerCase().includes(qLower);

            if (discordIdMatch || usernameMatch) {
                results.push({
                    discordId,
                    username: cleanUsername,
                    ip
                });
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));