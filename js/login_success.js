var user_cred_div = document.getElementById("user_cred")




function loadUser() {
  var localStorage_logged_user = window.localStorage.getItem("loggedUser")
  user_cred_div.append(localStorage_logged_user)
}


window.addEventListener('load', loadUser);