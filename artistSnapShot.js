import { handleRoute } from "./handleRoutes.js";
import { items } from "./data.js";

const btnSnapCam = document.querySelector(".snapshot");
const liveStreamVideo = document.querySelector("#liveStream");
const captureStreamCanvas = document.querySelector("#captureStream");
const captureImageBtn = document.querySelector("#captureImageButton");
const capturedImageImg = document.querySelector("#capturedImage");


const initializeCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
      },
    });
    liveStreamVideo.srcObject = stream;
  } catch (err) {
    console.log(err);
  }
};

const captureImage = () => {
  if (isImageCaptured) {
    return;
  }

  const snapShotForm = document.querySelector(".snapshot");
  const cameraIcon = document.querySelector(".camera-icon");
  cameraIcon.style.display = "none";
  isImageCaptured = true;

  const ctx = captureStreamCanvas.getContext("2d");
  ctx.drawImage(liveStreamVideo, 0, 0);

  const binaryImage = captureStreamCanvas.toDataURL("image/png");
  capturedImageImg.src = binaryImage;
  captureStreamCanvas.style.display = "none";
  liveStreamVideo.style.display = "none";

  const newImg = {
    image: capturedImageImg,
  };
  items.push(newImg.image);
  handleRoute();
  window.location.hash = "#artist-items-page";
  snapShotForm.append(capturedImageImg);
};

const resetImage = () => {
  isImageCaptured = false;
  capturedImageImg.src = "";
  captureStreamCanvas.style.display = "none";
  liveStreamVideo.style.display = "block";
  captureImageBtn.style.display = "block";
  handleRoute();
  window.location.hash = "#artist-snap-shot";
};

let isImageCaptured = false;

const populateContentArtistSnapshotPage = () => {
  liveStreamVideo.addEventListener("canplay", () => {
    captureStreamCanvas.width = liveStreamVideo.videoWidth;
    captureStreamCanvas.height = liveStreamVideo.videoHeight;
  });

  captureImageBtn.addEventListener("click", captureImage);
  capturedImageImg.addEventListener("click", resetImage);
};

populateContentArtistSnapshotPage();

btnSnapCam.addEventListener("click", () => {
  handleRoute();
  window.location.hash = "#artist-snap-shot";
  initializeCamera();
});


