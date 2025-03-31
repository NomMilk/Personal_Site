let cursor;
let activeMouseMoveListener = null;

function DragableWindows(title) {
    const windowsContainer = document.getElementById('windowsContainer');
    const windowBoxes = windowsContainer.querySelectorAll('.WindowsBox');

    for (let i = 0; i < windowBoxes.length; i++) {
        const windowTitleElement = windowBoxes[i].querySelector('.WindowsTitle'); 

        if (windowTitleElement.textContent === title) {
            windowsContainer.appendChild(windowBoxes[i]);

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

function createWindow(title, content, x, y, width, height, Fixed = false) {
    if(deleteWindow(title))
    {
        createWindow(title, content, x, y, width, height);
        return;
    }

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
    const windowsScroll = windowsBox.querySelector('.WindowsScroll');

    windowsScroll.style.height = `${(height/(windowsContent.scrollHeight * 0.5)) * 100}%`;

    if (Fixed || (height / 100) * window.innerHeight >= windowsContent.scrollHeight)
    {
        windowsScroll.style.height = 0;
    }
    console.log(windowsContent.scrollHeight);
    console.log((height / 100) * window.innerHeight);
    reloadLinks_M();
    reloadLinks_I();
    reloadLinks();
}

//still need to make this for all the webgl game si'm gonn add
//although this chatgippidy code's gonna work for now
function deleteWindow(title) {
    const windowBox = document.getElementsByClassName('WindowsTitle');
    let Deleted = false;

    Array.from(windowBox).forEach((windowtitle) => {
        if (windowtitle.innerHTML === title) {
            console.log("Removed Window");
            if (windowtitle.innerHTML === "Boat_Rider") {
                try {
                    window.QuitBoatRider();
                    console.log("QuitBoatRider executed successfully.");
                } catch (error) {
                    console.error("Failed to execute QuitBoatRider:", error);
                }
            }

            windowtitle.parentNode.remove();
            Deleted = true;
        }
    });

    if (typeof cursor !== "undefined") {
        cursor.classList.remove("cursor_hover");
    } else {
        console.warn("Cursor element is not defined.");
    }

    return Deleted;
}

function updateWindows(title, content) {
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
    reloadLinks_M();
    reloadLinks_I();
    reloadLinks();
}

function reloadLinks() {
    const links = document.querySelectorAll('.WindowsScroll ,.button, .ProjectLinks, .DesktopIcons, a'); // Ensure correct selector

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor_hover");
        });

        link.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor_hover");
        });
    });
}

//this is for the text icon (input)
function reloadLinks_I() {
    const links = document.querySelectorAll('.lfield'); // Ensure correct selector

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor_input");
        });

        link.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor_input");
        });
    });
}

//this is for the click icon
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
            DragableWindows(e.target.innerHTML);
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
