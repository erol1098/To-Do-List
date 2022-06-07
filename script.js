"use strict";

const textbox = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const list = document.querySelector(".to-do-list");
const done = document.querySelector(".done");
const listItem = document.querySelector(".list-item");
const del = document.querySelectorAll(".del");
const quote = document.querySelector("q");
const progressBar = document.querySelector(".progress-grp");
let completed = 0;
const quotes = [
  `A man who does not plan long ahead will find trouble at his door. – Confucius`,

  `I ain’t Martin Luther King. I don’t need a dream. I have a plan. -
Spike Lee`,
  `By Failing to prepare, you are preparing to fail. – Benjamin Franklin`,
  `If you don’t know where you are going, you’ll end up someplace else. – Yogi Berra`,
  `The time to repair the roof is when the sun is shining. – John F. Kennedy`,
  `Always plan ahead. It wasn’t raining when Noah built the ark. – Richard Cushing`,
];

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
  savedItems.innerHTML = `
  <button class="done col-1 btn border-0 py-3 invisible"></button>
  <p class=" col-10 border-0 ">${localStorage.getItem(key)}</p>
  <button class="del col-1 btn border-0  py-3" type="button"></button>`;
  savedItems.setAttribute("data-id", key);
  savedItems.classList.add("list-item", "row", "input-group", "mb-3");
  list.append(savedItems);
});

const progress = function () {
  readDone();
  const total = localStorage.length;
  total === 0
    ? progressBar.classList.add("invisible")
    : progressBar.classList.remove("invisible");
  document.querySelector(".progress-bar").style.width = `${
    (completed / total) * 100
  }%`;
  document.querySelector(
    ".progress-title"
  ).textContent = `${completed} out of ${total} tasks completed`;
};

const readDone = function () {
  completed = 0;
  document
    .querySelectorAll(".list-item")
    .forEach((item) => item.hasAttribute("data-done") && completed++);
};
addBtn.addEventListener("click", function (e) {
  if (textbox.value === "" || textbox.value.trim() === "") {
    textbox.value = "";
    window.alert("🛑 Invalid Entry.");
  } else {
    const key = generateKey();
    const listItem = document.createElement("section");
    listItem.innerHTML = `
    <button class="done col-1 btn border-0 py-2 invisible"></button>
    <p class=" col-10 border-0">${textbox.value}</p>
    <button class="del col-1 btn border-0  py-2" type="button"></button>`;

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
      parent.removeAttribute("data-done");
    } else {
      parent.setAttribute("data-done", "done");
    }

    progress();
  }
});
progress();

quote.textContent =
  quotes[[Math.floor(Math.random() * quotes.length)]].toUpperCase();
