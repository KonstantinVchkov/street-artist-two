import { itemTypes,items } from "./data.js";

const btnAddNewItem = document.getElementById("addNewItemButton");
const artistItemForm = document.getElementById("newItemForm");
const btnCancelForm = document.getElementById("cancelNewItem");
const btnAddItem = document.getElementById("saveNewItem");
const artistForm = document.getElementById("artistForm");
const auctionPage = document.getElementById("auctionPage");
const typeInput = document.getElementById("item-types-artist");
const cancelCard = document.getElementById("cancel-card");
const deleteCard = document.getElementById("delete-card");
const addItemButtonDiv = document.querySelector(".add-new-item");
const addNewItemSection = document.querySelector(".artists-cards");
const modalQuestion = document.querySelector(".delete-modal");
const liveAuctionHome = document.querySelector(".down-box")
const auctionSectionText = document.querySelector(".auction-section")
const startCounting = document.querySelector(".start-counting")
const startBidding = document.querySelector(".start-bidding")
let moneyBid = document.querySelector("#moneyBid")
const moneyApeared = document.querySelector(".moneyApeared")
const artistMoneyBid = document.querySelector(".bid")
// ADD ITEM INPUTS
let titleInput = document.getElementById("title");
let textArea = document.getElementById("description");
let priceInput = document.getElementById("price");
let imageInput = document.getElementById("image");

const renderArtistCard = (artists) => {
  artists.forEach((artist) => {
    const divArtist = document.createElement("div");
    divArtist.classList.add("listing-card");
    divArtist.id = artist.id;

    divArtist.innerHTML += `    
      <div class="bg-img">
      <img src="${artist.image}" alt="${artist.artist}art" />
    </div>
    <div class="bg-color-artist-item">
      <div class="in-div">
        <div class="left-side-artist">
          <p class="item-title">${artist.title}</p>
          <span class="date">${artist.dateCreated}</span>
        </div>
        <div class="price">${artist.price}</div>
      </div>
      <p class="description-area">
      ${artist.description}
      </p>
    </div>
    <div class="foot-text">
      <div class="all-buttons">
        <button class="sent-to-auction" id="${artist.id}" ${
      artist.isAuctioning ? "disabled" : ""
    }>Send to Auction</button>
        <button id="${artist.id}" class="unpublish publish">${
      isPublished ? "Unpublish" : "Published"
    }</button>
        <button id="remove">Remove</button>
        <button class="edit" id="${artist.id} edit">Edit</button>
      </div>
    </div>`;
    addNewItemSection.append(divArtist);
  });

  const btnSentToAuction = document.querySelectorAll(".sent-to-auction"); 
  const btnPublishUnpublish = document.querySelectorAll(".unpublish");

  const removeButtons = document.querySelectorAll("#remove");

  btnSentToAuction.forEach((button) =>
    button.addEventListener("click", (e) => {
      e.preventDefault();
      sentToAuction(button);
    })
  );
  btnPublishUnpublish.forEach((button) => {
    const itemId = parseInt(button.id);
    const itemObject = items.find((item) => item.id === itemId);
    updateButtonAppearance(button, itemObject);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      itemObject.isPublished = !itemObject.isPublished;
      updateButtonAppearance(button, itemObject);
    });
  });
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      modalQuestion.style.top = "8%";
      modalQuestion.style.display = "flex";
      cancelCard.addEventListener("click", (e) => {
        e.preventDefault();
        modalQuestion.style.top = "-100%";
        setTimeout(() => {
          modalQuestion.style.display = "none";
        }, 1000);
      });
      deleteCard.addEventListener("click", (e) => {
        e.preventDefault();
        const cardToRemove = button.closest(".listing-card");
        const itemId = parseInt(cardToRemove.id);
        const itemIndex = items.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
          cardToRemove.remove();
          modalQuestion.style.display = "none";
        }
      });
    });
  });
};
const savedArtist = localStorage.getItem("selectedArtist");
const itemsByArtist = items.filter((item) => item.artist === savedArtist);
renderArtistCard(itemsByArtist);
let isOngoingAuction = false;
let countdownInterval; 
let countdownElement; 

function startCountdown(cardAuction, countdownTime) {
  countdownElement = document.createElement("div");
  countdownElement.classList.add("counter");

  cardAuction.appendChild(countdownElement);

  let remainingTime = countdownTime;

  countdownInterval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      auctionPage.removeChild(cardAuction);
      liveAuctionHome.style.display = "none"
      auctionSectionText.innerHTML = `<h1>Currently there's no item on auction,please check out the artist items page</h1>`
      
      isOngoingAuction = false;
    } else {
      countdownElement.textContent = `Remaining Time: ${remainingTime} seconds`;
      remainingTime--;
    }
  }, 1000); 
}

