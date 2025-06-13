function renderTable(data) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    data.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.discordId}</td>
            <td>${user.username}</td>
            <td>${user.ip}</td>
        `;
        tbody.appendChild(tr);
    });
}

function searchUsers() {
    const searchValue = document.getElementById('search').value;
    fetch(`http://localhost:3000/search?q=${encodeURIComponent(searchValue)}`)
        .then(res => res.json())
        .then(data => renderTable(data));
}

document.getElementById('search-btn').addEventListener('click', searchUsers);
document.getElementById('search').addEventListener('input', searchUsers);

// Optionally, load all users on page load (not recommended for huge files)
// searchUsers();