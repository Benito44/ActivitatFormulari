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
                <td tabindex="0" contenteditable="true">${this.Data}</td>
                <td tabindex="0" contenteditable="true">${this.NIF}</td>
                <td tabindex="0" contenteditable="true">${this.Client}</td>
                <td tabindex="0" contenteditable="true">${this.Telefon}</td>
                <td tabindex="0" contenteditable="true">${this.Email}</td>
                <td tabindex="0" contenteditable="true">${this.subtotal}</td>
                <td tabindex="0" contenteditable="true">${this.Dte}</td>
                <td tabindex="0" contenteditable="true">${this.Base_I}</td>
                <td tabindex="0" contenteditable="true">${this.IVA}</td>
                <td tabindex="0" contenteditable="true">${this.Total}</td>
                <td tabindex="0" contenteditable="true">${this.P}</td>
                <td class="editable" contenteditable="true">
                <button class="boton1 btn imprimir-btn" data-num="${this.Num}">Imprimir</button>
                <button class="boton1 btn" id="guardar">Boton1</button>
                <button class="boton1 btn" id="${this.Num}">Boton2</button>
                <button class="boton1 btn" id="${this.Num}">Boton3</button>
            </td>
        </tr>
    `);

        // Agregar el manejador de eventos para el botón de imprimir recién agregado
        $(document).on('click', `#imprimir-${this.Num}`, function() {
            window.print();
        });
    }
}

$(document).ready(function () {
    // Agregar evento de doble clic para hacer editables los campos en el diálogo de artículos
    $(document).on('dblclick', '#editableData [tabindex="0"]', function () {
        $(this).attr('contenteditable', true);
    });

    // Agregar evento de pérdida de foco para desactivar la edición al salir del campo
    $(document).on('blur', '#editableData [tabindex="0"]', function () {
        $(this).removeAttr('contenteditable');
    });
});

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
                <td tabindex="0" contenteditable="true">${this.codi}</td>
                <td tabindex="0" contenteditable="true">${this.article}</td>
                <td tabindex="0" contenteditable="true">${this.uni}</td>
                <td tabindex="0" contenteditable="true">${this.preu}</td>
                <td tabindex="0" contenteditable="true">${this.subtotal}</td>
                <td>Acción</td>
            </tr>
        `);
    }
}

let data; // Declare the data variable in the global scope

$(document).ready(function () {
    $("#loadData").click(function() {
        $("#fileInput").click();
    });

    $("#fileInput").change(function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            data = JSON.parse(e.target.result); // Store the loaded JSON data in the data variable
            // Display the loaded data in the invoice table
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
            });
        };
        reader.readAsText(file);
    });
    document.getElementById("tancar").addEventListener("click", reservaF);
    document.getElementById("tancar2").addEventListener("click", platsDiaF);
    document.getElementById("eliminar").addEventListener("click", reservaT);
    
    const resum = document.getElementById("articles");
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
    // Add event listener for the "guardar" button
    $(document).on("click", "#guardar", function() {
        // Get the invoice number associated with the clicked button
        var invoiceNumber = $(this).closest('tr').find('td:eq(0)').text();

        // Find the corresponding invoice data
        var invoiceData = data.find(facturaData => facturaData.Num === parseInt(invoiceNumber));

        // Display articles for the selected invoice
        if (invoiceData && invoiceData.articles && Array.isArray(invoiceData.articles)) {
            // Clear existing articles before adding new ones
            $("#articles tbody").empty();

            // Loop through articles and add them to the table
            invoiceData.articles.forEach(articuloData => {
                const articulo = new Articulo(
                    articuloData.codi,
                    articuloData.article,
                    articuloData.uni,
                    articuloData.preu,
                    articuloData.subtotal
                );
                articulo.addToTable();
            });
        } else {
            // If no articles found for the selected invoice, display a message or handle it accordingly
            alert("No se encontraron artículos para esta factura.");
            $("#articles tbody").empty();

        }
        const resum = document.getElementById("articles");
        resum.showModal();
    });

    // Add event listener for the "guardar" button inside the dialog form
    $("#formulari").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Retrieve the form data
        var numFactura = $("#numFactura").val();
        var dateFactura = $("#dateFactura").val();
        var pagada = $("#pagada").is(":checked");
        var nif = $("#nif").val();
        var nombre = $("#nombre").val();
        var telf = $("#telf").val();
        var email = $("#email").val();
        var dte = $("#dte").val();
        var iva = $("#iva").val();

        // Create a new Factura instance with the form data
        const factura = new Factura(
            numFactura,
            dateFactura,
            nif,
            nombre,
            telf,
            email,
            0, // Assuming subtotal is calculated based on articles, initialize to 0
            dte,
            0, // Initialize Base_I to 0, as it might be calculated based on articles
            iva,
            0, // Assuming Total is calculated based on articles, initialize to 0
            pagada,
            null, // Assuming Botons is not required here, set to null
            [] // No articles initially
        );

        // Add the factura to the table
        factura.addToTable();
    });

});



// Resto del código...


function init() {}
  
  
  


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

$(document).ready(function() {
    // Manejador de eventos para el doble clic en elementos con la clase "editable"
    $(document).on('dblclick', '.editable', function() {
        // Al hacer doble clic, convertir el elemento en editable
        $(this).attr('contenteditable', true);
    });

    // Manejador de eventos para el cambio en elementos con la clase "editable"
    $(document).on('input', '.editable', function() {
        // Puedes realizar acciones adicionales al detectar un cambio en el contenido editable
        console.log('Contenido cambiado:', $(this).text());
    });

    // Manejador de eventos para perder el foco en elementos con la clase "editable"
    $(document).on('blur', '.editable', function() {
        // Al perder el foco, desactivar la edición
        $(this).removeAttr('contenteditable');
    });
});


// Cambia el manejador de eventos para todos los botones de imprimir
$("[id^='imprimir-']").on('click', function() {
    window.print();
});
