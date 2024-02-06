
/*
Benito Martínez Florido
Alberto Morcillo Montejo
*/

class Factura {
    constructor(Num, Data, NIF, Client, Telefon, Email, subtotal, Dte, Base_I, IVA, Total, P, Botons, articles) {
        let ultimoNumeroFactura = obtenerUltimoNumeroFactura();
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
                <td tabindex="0" contenteditable="true">${this.Dte}</td>
                <td tabindex="0" contenteditable="true">${this.Base_I}</td>
                <td tabindex="0" contenteditable="true">${this.IVA}</td>
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
    document.getElementById("tancar").addEventListener("click", tancarReserva);
    document.getElementById("tancar2").addEventListener("click", tancarArticles);
    document.getElementById("novaFactura").addEventListener("click", obrirReserva);
    
    const resum = document.getElementById("articles");
    const menu = document.getElementById("menu");

    function tancarReserva() {
        menu.close();
    };
    function obrirReserva() {
        menu.showModal();
    };
    function tancarArticles() {
        resum.close();
    };
    $(document).on("click", "#mostraArticles", function() {
        // Obtener el número de factura asociado al botón clickeado
        let numeroFactura = $(this).closest('tr').find('td:eq(0)').text();
        numero_de_factura = numeroFactura;
        $("#articles tbody").empty();
    
        // Recorrer las filas de la tabla allArticles2
        $("#taulaArticles tbody tr").each(function() {
            let codigoArticulo = $(this).find('td:eq(0)').text();
            // Verificar si el primer carácter del código coincide con el número de factura
            if (codigoArticulo.charAt(0) === numeroFactura) {
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
    
    $("#formulari").submit(function(event) {
        event.preventDefault(); 
        
        let numFactura = $("#numFactura").val();
        let dateFactura = $("#dateFactura").val();
        let pagada = $("#pagada").is(":checked");
        let nif = $("#nif").val();
        let nombre = $("#nombre").val();
        let telf = $("#telf").val();
        let email = $("#email").val();
        let dte = $("#dte").val();
        let iva = $("#iva").val();

        const factura = new Factura(
            numFactura,
            dateFactura,
            nif,
            nombre,
            telf,
            email,
            0, 
            dte,
            0, 
            iva,
            0, 
            pagada,
            null, 
            []
        );

        // Add the factura to the table
        factura.addToTable();
        menu.close();
    });
    
$("#nouArticle").click(function(event) {
    event.preventDefault();
        
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
        factura.addToTable();
});

$("#guardarArticle").click(function(event) {
    event.preventDefault(); 
    let filastaulaArticles = {};

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

    for (let codi in filastaulaArticles) {
        $("#taulaArticles tbody").append(filastaulaArticles[codi]);
    }
    let nFac = 0;
    nFac = numero_de_factura;
        var facturaRow = $('#dataTable tbody tr').filter(function() {
            return $(this).find('td:first-child').text() === nFac.toString();
        });

        // Verificar si se encontró la factura
        if (facturaRow.length > 0) {
            // Actualizar el subtotal de la factura correspondiente
            facturaRow.find('td:nth-child(7)').text(subtotal_T);
            let sub = parseFloat(facturaRow.find('td:nth-child(7)').text());
            let descompte = parseFloat(facturaRow.find('td:nth-child(8)').text());
            sub = sub - ((descompte / 100) * sub);
            let ivaFactura = parseFloat(facturaRow.find('td:nth-child(10)').text());
            let total = sub + ((ivaFactura / 100) * sub); 
            facturaRow.find('td:nth-child(11)').text(total.toFixed(2));
            subtotal_T = 0;
        } else {
            console.log("No se encontró la factura con el número: " + nFac);
        }

    const resum = document.getElementById("articles");
    resum.close();
});


$(document).ready(function() {
    $("#convertirJsonBtn").click(function() {
        let jsonData = convertirTablaAJson();
    });

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
        facturaData.articles = articlesData;

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
            const enlace = document.createElement('a');
            enlace.href = URL.createObjectURL(new Blob([jsonData], { type: 'application/json' }));
            enlace.download = filename;
            
            enlace.click();
        }
$(document).ready(function () {
    // Función para obtener el número actual de la factura
    function obtenerNumeroFacturaActual() {
        let ultimoNumeroFactura = obtenerUltimoNumeroFactura();
        let numeroFacturaActual = ultimoNumeroFactura + 1;
        return numeroFacturaActual;
    }
    
    // Función para actualizar el campo de entrada del número de factura en el diálogo
    function actualizarNumeroFacturaEnDialog() {
        let numeroFacturaActual = obtenerNumeroFacturaActual();
        $('#numFactura').val(numeroFacturaActual);
    }

    $('#novaFactura').click(function() {
        actualizarNumeroFacturaEnDialog();

    });
});

    $(document).on("click", "#eliminarTables", function() {
        let fila = $(this).closest("tr"); // Busca la fila más cercana al botón clickeado
        fila.remove(); // Remueve la fila
    });


function init() {}
$(document).ready(init);
	
$(document).ready(function() {
    $(document).on('dblclick', '.editable', function() {
        $(this).attr('contenteditable', true);
    });
    $(document).on('blur', '.editable', function() {
        $(this).removeAttr('contenteditable');
    });
});

function obtenerUltimoNumeroFactura() {
    let ultimoNumeroFactura = 0;
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