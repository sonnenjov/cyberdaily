const news_div = document.getElementById("news_div");
const APIurl = "https://vebdizajn-4.onrender.com/api/vebdizajn/hakerske-vesti";
var normalized;
const news_imgs = {
  img1: "/images/news/360_F_1613433801_GcnUeDmRFRUsUT3xkkCJsXvwzRCqRdXU.jpg",
  img2: "/images/news/cyber-security-network-data-protection-600nw-2656907229.jpg",
  img3: "/images/news/images-2.fill.size_2000x1334.v1611688517.jpg",
  img4: "/images/news/istockphoto-2174551157-612x612.jpg"
};

async function fetch_url_spread_news() {
  try {
    const res = await fetch(APIurl);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

fetch_url_spread_news().then(news => {
  normalized = news.map((item, index) => ({
    id: index,
    date: item.Datum,
    title: item.Naslov,
    description: item.Opis
  }));

  createArticle(normalized);
});

function createArticle(items) {
  const images = Object.values(news_imgs);

  items.forEach(e => {
    const article = document.createElement("article");

    const imgSrc = images[e.id % images.length];

    article.innerHTML = `
    <div data-item-id="${e.id}" onclick="viewDetails(this)" class="article_outer">
    <img class="" src="${imgSrc}" alt="news_image">
    <div class="article">
    <h3 data-i18n="news_elem_h3${e.id}" >${e.title}</h3>
    <p data-i18n="news_elem_p${e.id}">${e.description}</p>
    <small>${e.date}</small>
    </div>
    </div>
    `;

    news_div.append(article);
  });
}

function viewDetails(clickedElement) {
  const itemId = clickedElement.getAttribute('data-item-id');
  const selectedItem = normalized.find(e => e.id === parseInt(itemId));

  localStorage.setItem("selectedProduct", JSON.stringify(selectedItem))

  window.location.href = `/pages/news_specific.html`
}
