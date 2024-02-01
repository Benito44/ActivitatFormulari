"use strict";

function init() {}
document.getElementById('importJSON').addEventListener('click', function() {
	const fileInput = document.getElementById('fileInput');
	
	// Verificar si se ha seleccionado un archivo
	if (fileInput.files.length === 0) {
	  alert('Por favor selecciona un archivo JSON.');
	  return;
	}
	
	const file = fileInput.files[0];
	const reader = new FileReader();
  
	reader.onload = function(event) {
	  const jsonData = JSON.parse(event.target.result);
	  renderTable(jsonData);
	};
  
	reader.readAsText(file);
  });
  
  function renderTable(data) {
	const tbody = document.querySelector('#dataTable tbody');
	tbody.innerHTML = '';
  
	data.forEach(item => {
	  const row = document.createElement('tr');
	  row.innerHTML = `
		<td>${item.Num}</td>
		<td>${item.Data}</td>
		<td>${item.NIF}</td>
		<td>${item.Client}</td>
		<td>${item.Telefon}</td>
		<td>${item['E-mail']}</td>
		<td>${item.Subtotal}</td>
		<td>${item.Dte}</td>
		<td>${item['Base I']}</td>
		<td>${item.IVA}</td>
		<td>${item.Total}</td>
		<td>${item.P}</td>
		<td>${item.Acc}</td>
	  `;
	  tbody.appendChild(row);
	});
  }
  
  
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
