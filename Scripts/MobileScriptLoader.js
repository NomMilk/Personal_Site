function isMobileDevice() {
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    console.log("test");
    const linkTag = document.getElementById("global-style");
    if (linkTag) {
        linkTag.href = "/Css/mobile/style.css";
    }

   const mobilelinkTag = document.getElementById("cursor-style");
    if (mobilelinkTag) {
        mobilelinkTag.href = "/Css/mobile/cursor.css";
    }
}