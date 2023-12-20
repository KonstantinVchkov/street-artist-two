import { handleRoute } from "./handleRoutes.js";
import { items } from "./data.js";
const btnMenu = document.querySelector(".ham-img img");
const menuContainer = document.querySelector(".hamburger-menu");
const btnLogoArtist = document.querySelector(".artist-logo");
const totalItemsSold = document.querySelector(".items-sold");
const totalItems = document.querySelector(".total-items");
const incomeArtist = document.querySelector(".income");
const downBoxLiveAuction = document.querySelector(".down-box");
const chartCanvas = document.querySelector("#myChart");
const sevenDays = document.querySelector(".seven-days");
const fourteenDays = document.querySelector(".fourteen-days");
const thirtyDays = document.querySelector(".thirty-days");
const priceOfItem = document.querySelector(".money")
export const populateContentPage = () => {
  const savedArtist = localStorage.getItem("selectedArtist");
  const itemsByArtist = items.filter((item) => item.artist === savedArtist);
  const itemsSoldByArtist = itemsByArtist.filter((soldItem) =>
    Boolean(soldItem.dateSold)
  );
  const itemsIncomeByArtist = itemsByArtist.reduce(
    (accumulator, currentValue) => accumulator + currentValue.priceSold,
    0
  );

  incomeArtist.innerHTML = `&dollar;${itemsIncomeByArtist}`;
  priceOfItem.innerHTML = "";
   itemsByArtist.forEach(itemPrice => {
    priceOfItem.textContent= itemPrice.price

  })
  totalItemsSold.innerHTML = itemsSoldByArtist.length;
  totalItems.innerHTML = itemsByArtist.length;

  sevenDays.addEventListener("click", () => {
    generateAndDisplayChart(itemsSoldByArtist, 7);
    sevenDays.style.backgroundColor = "#D44C2E"
    thirtyDays.style.backgroundColor = "#A16A5E"
    fourteenDays.style.backgroundColor = "#A16A5E"

  });

  fourteenDays.addEventListener("click", () => {
    generateAndDisplayChart(itemsSoldByArtist, 14);
    fourteenDays.style.backgroundColor = "#D44C2E"
    sevenDays.style.backgroundColor = "#A16A5E"
    thirtyDays.style.backgroundColor = "#A16A5E"
  });

  thirtyDays.addEventListener("click", () => {
    generateAndDisplayChart(itemsSoldByArtist, 30);
    thirtyDays.style.backgroundColor = "#D44C2E"
    fourteenDays.style.backgroundColor = "#A16A5E"
    sevenDays.style.backgroundColor = "#A16A5E"
    

  });
  generateAndDisplayChart(itemsSoldByArtist, 7);
};

const generateAndDisplayChart = (itemsSold, daysAgo) => {
  const labels = generateDateLabels(daysAgo);

  if (chartCanvas.chart) {
    chartCanvas.chart.destroy();
  }

  const chartData = labels.map((label) => {
    let sum = 0;

    itemsSold.forEach((soldItem) => {
      const soldItemDateFormatted = formatDate(soldItem.dateSold);

      if (label === soldItemDateFormatted) {
        sum += soldItem.priceSold;
      }
    });

    return sum;
  });

  const drawnChart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Amount",
          data: chartData,
          borderColor: "#A16A5E",
          backgroundColor: "#A16A5E",
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });

  chartCanvas.chart = drawnChart;

  drawnChart.update();
};

const formatDate = (dateNumber) => {
  const date = new Date(dateNumber);
  return date.toLocaleDateString("en-gb");
};

const generateDateLabels = (daysAgo) => {
  const arr = [];

  for (let i = 0; i < daysAgo; i++) {
    const now = new Date();
    const startDate = now.getDate();
    const relevantDate = now.setDate(startDate - i);
    const formattedDate = formatDate(relevantDate);
    arr.push(formattedDate);
  }

  return arr;
};
const navigateTo = (hash) => {
  handleRoute();
  window.location.hash = hash;
  menuContainer.classList.remove("active");
};
const navigationButtons = [
  { element: document.querySelector(".home"), hash: "#artist-homePage" },
  {
    element: document.querySelector(".items-artist"),
    hash: "#artist-items-page",
  },
  { element: document.querySelector(".auction"), hash: "#auctionPage" },
];

navigationButtons.forEach((button) => {
  button.element.addEventListener("click", () => navigateTo(button.hash));
});

btnLogoArtist.addEventListener("click", () => {
  navigateTo("");
  handleRoute();
});

downBoxLiveAuction.addEventListener("click", () => {
  handleRoute();
  window.location.hash = "#auctionPage";
});

btnMenu.addEventListener("click", () => {
  menuContainer.classList.toggle("active");
});
