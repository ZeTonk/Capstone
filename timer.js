function startTimer() {
    console.log('Starting session timer');

    if (document.getElementById('sessionTimer')) {
        console.log('Timer already exists, not creating a new one');
        return;
    }

    let sessionSeconds = 0;

    const timerElement = document.createElement('div');
    timerElement.id = "sessionTimer";
    timerElement.style.marginTop = "20px";
    timerElement.style.color = "var(--primary-color)";
    timerElement.style.fontSize = "18px";
    timerElement.style.textAlign = "center";
    document.body.appendChild(timerElement);

    updateTimerDisplay(timerElement, sessionSeconds);

    let timerInterval = setInterval(() => {
        sessionSeconds++;
        updateTimerDisplay(timerElement, sessionSeconds);

        sessionStorage.setItem('timeOnPage', sessionSeconds.toString());

        if (sessionSeconds === 300) {
            showLongSessionMessage();
        }
    }, 1000);

    window.addEventListener('beforeunload', () => {
        console.log('Page unloading, stopping timer');
        clearInterval(timerInterval);
    });
}

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

function showLongSessionMessage() {
    console.log('Showing long session message (5 minutes)');

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

    const timerElement = document.getElementById('sessionTimer');
    if (timerElement) {
        document.body.insertBefore(messageDiv, timerElement);
    } else {
        document.body.appendChild(messageDiv);
    }

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