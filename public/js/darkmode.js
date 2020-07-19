if (typeof(Storage) !== "undefined") {
    if (localStorage.darkmode) {
        if (localStorage.darkmode === "dark") {
            document.querySelector('#darkmode').checked = true;
            document.querySelector('html').setAttribute('data-theme', 'dark');
        } else {
            document.querySelector('#darkmode').checked = false;
            document.querySelector('html').setAttribute('data-theme', 'light');
        }
    } else {
        localStorage.darkmode = "light";
        document.querySelector('#darkmode').checked = false;
        document.querySelector('html').setAttribute('data-theme', 'light');
    }
}

document.querySelector('#darkmode').addEventListener('input', (event) => {
    if (event.target.checked == true) {
        localStorage.darkmode = "dark";
        document.querySelector('html').setAttribute('data-theme', 'dark');
    } else {
        localStorage.darkmode = "light";
        document.querySelector('html').setAttribute('data-theme', 'light');
    }
});