// Botones de la pagina
let botonComenzar = document.querySelector("#boton-comenzar");
let adicionarPalabra = document.querySelector("#adicionar-palabra");
let guardar = document.querySelector("#guardar");
let cancelar = document.querySelector("#cancelar");
let nuevoJuego = document.querySelector("#nuevo-juego");
let desistir = document.querySelector("#desistir");

// Secciones del juego
let inicio = document.querySelector("#inicio");
let addPalabra = document.querySelector("#add-palabra");
let juego = document.querySelector("#juego");
let footer = document.querySelector("footer");

let listaDePalabras = [
  'ALURA',
  'AHORCADO', 
  'ORACLE', 
  'HTML', 
  'CSS', 
  'JAVASCRIPT'
];

let palabra = document.querySelector("#palabra");
let tablero = document.querySelector("canvas");
let pincel = ahorcado.getContext("2d");
let contador = 0;
let flag = false;
let palabraJuego;
let contadorLetraError = 0;
let listadoLetras = [];
let palabraEnJuego = [];
let esGanador = false;

botonComenzar.addEventListener("click", () => {
  inicio.classList.add("transparente");
  juego.classList.remove("transparente");
  footer.classList.add("footer");
  comenzarJuego();
  flag = true;
});

adicionarPalabra.addEventListener("click", () => {
  inicio.classList.add("transparente");
  addPalabra.classList.remove("transparente");
  flag = false;
});

guardar.addEventListener("click", () => {
  
  if(!(palabra.value.length > 8)) {
    if(compararPalabra(palabra.value.toUpperCase())) {
      listaDePalabras.push(palabra.value.toUpperCase());
      addPalabra.classList.add("transparente");
      juego.classList.remove("transparente");
      footer.classList.add("footer");
      comenzarJuego();
      flag = true;
    }
  } else {
    swal("¡Palabra extensa!", `La palabra debe tener maximo 8 letras y tiene ${palabra.value.length} letras.`, "warning");
  }
});

cancelar.addEventListener("click", () => {
  addPalabra.classList.add("transparente");
  inicio.classList.remove("transparente");
  footer.classList.remove("footer");
  flag = false;
});

desistir.addEventListener("click", () => {
  juego.classList.add("transparente");
  inicio.classList.remove("transparente");
  footer.classList.remove("footer");
  esGanador = false;
  flag = false;
});

nuevoJuego.addEventListener("click", () => {
  comenzarJuego();
  flag = true;
});

window.addEventListener("keydown", (element) => {
  if (flag && compararLetra(element.key) && contador < 9) {
    if (!listadoLetras.includes(element.key.toUpperCase())) {
      listadoLetras.push(element.key.toUpperCase());
      if(!pintarLetra(element.key.toUpperCase())){
          crearAhorcado(contador);
          contador++;
      }
    } else {
      swal("¡Letra repetida!", `Ha ingresado "${element.key.toUpperCase()}" nuevamente`, "warning");
    }
  } else if (contador >= 9) {
    pintarPerdedor();
    swal("¡Has perdido!", `La palabra era "${palabraJuego.join("")}", dale a nuevo juego si quieres volver a jugar.`, "info");
  } else if (esGanador) {
    swal("¡Has ganado!", "Dale a nuevo juego si quieres volver a jugar.", "success");
  }
});
