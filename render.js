function renderPlayers(playersData) {
    console.log('renderPlayers called with', playersData.length, 'players');

    const resultsContainer = document.getElementById('resultsContainer');

    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }

    resultsContainer.innerHTML= '';

    if (playersData.length === 0) {
        console.log('No players found, showing empty message')
        resultsContainer.innerHTML = '<p id="noResults">No players found 📭</p>';
        return;
    }

    const playerElements = [];


    playersData.forEach(players => {
        if (!players || typeof players.name !== 'string'){
            console.warn('Invalid player object:', players);
            return
        }
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-card';
        playerDiv.innerHTML = `
        <div class= "player-header">
            <img src = "${players.flag || ''}" alt="Flag of ${players.name}" class="flag-img">
            <h3>${players.name}</h3>
        </div>
        <p><strong>Age:</strong> ${players.age || 'Unknown'}</p>
        <p><strong>Sport:</strong> ${players.sportsName || 'Unknown'}</p>
        <p><strong>Country:</strong> ${players.country || 'Unknown'}</p>
        <a href="${players.link || '#'}" target="_blank">
            <button class="learn-more-btn"> Learn More </button>
        </a>
        `;
        playerElements.push(playerDiv);
    });

    playerElements.forEach(element => {
        resultsContainer.appendChild(element);
    });

    console.log(`Successfully rendered ${playersData.length} players`);
}

function initializeSearch() {
    console.log("Initializing search functionality");
    renderPlayers(playersData);
    const searchInput = document.getElementById('searchInput');
    if (!searchInput){
        console.error('Search input element not found');
        return;
    }
    searchInput.addEventListener('input', function(){
        const searchTerm = this.value.trim().toLowerCase();
        console.log('Input event detected, search term:', searchTerm);

        if (searchTerm !== '') {
            searchPlayers(searchTerm);
        } else {
            renderPlayers(playersData);
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            console.log('Enter key pressed for search term:', searchTerm);

            if (searchTerm !== '') {
                searchPlayers(searchTerm);
                saveSearchTerm(searchTerm);

                searchInput.value = '';
            }

        }
    });
}

function searchPlayers(searchTerm) {
    console.log('searchPlayers called with term:', searchTerm);

    if (typeof playersData === 'undefined' || !Array.isArray(playersData)) {
        console.error('playersData is not defined or not an array in searchPlayers');
        return;
    }

    const filteredPlayers = playersData.filter(player => {
        if (!player || typeof player.name !== 'string') {
            console.warn('Invalid player object found:', player);
            return false;
        }
        return player.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log(`Found ${filteredPlayers.length} players matching "${searchTerm}"`);

    renderPlayers(filteredPlayers);
}

function saveSearchTerm(term){
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (searchHistory.length >= 10) {
        searchHistory.shift();
    }

    if (!searchHistory.includes(term)) {
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}
saveSearchTerm();
initializeSearch();
renderPlayers(playersData);
