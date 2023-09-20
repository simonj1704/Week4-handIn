const url = "http://localhost:8080/api/";

document
  .getElementById("btn-get-all-cars")
  .addEventListener("click", getAllCars);

document
  .getElementById("btn-add-car")
  .addEventListener("click", () => addCar());

document
  .getElementById("btn-find-car")
  .addEventListener("click", () =>
    findCarById(document.getElementById("text-for-id").value)
  );

document
  .getElementById("btn-find-car2")
  .addEventListener("click", () =>
    findCarEdit(document.getElementById("text-for-id2").value)
  );

  document
  .getElementById("btn-add-car-edit")
  .addEventListener("click", () => editCar(document.getElementById("text-for-id2").value));


async function getAllCars() {
  try {
    const data = await fetch(url + "cars").then(handleHttpErrors);
    console.log(data);
    makeTableCars(data);
  } catch (err) {
    console.error(err);
  }
}


async function addCar() {
  const form = document.getElementById("carForm");
  const newCar = {
    brand: form.brand.value,
    model: form.model.value,
    pricePrDay: parseFloat(form.pricePrDay.value),
    bestDiscount: parseInt(form.bestDiscount.value),
  };

  console.log(newCar)

  const options = makeOptions("POST", newCar);
  try {
    const data = await fetch(url + "cars", options).then(handleHttpErrors);
    console.log(data);
    document.getElementById("carForm").reset();
    document.getElementById("added-car").innerText = JSON.stringify(data, null, 2);
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

 async function findCarEdit(id) {
  try {
    const data = await fetch(url + "cars/" + id).then(handleHttpErrors);
    console.log(data);
    const form = document.getElementById("edit-car");
    form.innerHTML = `<div class="row mb-3">
    <label for="brand" class="col-sm-2 col-form-label">Brand</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="brand" name="brand" value="${data.brand}">
    </div>
  </div>
  <div class="row mb-3">
    <label for="model" class="col-sm-2 col-form-label">Model</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="model" name="model" value="${data.model}">
    </div>
  </div>
  <div class="row mb-3">
    <label for="pricePrDay" class="col-sm-2 col-form-label">Price Per Day</label>
    <div class="col-sm-10">
      <input type="number" step="0.01" class="form-control" id="pricePrDay" name="pricePrDay" value="${data.pricePrDay}">
    </div>
  </div>
  <div class="row mb-3">
    <label for="bestDiscount" class="col-sm-2 col-form-label">Best Discount</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="bestDiscount" name="bestDiscount" value="${data.bestDiscount}">
    </div>
  </div>`


  } catch (err) {
    console.error(err);
  }
}

async function editCar(id) {
  const form = document.getElementById("edit-car");
  const newCar = {
    brand: form.brand.value,
    model: form.model.value,
    pricePrDay: parseFloat(form.pricePrDay.value),
    bestDiscount: parseInt(form.bestDiscount.value),
  };

  console.log(newCar)

  const options = makeOptions("PUT", newCar);
  try {
    const data = await fetch(url + "cars/" + id, options).then(handleHttpErrors);
    console.log(data);
    document.getElementById("edit-car").reset();
    document.getElementById("edited-car").innerText = JSON.stringify(data, null, 2);
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
  let cars = [];
  cars = data.map((car) => 
  `<tr><td>${car.id}</td><td>${car.brand}</td><td>${car.model}</td><td>${car.pricePrDay}</td><td>${car.bestDiscount}</td></tr>`);
  rowAsStr = cars.join("")
    tableBody.innerHTML = rowAsStr;
        console.log("I was called")
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
