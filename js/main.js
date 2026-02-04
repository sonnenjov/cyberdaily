var burger = document.getElementById("burger_main")
var nav = document.getElementById("main_nav")
let isScrolled = false;
var menu = document.getElementById("list_container");

// NAV INTERACTION
// 
// 
// 


function width_nav() {
  if (window.innerWidth < 900) {
    nav.classList.add('mobile')
  } else {
    nav.classList.remove('mobile')
  }
}


function button_burger_toggle() {
  if(this.classList.contains("clicked")) {
    this.classList.remove("clicked")
    toggle_mobile_menu()
  } else {
    this.classList.add("clicked")
    toggle_mobile_menu()
  }
}

function onScroll() {
  const shouldBeScrolled = window.scrollY > 30;

  if (shouldBeScrolled !== isScrolled) {
    isScrolled = shouldBeScrolled;
    nav.classList.toggle("scrolled", isScrolled);
  }
}


function toggle_mobile_menu() {
  if (menu.classList.contains("clicked_burger")) {
    menu.classList.remove("clicked_burger")
  } else {
    menu.classList.add("clicked_burger")
  }
}


// 
// 
// 
// END NAV INTERACTION












// 
document.getElementById("burger_main").addEventListener('click', button_burger_toggle)
window.addEventListener("resize", width_nav)
window.addEventListener("load", width_nav)
window.addEventListener("scroll", onScroll);

// 