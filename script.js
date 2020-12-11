const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');

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
