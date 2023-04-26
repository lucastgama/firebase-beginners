import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvUzp1-CstJYXI0xHGSgrZXt_r0hdMBfs",
  authDomain: "freecodecamp-a5346.firebaseapp.com",
  databaseURL: "https://freecodecamp-a5346-default-rtdb.firebaseio.com",
  projectId: "freecodecamp-a5346",
  storageBucket: "freecodecamp-a5346.appspot.com",
  messagingSenderId: "647976259507",
  appId: "1:647976259507:web:88a011b4cb8dcbfdddc5c6",
  measurementId: "G-VSSF1Y6MG5",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputField = document.getElementById("input-field");
const addBtn = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let listItems = Object.entries(snapshot.val());

    clearList();

    for (let i = 0; i < listItems.length; i++) {
      let currentItem = listItems[i];
      addShoppingListInDB(currentItem);
    }
  } else {
    shoppingList.innerHTML = "No shopping list";
  }
});

addBtn.addEventListener("click", function () {
  let inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
});

function clearList() {
  inputField.value = "";
  shoppingList.innerHTML = "";
}

function addShoppingListInDB(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.addEventListener("click", () => {
    let currentLocationInDatabase = ref(database, `shoppingList/${itemID}`);

    remove(currentLocationInDatabase);
  });

  newEl.textContent = itemValue;

  shoppingList.append(newEl);
}
