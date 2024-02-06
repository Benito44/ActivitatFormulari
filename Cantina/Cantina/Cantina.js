
class Factura {
    constructor(Num, Data, NIF, Client, Telefon, Email, subtotal, Dte, Base_I, IVA, Total, P, Botons, articles) {
        let ultimoNumeroFactura = obtenerUltimoNumeroFactura();
        // Asignar el número de la próxima factura
        this.Num = ultimoNumeroFactura + 1;
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
                <button class="boton1 btn" id="eliminarTablas">eliminar</button>
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
                <td>${this.codi}</td>
                <td tabindex="0" contenteditable="true">${this.article}</td>
                <td tabindex="0" contenteditable="true">${this.uni}</td>
                <td tabindex="0" contenteditable="true">${this.preu}</td>
                <td tabindex="0" contenteditable="true">${this.subtotal}</td>
                <td>
                <button class="boton1 btn" id="eliminarTablas">Eliminar</button>
                <button class="boton1 btn" id="${this.Num}">Boton3</button>
                </td>
            </tr>
        `);
    }
    addToAllArticlesTable() {
        // Selecciona la tabla de todos los artículos
        const tableBody = $("#allArticles2 tbody");

        // Agrega una nueva fila con los datos del artículo a la tabla
        tableBody.append(`
            <tr>
                <td>${this.codi}</td>
                <td>${this.article}</td>
                <td>${this.uni}</td>
                <td>${this.preu}</td>
                <td>${this.subtotal}</td>
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
            data = JSON.parse(e.target.result); // Almacena los datos JSON cargados en la variable 'data'
        
            // Limpiar la tabla de todos los artículos antes de agregar los nuevos artículos
            $("#allArticles2 tbody").empty(); 
        
            // Array para almacenar todos los artículos
            let allArticles = [];
        
            // Iterar sobre cada factura en los datos cargados
            data.forEach(facturaData => {
                // Verificar si la propiedad 'articles' está definida en el objeto facturaData
                if (facturaData.articles && Array.isArray(facturaData.articles)) {
                    // Iterar sobre cada artículo de la factura
                    facturaData.articles.forEach(articuloData => {
                        // Crear un nuevo objeto Articulo con los datos del artículo
                        const articulo = new Articulo(
                            articuloData.codi,
                            articuloData.article,
                            articuloData.uni,
                            articuloData.preu,
                            articuloData.subtotal
                        );
        
                        // Agregar el artículo al array de todos los artículos
                        allArticles.push(articulo);
                    });
                } else {
                    console.error("La propiedad 'articles' no está definida en el objeto facturaData:", facturaData);
                }
            });
        
            // Agregar todos los artículos a la tabla de todos los artículos
            allArticles.forEach(articulo => {
                articulo.addToAllArticlesTable("#allArticles2 tbody"); // Agrega los artículos a la tabla de todos los artículos
            });
            $("#dataTable tbody").empty(); 
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
        };                reader.readAsText(file);
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
    $(document).on("click", "#guardar", function() {
        // Obtener el número de factura asociado al botón clickeado
        var numeroFactura = $(this).closest('tr').find('td:eq(0)').text();
        console.log(numeroFactura);
        numero_de_factura = numeroFactura;
        // Limpiar la tabla de artículos antes de agregar nuevos
        $("#articles tbody").empty();
    
        // Recorrer las filas de la tabla allArticles2
        $("#allArticles2 tbody tr").each(function() {
            // Obtener el código del artículo de la primera celda
            var codigoArticulo = $(this).find('td:eq(0)').text();
            console.log(codigoArticulo);
            // Verificar si el primer carácter del código coincide con el número de factura
            if (codigoArticulo.charAt(0) === numeroFactura) {
                // Si coincide, obtener los datos del artículo de las celdas
                var article = $(this).find('td:eq(1)').text();
                var uni = $(this).find('td:eq(2)').text();
                var preu = $(this).find('td:eq(3)').text();
                var subtotal = $(this).find('td:eq(4)').text();
    
                // Crear una instancia de la clase Articulo con los datos del artículo
                const articulo = new Articulo(codigoArticulo, article, uni, preu, subtotal);
    
                // Agregar el artículo a la tabla articles
                articulo.addToTable();
            }
        });
    
        // Mostrar el dialog
        const resum = document.getElementById("articles");
        resum.showModal();

    });
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
            []
        );

        // Add the factura to the table
        factura.addToTable();
        menu.close();
    });
    
