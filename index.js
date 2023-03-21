// SE CAPTURAN LOS DATOS INGRESADOS EN EL SIMULADOR DE COSTOS DE RESERVA Y SE MUESTRA EL COSTO DE LA MISMA, SEGUN LOS DATOS INGRESADOS.

let simulador = document.getElementById("simulador");

simulador.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se envíe en el simulador

    let tipoHabitacion = document.getElementById("tipo_habitacion").value.toLowerCase();
    let formaPago = document.getElementById("forma_pago").value.toLowerCase();

    let costo = 0;

    if (tipoHabitacion === "individual" && formaPago === "efectivo") {
    costo = 1000;
    } else if (tipoHabitacion === "individual" && formaPago === "transferencia") {
    costo = 1300;
    } else if (tipoHabitacion === "doble" && formaPago === "efectivo") {
    costo = 2200;
    } else if (tipoHabitacion === "doble" && formaPago === "transferencia") {
    costo = 2500;
    } else {
    alert("Los valores ingresados no son válidos.");
    return;
    }
    let parrafo= document.createElement("p");
    parrafo.innerHTML = `El costo es: ${costo} por noche`
    simulador.append(parrafo);
});


// SE CREA UN CLASE RESERVA Y ARRAY RESERVA. SE CAPTURAN LOS DATOS DE LOS INPUT DEL FORMULARIO DE PRE-RESERVA Y SE GUARDAN EN EL ARRAY EN LOCALSTORAGE

class Reserva{
    constructor (nombre_apellido, fecha_nacimiento, num_reserva, pago, habitacion ){
        this.nombre_apellido = nombre_apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.num_reserva = num_reserva;
        this.pago = pago;
        this.habitacion = habitacion;
    }
}

let array_reservas = []; //Array vacío para almacenar las reservas

// PERMITE QUE SE ALMACENEN EN EL ARRAY, LOS DATOS DE CADA NUEVA PRE-RESERVA
if (localStorage.getItem('array_reservas')) {
    let hotel_reserva = JSON.parse(localStorage.getItem('array_reservas'));
    for (let i = 0; i < hotel_reserva.length; i++) {
        array_reservas.push(hotel_reserva[i]);
    }
}

let formulario = document.getElementById("formulario"); //Obtener el elemento del formulario



formulario.addEventListener("submit", (event) => {
    event.preventDefault(); //Prevenir el comportamiento predeterminado del formulario
    let nombreApellido = document.getElementById("nombre_apellido").value;
    let fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    let num_reserva = document.getElementById("reserva_dni").value;
    let formaPago = document.getElementById("pago").value;
    let habitacion = document.getElementById("habitacion").value;
    let nueva_reserva= new Reserva (nombreApellido, fechaNacimiento, num_reserva, formaPago, habitacion)
    array_reservas.push(nueva_reserva);
    localStorage.setItem("reservas_hotel", JSON.stringify(array_reservas));
    formulario.reset();
});



function mostrar_ultima_reserva() {
    contenedor_pre_reservas.innerHTML = '';
    let ultima_reserva = array_reservas[array_reservas.length - 1]; // Obtenemos la última reserva del array
    let div = document.createElement('div');
    div.innerHTML = `<div>
                            <p>Nombre y Apellido: ${ultima_reserva.nombre_apellido}</p>
                            <p>Fecha de nacimiento: ${ultima_reserva.fecha_nacimiento}</p>
                            <p>Número Reserva: ${ultima_reserva.num_reserva}</p>
                            <p> Forma de pago: ${ultima_reserva.pago}</p>
                            <p>Habitación: ${ultima_reserva.habitacion}</p>
                    </div>`;
    contenedor_pre_reservas.appendChild(div);
}

ver_pre_reserva.addEventListener('click', () => {
    mostrar_ultima_reserva(); // Muesstra solo la última reserva
    setTimeout(() => {
        Swal.fire({
            title: "IMPORTANTE",
            html: `<p> Para que su reserva este confirmada, deberá enviar foto de documento de los huespedes al siguiente mail</p>
            <a href= "https://mail.google.com/mail/u/0/#inbox?compose=new"> hotellagunaescondida@gmail.com </a>`,
            icon: "warning",
        });
    }, 3000); // retrasa la ejecución del SweetAlert en 3 segundos (3000 ms)
});


// API

function mostrar_posicion(posicion){
    let lat= posicion.coords.latitude;
    let long= posicion.coords.longitude;
    let key= "7f9aacdacc0d17438d87d70e0182bcb4";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
    .then(response => response.json())
    .then(data =>{
        document.querySelector('#clima').textContent = ` ${data.name} | Temp: ${data.main.temp} | Clima: ${data.weather[0].description}`
    })
}

navigator.geolocation.getCurrentPosition(mostrar_posicion);


























