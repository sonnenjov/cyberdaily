async function loadTranslations(lang) {
  const response = await fetch(`../js/lang/${lang}.json`);
  if (!response.ok) throw new Error("Failed to load translations");
  const translations = await response.json();
  return translations;
}

async function setLanguage(lang, newsItems = []) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  const langBtn = document.getElementById(lang);
  if (langBtn) langBtn.classList.add("active");

  let translations = await loadTranslations(lang);

  newsItems.forEach((item, index) => {
    const titleKey = `news_elem_h3${index}`;
    const descKey = `news_elem_p${index}`;

    if (!translations[titleKey]) translations[titleKey] = item.title;
    if (!translations[descKey]) translations[descKey] = item.description;
  });

  localStorage.setItem("translations", JSON.stringify(translations));

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) el.textContent = translations[key];
  });

  if (newsItems.length > 0) {
    news_div_main.innerHTML = "";
    news_div_secondary.innerHTML = "";
    createArticle(newsItems);
  }
}
