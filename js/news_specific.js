var news_div_main = document.getElementById("news_div_main");
var news_div_secondary = document.getElementById("news_div_secondary");

var storedItem;
var normalized = [];

var news_imgs = {
  img1: "../images/news/360_F_1613433801_GcnUeDmRFRUsUT3xkkCJsXvwzRCqRdXU.jpg",
  img2: "../images/news/cyber-security-network-data-protection-600nw-2656907229.jpg",
  img3: "../images/news/images-2.fill.size_2000x1334.v1611688517.jpg",
  img4: "../images/news/istockphoto-2174551157-612x612.jpg"
};

var APIurl = "https://vebdizajn-4.onrender.com/api/vebdizajn/hakerske-vesti";

async function loadTranslations(lang) {
  const response = await fetch(`../js/lang/${lang}.json`);
  if (!response.ok) throw new Error("Failed to load translations");
  return await response.json();
}

async function setLanguage(lang, newsItems = []) {
  localStorage.setItem("lang", lang);
  let translations = await loadTranslations(lang);

  newsItems.forEach((item, index) => {
    const titleKey = `news_elem_h${index}`;
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

async function fetchNews() {
  try {
    const res = await fetch(APIurl);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

function createArticle(items) {
  const images = Object.values(news_imgs);
  const translations = JSON.parse(localStorage.getItem("translations") || "{}");
  const storedItemObj = storedItem ? JSON.parse(storedItem) : null;
  const itemIdStored = storedItemObj ? storedItemObj.id : null;

  items.forEach(e => {
    const title = translations[`news_elem_h${e.id}`] || e.title;
    const description = translations[`news_elem_p${e.id}`] || e.description;
    const imgSrc = images[e.id % images.length];

    if (e.id === itemIdStored) {
      const article = document.createElement("article");
      article.classList.add("article_main");
      article.innerHTML = `
        <h1 data-i18n="news_elem_h${e.id}">${title}</h1>
        <div data-item-id="${e.id}" class="article_outer">
          <img class="img_main" src="${imgSrc}" alt="news_image">
          <div class="article">
            <p data-i18n="news_elem_p${e.id}" class="main_text_paragraph">${description}</p>
            <small>${e.date}</small>
          </div>
        </div>`;
      news_div_main.append(article);
    } else {
      const article_secondary = document.createElement("div");
      article_secondary.classList.add("article_secondary");
      article_secondary.innerHTML = `
        <div data-item-id="${e.id}" onclick="viewDetails(this)" class="article_secondary_outer">
          <img class="secondary_img" src="${imgSrc}" alt="news_image">
          <div class="article">
            <h3 data-i18n="news_elem_h${e.id}">${title}</h3>
            <p data-i18n="news_elem_p${e.id}">${description}</p>
            <small>${e.date}</small>
          </div>
        </div>`;
      news_div_secondary.append(article_secondary);
    }
  });
}

function viewDetails(clickedElement) {
  const itemId = clickedElement.getAttribute('data-item-id');
  const selectedItem = normalized.find(e => e.id === parseInt(itemId));
  localStorage.setItem("selectedProduct", JSON.stringify(selectedItem));
  window.location.href = `/pages/news_specific.html`;
}

document.addEventListener("DOMContentLoaded", async () => {
  storedItem = localStorage.getItem('selectedProduct');

  const news = await fetchNews();
  normalized = news.map((item, index) => ({
    id: index,
    date: item.Datum,
    title: item.Naslov,
    description: item.Opis
  }));

  const lang = localStorage.getItem("lang") || "en";
  await setLanguage(lang, normalized);
});
