"use strict";
class Factura {
    constructor(Num, Data, NIF, Client, Telefon, Email, subtotal, Dte, Base_I, IVA, Total, P, Botons) {
        this.Num = Num;
        this.Data = Data;
        this.NIF = NIF;
        this.Client = Client;
		this.Telefon = Telefon;
        this.Email = Email;
        this.subtotal = subtotal;
		this.Dte = Dte;
        this.Base_I = Base_I;
        this.IVA = IVA;
        this.Total = Total;
		this.P = P;
		this.Botons = Botons;
    }

    addToTable() {
        // Añadir la factura a la tabla HTML
        $("tbody").append(`
            <tr>
                <td>${this.Num}</td>
                <td>${this.Data}</td>
                <td>${this.NIF}</td>
                <td>${this.Client}</td>
				<td>${this.Telefon}</td>
                <td>${this.Email}</td>
                <td>${this.subtotal}</td>
                <td>${this.Dte}</td>
				<td>${this.Base_I}</td>
                <td>${this.IVA}</td>
                <td>${this.Total}</td>
                <td>${this.P}</td>
                <td><button class="boton1 btn" id="imprimir">Boton1</button><button class="boton1 btn" id="'+asignacion.id+'">Boton1</button><button class="boton1 btn" id="'+asignacion.id+'">Boton1</button><button class="boton1 btn" id="'+asignacion.id+'">Boton1</button></td>;
            </tr>
        `);
    }
}
document.getElementById('imprimir').addEventListener('click', function() {
    window.print();
});

// Afegeix el paràgraf al cos del document


$(document).ready(function () {
    $("#loadData").click(function() {
        $("#fileInput").click(); // Al hacer clic en el botón, se activará el input de tipo archivo oculto
    });

    $("#fileInput").change(function(event) {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result); // Parsear el contenido del archivo JSON
            // Crear instancias de la clase Factura y agregarlas a la tabla
            data.forEach(item => {
				const factura = new Factura(item.Num, item.Data, item.NIF, item.Client,item.Telefon, item.Email, item.subtotal, item.Dte,item.Base_I, item.IVA, item.Total, item.P );
                factura.addToTable();
            });
        };
        reader.readAsText(file); // Leer el archivo como texto
    });
});

function init() {}
  
  
  
document.getElementById("tancar").addEventListener("click", reservaF);
document.getElementById("tancar2").addEventListener("click", platsDiaF);
document.getElementById("eliminar").addEventListener("click", reservaT);
document.getElementById("pendents").addEventListener("click", platsDiaT);

const resum = document.getElementById("resum");
const menu = document.getElementById("menu");

function reservaF() {
	menu.close();
};
function reservaT() {
	menu.showModal();
};
function platsDiaF() {
	resum.close();
};
function platsDiaT() {
	resum.showModal();
};

$(document).ready(init);
	
function primerPreu(event) {

	if (event.target.value == "" && document.getElementById("segon").value !== ""){
		document.getElementById("total").innerHTML = "6,50 €";
	}

	else if (!event.target.value !== ""){
		document.getElementById("total").innerHTML = "9 €";
	}  
	if (!event.target.value !== "" && document.getElementById("segon").value == ""){
		document.getElementById("total").innerHTML = "5,50 €";
	}
	else if (!event.target.value !== ""){
		document.getElementById("total").innerHTML = "9 €";
	} 
	else {
		document.getElementById("total").innerHTML = "0,00 €";
	}
} 

function segonPreu(event) {


	if (event.target.value == "" && document.getElementById("primer").value !== ""){
		document.getElementById("total").innerHTML = "5,50 €";
	}
	if (!event.target.value !== "" && document.getElementById("primer").value == ""){
		document.getElementById("total").innerHTML = "6,50 €";
	}
	else if (!event.target.value !== ""){
		document.getElementById("total").innerHTML = "9 €";
		console.log(document.getElementById("primer").value);
	}  
	else {
		document.getElementById("total").innerHTML = "0,00 €";
	}
}
