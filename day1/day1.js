//Observe: no return type, no type on parameters
function add(n1, n2) {
    return n1 + n2;
  }
  
  const sub = function (n1, n2) {
    return n1 - n2;
  };
  
  const cb = function (n1, n2, callback) {
    try {
      typeof n1 === "number"; //Will fail if n1 is undefined, or is not a number
      typeof callback === "function"; //Will fail if callback is undefined or is not a function
      return (
        "Result from the two numbers: " + n1 + "+" + n2 + "=" + callback(n1, n2)
      );
    } catch (e) {
      if (e instanceof TypeError) {
        console.log("TypeError: " + e.message);
      } else if (e instanceof ReferenceError) {
        console.log("ReferenceError: " + e.message);
      } else {
        console.error(e.name + ": " + e.message);
      }
    }
  };
  
  function addVersion2(n1, n2, ...rest) {
    return n1 + n2 + rest.reduce((acc, cur) => acc + cur);
  }
  
  function mul(n1, n2) {
    return n1 * n2;
  }
  
  //1.
  console.log(add(1, 2)); // What will this print? 3
  
  //2
  console.log(add); // What will it print and what does add represent? [Function: add] - it represents the function add
  
  //3
  console.log(add(1, 2, 5)); // What will it print - and why? 3 - it only takes the first two parameters
  
  //4
  console.log(add(1)); // What will it print - and why? NaN - it only takes the first two parameters
  
  //5
  console.log(cb(3, 3, add)); // What will it print - and why? Result from the two numbers: 3+3=6 - it calls the function cb with the parameters 3,3 and the function add
  
  //6
  console.log(cb(4, 3, sub)); // What will it print - and why? Result from the two numbers: 4+3=1 - it calls the function cb with the parameters 4,3 and the function sub
  
  //7
  console.log(cb(3, 3, add())); // What will it print - and why? NaN - it calls the function cb with the parameters 3,3 and the function add() which is undefined error
  
  //8
  console.log(cb(3, "hh", add)); // What will it print - and why? Result from the two numbers: 3+hh=3hh - it calls the function cb with the parameters 3,"hh" and the function add
  
  //9
  console.log(addVersion2(1, 2, 3, 4, "H", 6));
  
  //10
  console.log(cb(3, 3, mul)); // What will it print - and why? Result from the two numbers: 3+3=9 - it calls the function cb with the parameters 3,3 and the function mul
  
  //11
  console.log(
    cb(4, 2, function (n1, n2) {
      return n1 / n2;
    })
  );
  
  
  //Callbacks (with map, filter and forEach)
  //1
  const names = ["Lars", "Jan", "Peter", "Bo", "Frederik"];
  
  names.filter((name) => name.length <= 3).forEach((name) => console.log(name));
  
  //2
  names.map((name) => name.toUpperCase()).forEach((name) => console.log(name));
  
  //3
  function htmlList(arr) {
      return '<ul><li>' + arr.join('</li><li>') + '</li></ul>';
  }
  
  
  console.log(htmlList(names));
  
  //4
  const cars = [
      { id: 1, year: 1997, make: 'Ford', model: 'E350', price: 3000 },
      { id: 2, year: 1999, make: 'Chevy', model: 'Venture', price: 4900 },
      { id: 3, year: 2000, make: 'Chevy', model: 'Venture', price: 5000 },
      { id: 4, year: 1996, make: 'Jeep', model: 'Grand Cherokee', price: 4799 },
      { id: 5, year: 2005, make: 'Volvo', model: 'V70', price: 44799 }
    ];
  
  cars.filter((car) => car.year > 1999).forEach((car) => console.log(car));
  
  cars.filter((car) => car.make === 'Volvo').forEach((car) => console.log(car));
  
  cars.filter((car) => car.price < 5000).forEach((car) => console.log(car));
    
  const sqlInsert = cars.map((car) => `INSERT INTO cars (id,year,make,model,price) VALUES (${car.id},${car.year},'${car.make}','${car.model}',${car.price});`).join('\n');
  
  
  //My own functions
  
  function myFilter(array, callback){
      const newArray = [];
      
      for (arrayElement of array) {
          if(callback(arrayElement)){
             newArray.push(arrayElement);
          }
      }
      return newArray;
  }
  
  console.log(myFilter(names, (name) => name.length <= 3));
  
  
  function myMap(array, callback){
      const newArray = [];
      
      for (arrayElement of array) {
          newArray.push(callback(arrayElement));
      }
      return newArray;
  }
  
  console.log(myMap(names, (name) => name.toUpperCase()));
  
  //Asynchronous Callbacks
  /*const msgPrinter = function(msg,delay){
    setTimeout(() => console.log(msg),delay); //Observe an arrow-function
  };
  console.log("aaaaaaaaaa");
  msgPrinter ("bbbbbbbbbb",2000);
  console.log("dddddddddd");
  msgPrinter ("eeeeeeeeee",1000);
  console.log("ffffffffff");*/
  
  
  const person = {
      name: "Kurt Wonnegut",
      age: 98,
      Hobby: "Writing",
      email: "123@123"
  }
  
  for(prop in person){
    console.log(prop,person[prop])
  }
  
  delete person.age;
  
  for(prop in person){
    console.log(prop,person[prop])
  }
  
  person.street = "Lyngbyvej"
  
  for(prop in person){
    console.log(prop,person[prop])
  }
  
  //Closure
  //ShowStart
  var makeCounter = function() {
    var privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function() {changeBy(1);},
      decrement: function() {changeBy(-1);},
      value: function() { return privateCounter;}
    }
  };
  var counter1 = makeCounter();
  var counter2 = makeCounter();
  //counter1.increment();
  //counter1.increment();
  //lert(counter1.value()); /* Alerts 2 */
  //ShowEnd
  /**##**/
  