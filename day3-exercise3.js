const url = "http://localhost:8080/api/";

document
  .getElementById("btn-get-all-cars")
  .addEventListener("click", getAllCars);

document
  .getElementById("btn-get-all-members")
  .addEventListener("click", () => getAllMembers());

document
  .getElementById("btn-add-car")
  .addEventListener("click", () => addCar());

document
  .getElementById("btn-find-car")
  .addEventListener("click", () =>
    findCarById(document.getElementById("text-for-id").value)
  );

document
  .getElementById("btn-find-member")
  .addEventListener("click", () =>
    findMemberById(document.getElementById("text-for-id").value)
  );

document
  .getElementById("btn-find-car2")
  .addEventListener("click", () =>
    findCarById(document.getElementById("text-for-id2").value)
  );

document
  .getElementById("btn-find-member2")
  .addEventListener("click", () =>
    findMemberById(document.getElementById("text-for-id2").value)
  );

document.getElementById("btn-add-member").addEventListener("click", addMember);

function getAllCars() {
  fetch(url + "cars")
  .then(res => res.json())
    .then(data => {
        console.log(data)
        makeTableCars(data)
        })
}

async function getAllMembers() {
  try {
    const data = await fetch(url + "members").then(handleHttpErrors);
    console.log(data);
    makeTableMembers(data);
  } catch (err) {
    console.error(err);
  }
}

async function addCar() {
  const newCar = {
    brand: "Toyata",
    model: "RAV",
    pricePrDay: 500,
    bestDiscount: 25,
  };

  const options = makeOptions("POST", newCar);
  try {
    const data = await fetch(url + "cars", options).then(handleHttpErrors);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function addMember() {
  const newMember = {
    username: "test1",
    password: "test1",
    email: "memb1@a.dk",
    firstName: "Kurt",
    lastName: "Wonnegut",
    street: "Lyngbyvej 2",
    city: "Lynbby",
    zip: "2800",
  };

  const options = makeOptions("POST", newMember);
  try {
    const data = await fetch(url + "members", options).then(handleHttpErrors);
    console.log(data);
    
  } catch (err) {
    console.error(err);
  }
}

async function findCarById(id) {
  try {
    const data = await fetch(url + "cars/" + id).then(handleHttpErrors);
    console.log(data);
    document.getElementById("found-car").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error(err);
  }
}

async function findMemberById(id) {
  try {
    const data = await fetch(url + "members/" + id).then(handleHttpErrors);
    console.log(data);
    document.getElementById("found-car").innerText = 
    `Member:
    Username: ${data.username} 
    First Name: ${data.firstName} 
    Last Name: ${data.lastName}
    Email: ${data.email}`;
  } catch (err) {
    console.error(err);
  }
}

function makeTableCars(data) {
  const tableHead = document.getElementById("thead");
  tableHead.innerHTML = 
  `<tr><th>ID</th><th>Brand</th><th>Model</th>
  <th>Price pr day</th><th>Best Discount</th></tr>`;
  

  const tableBody = document.getElementById("tbody");
  const cars = data.map((car) => {
    `<tr><td>${car.id}</td><td>${car.brand}</td><td>${car.model}</td>
    <td>${car.pricePrDay}</td><td>${car.bestDiscount}</td></tr>`});
    const rowAsStr = cars.join("");
    tableBody.innerHTML = rowAsStr;
        console.log("I was called")
        console.log(cars)
        console.log(data)
        console.log(rowAsStr)
}

function makeTableMembers(data) {
    const tableHead = document.getElementById("thead");
    tableHead.innerHTML = 
    `<tr><th>ID</th><th>Username</th><th>First Name</th><th>Last Name</th>
    <th>Email</th><th>Street</th><th>City</th><th>Zip</th></tr>`;


}

async function handleHttpErrors(res) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message
      ? errorResponse.message
      : "No details provided";
    throw new Error(msg);
  }
  return res.json();
}

function makeOptions(method, body) {
  const opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    //Observe how we can add new fields to an object when needed
    opts.body = JSON.stringify(body);
  }
  return opts;
}
