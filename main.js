document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".pokemon");
  const muestrapokemon = document.getElementById("imagen");
  const imagenEnemigo = document.getElementById("imagen-enemigo");
  const resultado = document.getElementById("resultado");

  select.addEventListener("change", () => {
    const jugador = select.value;
    const enemigo = sacarPokemonEnemigo(jugador);

    // Mostrar imágenes
    muestrapokemon.className = "imagenpokemon";
    imagenEnemigo.className = "imagenpokemon";

    if (jugador) muestrapokemon.classList.add(jugador);
    if (enemigo) imagenEnemigo.classList.add(enemigo);

    // Mostrar resultado
    const r = determinarGanador(jugador, enemigo);
    resultado.textContent = r;

    // Para depuración en consola
    console.log("Jugador:", jugador, "Enemigo:", enemigo, "Resultado:", r);
  });
});

function sacarPokemonEnemigo(exclude) {
  const opciones = ["pikachu", "charmander", "bulbasaur", "squirtle"].filter(p => p !== exclude);
  return opciones[Math.floor(Math.random() * opciones.length)];
}

// Reglas tipo piedra-papel-tijera
function determinarGanador(jugador, enemigo) {
  if (jugador === enemigo) return "Empate";

  const reglas = {
    pikachu: ["squirtle"],
    charmander: ["bulbasaur"],
    bulbasaur: ["pikachu"],
    squirtle: ["charmander"]
  };

  if (reglas[jugador]?.includes(enemigo)) {
    return "¡Ganaste!";
  } else {
    return "Perdiste...";
  }
}



