const input = document.querySelector(".input-value");
const button = document.querySelector(".confirm");
const grid = document.querySelector(".grid");
let rijec;

function reverse(s) {
  return s.split("").reverse().join("");
}

function kreirajTabelu(matrix) {
  grid.innerHTML = "";
  let width = matrix[0].length;
  let height = matrix.length;
  grid.style.setProperty(
    "grid-template-columns",
    "repeat(" + width + ", 52px)"
  );
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      //console.log(matrix[i][j]);
      let tempString = "";
      if (j == width - 1 || i == 8)
        tempString = `<div class="gridelement" style="font-weight:bold;font-size:22px;color:#A4243B;">${matrix[i][j]}</div>`;
      else tempString = `<div class="gridelement">${matrix[i][j]}</div>`;
      grid.insertAdjacentHTML("beforeend", tempString);
    }
  }
}

function createMatrix(duzinaRijeci, rijec) {
  let matrix = [
    ["bit"],
    ["0"],
    ["1"],
    ["2"],
    ["3"],
    ["4"],
    ["5"],
    ["6"],
    ["TRC"],
  ];
  let kodne_rijeci = [];
  for (let i = 0; i < duzinaRijeci; i++) {
    let trenutno_slovo = rijec[i].charCodeAt(0).toString(2);
    trenutno_slovo = reverse(trenutno_slovo);
    trenutno_slovo = rijec[i].toString() + trenutno_slovo;
    suma = 0;
    for (let i = 1; i < 8; i++) {
      suma = suma + Number(trenutno_slovo[i]);
    }
    if (suma % 2 == 0) {
      trenutno_slovo = trenutno_slovo + "0";
    } else {
      trenutno_slovo = trenutno_slovo + "1";
    }
    kodne_rijeci.push(trenutno_slovo);
  }
  //console.log(kodne_rijeci);
  //pushanje kodova vertikalno
  for (let j = 0; j < 9; j++) {
    for (let i = 0; i < duzinaRijeci; i++) {
      matrix[j].push(kodne_rijeci[i][j]);
    }
  }
  //dodavanje zadnjeg vertikalnog niza
  for (let i = 0; i < 9; i++) {
    if (i == 0) {
      matrix[i].push("LRC");
    } else {
      suma = 0;
      for (let j = 1; j < duzinaRijeci + 1; j++) {
        suma = suma + Number(matrix[i][j]);
        console.log(suma);
      }
      if (suma % 2 == 0) {
        matrix[i].push("0");
      } else {
        matrix[i].push("1");
      }
    }
  }
  //console.log(matrix);
  return matrix;
}

button.addEventListener("click", () => {
  rijec = input.value;
  let finalMatrix = createMatrix(rijec.length, rijec);
  kreirajTabelu(finalMatrix);
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    rijec = input.value;
    let finalMatrix = createMatrix(rijec.length, rijec);
    kreirajTabelu(finalMatrix);
  }
});
