<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['id_comune'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$id_comune = intval(sanitizza($_POST['id_comune']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		//controllo effettuato solo sul server
		if($id_comune <= 0){
			$controllo = 1;
			$messaggio .= "Il comune selezionato non &egrave; valido.<br>";
		}

		//controllo effettuato solo sul server
		$numero_contatti = estrai("contatti",["id_comune"],[$id_comune]);
		if(count($numero_contatti) > 0){
			$controllo = 1;
			$messaggio .= "Esistono contatti che vivono nel comune selezionato, impossibile eliminarlo.<br>";
		}

		if($controllo == 0){
			$risultato = elimina("comuni","id_comune",$id_comune,"Comune eliminato correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante l'eliminazione del comune.<br>";
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