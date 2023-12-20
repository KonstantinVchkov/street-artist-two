import { handleRoute } from "./handleRoutes.js";
import { items } from "./data.js";

const btnVisitor = document.querySelector(".join-visitor");
const btnLogo = document.querySelector(".logo-visitor");
const btnAuction = document.querySelector(".auction-icon img");
const btnLogoText = document.querySelector(".logo-text");

const row1 = document.querySelector(".row1");
const row2 = document.querySelector(".row2");
const renderSlideImg = (image, artist) => {
  row1.innerHTML += `
      <a href="#visitor-listing-page">
        <img src="${image}" alt="${artist}" />      
      </a>
  `;
  row2.innerHTML += `
  <a href="#visitor-listing-page">
  <img src="${image}" alt="${artist} artist" />      
</a>
  `;
};
items.forEach((item) => {
  renderSlideImg(item.image, item.artist);
});
let position1 = 0;
let position2 = 0;
const speed1 = 0.3;
const speed2 = 0.3;

function animateCarousel() {
  position1 -= speed1;
  position2 += speed2;

  row1.style.transform = `translateX(${position1}px)`;
  row2.style.transform = `translateX(${position2}px)`;


  const totalWidth = row1.scrollWidth;
  if (Math.abs(position1) >= totalWidth) {
    position1 = 0;
  }
  if (position2 >= totalWidth) {
    position2 = 0;
  }

  requestAnimationFrame(animateCarousel);
}

animateCarousel();
btnLogoText.addEventListener("click", () => {
  handleRoute();
  window.location.hash = "#visitor-page";
});
btnVisitor.addEventListener("click", () => {
  handleRoute();
  window.location.hash = "#visitor-page";
});

btnLogo.addEventListener("click", () => {
  handleRoute();
  window.location.hash = "";
});

btnAuction.addEventListener("click", () => {
  handleRoute();
  window.location.hash = "#auctionPage";
});

let carousel = document.querySelector(".carouselinner");
let imgs = Array.from(document.querySelectorAll(".carouselimg"));

imgs.forEach((img, index) => {
  img.addEventListener("click", () => {
    carousel.style.transform = `translateX(${-index * 100}px)`;
  });
});
