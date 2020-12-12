const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

fetchUser();
fetchUser();
fetchUser();

// Fetch random user and add money
async function fetchUser() {
  let response = await fetch('https://randomuser.me/api');
  let data = await response.json();
  let { results: [user] } = data;

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addUser(newUser);
}

// Double eveyones money
function doubleMoney() {
  data = data.map(item => {
    return { ...item, money: item.money * 2}
  });

  updateDom();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(item => item.money > 1000000);

  updateDom();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDom();
}

// Calculate the total wealth
function calculateWealth() {
  const total = data.reduce((sum, item) => (sum += item.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addUser(newUser) {
  data.push(newUser);

  updateDom();
}

// Update DOM
function updateDom(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    let element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });

}

// Format number as money
function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listners
addUserBtn.addEventListener('click', fetchUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);