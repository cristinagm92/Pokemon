document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".pokemon");
  const muestrapokemon = document.getElementById("imagen");
  const imagenEnemigo = document.getElementById("imagen-enemigo");
  const resultado = document.getElementById("resultado");
  const trofeosContainer = document.getElementById("trofeos-container");
  const mensajeFinal = document.getElementById("mensaje-final");
  const botonReiniciar = document.getElementById("reiniciar");

  let resultados = []; // Guarda resultados de 6 rondas: "ganaste" o "perdiste"

  select.addEventListener("change", () => {
    const jugador = select.value;
    if (!jugador || resultados.length >= 6) return;

    const enemigo = sacarPokemonEnemigo(jugador);

    // Limpiar clases anteriores
    muestrapokemon.className = "imagenpokemon";
    imagenEnemigo.className = "imagenpokemon";

    // Añadir nuevas clases para mostrar imágenes
    muestrapokemon.classList.add(jugador);
    imagenEnemigo.classList.add(enemigo);

    // Mostrar resultado de la ronda
    const r = determinarGanador(jugador, enemigo);
    resultado.textContent = r;

    // Agregar resultado a la lista de trofeos
    actualizarTrofeos(r);

    // Depuración
    console.log("Jugador:", jugador, "Enemigo:", enemigo, "Resultado:", r);
  });

  function sacarPokemonEnemigo(exclude) {
    const opciones = ["pikachu", "charmander", "bulbasaur", "squirtle"].filter(p => p !== exclude);
    return opciones[Math.floor(Math.random() * opciones.length)];
  }

  function determinarGanador(jugador, enemigo) {
    if (jugador === enemigo) return "Empate";

    const reglas = {
      pikachu: ["squirtle"],
      charmander: ["bulbasaur"],
      bulbasaur: ["pikachu"],
      squirtle: ["charmander"]
    };

    return reglas[jugador]?.includes(enemigo) ? "¡Ganaste!" : "Perdiste...";
  }

  function actualizarTrofeos(resultadoRonda) {
    if (resultados.length >= 6) return;

    if (resultadoRonda === "¡Ganaste!") {
      resultados.push("ganaste");
      trofeosContainer.innerHTML += "🏆";
    } else if (resultadoRonda === "Perdiste...") {
      resultados.push("perdiste");
      trofeosContainer.innerHTML += "👎";
    }

    if (resultados.length === 6) {
      const ganadas = resultados.filter(r => r === "ganaste").length;
      const perdidas = resultados.filter(r => r === "perdiste").length;

      if (ganadas > perdidas) {
        mensajeFinal.textContent = "🎉 ¡Ganaste la batalla! 🎊🎉✨🥳🎉✨";
      } else if (perdidas > ganadas) {
        mensajeFinal.textContent = "😢 Perdiste la batalla...";
      } else {
        mensajeFinal.textContent = "🤝 ¡Empate!";
      }
    }
  }

  // ✅ Reiniciar juego
  botonReiniciar.addEventListener("click", () => {
    resultados = [];
    trofeosContainer.innerHTML = "";
    mensajeFinal.textContent = "";
    resultado.textContent = "";
    muestrapokemon.className = "imagenpokemon";
    imagenEnemigo.className = "imagenpokemon";
    select.value = "";
  });
});



