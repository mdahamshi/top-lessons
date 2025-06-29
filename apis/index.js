import { giphApi } from "./giphy.api.js";

function initDom() {
  const img = document.querySelector("img");
  const input = document.getElementById("search");
  const btn = document.getElementById("searchBtn");
  const message = document.getElementById("message");
  return { img, input, btn, message };
}

const comp = initDom();

comp.btn.addEventListener("click", async () => {
  const input = comp.input;
  const search = input.value.trim();
  if (!search) {
    showMessage("Please enter a search term.");
    return;
  }

  // Disable button and show loading
  comp.btn.disabled = true;
  comp.btn.textContent = "Searching...";
  try {
    const data = await getData({
      url: `https://api.giphy.com/v1/gifs/translate?api_key=${giphApi}&s=${encodeURIComponent(
        search
      )}`,
      opt: { mode: "cors" },
    });

    if (!data || !data.images) {
      showMessage("No gif found. Try something else.");
      comp.img.src = "https://via.placeholder.com/300x200?text=No+GIF+Found"; // Default image
      return;
    } else {
      comp.img.src = data.images.original.url;
      showMessage("");
    }
  } catch (error) {
    showMessage("An error occurred while fetching GIF.");
    console.error("Fetch error:", error);
  } 
});
comp.img.onload = () => {
  comp.btn.disabled = false;
  comp.btn.textContent = "Search";
};

comp.img.onerror = () => {
  showMessage("Failed to load image.");
  comp.btn.disabled = false;
  comp.btn.textContent = "Search";
};
function showMessage(msg) {
  comp.message.textContent = msg;
}

async function getData(req) {
  const url = req.url;
  try {
    const response = await fetch(url, req.opt);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json.data;
  } catch (error) {
    console.error(error.message);
  }
}
