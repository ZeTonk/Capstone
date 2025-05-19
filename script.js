const playersData =[   
    [ `
    Flag: <img src="Flag_of_Itlay.svg.png">,
    sport: 

    `]
]

function searchItems(playersData) {
    return items.filter(item => 
        item.toLowerCase().includes(playersData.toLowerCase())
        );
}

function saveSearch(term) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(term);
    localStorage.setItem("history", JSON.stringify(history));
}