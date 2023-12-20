import { handleRoute } from "./handleRoutes.js";

const chooseArtist = document.querySelector("#choose-artist");
const btnArtist = document.querySelector(".join-artist h3");
const textNavName = document.querySelector(".artist-hamb");
const API_URL = "https://jsonplaceholder.typicode.com/users";
const chooseArtistVisitList = document.querySelector("#choose-artist-visit-list");

const renderSelectionUsers = (name) => {
  chooseArtist.innerHTML += `
    <option value="${name}">${name}</option>
  `;
  chooseArtistVisitList.innerHTML += `
    <option value="${name}">${name}</option>
  `;
};

const asyncAwait = async () => {
  try {
    const response = await fetch(API_URL);
    const usersData = await response.json();
    usersData.forEach((user) => {
      renderSelectionUsers(user.name);
    });

    const savedArtist = localStorage.getItem("selectedArtist");
    if (savedArtist) {
      textNavName.innerHTML = `<h3>${savedArtist}</h3>`;
    }
  } catch (error) {
    console.error(error);
  }
};

asyncAwait();

const optionArtist = () => {
  const selectedArtist = chooseArtist.value;
  if (!selectedArtist) {
    return;
  }


  localStorage.setItem("selectedArtist", selectedArtist);

  handleRoute();
  textNavName.innerHTML = `<h3>${selectedArtist}</h3>`;
  chooseArtist.selectedIndex = 0;
  window.location.hash = "#artist-homePage";
};

btnArtist.addEventListener("click", optionArtist);
