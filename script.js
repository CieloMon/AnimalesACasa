/* =====================================================
   ¡DE VUELTA A CASA!
   JavaScript del juego educativo
   ===================================================== */


/* -----------------------------------------
   ELEMENTOS DE LA PÁGINA
   ----------------------------------------- */

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaJuego =
    document.getElementById("pantallaJuego");

const pantallaFinal =
    document.getElementById("pantallaFinal");

const botonComenzar =
    document.getElementById("botonComenzar");

const botonReiniciar =
    document.getElementById("botonReiniciar");

const animales =
    document.querySelectorAll(".animal");

const habitats =
    document.querySelectorAll(".habitat");

const mensajeResultado =
    document.getElementById("mensajeResultado");

const numeroRescatados =
    document.getElementById("numeroRescatados");


/* -----------------------------------------
   VARIABLES DEL JUEGO
   ----------------------------------------- */

let animalArrastrado = null;

let animalesEnCasa = 0;


/* =====================================================
   COMENZAR LA AVENTURA
   ===================================================== */

botonComenzar.addEventListener(
    "click",
    function () {

        pantallaInicio.classList.add("oculto");

        pantallaJuego.classList.remove("oculto");

        mensajeResultado.textContent =
            "🌟 ¡Comienza la misión! Observa muy bien las pistas.";

    }
);


/* =====================================================
   ARRASTRAR LOS ANIMALITOS
   ===================================================== */

animales.forEach(function (animal) {

    animal.addEventListener(
        "dragstart",
        function () {

            animalArrastrado = animal;

            animal.classList.add(
                "arrastrando"
            );

        }
    );


    animal.addEventListener(
        "dragend",
        function () {

            animal.classList.remove(
                "arrastrando"
            );

        }
    );

});


/* =====================================================
   HÁBITATS
   ===================================================== */

habitats.forEach(function (habitat) {

    /*
       Permite que podamos soltar
       un animal dentro del hábitat.
    */

    habitat.addEventListener(
        "dragover",
        function (evento) {

            evento.preventDefault();

            habitat.classList.add(
                "sobre"
            );

        }
    );


    /*
       Cuando el animal sale del área,
       quitamos el efecto visual.
    */

    habitat.addEventListener(
        "dragleave",
        function () {

            habitat.classList.remove(
                "sobre"
            );

        }
    );


    /*
       Cuando soltamos el animal.
    */

    habitat.addEventListener(
        "drop",
        function (evento) {

            evento.preventDefault();

            habitat.classList.remove(
                "sobre"
            );


            /*
               Si no tenemos un animal
               seleccionado, no hacemos nada.
            */

            if (!animalArrastrado) {
                return;
            }


            /*
               Casa correcta del animal.
            */

            const casaCorrecta =
                animalArrastrado.dataset.casa;


            /*
               Hábitat donde lo soltaron.
            */

            const casaElegida =
                habitat.dataset.habitat;


            /*
               Comparamos las dos respuestas.
            */

            if (
                casaCorrecta ===
                casaElegida
            ) {

                respuestaCorrecta(
                    animalArrastrado,
                    habitat
                );

            }

            else {

                respuestaIncorrecta(
                    animalArrastrado
                );

            }


            animalArrastrado = null;

        }
    );

});


/* =====================================================
   RESPUESTA CORRECTA
   ===================================================== */

function respuestaCorrecta(
    animal,
    habitat
) {

    /*
       Evitamos contar dos veces
       el mismo animal.
    */

    if (
        animal.classList.contains(
            "en-casa"
        )
    ) {

        return;

    }


    animal.classList.add(
        "en-casa"
    );


    /*
       El animal deja de poder
       arrastrarse.
    */

    animal.setAttribute(
        "draggable",
        "false"
    );


    /*
       Lo colocamos dentro
       del hábitat correcto.
    */

    const zonaSoltar =
        habitat.querySelector(
            ".zona-soltar"
        );


    zonaSoltar.innerHTML =
        "⭐ ¡EN CASA! ⭐";


    /*
       Contamos el rescate.
    */

    animalesEnCasa++;

    numeroRescatados.textContent =
        animalesEnCasa;


    /*
       Mensaje para el niño.
    */

    const nombre =
        animal.querySelector(
            "strong"
        ).textContent;


    mensajeResultado.className =
        "mensaje-resultado correcto";


    mensajeResultado.textContent =
        "🎉 ¡Muy bien! " +
        nombre +
        " encontró su casita.";


    /*
       Si ya están todos,
       terminamos el juego.
    */

    if (
        animalesEnCasa === 4
    ) {

        setTimeout(
            mostrarPantallaFinal,
            1200
        );

    }

}


/* =====================================================
   RESPUESTA INCORRECTA
   ===================================================== */

function respuestaIncorrecta(
    animal
) {

    const nombre =
        animal.querySelector(
            "strong"
        ).textContent;


    mensajeResultado.className =
        "mensaje-resultado incorrecto";


    mensajeResultado.textContent =
        "🤔 ¡Ups! Esa no parece ser la casita de " +
        nombre +
        ". Observa las pistas otra vez.";

}


/* =====================================================
   PANTALLA FINAL
   ===================================================== */

function mostrarPantallaFinal() {

    pantallaJuego.classList.add(
        "oculto"
    );

    pantallaFinal.classList.remove(
        "oculto"
    );

}


/* =====================================================
   VOLVER A JUGAR
   ===================================================== */

botonReiniciar.addEventListener(
    "click",
    function () {

        location.reload();

    }
);