# ⚠️ Disclaimer

**This repository contains or references sensitive data involving over 850,000 users. The data is provided strictly for educational, research, and responsible security analysis purposes only. Do not use this data for malicious, unethical, or illegal activities. By using this repository, you agree to comply with all applicable laws and respect user privacy.**

# Restorecord Leak Search

A tool for searching and analyzing leaked user data from Restorecord. This project provides scripts and a simple web interface to help you search through large CSV datasets of user information.

## Features
- Search through multiple CSV files containing user data
- Web interface for easy searching
- JavaScript scripts for data processing
- Organized file structure for easy navigation

## Project Structure
```
index.html                # Main web interface
package.json              # Node.js project file
server.js                 # Node.js server script
/data/users_part_*.csv          # CSV user data files (split for size)
scripts/main.js           # JavaScript logic for the web interface
styles/main.css           # CSS styles for the web interface
```

## Getting Started

### Prerequisites
- Node.js (for running the server and JavaScript scripts)

### Installation
1. Download the repository.
2. Install Node.js dependencies:
   ```sh
   npm install
   ```

## Usage

### Web Interface
1. Start the Node.js server:
   ```sh
   node server.js
   ```
2. Open `index.html` in your browser.