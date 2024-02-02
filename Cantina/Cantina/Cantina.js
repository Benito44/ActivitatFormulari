"use strict";

let json = JSON.parse(data);

// Ahora puedes acceder a los datos en el JSON
console.log(json.factures[0].Client);
function init() {}
class JSONTable {
	constructor(tableId, fileInputId) {
	  this.table = document.getElementById(tableId);
	  this.fileInput = document.getElementById(fileInputId);
	  this.fileInput.addEventListener('change', this.importJSON.bind(this));
	}
  
	importJSON() {
	  const file = this.fileInput.files[0];
	  const reader = new FileReader();
  
	  reader.onload = (event) => {
		const jsonData = JSON.parse(event.target.result);
		this.renderTable(jsonData);
	  };
  
	  reader.readAsText(file);
	}
  
	renderTable(data) {
	  const tbody = this.table.querySelector('tbody');
	  tbody.innerHTML = '';
	  if (Array.isArray(data)) {
	  data.forEach(item => {
		const row = document.createElement('tr');
		row.innerHTML = `
		  <td>${item.Num}</td>
		  <td>${item.Data}</td>
		  <td>${item.NIF}</td>
		  <td>${item.Client}</td>
		  <td>${item.Telefon}</td>
		  <td>${item.Email}</td>
		  <td>${item.subtotal}</td>
		  <td>${item.Dte}</td>
		  <td>${item['Base I.']}</td>
		  <td>${item.IVA}</td>
		  <td>${item.Total}</td>
		  <td>${item.P}</td>
		`;
		tbody.appendChild(row);
	  });
	}
  }
}
  const jsonTable = new JSONTable('dataTable', 'fileInput');
  
  
  
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
