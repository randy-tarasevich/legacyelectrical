loadNavBar()
loadHome()
loadAbout()
function loadNavBar() {
  const navbar = document.getElementById('navbar')
  fetch('/components/navbar.html')
    .then((response) => response.text())
    .then((html) => {
      navbar.innerHTML = html
    })
}

function loadHome() {
  const content = document.getElementById('content')
  fetch('/components/home.html')
    .then((response) => response.text())
    .then((html) => {
      content.innerHTML = html
    })
}

function loadAbout() {
  const content = document.getElementById('about')
  fetch('/components/about.html')
    .then((response) => response.text())
    .then((html) => {
      about.innerHTML = html
    })
}
