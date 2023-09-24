import { SERVER_URL } from "../../settings.js";

export async function initAllCars() {
  console.log("In initAllCars()");

  const cars = await getCars();


    //create XSS filter on listItems
    const listItems = cars
    .map((car) => `<li>${car.brand} , ${car.model}</li>`)
    .join("");


    document.getElementById("cars").innerHTML = listItems;

}

async function getCars() {
  const cars = await fetch(SERVER_URL).then((res) => res.json());
  return cars;
}
