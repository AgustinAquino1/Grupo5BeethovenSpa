window.onload = ()=>{
let barsMenu = document.querySelector(".fa-bars")
let menuItems = document.querySelector(".burger")

    barsMenu.addEventListener("click", (e) =>{
      barsMenu.classList.toggle("rotate-bars")
      menuItems.classList.toggle("activate-menu-items")
    })

    }