"use strict";
//* For fixing older version of Netlify
localStorage.removeItem("counter");
Object.keys(localStorage)
  .filter((key) => key !== "todo-list1098")
  .forEach((key) => localStorage.removeItem(key));

const textbox = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const list = document.querySelector(".to-do-list");
const done = document.querySelector(".done");
const listItem = document.querySelector(".list-item");
const del = document.querySelectorAll(".del");
const quote = document.querySelector("q");
const progressBar = document.querySelector(".progress-grp");
const quotes = [
  `A man who does not plan long ahead will find trouble at his door. – Confucius`,
  `I ain’t Martin Luther King. I don’t need a dream. I have a plan. -
Spike Lee`,
  `By Failing to prepare, you are preparing to fail. – Benjamin Franklin`,
  `If you don’t know where you are going, you’ll end up someplace else. – Yogi Berra`,
  `The time to repair the roof is when the sun is shining. – John F. Kennedy`,
  `Always plan ahead. It wasn’t raining when Noah built the ark. – Richard Cushing`,
  `A goal without a plan is just a wish. - Antoine de Saint-Exupéry`,
  `Plans are of little importance, but planning is essential. - Winston Churchill`,
  `Plans are nothing; planning is everything. - Dwight D. Eisenhower`,
  `Good fortune is what happens when opportunity meets with planning. - Thomas Edison`,
];

//* Create Key
const generateKey = function () {
  // Create current date and time
  const options = {
    fractionalSecondDigits: 3,
    second: "numeric",
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("TR", options).format(new Date());
};
const progress = function () {
  const total = JSON.parse(localStorage.getItem("todo-list1098")).length;
  const completed = JSON.parse(localStorage.getItem("todo-list1098")).filter(
    (item) => item.isDone === true
  ).length;

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

const successAnimation = function () {
  if (JSON.parse(localStorage.getItem("todo-list1098")).length === 0) {
    document.querySelector(".success-gif").classList.remove("d-none");
    document.querySelector(".success-control").classList.add("d-none");
  }
};
window.onload = function () {
  !localStorage.getItem("todo-list1098") &&
    localStorage.setItem("todo-list1098", "[]");
  //* Reading from localStorage
  JSON.parse(localStorage.getItem("todo-list1098")).forEach((item) => {
    const key = item.id;
    const entry = item.entry;
    const isDone = item.isDone;
    const savedItems = document.createElement("section");

    if (isDone) {
      savedItems.innerHTML = `
          <button class="done col-1 btn border-0 py-3"></button>
          <p class="line col-10 border-0 text-decoration-line-through gray">${entry}</p>
          <button class="del col-1 btn border-0 py-3" type="button"></button>`;
      savedItems.setAttribute("data-done", "done");
    } else {
      savedItems.innerHTML = `
          <button class="done col-1 btn border-0 py-3 invisible"></button>
          <p class="line col-10 border-0 ">${entry}</p>
          <button class="del col-1 btn border-0  py-3" type="button"></button>`;
    }
    savedItems.setAttribute("data-id", key);
    savedItems.classList.add("list-item", "row", "input-group", "mb-3");
    list.append(savedItems);
  });
  textbox.focus();
  progress();
  quote.textContent =
    quotes[[Math.floor(Math.random() * quotes.length)]].toUpperCase();
};

const addItem = function () {
  if (textbox.value === "" || textbox.value.trim() === "") {
    textbox.value = "";
    window.alert("🛑 Invalid Entry.");
  } else {
    const key = generateKey();
    const listItem = document.createElement("section");
    listItem.innerHTML = `
    <button class="done col-1 btn border-0 py-2 invisible"></button>
    <p class="line col-10 border-0">${textbox.value}</p>
    <button class="del col-1 btn border-0  py-2" type="button"></button>`;

    if (!localStorage.getItem("todo-list1098")) {
      localStorage.setItem(
        "todo-list1098",
        JSON.stringify([{ id: key, entry: textbox.value, isDone: false }])
      );
    } else {
      const tempRecord = JSON.parse(localStorage.getItem("todo-list1098"));
      tempRecord.push({
        id: key,
        entry: textbox.value,
        isDone: false,
      });
      localStorage.setItem("todo-list1098", JSON.stringify(tempRecord));
    }
    textbox.value = "";
    listItem.setAttribute("data-id", key);
    listItem.classList.add("list-item", "row", "input-group", "mb-3");
    list.append(listItem);
    progress();
  }
};

addBtn.onclick = () => addItem();
// textbox.onkeydown = (e) => {
//   setTimeout(() => (e.key === "Enter" ? addItem() : null), 501);
// };
textbox.onkeydown = (e) => (e.key === "Enter" ? addItem() : null);
list.addEventListener("click", (e) => {
  //* Delete Row
  const parent = e.target.closest(".list-item");
  if (e.target.classList.contains("del")) {
    const tempRecord = JSON.parse(localStorage.getItem("todo-list1098")).filter(
      (item) => item.id !== parent.dataset.id
    );
    localStorage.setItem("todo-list1098", JSON.stringify(tempRecord));
    parent.remove();
    progress();
    successAnimation();
  }
  //* Done and saving done to local storage
  else if (e.target.classList.contains("line")) {
    let tempRecord = JSON.parse(localStorage.getItem("todo-list1098"));
    let item = tempRecord.filter((item) => item.id === parent.dataset.id);
    let currentRecord = tempRecord.filter(
      (item) => item.id !== parent.dataset.id
    );

    e.target.classList.toggle("text-decoration-line-through");
    e.target.classList.toggle("gray");
    parent.querySelector(".done").classList.toggle("invisible");
    if (parent.querySelector(".done").classList.contains("invisible")) {
      parent.removeAttribute("data-done");
      item[0].isDone = false;
    } else {
      parent.setAttribute("data-done", "done");
      item[0].isDone = true;
    }
    currentRecord.push(item[0]);
    localStorage.setItem("todo-list1098", JSON.stringify(currentRecord));
    progress();
  }
});

textbox.onclick = function () {
  textbox.value = "";
  document.querySelector(".success-gif").classList.add("d-none");
  document.querySelector(".success-control").classList.remove("d-none");
};
