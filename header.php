<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="author" content="Antonio Tassone">
<meta name="description" content="Applicazione web semplice che serve a gestire una piccola rubrica domestica.">
<meta name="keywords" content="applicazione,web,javascript,php,rubrica,contatti,contatto">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>
Rubrica personale
</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="gestione_cookie.js"></script>
<script src="funzioni.js"></script>
<script src="codice_tema.js"></script>
<?php
$link = $_SERVER["PHP_SELF"];
$pagine = ["amministrazione.php","archivio_regioni.php","archivio_province.php","archivio_comuni.php"];
$presente = false;
for($i = 0;$i < count($pagine);$i++){
	$posizione = strpos($link,$pagine[$i],0);
	if($posizione > 0){
		$presente = true;
	}
}
if($presente === true){
?>
<script src="codice_amministrazione.js"></script>
<?php
}else{
?>
<script src="codice_rubrica.js"></script>
<?php
}
?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" type="text/css">
<script>
let tema = vedi_tema_impostato();
switch(tema){
	case "tema1":
		document.write('<link rel="stylesheet" href="stile1.css" type="text/css">');
		break;
	case "tema2":
		document.write('<link rel="stylesheet" href="stile2.css" type="text/css">');
		break;
	default:
		document.write('<link rel="stylesheet" href="stile1.css" type="text/css">');
		break;
}
</script>
</head>
<?php
if($presente === true){
?>
<body>
<?php
}else{
?>
<body onload="caricamento_applicazione()">
<?php
}
?>
<section class="section">
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="menu_principale">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>
		<div id="menu_principale" class="navbar-menu">
			<div class="navbar-start">
				<a href="index.php" class="navbar-item">Homepage</a>
				<a href="javascript:cambia_tema()" class="navbar-item">Cambia il tema grafico</a>
				<a href="amministrazione.php" class="navbar-item">Pannello di amministrazione</a>
			</div>
			<div class="navbar-end"></div>
		</div>
	</nav>
	<div id="container">