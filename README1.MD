# The JavaScript side of the Capstone Project

## The Render Countries JS
```JavaScript
// render countries
function renderPlayers(playersData) {
    console.log('renderPlayers called with', playersData.length, 'players');

    const resultsContainer = document.getElementById('resultsContainer');
    // check if results container exists
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }
    // clear the container
    resultsContainer.innerHTML= '';
    // If no countries found, show a message
    if (playersData.length === 0) {
        console.log('No players found, showing empty message')
        resultsContainer.innerHTML = '<p id="noResults">No players found 📭</p>';
        return;
    }
    // Instead of document fragment, we can use an array to collect elements and then join them, or create a container div
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
    // Append all country cards at once
    playerElements.forEach(element => {
        resultsContainer.appendChild(element);
    });

    console.log(`Successfully rendered ${playersData.length} players`);
}
```

## The Timer JS 
```JavaScript
//timer.js
function startTimer() {
    console.log('Starting session timer');
    // Check if timer already exists to prevent duplicates
    if (document.getElementById('sessionTimer')) {
        console.log('Timer already exists, not creating a new one');
        return;
    }
    // Initialize session timer at 0 seconds
    let sessionSeconds = 0;
    // Create timer display element
    const timerElement = document.createElement('div');
    timerElement.id = "sessionTimer";
    timerElement.style.marginTop = "20px";
    timerElement.style.color = "var(--primary-color)";
    timerElement.style.fontSize = "18px";
    timerElement.style.textAlign = "center";
    document.body.appendChild(timerElement);
    // Update timer display initially
    updateTimerDisplay(timerElement, sessionSeconds);
    // Update timer every second
    let timerInterval = setInterval(() => {
        sessionSeconds++;
        updateTimerDisplay(timerElement, sessionSeconds);
    // Store current time in sessionStorage (automatically cleared when tab closes)
        sessionStorage.setItem('timeOnPage', sessionSeconds.toString());
    // Trigger special message for long sessions (over 5 minutes)
        if (sessionSeconds === 300) {
            showLongSessionMessage();
        }
    }, 1000);
    // When page is about to unload stop the timer
    window.addEventListener('beforeunload', () => {
        console.log('Page unloading, stopping timer');
        clearInterval(timerInterval);
    });
}
// Helper function to format and display time
function updateTimerDisplay(element, totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let timeText = `⏱ Time on page: `;

    if (hours > 0) {
        timeText += `${hours}h `;
    }

    if (hours > 0 || minutes > 0) {
        timeText += `${minutes}m `;
    }

    timeText += `${seconds}s`;

    element.textContent = timeText;
}
// Show messages for users spending a long time on the site
function showLongSessionMessage() {
    console.log('Showing long session message (5 minutes)');
    // Check if message already exists to prevent duplicates
    if (document.getElementById('longSessionMessage')) {
        console.log('Long session message already exists');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.id = "longSessionMessage";
    messageDiv.style.padding = '10px';
    messageDiv.style.margin = '20px 0';
    messageDiv.style.backgroundColor = 'var(--primary-color)';
    messageDiv.style.color = 'var(--btn-text)';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.textAlign = 'center';
    messageDiv.innerHTML = `
    <p>🌍 You've been exploring for 5 minutes! Thank you for your interest in Sports Player Explorer.<p>
    <button id="dismissMessage" style ="margin-top: 10px; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;"> Dismiss </button>
    `;
    // Check if timer element exists
    const timerElement = document.getElementById('sessionTimer');
    if (timerElement) {
        document.body.insertBefore(messageDiv, timerElement);
    } else {
        document.body.appendChild(messageDiv);
    }
    // Add event listener to dismiss button
    const dismissButton = document.getElementById('dismissMessage');
    if (dismissButton) {
        dismissButton.addEventListener('click', function() {
            const message = document.getElementById('longSessionMessage');
            if (message) {
                message.remove();
            }
        });
    }
}
startTimer()
```

## The Theme Changing part of the JS:
```JavaScript
const themeToggle = document.getElementById('themeToggle');
// Load Theme Preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}
// Save theme preference to local storage
themeToggle.addEventListener('click', ()=> {
    document.body.classList.toggle('dark-Theme');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
// Add keyboard shortcut for dark mode toggle (Shift + D)
document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D'){
        themeToggle.click();
    }
})
```

## The Greet JS Part
``` JavaScript
function greetUser(){
    // Check if visitedBefore cookie exists
    const hasVisitedBefore = document.cookie.includes('visitedBefore=true');
    if (hasVisitedBefore) {
        alert("👋 Welcome back to Sports Player Explorer!");
    } else {
        // sets cookie with 7 day expiry
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `visitedBefore=true; 
        expires=${expiryDate.toUTCString()}; path=/`;
        alert("🌟 Welcome to Sports Player Explorer!");
    }
}
greetUser()
```

## The Rest of the Search Functionality 
```JavaScript
function initializeSearch() {
    console.log("Initializing search functionality");
    // Show all countries at start
    renderPlayers(playersData);
    const searchInput = document.getElementById('searchInput');
    // Check if search input exists
    if (!searchInput){
        console.error('Search input element not found');
        return;
    }
    // Real-Time Search
    searchInput.addEventListener('input', function(){
        const searchTerm = this.value.trim().toLowerCase();
        console.log('Input event detected, search term:', searchTerm); // Debug Log

        // Preform search immediately on each input
        if (searchTerm !== '') {
            searchPlayers(searchTerm);
        } else {
            // If search box is empty, show all countries
            renderPlayers(playersData);
        }
    });
    // The Keyboard short cut for search (Enter Key)
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            console.log('Enter key pressed for search term:', searchTerm);

            if (searchTerm !== '') {
                searchPlayers(searchTerm);
                saveSearchTerm(searchTerm);
                // Clear the search box after pressing Enter
                searchInput.value = '';
            }

        }
    });
} // End of initializeSearch()

function searchPlayers(searchTerm) {
    console.log('searchPlayers called with term:', searchTerm);
    // Check if playersData is available 
    if (typeof playersData === 'undefined' || !Array.isArray(playersData)) {
        console.error('playersData is not defined or not an array in searchPlayers');
        return;
    }
    // If search term it empty, show all players
    const filteredPlayers = playersData.filter(player => {
        if (!player || typeof player.name !== 'string') {
            console.warn('Invalid player object found:', player);
            return false;
        }
        return player.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log(`Found ${filteredPlayers.length} players matching "${searchTerm}"`);
    // Render the filtered players
    renderPlayers(filteredPlayers);
}

function saveSearchTerm(term){
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // Limit history to last 10 searches
    if (searchHistory.length >= 10) {
        searchHistory.shift();
    }
    // Save only if not already in history
    if (!searchHistory.includes(term)) {
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}
saveSearchTerm();
initializeSearch();
renderPlayers(playersData);

```