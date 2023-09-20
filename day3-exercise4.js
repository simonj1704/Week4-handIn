let beers = [];
getBeers();

function getBeers() {
  fetch("https://api.punkapi.com/v2/beers")
    .then((res) => res.json()) //in flow1, just do it
    .then((data) => {
      const tableRows = data.map(
        (beer) =>
          `<tr><td>${beer.name}</td><td>${beer.tagline}</td><td>${beer.abv}</td><td>${beer.ibu}</td></tr>`
      );
      const tableRowsAsString = tableRows.join("");
      document.getElementById("tbl1").innerHTML = tableRowsAsString;
      console.log(data);
      beers = data;
      console.log(beers);
    });
}

function filterBeers(filter) {
  const filterBeers = beers.filter((beer) => beer.abv > filter);
  const tableRows = filterBeers.map(
    (beer) =>
      `<tr><td>${beer.name}</td><td>${beer.tagline}</td><td>${beer.abv}</td><td>${beer.ibu}</td></tr>`
  );
  const tableRowsAsString = tableRows.join("");
  document.getElementById("tbl1").innerHTML = tableRowsAsString;
}

document
  .getElementById("abv-btn")
  .addEventListener("click", () =>
    filterBeers(document.getElementById("filter-abv").value)
  );
