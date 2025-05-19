/* function changeTheme() {
    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle("dark-Theme");

        if (this.innerText === 'Toggle Dark') {
            this.innerText = 'Toggle Light';
        } else{
            this.innerText = 'Toggle Dark';
        }
    })
}; */
const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

themeToggle.addEventListener('click', ()=> {
    document.body.classList.toggle('dark-Theme');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D'){
        themeToggle.click();
    }
})
