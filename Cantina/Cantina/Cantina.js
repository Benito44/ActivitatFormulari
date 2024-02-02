class Factura {
    constructor(Num, Data, NIF, Client, Telefon, Email, subtotal, Dte, Base_I, IVA, Total, P, Botons, articles) {
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
        this.articles = articles ?? [];
    }

    addToTable() {
        // Añadir la factura a la tabla HTML de facturas
        $("#dataTable tbody").append(`
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
                <td>
                    <button class="boton1 btn" id="imprimir">Imprimir</button>
                    <button class="boton1 btn" id="${this.Num}">Boton1</button>
                    <button class="boton1 btn" id="${this.Num}">Boton2</button>
                    <button class="boton1 btn" id="${this.Num}">Boton3</button>
                </td>
            </tr>
        `);
    }
}

class Articulo {
    constructor(codi, article, uni, preu, subtotal) {
        this.codi = codi;
        this.article = article;
        this.uni = uni;
        this.preu = preu;
        this.subtotal = subtotal;
    }

    addToTable() {
        // Añadir el artículo a la tabla HTML de artículos
        $("#articles tbody").append(`
            <tr>
                <td>${this.codi}</td>
                <td>${this.article}</td>
                <td>${this.uni}</td>
                <td>${this.preu}</td>
                <td>${this.subtotal}</td>
                <td>Acción</td>
            </tr>
        `);
    }
}

$(document).ready(function () {
    $("#loadData").click(function() {
        $("#fileInput").click();
    });

    $("#fileInput").change(function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            data.forEach(facturaData => {
                const factura = new Factura(
                    facturaData.Num,
                    facturaData.Data,
                    facturaData.NIF,
                    facturaData.Client,
                    facturaData.Telefon,
                    facturaData.Email,
                    facturaData.subtotal,
                    facturaData.Dte,
                    facturaData.Base_I,
                    facturaData.IVA,
                    facturaData.Total,
                    facturaData.P
                );
                factura.addToTable();
                
                if (facturaData.articles && Array.isArray(facturaData.articles)) {
                    facturaData.articles.forEach(articuloData => {
                        const articulo = new Articulo(
                            articuloData.codi,
                            articuloData.article,
                            articuloData.uni,
                            articuloData.preu,
                            articuloData.subtotal
                        );
                        articulo.addToTable();
                    });
                }
            });
        };
        reader.readAsText(file);
    });
});

// Resto del código...


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
