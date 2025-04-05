loadHome()

function loadHome() {
    const content = document.getElementById("content")
    fetch("/components/home.html")
        .then((response) => response.text())
        .then((html) => {
            content.innerHTML = html
        })
}
