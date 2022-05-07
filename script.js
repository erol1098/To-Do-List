"use strict";

const textbox = document.querySelector("#input");
const addBtn = document.querySelector("#btn");
const list = document.querySelector(".to-do-list");
const done = document.querySelector(".done");
const listItem = document.querySelector(".list-item");
const del = document.querySelectorAll(".delete");

// Storing Counter
let counter;
localStorage.getItem("counter")
  ? (counter = localStorage.getItem("counter"))
  : (counter = 0);

// Reading from localStorage
Object.keys(localStorage)
  .filter((key) => key !== "counter")
  .forEach((key) => {
    const savedItems = document.createElement("div");
    savedItems.innerHTML = `
    <button class="done hide">✓</button><p class="text">${localStorage.getItem(
      key
    )}</p>
    <button class="delete">✕</button>`;
    savedItems.setAttribute("data-id", key);
    list.append(savedItems);
    savedItems.classList.add("list-item");
  });

list.addEventListener("click", (e) => {
  const parent = e.target.parentElement;
  if (e.target.classList.contains("delete")) {
    localStorage.removeItem(parent.dataset.id);
    parent.remove();
  } else {
    const parent = e.target.closest(".list-item");
    parent.classList.toggle("display-row");
    parent.querySelector(".text").classList.toggle("display-text");
    parent.querySelector(".done").classList.toggle("hide");
  }
});

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (textbox.value === "" || textbox.value.trim() === "") {
    textbox.value = "";
    window.alert("🛑 Invalid Entry.");
  } else {
    const listItem = document.createElement("div");
    listItem.innerHTML = `
  <button class="done hide">✓</button><p class="text">${textbox.value}</p>
  <button class="delete">✕</button>`;
    list.append(listItem);

    localStorage.setItem(
      `toDo${++counter} ${new Date().toLocaleDateString()}`,
      textbox.value
    );
    textbox.value = "";

    listItem.setAttribute(
      "data-id",
      `toDo${counter} ${new Date().toLocaleDateString()}`
    );
    listItem.classList.add("list-item");
  }
  localStorage.setItem("counter", counter);
});
