const images_b2b = [
  "../images/b2b/channels4_profile.jpg",
  "../images/b2b/cyberscoop_logo.jpeg",
  "../images/b2b/cycj2rheyub5yb3ny6sv.avif",
  "../images/b2b/gaGjrZRw_400x400.jpg",
  "../images/b2b/images.jpeg",
  "../images/b2b/images.png",
  "../images/b2b/Industrial-cyber-logo.webp",
  "../images/b2b/Screenshot_(938).png",
  "../images/b2b/the-hacker-news-icon.png",
  "../images/b2b/V0CeoY3v_400x400.jpg"
];

const links_b2b = [
  "https://cybernews.com/",
  "https://cyberscoop.com/",
  "https://cyberpress.org/",
  "https://www.securityweek.com/",
  "https://thecyberwire.com/",
  "https://thecyberexpress.com/",
  "https://industrialcyber.co/",
  "https://www.darkreading.com/",
  "https://thehackernews.com/",
  "https://www.cybersecuritydive.com/"
];

const carousel_b2b = document.getElementById("carousel_b2b");

function createB2BItems() {
  images_b2b.forEach((src, index) => {
    const a = document.createElement("a");
    a.href = links_b2b[index];
    a.target = "_blank";
    a.className = "link_img_b2b";

    const img = document.createElement("img");
    img.src = src;
    img.className = "image_b2b";

    a.appendChild(img);
    carousel_b2b.appendChild(a);
  });

}


function duplicateCarousel() {
  carousel_b2b.innerHTML += carousel_b2b.innerHTML;
}


window.addEventListener("load", () => {
  createB2BItems();
  duplicateCarousel();
});
