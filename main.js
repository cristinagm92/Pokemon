// main.js
document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".pokemon");
  const enemigo = document.getElementById("enemigo");
  const muestrapokemon = document.getElementById("imagen");

  select.addEventListener("change", () => {
    const entrenador = select.value;        // valor seleccionado: "pikachu", etc.
    const ordenador = sacarpokemon();       // obtiene el Pokémon enemigo
    enemigo.textContent = ordenador;        // muestra el nombre del enemigo

    // Resetea clases anteriores
    muestrapokemon.className = "imagenpokemon";

    // Si hay valor, añade la clase correspondiente (debe coincidir con CSS)
    if (entrenador) {
      muestrapokemon.classList.add(entrenador);
    }

    // Para depurar en consola:
    console.log("Clases actuales en div imagen:", muestrapokemon.className);
  });
});

// Función de ejemplo para elegir un Pokémon enemigo al azar
function sacarpokemon() {
  const opciones = ["pikachu", "charmander", "bulbasaur", "squirtle"];
  return opciones[Math.floor(Math.random() * opciones.length)];
}