$("#nouArticle").click(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
        
    // Retrieve the form data
    let codi = obtenerUltimoNumeroFactura2();
    var article = "";
    var uni = "";
    var preu = "";
    var subtotal = "";
    var acc = "";

    // Agregar celdas a la nueva fila
    const factura = new Articulo(
        codi,
        article,
        uni,
        preu,
        subtotal,
        acc,
    );
        // Add the factura to the table
        factura.addToTable();
});

$("#guardarArticle").click(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Objeto para almacenar las filas de allArticles2 por código (codi)
    var filasAllArticles2 = {};

    // Obtener todas las filas de allArticles2 y almacenarlas en el objeto por código (codi)
    $("#allArticles2 tbody tr").each(function() {
        var codi = $(this).find('td:eq(0)').text();
        filasAllArticles2[codi] = $(this);
    });

    // Recorrer todas las filas de la tabla editableData
    $("#editableData tbody tr").each(function() {
        // Obtener los datos de la fila actual
        var codi = $(this).find('td:eq(0)').text();
        console.log(codi);
        var article = $(this).find('td:eq(1)').text();
        var uni = $(this).find('td:eq(2)').text();
        var preu = $(this).find('td:eq(3)').text();
        var subtotal = $(this).find('td:eq(4)').text();

        // Crear un nuevo objeto Articulo con los datos de la fila
        var nuevoArticulo = new Articulo(codi, article, uni, preu, subtotal);
        console.log("nuevoArticulo");
        // Obtener la fila correspondiente en allArticles2
        var filaAllArticles2 = filasAllArticles2[codi];
        console.log(filaAllArticles2);
        // Verificar si la fila actual existe en allArticles2
        if (filaAllArticles2 && filaAllArticles2.length) {
            console.log("verificado");

            // Verificar si algo ha cambiado en la fila actual en comparación con allArticles2
            var filaMiTabla = $(this).html();
            var filaAllArticles2HTML = filaAllArticles2.html();
            if (filaMiTabla !== filaAllArticles2HTML) {
                // Si algo ha cambiado, reemplazar la fila en allArticles2
                filaAllArticles2.replaceWith("<tr>" + filaMiTabla + "</tr>");
                console.log("ha entrado para reemplazar");

            }
            // Eliminar la fila de allArticles2 del objeto para indicar que ya ha sido procesada
            delete filasAllArticles2[codi];
        } else {
            // Si la fila no existe en allArticles2, agregarla
            console.log(nuevoArticulo);

            nuevoArticulo.addToAllArticlesTable();
        }
    });

    // Agregar las filas restantes de allArticles2 que no están presentes en editableData
    for (var codi in filasAllArticles2) {
        $("#allArticles2 tbody").append(filasAllArticles2[codi]);
    }
});


$(document).ready(function() {
    // Agregar evento de clic al botón para convertir la tabla a JSON
    $("#convertirJsonBtn").click(function() {
        // Obtener los datos de la tabla y convertirlos a JSON
        var jsonData = convertirTablaAJson();

        // Mostrar el JSON resultante (puedes ajustar cómo deseas mostrarlo)
        console.log(jsonData);

    });




    // Función para convertir los datos de la tabla a JSON
// Función para convertir los datos de las tablas a JSON
function convertirTablaAJson() {
    var jsonData = [];

    // Iterar sobre las filas de la tabla de facturas
    $('#dataTable tbody tr').each(function(index, facturaRow) {
        var facturaData = {};
        var facturaCells = $(facturaRow).find('td');

        // Obtener el número de factura
        var numFactura = $(facturaCells[0]).text();

        // Inicializar el array de artículos asociados a esta factura
        var articlesData = [];

        // Iterar sobre las filas de la tabla de artículos
        $('#allArticles tbody tr').each(function(index, articleRow) {
            var articleCells = $(articleRow).find('td');
            var codArticulo = $(articleCells[0]).text();

            // Si el código del artículo comienza con el número de factura
            if (codArticulo.startsWith(numFactura + "-")) {
                var articuloData = {
                    codi: codArticulo,
                    article: $(articleCells[1]).text(),
                    uni: $(articleCells[2]).text(),
                    preu: $(articleCells[3]).text(),
                    subtotal: $(articleCells[4]).text()
                };
                articlesData.push(articuloData);
            }
        });

        // Asignar los datos de la factura
        facturaData.Num = numFactura;
        facturaData.Data = $(facturaCells[1]).text();
        facturaData.NIF = $(facturaCells[2]).text();
        facturaData.Client = $(facturaCells[3]).text();
        facturaData.Telefon = $(facturaCells[4]).text();
        facturaData.Email = $(facturaCells[5]).text();
        facturaData.subtotal = $(facturaCells[6]).text();
        facturaData.Dte = $(facturaCells[7]).text();
        facturaData.Base_I = $(facturaCells[8]).text();
        facturaData.IVA = $(facturaCells[9]).text();
        facturaData.Total = $(facturaCells[10]).text();
        facturaData.P = $(facturaCells[11]).text();

        // Agregar los artículos asociados a esta factura
        facturaData.articles = articlesData;

        // Agregar los datos de la factura al arreglo de datos JSON
        jsonData.push(facturaData);
    });

    return jsonData;
}

});

