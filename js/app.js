document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
    cc: "",  // Añadir el campo cc al objeto email
  };

  // seleccionamos los elementos
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMsj = document.querySelector("#mensaje");
  const inputCC = document.querySelector("#cc"); // Seleccionar el campo cc
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // asignar eventos de entrada
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMsj.addEventListener("input", validar);
  inputCC.addEventListener("input", validar); // Añadir evento para el campo cc

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (evento) {
    evento.preventDefault();
    // reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
    email.cc = ""; // Reiniciar el campo cc
    formulario.reset();
    comprobarEmail();
  });

  function enviarEmail(evento) {
    evento.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");
      console.log("Email enviado:", email);
    }, 3000);
  }

  function validar(evento) {
    const { name, value } = evento.target;

    if (value.trim() === "") {
      mostrarAlerta(
        `El campo ${evento.target.id} es obligatorio`,
        evento.target.parentElement
      );
      email[name] = "";
      comprobarEmail();
      return;
    }

    if (evento.target.id === "email" && !validarEmail(value)) {
      mostrarAlerta("El email no es válido", evento.target.parentElement);
      email[name] = "";
      comprobarEmail();
      return;
    }

    if (evento.target.id === "cc" && value.trim() !== "") {  // Validar el campo cc
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!gmailRegex.test(value)) {
        mostrarAlerta("El CC debe ser un correo de Gmail válido", evento.target.parentElement);
        email[name] = "";
        comprobarEmail();
        return;
      }
    }

    limpiarAlerta(evento.target.parentElement);
    email[name] = value.trim().toLowerCase();
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add(
      "bg-red-600",
      "text-white",
      "p-2",
      "text-center",
      "rounded",
      "mt-2"
    );
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(email);
  }

  function comprobarEmail() {
    const allFilled = Object.values(email).every(value => value !== "");
    btnSubmit.classList.toggle("opacity-50", !allFilled);
    btnSubmit.disabled = !allFilled; // Habilitar o deshabilitar el botón
  }
});