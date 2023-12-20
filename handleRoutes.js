
// ROUTING PAGES
import {populateContentPage} from "./artist_home_page.js"
const landPage = document.querySelector("#land-page");
const visitorPage = document.querySelector("#visitor-page");
const visitorListingPage = document.querySelector("#visit-list-section");
const artistHomePage = document.querySelector("#artist-homePage");
const artistItemsPage = document.querySelector("#artist-items-page");
const auctionPage = document.querySelector("#auctionPage");
const btnVisitListItem = document.querySelector("#find-btn");
const artistSnapShot = document.querySelector("#artist-snap-shot")
// BUTTON SELECTORS
const navVisitorBar = document.querySelector(".nav-bar");
const artistNavBar = document.querySelector(".artist-navBar");
const visitorsFilter = document.querySelector(".visitors-filter")

export const handleRoute = () => {
  landPage.style.display = "none";
  visitorPage.style.display = "none";
  navVisitorBar.style.display = "none";
  visitorListingPage.style.display = "none";
  artistHomePage.style.display = "none";
  artistItemsPage.style.display = "none";
  auctionPage.style.display = "none";
  artistNavBar.style.display = "none";
  visitorsFilter.style.display = "none"
  artistSnapShot.style.display = "none"
  const hash = location.hash;
  if (hash.includes("#visitor-page")) {
    // Show the visitor page
    visitorPage.style.display = "block";
    navVisitorBar.style.display = "flex";
  } else if (hash.includes("#visit-list-section")) {
    // Show the visitor listing page
    visitorListingPage.style.display = "block";
    navVisitorBar.style.display = "flex";
    visitorsFilter.style.display = "block"
  } else if (hash.includes("#artist-homePage")) {
    populateContentPage()
    artistHomePage.style.display = "block";
    artistNavBar.style.display = "flex";
  } else if (hash.includes("#artist-items-page")) {
    // Show the artist items page
    artistItemsPage.style.display = "block";
    artistNavBar.style.display = "flex";
  } else if (hash.includes("#auctionPage")) {
    auctionPage.style.display = "flex";
    navVisitorBar.style.display = "flex";
  } else if(hash.includes("artist-snap-shot")) {
    artistNavBar.style.display = "flex";
    artistSnapShot.style.display = "flex"
  } else {
    // Default Route: Show the land page
    landPage.style.display = "flex";
  }
};

btnVisitListItem.addEventListener("click", () => {
  window.location.hash = "#visit-list-section";
});
// load and hashchange events to handle the routes
window.addEventListener("load", handleRoute);
window.addEventListener("hashchange", handleRoute);

