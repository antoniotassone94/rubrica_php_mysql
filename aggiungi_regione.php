<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['nome'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$nome = sanitizza($_POST['nome']);
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		if($nome == "" || $nome == "null"){
			$controllo = 1;
			$messaggio .= "Non &egrave; stato inserito il nome della nuova regione.<br>";
		}else{

			//controllo effettuato solo sul server
			$inserito = estrai("regioni",["nome"],[$nome]);
			if(count($inserito) > 0){
				$controllo = 1;
				$messaggio .= "La regione &egrave; gi&agrave; presente in archivio.<br>";
			}

		}

		if($controllo == 0){
			$risultato = inserisci("regioni",["nome"],[$nome],"Regione creata correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante la creazione della regione.<br>";
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