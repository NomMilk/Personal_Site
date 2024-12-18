let cursor; // Declare cursor at a higher scope

function switchPage(title, content) {
    const windowsContainer = document.getElementById('windowsContainer');
    const windowBoxes = windowsContainer.querySelectorAll('.WindowsBox');

    for (let i = 0; i < windowBoxes.length; i++) {
        const windowTitleElement = windowBoxes[i].querySelector('.WindowsTitle'); 

        if (windowTitleElement.textContent === title) {
            const contentElement = windowBoxes[i].querySelector('.WindowsContent');
            contentElement.innerHTML = content;
            break;
        }
    }
    reloadLinks();
}

function createWindow(title, content, x, y, width, height) {
    if(deleteWindow(title)) return;

    const template = document.getElementById('Windows');
    const clone = template.content.cloneNode(true);

    const windowsTitle = clone.querySelector('.WindowsTitle');
    const windowsContent = clone.querySelector('.WindowsContent');

    windowsTitle.textContent = title;
    windowsContent.innerHTML = content;

    const windowsBox = clone.querySelector('.WindowsBox');
    windowsBox.style.marginLeft = `${x}%`;
    windowsBox.style.marginTop = `${y}%`;
    windowsBox.style.width = `${width}%`;
    windowsBox.style.height = `${height}%`;

    document.getElementById('windowsContainer').appendChild(clone);
    reloadLinks();
}
function deleteWindow(title) {
    const windowBox = document.getElementsByClassName('WindowsTitle');
    let Deleted = false;
    
    Array.from(windowBox).forEach((windowtitle) => {
        if (windowtitle.innerHTML === title) {
            windowtitle.parentNode.remove();
            Deleted = true;
        }
    });

    cursor.classList.remove("cursor_hover");

    return Deleted;
}

function reloadLinks() {
    const links = document.querySelectorAll('.button, .ProjectLinks, .DesktopIcons, a'); // Ensure correct selector

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor_hover");
        });

        link.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor_hover");
        });
    });
}

window.addEventListener('load', () => {
    cursor = document.querySelector('.cursor'); // Assign cursor to the higher-scope variable

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`;
        cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
    });
});
