function changeNavOnScroll() {
  const navNoScroll = document.getElementById("nav_desktop_no_scroll");
  const navScroll = document.getElementById("nav_desktop_scroll");

  if (window.scrollY > 10) {
    navNoScroll.classList.add("scrolled");
    navScroll.classList.add("scrolled");
  } else {
    navNoScroll.classList.remove("scrolled");
    navScroll.classList.remove("scrolled");
  }
}


function toggle_burger_menu() {
 var button = document.getElementById("menu_outer_up") || document.getElementById("menu_outer_up_clicked");
  var button_second = document.getElementById("menu_outer_down") || document.getElementById("menu_outer_down_clicked");
  var menu_one = document.getElementById("menu_mobile") || document.getElementById("menu_mobile_clicked"); 
  if(button.id == "menu_outer_up") {
    button.id = "menu_outer_up_clicked"
    button_second.id = "menu_outer_down_clicked"
    menu_one.id = "menu_mobile_clicked";
  } else {
    button.id = "menu_outer_down"
    menu_one.id = "menu_mobile";
    button_second.id = "menu_outer_down";

  }
  if(button_second.id == "menu_outer_down") {
    button.id = "menu_outer_up_clicked"
    button_second.id = "menu_outer_down_clicked"
    menu_one.id = "menu_mobile_clicked";
  } else {
    button.id = "menu_outer_up"
    button_second.id = "menu_outer_down"
    menu_one.id = "menu_mobile";
  }
}







window.addEventListener("scroll", changeNavOnScroll);