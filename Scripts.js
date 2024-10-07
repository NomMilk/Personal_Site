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



function createWindow(title, content, x, y, width, height, minheight)
{
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
}