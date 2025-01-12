let cursor;
let activeMouseMoveListener = null;

function addToCursor(title) {
    const windowsContainer = document.getElementById('windowsContainer');
    const windowBoxes = windowsContainer.querySelectorAll('.WindowsBox');

    for (let i = 0; i < windowBoxes.length; i++) {
        const windowTitleElement = windowBoxes[i].querySelector('.WindowsTitle'); 

        if (windowTitleElement.textContent === title) {

            const marginLeft = parseFloat(windowBoxes[i].style.marginLeft) || 0;

            let pre_cursorLeft = parseFloat(cursor.style.left) || 0;
            let pre_parentWidth = cursor.offsetParent?.clientWidth || 0;
            let pre_cursorLeftPercentage = (pre_cursorLeft / pre_parentWidth) * 100;

            //idk how the fuck I did the property bullshit
            if (!windowBoxes[i].hasOwnProperty('activeMouseMoveListener')) {
                const activeMouseMoveListener = (e) => {
                    let cursorLeft = parseFloat(cursor.style.left) || 0;

                    let parentWidth = cursor.offsetParent?.clientWidth || 0;
                    let cursorLeftPercentage = (cursorLeft / parentWidth) * 100;

                    let calculatedPosition = marginLeft + (cursorLeftPercentage - pre_cursorLeftPercentage);

                    windowBoxes[i].style.marginLeft = `${calculatedPosition}%`;
                    windowBoxes[i].style.marginTop = `${cursor.style.top}`;
                };

                document.addEventListener('mousemove', activeMouseMoveListener);
                windowBoxes[i].activeMouseMoveListener = activeMouseMoveListener;
            }
            break;
        }
    }
}

function removeFromCursor() {
    const windowsContainer = document.getElementById('windowsContainer');
    const windowBoxes = windowsContainer.querySelectorAll('.WindowsBox');

    for (let i = 0; i < windowBoxes.length; i++) {
        if (windowBoxes[i].hasOwnProperty('activeMouseMoveListener')) {
            document.removeEventListener('mousemove', windowBoxes[i].activeMouseMoveListener);

            delete windowBoxes[i].activeMouseMoveListener;
        }
    }
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
    reloadLinks_M();
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

function reloadLinks_M() {
    const links = document.querySelectorAll('.WindowsTitle'); // Ensure correct selector

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor_move");
        });

        link.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor_move");
        });
        

        link.addEventListener("mousedown", (e) => {
            isMouseDown = true;
            addToCursor(e.target.innerHTML);
            cursor.classList.add("cursor_hold");
        });

        link.addEventListener("mouseup", () => {
            removeFromCursor();
            cursor.classList.remove("cursor_hold");
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
