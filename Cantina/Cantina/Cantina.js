"use strict";

	const profes = [
		"Josep Bassó",
		"Montserrat Bermúdez",
		"Josep Maria Boix",
		"Josep Catà",
		"Sílvia Fortuny",
		"Cristina Gómez",
		"Xavier Martín",
		"José Moreno",
		"Josep Oliveras",
		"Manel Pérez",
		"Ricard Pla",
		"Joan Pou",
		"Isaac Pulí",
		"Albert Salse",
		"Pere Sánchez",
		"Cristina Soler",
		"Robert Ventura",
	];



const primers = [
	"Amanida catalana",
	"Saltejat de verdures",
	"Sopa minestrone",
	"Crema de carabassa",
	"Pèsols amb pernil",
];

const segons = [
	"Macarrons",
	"Canalons",
	"Paella",
	"Fideuà",
	"Pollastre al curry",
	"Llibrets de llom",
	"Estofat de vedella",
	"Lluç a la planxa",
];

const gracies = "<div class='especial'>MOLTES GRÀCIES!</div>";



function init() {}

document.getElementById("tancar").addEventListener("click", reservaF);
document.getElementById("tancar2").addEventListener("click", platsDiaF);
document.getElementById("apuntar").addEventListener("click", reservaT);
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

	const profe = document.getElementById("profe");
	for (let i = 0; i < profes.length; i++){
		const option = document.createElement("option");
		option.text = profes[i];
		profe.appendChild(option);

	}
	const primer = document.getElementById("primer");
	for (let i = 0; i < primers.length; i++){
		const option = document.createElement("option");
		option.text = primers[i];
		primer.appendChild(option);

	}
	const segon = document.getElementById("segon");
	for (let i = 0; i < segons.length; i++){
		const option = document.createElement("option");
		option.text = segons[i];
		segon.appendChild(option);
	}
	
document.getElementById("primer").addEventListener("change", primerPreu);
document.getElementById("segon").addEventListener("change", segonPreu);

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
