loadNavBar()

function loadNavBar() {
    const navbar = document.getElementById("navbar")
    fetch("./components/navbar.html")
        .then((response) => response.text())
        .then((html) => {
            navbar.innerHTML = html
        })
}
