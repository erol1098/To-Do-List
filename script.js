"use strict";

const textbox = document.querySelector("#input");
const addBtn = document.querySelector("#btn");
const list = document.querySelector(".to-do-list");
const done = document.querySelector(".done");
const listItem = document.querySelector(".list-item");
const del = document.querySelectorAll(".delete");
let counter = 0;
list.addEventListener("click", (e) => {
  const target = e.target;
  const parent = target.parentElement;
  if (e.target.classList.contains("delete")) {
    parent.remove();
  } else {
    const parent = target.closest(".list-item");
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
    listItem.classList.add("list-item");
  }
});
