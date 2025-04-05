loadAbout()

function loadAbout() {
    const content = document.getElementById("about")
    fetch("/components/about.html")
        .then((response) => response.text())
        .then((html) => {
            content.innerHTML = html
        })
}
