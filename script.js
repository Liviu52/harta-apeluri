// încărcăm harta.svg în div
fetch("harta.svg")
  .then(response => response.text())
  .then(svg => {
    document.getElementById("map-container").innerHTML = svg;

    // test - colorăm o zonă după id
    let zonaMuzeu = document.getElementById("Muzeu");
    if (zonaMuzeu) {
      zonaMuzeu.style.fill = "red";
    }

    // apoi putem încărca și JSON-ul de apeluri
    fetch("https://gist.githubusercontent.com/Liviu52/638ad83c14fa3a4c9b3687c1df5bb71b/raw/64ed1273ab4e9d9e8837a4b389ae64111c340163/apeluri.json")
      .then(resp => resp.json())
      .then(data => {
        console.log("Date apeluri:", data);

        // exemplu: colorăm zonele în funcție de nr. de apeluri
        let zoneStats = {};
        for (let id in data.apeluri) {
          let apel = data.apeluri[id];
          let zona = apel.zona;
          if (!zoneStats[zona]) zoneStats[zona] = 0;
          zoneStats[zona]++;
        }

        for (let zona in zoneStats) {
          let el = document.getElementById(zona);
          if (el) {
            let count = zoneStats[zona];
            if (count > 3) el.style.fill = "red";
            else if (count > 1) el.style.fill = "orange";
            else el.style.fill = "green";
          }
        }
      });
  });
