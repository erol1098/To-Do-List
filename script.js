"use strict";

const textbox = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const list = document.querySelector(".to-do-list");
const done = document.querySelector(".done");
const listItem = document.querySelector(".list-item");
const del = document.querySelectorAll(".del");
let completed = 0;

//* Create Key
const generateKey = function () {
  // Create current date and time
  const now = new Date();
  const options = {
    second: "numeric",
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("TR", options).format(now);
};

// Reading from localStorage
Object.keys(localStorage).forEach((key) => {
  const savedItems = document.createElement("section");
  savedItems.innerHTML = `<button class="done col-1 btn border-0 py-3 invisible"></button>
  <p class=" col-10 border-0 text-center">${localStorage.getItem(key)}</p>
  <button
    class="del col-1 btn border-0  py-3"
    type="button"
    
  >
     
  </button>`;

  savedItems.setAttribute("data-id", key);
  savedItems.classList.add(
    "list-item",
    "row",
    "input-group",
    "mb-3",
    "justify-content-center"
  );
  list.append(savedItems);
});

const progress = function () {
  const total = localStorage.length;
  document.querySelector(".progress-bar").style.width = `${
    (completed / total) * 100
  }%`;
  document.querySelector(
    ".progress-title"
  ).textContent = `${completed} out of ${total} tasks completed`;
};

progress();
addBtn.addEventListener("click", function (e) {
  if (textbox.value === "" || textbox.value.trim() === "") {
    textbox.value = "";
    window.alert("🛑 Invalid Entry.");
  } else {
    const key = generateKey();
    const listItem = document.createElement("section");
    listItem.innerHTML = `<button class="done col-1 btn border-0 py-3 invisible"></button>
  <p class=" col-10 border-0 text-center">${textbox.value}</p>
  <button
    class="del col-1 btn border-0  py-3"
    type="button"
   
  >
     
  </button>`;

    localStorage.setItem(key, textbox.value);
    textbox.value = "";
    listItem.setAttribute("data-id", key);
    listItem.classList.add("list-item", "row", "input-group", "mb-3");
    list.append(listItem);
    progress();
  }
});
list.addEventListener("click", (e) => {
  const parent = e.target.closest(".list-item");
  if (e.target.classList.contains("del")) {
    localStorage.removeItem(parent.dataset.id);
    parent.remove();
    progress();
  } else {
    e.target.classList.toggle("text-decoration-line-through");
    parent.querySelector(".done").classList.toggle("invisible");
    if (parent.querySelector(".done").classList.contains("invisible")) {
      completed--;
    } else {
      completed++;
    }

    progress();
  }
});
progress();
