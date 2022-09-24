<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['nome']) && isset($_POST['id_provincia'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$nome = sanitizza($_POST['nome']);
		$id_provincia = intval(sanitizza($_POST['id_provincia']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		//controllo effettuato solo sul server
		if($id_provincia <= 0){
			$controllo = 1;
			$messaggio .= "La provincia selezionata non &egrave; valida.<br>";
		}

		if($nome == "" || $nome == "null"){
			$controllo = 1;
			$messaggio .= "Non &egrave; stato inserito il nome del nuovo comune.<br>";
		}

		//controllo effettuato solo sul server
		$inserito = estrai("comuni",["nome","id_provincia"],[$nome,$id_provincia]);
		if(count($inserito) > 0){
			$controllo = 1;
			$messaggio .= "Nella provincia selezionata il comune &egrave; gi&agrave; presente in archivio.<br>";
		}

		if($controllo == 0){
			$risultato = inserisci("comuni",["nome","id_provincia"],[$nome,$id_provincia],"Comune creato correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante la creazione del comune.<br>";
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