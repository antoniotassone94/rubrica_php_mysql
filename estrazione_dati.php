<?php
require("funzioni.php");
$elenco_contatti = estrai("contatti");
$numeri_telefono = [];
$indirizzi_email = [];
foreach($elenco_contatti as $contatto){
	$elenco_numeri = estrai("possedere_1",["id_contatto"],[$contatto['id_contatto']]);
	for($i = 0;$i < count($elenco_numeri);$i++){
		$dettaglio_numero = estrai("numeri_telefono",["id_numero"],[$elenco_numeri[$i]['id_numero']]);
		$elenco_numeri[$i]["numero_telefono"] = $dettaglio_numero[0]["numero_telefono"];
	}
	array_push($numeri_telefono,$elenco_numeri);
	$elenco_email = estrai("possedere_2",["id_contatto"],[$contatto['id_contatto']]);
	for($i = 0;$i < count($elenco_email);$i++){
		$dettaglio_email = estrai("indirizzi_email",["id_indirizzo"],[$elenco_email[$i]['id_indirizzo']]);
		$elenco_email[$i]["indirizzo_email"] = $dettaglio_email[0]["indirizzo_email"];
	}
	array_push($indirizzi_email,$elenco_email);
}
echo json_encode(["elenco_contatti" => $elenco_contatti,"numeri_telefono" => $numeri_telefono,"indirizzi_email" => $indirizzi_email]);
?>