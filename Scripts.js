function switchPage(title, content)
{
    const windowsContainer = document.getElementById('windowsContainer');
    const windowBoxes = windowsContainer.querySelectorAll('.WindowsBox');

    for (let I = 0; I < windowBoxes.length; I++)
    {
        const windowTitleElement = windowBoxes[I].querySelector('.WindowsTitle'); 

        if (windowTitleElement.textContent === title)
        {
            const contentElement = windowBoxes[I].querySelector('.WindowsContent');
            contentElement.innerHTML = content;
            break;
        }
    }
}



function createWindow(title, content, x, y, width, height)
{
    const template = document.getElementById('Windows');
    const clone = template.content.cloneNode(true); // Clone the template content

    // Set the title and content
    const windowsTitle = clone.querySelector('.WindowsTitle');
    const windowsContent = clone.querySelector('.WindowsContent');

    windowsTitle.textContent = title;
    windowsContent.innerHTML = content;

    // Get the window box (outer div) and set its style for dynamic positioning and size
    const windowsBox = clone.querySelector('.WindowsBox');
    windowsBox.style.marginLeft = `${x}px`;
    windowsBox.style.marginTop = `${y}px`;
    windowsBox.style.width = `${width}px`;
    windowsBox.style.height = `${height}px`;

    // Append the clone to the main container
    document.getElementById('windowsContainer').appendChild(clone);
}