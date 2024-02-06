
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
                <td>${this.subtotal}</td>
                <td>${this.Dte}</td>
                <td>${this.Base_I}</td>
                <td>${this.IVA}</td>
                <td>${this.Total}</td>
                <td tabindex="0" contenteditable="true">${this.P}</td>
                <td>
                <button class="boton1 btn imprimir-btn" id="imprimir">Imprimir</button>
                <button class="boton1 btn" id="mostraArticles">Mostra Articles</button>
                <button class="boton1 btn" id="eliminarTables">Eliminar</button>
                <button class="boton1 btn" id="editarFormTaules">Editar</button>
            </td>
        </tr>
    `);

        // Agregar el manejador de eventos para el botón de imprimir recién agregado
        $(document).on('click', "#imprimir", function() {
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
                <td>${this.subtotal}</td>
                <td>
                <button class="boton1 btn" id="eliminarTables">Eliminar</button>
                </td>
            </tr>
        `);
    }
    addToAllArticlesTable() {
        // Selecciona la tabla de todos los artículos
        const tableBody = $("#taulaArticles tbody");

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
let subtotal_T = 0;
let numero_de_factura = 0;

$(document).ready(function () {
    $("#carregarDades").click(function() {
        $("#arxiuJSON").click();
    });

    $("#arxiuJSON").change(function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            data = JSON.parse(e.target.result); // Almacena los datos JSON cargados en la variable 'data'
        
            // Limpiar la tabla de todos los artículos antes de agregar los nuevos artículos
            $("#taulaArticles tbody").empty(); 
        
            // Array para almacenar todos los artículos
            let articlesTotals = [];
        
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
                        articlesTotals.push(articulo);
                    });
                } else {
                    console.error("La propiedad 'articles' no está definida en el objeto facturaData:", facturaData);
                }
            });
        
            // Agregar todos los artículos a la tabla de todos los artículos
            articlesTotals.forEach(articulo => {
                articulo.addToAllArticlesTable("#taulaArticles tbody"); // Agrega los artículos a la tabla de todos los artículos
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
    document.getElementById("novaFactura").addEventListener("click", reservaT);
    
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
    $(document).on("click", "#mostraArticles", function() {
        // Obtener el número de factura asociado al botón clickeado
        let numeroFactura = $(this).closest('tr').find('td:eq(0)').text();
        numero_de_factura = numeroFactura;
        // Limpiar la tabla de artículos antes de agregar nuevos
        $("#articles tbody").empty();
    
        // Recorrer las filas de la tabla allArticles2
        $("#taulaArticles tbody tr").each(function() {
            // Obtener el código del artículo de la primera celda
            let codigoArticulo = $(this).find('td:eq(0)').text();
            // Verificar si el primer carácter del código coincide con el número de factura
            if (codigoArticulo.charAt(0) === numeroFactura) {
                // Si coincide, obtener los datos del artículo de las celdas
                let article = $(this).find('td:eq(1)').text();
                let uni = $(this).find('td:eq(2)').text();
                let preu = $(this).find('td:eq(3)').text();
                let subtotal = uni * preu;
                subtotal_T += subtotal; 

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
    
    

    // Add event listener for the "mostraArticles" button inside the dialog form
    $("#formulari").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Retrieve the form data
        let numFactura = $("#numFactura").val();
        let dateFactura = $("#dateFactura").val();
        let pagada = $("#pagada").is(":checked");
        let nif = $("#nif").val();
        let nombre = $("#nombre").val();
        let telf = $("#telf").val();
        let email = $("#email").val();
        let dte = $("#dte").val();
        let iva = $("#iva").val();

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
    let article = "";
    let uni = "";
    let preu = "";
    let subtotal = "";
    let acc = "";

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
    let filastaulaArticles = {};

    // Obtener todas las filas de allArticles2 y almacenarlas en el objeto por código (codi)
    $("#taulaArticles tbody tr").each(function() {
        let codi = $(this).find('td:eq(0)').text();
        filastaulaArticles[codi] = $(this);
    });

    // Recorrer todas las filas de la tabla editableData
    $("#editableData tbody tr").each(function() {
        // Obtener los datos de la fila actual
        let codi = $(this).find('td:eq(0)').text();
        let article = $(this).find('td:eq(1)').text();
        let uni = $(this).find('td:eq(2)').text();
        let preu = $(this).find('td:eq(3)').text();
        let subtotal = $(this).find('td:eq(4)').text();
        // Crear un nuevo objeto Articulo con los datos de la fila
        let nuevoArticulo = new Articulo(codi, article, uni, preu, subtotal);
        // Obtener la fila correspondiente en allArticles2
        let filataulaArticles = filastaulaArticles[codi];
        // Verificar si la fila actual existe en allArticles2
        if (filataulaArticles && filataulaArticles.length) {

            // Verificar si algo ha cambiado en la fila actual en comparación con allArticles2
            let filaMiTabla = $(this).html();
            let filataulaArticlesHTML = filataulaArticles.html();
            if (filaMiTabla !== filataulaArticlesHTML) {
                // Si algo ha cambiado, reemplazar la fila en allArticles2
                filataulaArticles.replaceWith("<tr>" + filaMiTabla + "</tr>");

            }
            // Eliminar la fila de allArticles2 del objeto para indicar que ya ha sido procesada
            delete filastaulaArticles[codi];
        } else {
            nuevoArticulo.addToAllArticlesTable();
        }
    });

    // Agregar las filas restantes de allArticles2 que no están presentes en editableData
    for (let codi in filastaulaArticles) {
        $("#taulaArticles tbody").append(filastaulaArticles[codi]);
    }
    let nFac = 0;
    nFac = numero_de_factura;
        // Obtener la fila de la factura correspondiente en la tabla de facturas
        var facturaRow = $('#dataTable tbody tr').filter(function() {
            return $(this).find('td:first-child').text() === nFac.toString();
        });

        // Verificar si se encontró la factura
        if (facturaRow.length > 0) {
            // Actualizar el subtotal de la factura correspondiente
            facturaRow.find('td:nth-child(7)').text(subtotal_T);
        } else {
            console.log("No se encontró la factura con el número: " + nFac);
        }
    subtotal_T = 0;
    const resum = document.getElementById("articles");
    resum.close();
});


$(document).ready(function() {
    // Agregar evento de clic al botón para convertir la tabla a JSON
    $("#convertirJsonBtn").click(function() {
        // Obtener los datos de la tabla y convertirlos a JSON
        let jsonData = convertirTablaAJson();
    });




    // Función para convertir los datos de la tabla a JSON
// Función para convertir los datos de las tablas a JSON
function convertirTablaAJson() {
    let jsonData = [];

    // Iterar sobre las filas de la tabla de facturas
    $('#dataTable tbody tr').each(function(index, facturaRow) {
        let facturaData = {};
        let facturaCells = $(facturaRow).find('td');

        // Obtener el número de factura
        let numFactura = $(facturaCells[0]).text();

        // Inicializar el array de artículos asociados a esta factura
        let articlesData = [];

        // Iterar sobre las filas de la tabla de artículos
        $('#articlesTotals tbody tr').each(function(index, articleRow) {
            let articleCells = $(articleRow).find('td');
            let codArticulo = $(articleCells[0]).text();

            // Si el código del artículo comienza con el número de factura
            if (codArticulo.startsWith(numFactura + "-")) {
                let articuloData = {
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

            // Convertir el objeto JSON a una cadena
            const jsonDataString = JSON.stringify(jsonData, null, 2);

            // Nombre del archivo JSON
            const filename = 'datos.json';

            descargarJson(jsonDataString, filename);
    
    return jsonData;
}

});
        // Función para descargar el JSON
        function descargarJson(jsonData, filename) {
            // Crear un enlace temporal
            const enlace = document.createElement('a');
            enlace.href = URL.createObjectURL(new Blob([jsonData], { type: 'application/json' }));
            enlace.download = filename;
            
            // Hacer clic en el enlace para descargar el archivo
            enlace.click();
        }
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
    $('#novaFactura').click(function() {
        // Actualizar el número de factura en el diálogo antes de mostrarlo
        actualizarNumeroFacturaEnDialog();
        // Mostrar el diálogo
    });
});

    $(document).on("click", "#eliminarTables", function() {
        let fila = $(this).closest("tr"); // Busca la fila más cercana al botón clickeado
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
    let autoincremental = 1;
    $("#editableData tbody tr").each(function() {
        let numeroFactura = parseInt($(this).find('td:eq(1)').text());
        if (numeroFactura > autoincremental) {
            autoincremental = numeroFactura;
        }
        autoincremental = autoincremental + 1;
    });
    return numero_de_factura + "-" + autoincremental;
}

