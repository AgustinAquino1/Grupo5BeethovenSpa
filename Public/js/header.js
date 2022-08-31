window.onload = ()=>{
let barsMenu = document.querySelector(".fa-bars")
let menuItems = document.querySelector(".burger")
let avatarMenu = document.querySelector(".avatar")
let menuItemsAvatar = document.querySelector(".avatarMenu")

    barsMenu.addEventListener("click", (e) =>{
      barsMenu.classList.toggle("rotate-bars")
      menuItems.classList.toggle("activate-menu-items")
    })

    avatarMenu.addEventListener("click", (e) =>{
      menuItemsAvatar.classList.toggle("activate-menu-avatar-items")
    })

    }