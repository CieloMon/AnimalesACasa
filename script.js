/* =====================================================
   ¡DE VUELTA A CASA!
   JavaScript del juego educativo
   Computadora + celular
   ===================================================== */


/* =====================================================
   ELEMENTOS
   ===================================================== */

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


/* =====================================================
   VARIABLES
   ===================================================== */

let animalArrastrado = null;

let animalSeleccionado = null;

let animalesEnCasa = 0;


/* =====================================================
   COMENZAR
   ===================================================== */

botonComenzar.addEventListener(
    "click",
    function () {

        pantallaInicio.classList.add(
            "oculto"
        );

        pantallaJuego.classList.remove(
            "oculto"
        );

        mensajeResultado.className =
            "mensaje-resultado";

        mensajeResultado.textContent =
            "🌟 ¡Comienza la misión! Arrastra un animalito o tócalo para elegirlo.";

    }
);


/* =====================================================
   ANIMALITOS
   ===================================================== */

animales.forEach(
    function (animal) {

        /* COMPUTADORA */

        animal.addEventListener(
            "dragstart",
            function () {

                if (
                    animal.classList.contains(
                        "en-casa"
                    )
                ) {

                    return;
                }

                animalArrastrado =
                    animal;

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

                animalArrastrado =
                    null;

            }
        );


        /* CELULAR */

        animal.addEventListener(
            "click",
            function () {

                if (
                    animal.classList.contains(
                        "en-casa"
                    )
                ) {

                    return;
                }


                animales.forEach(
                    function (otroAnimal) {

                        otroAnimal.classList.remove(
                            "seleccionado"
                        );

                    }
                );


                animalSeleccionado =
                    animal;

                animal.classList.add(
                    "seleccionado"
                );


                const nombre =
                    animal.querySelector(
                        "strong"
                    ).textContent;


                mensajeResultado.className =
                    "mensaje-resultado seleccionado-mensaje";


                mensajeResultado.textContent =
                    "👆 ¡Elegiste a " +
                    nombre +
                    "! Ahora toca la casita donde crees que vive.";

            }
        );

    }
);


/* =====================================================
   HÁBITATS
   ===================================================== */

habitats.forEach(
    function (habitat) {

        /* COMPUTADORA */

        habitat.addEventListener(
            "dragover",
            function (evento) {

                evento.preventDefault();

                habitat.classList.add(
                    "sobre"
                );

            }
        );


        habitat.addEventListener(
            "dragleave",
            function () {

                habitat.classList.remove(
                    "sobre"
                );

            }
        );


        habitat.addEventListener(
            "drop",
            function (evento) {

                evento.preventDefault();

                habitat.classList.remove(
                    "sobre"
                );


                if (!animalArrastrado) {

                    return;
                }


                revisarRespuesta(
                    animalArrastrado,
                    habitat
                );

            }
        );


        /* CELULAR */

        habitat.addEventListener(
            "click",
            function () {

                if (!animalSeleccionado) {

                    mensajeResultado.className =
                        "mensaje-resultado incorrecto";


                    mensajeResultado.textContent =
                        "🐾 Primero elige un animalito y después toca su casita.";

                    return;
                }


                revisarRespuesta(
                    animalSeleccionado,
                    habitat
                );

            }
        );

    }
);


/* =====================================================
   REVISAR RESPUESTA
   ===================================================== */

function revisarRespuesta(
    animal,
    habitat
) {

    const casaCorrecta =
        animal.dataset.casa;


    const casaElegida =
        habitat.dataset.habitat;


    if (
        casaCorrecta ===
        casaElegida
    ) {

        respuestaCorrecta(
            animal,
            habitat
        );

    }

    else {

        respuestaIncorrecta(
            animal
        );

    }

}


/* =====================================================
   RESPUESTA CORRECTA
   ===================================================== */

function respuestaCorrecta(
    animal,
    habitat
) {

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


    animal.classList.remove(
        "seleccionado"
    );


    animal.setAttribute(
        "draggable",
        "false"
    );


    const zonaSoltar =
        habitat.querySelector(
            ".zona-soltar"
        );


    zonaSoltar.innerHTML =
        "⭐ ¡EN CASA! ⭐";


    animalesEnCasa++;


    numeroRescatados.textContent =
        animalesEnCasa;


    const nombre =
        animal.querySelector(
            "strong"
        ).textContent;


    mensajeResultado.className =
        "mensaje-resultado correcto";


    /* MENSAJES PERSONALIZADOS */

    if (nombre === "Rex") {

        mensajeResultado.textContent =
            "🦜 🎉 ¡SÍÍÍ! ¡Rex el león está en casa! 🦁🌾";

    }

    else if (nombre === "Blue") {

        mensajeResultado.textContent =
            "🐢 🎉 ¡Blue está en casa! ¡Al aguaaa! 🐬🌊";

    }

    else if (nombre === "Zafir") {

        mensajeResultado.textContent =
            "🦎 🎉 ¡Zafir encontró su casita! 🐪🌵";

    }

    else if (nombre === "Moki") {

        mensajeResultado.textContent =
            "🦜 🎉 ¡Moki volvió a casa! 🐒🌴";

    }


    animalSeleccionado =
        null;


    animalArrastrado =
        null;


    if (
        animalesEnCasa === 4
    ) {

        setTimeout(
            mostrarPantallaFinal,
            1500
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
        "🦉 ¡Ups! Esa no es la casita de " +
        nombre +
        ". Mira nuevamente sus pistas… ¡tú puedes! 💛";

}


/* =====================================================
   MOSTRAR FINAL
   ===================================================== */

function mostrarPantallaFinal() {

    pantallaJuego.classList.add(
        "oculto"
    );


    pantallaFinal.classList.remove(
        "oculto"
    );


    /*
       Llevamos la pantalla hacia arriba
       para que en celular se vea inmediatamente
       la celebración.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   REINICIAR
   ===================================================== */

botonReiniciar.addEventListener(
    "click",
    function () {

        location.reload();

    }
);
