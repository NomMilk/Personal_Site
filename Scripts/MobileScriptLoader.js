function isMobileDevice() {
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice())
{
    console.log("This is a mobile device.");
}
else
{
    console.log("This is not a mobile device.");
}