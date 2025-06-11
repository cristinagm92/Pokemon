document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".pokemon");
  const muestrapokemon = document.getElementById("imagen");
  const imagenEnemigo = document.getElementById("imagen-enemigo");
  const resultado = document.getElementById("resultado");
  const trofeosContainer = document.getElementById("trofeos-container");
  const mensajeFinal = document.getElementById("mensaje-final");

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

    // Depuración en consola
    console.log("Jugador:", jugador, "Enemigo:", enemigo, "Resultado:", r);
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

  function actualizarTrofeos(resultadoRonda) {
    if (resultados.length >= 6) return;

    if (resultadoRonda === "¡Ganaste!") {
      resultados.push("ganaste");
      trofeosContainer.innerHTML += "🏆";
    } else if (resultadoRonda === "Perdiste...") {
      resultados.push("perdiste");
      ;trofeosContainer.innerHTML += "👎";

    }

    // Al llegar a 6 resultados, mostrar mensaje final
    if (resultados.length === 6) {
      const ganadas = resultados.filter(r => r === "ganaste").length;
      const perdidas = resultados.filter(r => r === "perdiste").length;

      if (ganadas > perdidas) {
        mensajeFinal.textContent = "🎉 ¡Ganaste la batalla! 🎉";
        lanzarConfeti();
      } else if (perdidas > ganadas) {
        mensajeFinal.textContent = "😢 Perdiste la batalla...";
      } else {
        mensajeFinal.textContent = "🤝 ¡Empate!";
      }
    }
  }

  function lanzarConfeti() {
    let confeti = " 🎊🎉✨🥳🎉✨";
    mensajeFinal.textContent += confeti;
  }
});

document.getElementById("reiniciar").addEventListener("click", () => {
  resultados = [];
  trofeosContainer.innerHTML = "";
  mensajeFinal.textContent = "";
  resultado.textContent = "";

  muestrapokemon.className = "imagenpokemon";
  imagenEnemigo.className = "imagenpokemon";

  // También puedes reiniciar el select si quieres:
  document.getElementById("pokemon").value = "";
});

