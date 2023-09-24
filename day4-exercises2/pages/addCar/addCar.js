import { SERVER_URL } from "../../settings.js";
import { makeOptions } from "../../util.js";


export function initAddCar(){
    console.log("In initAddCar()")
    document.getElementById("btn-addCar").addEventListener("click", addCar);
}

async function addCar(){
    const form = document.getElementById("addCar");
    const car = {
      brand: form.brand.value,
      model: form.model.value,
      pricePrDay: parseFloat(form.pricePrDay.value),
      bestDiscount: parseInt(form.bestDiscount.value),
    };

    const options = makeOptions("POST", car)

    const newCar = await fetch(SERVER_URL, options).then(res => res.json());
    console.log(newCar);
}