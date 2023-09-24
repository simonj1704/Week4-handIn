import { SERVER_URL } from "../../settings.js"
import { makeOptions } from "../../util.js";


export function initEditCar(){
    console.log("In initEditCar()")
    document.getElementById("btn-findCar").addEventListener("click", makeForm);
}

async function editCar(){
    const id = document.getElementById("car-id").value;
    const form = document.getElementById("editCar");
    const car = {
        brand: form.brand.value,
        model: form.model.value,
        pricePrDay: parseFloat(form.pricePrDay.value),
        bestDiscount: parseInt(form.bestDiscount.value),
        id: parseInt(id)
    };

    const options = makeOptions("PUT", car)

    const newCar = await fetch(SERVER_URL + "/" + id, options).then(res => res.json());
    console.log(newCar);
}

async function makeForm(){
    const data = await getCar();
    const car = {
        brand: data.brand,
        model: data.model,
        pricePrDay: data.pricePrDay,
        bestDiscount: data.bestDiscount
    }
    console.log(car)
    document.getElementById("result").innerHTML = 
    `<br><form id="editCar">
    <input type="text" name="brand" value="${data.brand}"><br>
    <input type="text" name="model" value="${car.model}"><br>
    <input type="number" name="pricePrDay" value="${car.pricePrDay}"><br>
    <input type="number" name="bestDiscount" value="${car.bestDiscount}"><br>
    </form>
    <button id="btn-editCar">Edit Car</button>`

    document.getElementById("btn-editCar").addEventListener("click", editCar);

}

async function getCar(){
    document.getElementById("error").innerText = "";

    const id = document.getElementById("car-id").value;

    try{
        const data =  await fetch(SERVER_URL + "/" + id).then(handleHttpErrors);
        console.log(data);
            return data

        
    } catch(error){
        document.getElementById("result").innerText = "";
        document.getElementById("error").innerText = error.message;
    }
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
