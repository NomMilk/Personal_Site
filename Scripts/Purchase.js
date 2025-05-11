//themes
const MinimalBurger = {
    '--background-image': 'url(/SiteImages/Sandwitch.png)',
    '--desktop-text': 'rgb(0, 0, 0)',
    '--text-selected': 'rgb(180, 180, 180)',
    '--selected-color': 'rgb(75, 75, 75)',
    '--bg-color': 'rgb(240, 240, 240)',
    '--border-color': 'rgb(0, 0, 0)',
    '--border-size': '0.15vw',
    '--hover-color': 'rgb(70, 70, 70)',
    '--title-color': 'rgb(100, 150, 200)',
    '--text-color': 'rgb(50, 50, 50)',
    '--sidebar-color': 'rgb(180, 180, 180)',
    '--sidebarborder-color': 'rgb(70, 70, 70)',
    '--rounded-amount': '0.5vw',
    '--scrollrounded-amount': '1vw'
}

function ChangeTheme() {
    const root = document.documentElement;
    
    for (const [key, value] of Object.entries(MinimalBurger)) {
        root.style.setProperty(key, value);
    }
}