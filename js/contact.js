

document.getElementById("contact_form").addEventListener("submit", async e => {
  e.preventDefault();

  var confirmation_div = document.getElementById("confirm")
  var confirm_text = document.createElement('div')
  confirm_text.setAttribute('id', "confirm_text")
  confirm_text.innerHTML = `
  <p data-i18n="confirm_text" >Message sent<p>`
  confirmation_div.append(confirm_text)

  document.getElementById("contact_form").reset();
  setTimeout(() => {
    window.location.href = "../pages/contact.html"
  }, 1000);
});
