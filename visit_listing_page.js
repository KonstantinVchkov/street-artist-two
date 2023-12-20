const visitListSection = document.querySelector(".visitor-listing-section");
import { items, itemTypes } from "./data.js";

const closeFilterBtn = document.querySelector(".close-filter-btn  img");


let cardCount = 0; 

const renderListingCard = (image, artistName, price, title, description) => {
  const divListingCard = document.createElement("div");
  divListingCard.classList.add("listing-card");
  divListingCard.innerHTML = `
    <div class="bg-img">
      <img src="${image}" alt="" />
    </div>
    <div class="text-section">
      <div class="w-80">
        <div class="artist-price d-flex justify-content-between">
          <h3 class="artist-name">${artistName}</h3>
          <a href="#" class="cost">${price}</a>
        </div>
        <span class="title">${title}</span>
        <p class="paragraph">${description}</p>
      </div>
    </div>
  `;

  let textSections = divListingCard.querySelectorAll(".text-section");
  let cost = divListingCard.querySelectorAll(".cost");
  let currentTextSection = textSections[0]; 
  let currentCostBg = cost[0]; 

  if (cardCount % 2 === 0) {
    currentTextSection.style.backgroundColor = "#FCEBD5";
    currentTextSection.style.color = "#A16A5E";
    currentCostBg.style.backgroundColor = "#A16A5E";
    currentCostBg.style.color = "#FCEBD5";
  } else {
    currentTextSection.style.backgroundColor = "#A16A5E";
    currentTextSection.style.color = "#FCEBD5";
    currentCostBg.style.backgroundColor = "#FCEBD5";
    currentCostBg.style.color = "#A16A5E";
  }

  cardCount++; 
  visitListSection.appendChild(divListingCard);
};



const renderCard = () => {
  items
    .filter((item) => item.isPublished === true)
    .forEach((item) => {
      renderListingCard(item.image,item.artist,item.price,item.title,item.description)
     
    });
};
renderCard();

document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.querySelector(".visitors-filter");
  const filterForm = document.querySelector(".filter-form");
  const selectTypeArt = document.querySelector("#item-types");
  const filterFormFun = (e) => {
    e.preventDefault();
    visitListSection.innerHTML = "";
    filterForm.style.display = "block";
    filterBtn.style.display = "none"

  }
  const closeFilterForm = (e) => {
    e.preventDefault();
    filterForm.style.display = "none";
    renderCard()
    filterBtn.style.display = "block"
  }
  filterBtn.addEventListener("click", filterFormFun);
  closeFilterBtn.addEventListener("click", closeFilterForm);
  
 function renderArtType(type) {
    selectTypeArt.innerHTML += `
    <option value="${type}">${type}</option>
    `;
  }

  itemTypes.forEach((item) => {
    renderArtType(item);
  });
  const checkBtnFilter = document.querySelector(".check-btn img");
  const form = document.querySelector(".filter-form form");

  const handleFiltering = (e) => {
    e.preventDefault();

    const inputTitle = document
      .getElementById("title-input")
      .value.toLowerCase();
    const selectArtist = document.getElementById(
      "choose-artist-visit-list"
    ).value;
    const inputMin = document.getElementById("min").value;
    const inputMax = document.getElementById("max").value;
    if(!inputTitle && !selectArtist && !inputMin && !inputMax) {
      alert("Please put something in the fields")
      return;
    }
    const filteredItems = items.filter((item) => {
      return (
        item.title.toLowerCase() === inputTitle ||
        item.artist === selectArtist ||
        item.type === selectTypeArt.value ||
        (item.price <= inputMax && item.price >= inputMin)
      );
    })
    visitListSection.innerHTML = "";

    filterForm.style.display = "";
    filterBtn.style.display = "block"

    filteredItems.forEach((item) => {
      renderListingCard(item.image,item.artist,item.price,item.title,item.description)
    });
    
    form.reset();
  };
  checkBtnFilter.addEventListener("click", handleFiltering);
});
