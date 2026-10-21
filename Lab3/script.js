const themeToggleBtn = document.getElementById('themeToggle');

themeToggleBtn.addEventListener('click', () => {
    // body එකට dark-mode class එක toggle කරයි
    document.body.classList.toggle('dark-mode');

    // Button text එක මාරු කරයි
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = 'Light Mode';
        themeToggleBtn.classList.replace('btn-dark', 'btn-light');
    } else {
        themeToggleBtn.textContent = 'Dark Mode';
        themeToggleBtn.classList.replace('btn-light', 'btn-dark');
    }
});