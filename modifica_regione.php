<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['nome']) && isset($_POST['id_regione'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$nome = sanitizza($_POST['nome']);
		$id_regione = intval(sanitizza($_POST['id_regione']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		if($nome == "" || $nome == "null"){
			$controllo = 1;
			$messaggio .= "Scrivere il nuovo nome della regione.<br>";
		}

		//controllo effettuato solo sul server
		if($id_regione <= 0){
			$controllo = 1;
			$messaggio .= "La regione selezionata non &egrave; valida.<br>";
		}

		//controllo effettuato solo sul server
		$dettaglio_regione = estrai("regioni",["nome"],[$nome]);
		if(count($dettaglio_regione) > 0){
			$controllo = 1;
			$messaggio .= "Dopo la modifica la regione risulter&agrave; uguale ad una gi&agrave; presente in rubrica.<br>";
		}

		if($controllo == 0){
			$risultato = modifica("regioni","nome",$nome,"id_regione",$id_regione,"Regione modificata correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore di esecuzione della query.<br>";
			}
			unset($_SESSION['token']);
		}
		echo json_encode(["messaggio" => $messaggio,"controllo" => $controllo]);
	}else{
		echo json_encode(["messaggio" => "Errore interno del server.","controllo" => 1]);
	}
}else{
	echo "Pagina non disponibile.";
}
?>