$(document).ready(function () {
    // Función para obtener el número actual de la factura
    function obtenerNumeroFacturaActual() {
        // Obtener el último número de factura en la tabla
        let ultimoNumeroFactura = obtenerUltimoNumeroFactura(); // Asegúrate de definir esta función
        // Calcular el número de la próxima factura sumándole 1 al último número
        let numeroFacturaActual = ultimoNumeroFactura + 1;
        return numeroFacturaActual;
    }
    
    // Función para actualizar el campo de entrada del número de factura en el diálogo
    function actualizarNumeroFacturaEnDialog() {
        // Obtener el número actual de la factura
        let numeroFacturaActual = obtenerNumeroFacturaActual();
        // Asignar el número actual al campo de entrada en el diálogo
        $('#numFactura').val(numeroFacturaActual);
    }

    // Agregar evento de clic al botón "Nova factura" para abrir el diálogo
    $('#eliminar').click(function() {
        // Actualizar el número de factura en el diálogo antes de mostrarlo
        actualizarNumeroFacturaEnDialog();
        // Mostrar el diálogo
        $('#menu').showModal();
    });

    

});



    $(document).on("click", "#eliminarTablas", function() {
        var fila = $(this).closest("tr"); // Busca la fila más cercana al botón clickeado
        fila.remove(); // Remueve la fila
    });


function init() {}
$(document).ready(init);
	
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

function obtenerUltimoNumeroFactura() {
    let ultimoNumeroFactura = 0;
    // Iterar sobre las filas de la tabla dataTable y encontrar el número de factura más alto
    $("#dataTable tbody tr").each(function() {
        let numeroFactura = parseInt($(this).find('td:eq(0)').text());
        if (numeroFactura > ultimoNumeroFactura) {
            ultimoNumeroFactura = numeroFactura;
        }
    });
    return ultimoNumeroFactura;
}
function obtenerUltimoNumeroFactura2 (){
    
    return numero_de_factura + "-";
}

$(document).ready(function() {
    // Asignar evento clic a los botones dentro de la columna "Action"
    $("#dataTable").on("click", "button.boton1", function() {
        // Obtener el número de factura asociado a esta fila
        var numFactura = $(this).closest("tr").find("td:first").text();
        
        // Utilizar el número de factura para identificar la fila específica
        // y obtener el valor de la celda de la columna "Núm"
        var numCeldaNum = $("#dataTable tbody tr").filter(function() {
            return $(this).find("td:first").text() === numFactura;
        }).find("td:nth-child(1)").text();
        
        // Mostrar el valor de la celda de la columna "Núm" en la consola
        console.log("Valor de la celda 'Núm':", numCeldaNum);
    });
});




// Cambia el manejador de eventos para todos los botones de imprimir
$(".boton1[id^='imprimir-']").on('click', function() {
    window.print();
});


/*
const fs = require('fs'); // Módulo de sistema de archivos

// Objeto JSON de ejemplo
const datos = {
    nombre: "Ejemplo",
    edad: 30,
    ciudad: "Ciudad Ejemplo"
};

// Convertir el objeto JSON a formato de cadena
const datosString = JSON.stringify(datos, null, 2);

// Escribir el objeto JSON en un archivo
fs.writeFile('datos.json', datosString, 'utf8', (err) => {
    if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
    }
    console.log('Los datos se han guardado correctamente en datos.json');
});

*/