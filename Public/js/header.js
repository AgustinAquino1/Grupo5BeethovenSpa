window.onload = ()=>{
let barsMenu = document.querySelector(".fa-bars")
let menuItems = document.querySelector(".burger")

    console.log(barsMenu)
    barsMenu.addEventListener("click", (e) =>{
      barsMenu.classList.toggle("rotate-bars")
      menuItems.classList.toggle("activate-menu-items")
    })

    }