function sentToAuction(button) {
  // e.preventDefault();
  const itemId = parseInt(button.id);
  let itemObject = items.find((item) => item.id === itemId);
  // const onGoingAuction = true;
  if (!isOngoingAuction) {
    let cardAuction = document.createElement("div");
    cardAuction.classList.add("auction-card");
    const sentItem = {
      id: itemObject.id,
      image: itemObject.image,
      title: itemObject.title,
      artist: itemObject.artist,
      price: itemObject.price,
      description: itemObject.description,
      dateSendIt: new Date(),
    };
    cardAuction.innerHTML += `
    <div class="bg-img">
    <img src="${sentItem.image}" alt="${sentItem.artist}art" />
  </div>
  <div class="bg-color-artist-item">
    <div class="in-div">
      <div class="left-side-artist">
        <p class="item-title">${sentItem.title}</p>
        <span class="date">${sentItem.dateSendIt}</span>
      </div>
      <div class="price">${sentItem.price}</div>
    </div>
    <p class="description-area">
    ${sentItem.description}
    </p>
  </div>
    `;
    isOngoingAuction = true;
   
    liveAuctionHome.style.display = "flex"
    auctionSectionText.innerHTML = ""
    startCounting.addEventListener("click", () => {
      const countdownTime = 2 * 60; 
      startCountdown(cardAuction, countdownTime);
    })
    auctionPage.append(cardAuction);
  } else {
    alert("An auction is ongoing, cannot send another item.");
    setInterval(() => {
      let onGoingAuction = document.createElement("div");
      onGoingAuction.classList.add("on-going-auction");
      onGoingAuction.innerHTML = `
        <h1>There's an ongoing auction, please be calm</h1>
      `;
      addNewItemSection.append(onGoingAuction);
    
      setTimeout(() => {
        onGoingAuction.remove();
      }, 10000);
    }, 10000);
  }
}

function updateButtonAppearance(button, item) {
  const isPublished = item.isPublished;
  button.textContent = isPublished ? "Unpublish" : "Publish";
  button.style.color = isPublished ? "white" : "#5A5A5A";
  button.style.backgroundColor = isPublished ? "#1BAC6F" : "#E5E5E5";
}

// updateButtonAppearance();
const artistOpenForm = () => {
  btnAddItem.textContent = "Add new item";
  addItemButtonDiv.style.display = "none";
  addNewItemSection.style.display = "none";
  artistItemForm.style.display = "block";
};

const cancelForm = () => {
  addItemButtonDiv.style.display = "flex";
  addNewItemSection.style.display = "block";
  artistItemForm.style.display = "none";
  artistForm.reset();
};

function renderArtType(type) {
  typeInput.innerHTML += `
  <option value="${type}">${type}</option>
  `;
}
itemTypes.forEach((type) => {
  renderArtType(type);
});

const addItem = (e) => {
  e.preventDefault();
  const valTitleInput = titleInput.value.toLowerCase();
  const valTextArea = textArea.value.toLowerCase();
  const valPriceInput = priceInput.value;
  const valImgInput = imageInput.value;
  let typeInputValue = typeInput.value;
  let snapShotDivImg = document.querySelector(".camera-icon")
  const capturedImageImg = document.querySelector("#capturedImage");
  const capturedImageValue = capturedImageImg.value
  snapShotDivImg.style.display = "flex"


  if (
    !valTitleInput &&
    !valTextArea &&
    !valPriceInput &&
    !valImgInput &&
    !typeInputValue
  ) {
    alert("Please put something in the fields");
    return;
  }

  const newItem = {
    id: items.length + 1,
    image: valImgInput,
    imgDiv: capturedImageValue,
    title: valTitleInput,
    price: valPriceInput,
    description: valTextArea,
    dateCreated: new Date()
  };
  const newItemType = {
    type: typeInputValue,
  };
  capturedImageImg.remove()
  const updateditemsByArtist = [newItem];

  addItemButtonDiv.style.display = "flex";
  addNewItemSection.style.display = "block";
  artistItemForm.style.display = "none";
  artistForm.reset();

  itemTypes.push(newItemType);
  items.push(newItem);
  renderArtistCard(updateditemsByArtist, newItemType);
};
btnAddItem.addEventListener("click", addItem);

const btnEdit = document.querySelectorAll(".edit");
btnEdit.forEach((button) =>
  button.addEventListener("click", () => {
    editItem(button);
    btnAddItem.addEventListener("click", (e) => {
      e.preventDefault();
      saveNewItem();
      cancelForm();
    });
  })
);
const saveNewItem = () => {
  let item_title = document.querySelector(".item-title");
  let item_desc = document.querySelector(".description-area");
  let item_price = document.querySelector(".price");
  let item_image = document.querySelector(".bg-img img");
  item_desc.textContent = textArea.value;
  item_title.textContent = titleInput.value;
  item_price.textContent = priceInput.value;
  item_image.textContent = imageInput.value;
};
const editItem = (button) => {
  const itemId = parseInt(button.id);
  let itemObject = items.find((item) => item.id === itemId);

  titleInput.value = itemObject.title;
  textArea.value = itemObject.description;
  priceInput.value = itemObject.price;
  imageInput.value = itemObject.image;
  typeInput.value = itemObject.type;
  artistOpenForm();
  btnAddItem.textContent = "Save new item";
  btnAddItem.removeEventListener("click", addItem);
};
const checkMark = document.getElementById("checkMark");
const classCheckMark = document.querySelector(".checkmark");
const toggleCheck = () => {
  classCheckMark.classList.toggle("active");
};
checkMark.addEventListener("click", toggleCheck);
btnCancelForm.addEventListener("click", (e) => {
  e.preventDefault();
  cancelForm();
});
btnAddNewItem.addEventListener("click", artistOpenForm);

const bidMoney = () => {
  let moneyBidVal = parseFloat(moneyBid.value);

  if (!isNaN(moneyBidVal)) {
    const currentMoneyValue = parseFloat(moneyApeared.textContent) || 0;
    const newMoneyValue = currentMoneyValue + moneyBidVal;
    moneyApeared.innerHTML = `<h2>&dollar;${newMoneyValue}</h2>`;
    artistMoneyBid.innerHTML = ` &dollar; ${newMoneyValue}`
    moneyBid.value = ""
    
  } else {
    console.log("Invalid input.");
  }
}
startBidding.addEventListener("click", bidMoney)