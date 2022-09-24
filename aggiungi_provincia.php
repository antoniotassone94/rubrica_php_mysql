<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['nome']) && isset($_POST['sigla']) && isset($_POST['id_regione'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$nome = sanitizza($_POST['nome']);
		$sigla = sanitizza($_POST['sigla']);
		$id_regione = intval(sanitizza($_POST['id_regione']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		//controllo effettuato solo sul server
		if($id_regione <= 0){
			$controllo = 1;
			$messaggio .= "La regione selezionata non &egrave; valida.<br>";
		}

		if($nome == "" || $nome == "null"){
			$controllo = 1;
			$messaggio .= "Non &egrave; stato inserito il nome della nuova provincia.<br>";
		}

		//controllo effettuato solo sul server
		$inserito = estrai("province",["nome","sigla","id_regione"],[$nome,$sigla,$id_regione]);
		if(count($inserito) > 0){
			$controllo = 1;
			$messaggio .= "Nella regione selezionata la provincia &egrave; gi&agrave; presente in archivio.<br>";
		}

		if($sigla == ""){
			$controllo = 1;
			$messaggio .= "Inserire la sigla automobilistica della provincia.<br>";
		}else{
			if(strlen($sigla) > 3){
				$controllo = 1;
				$messaggio .= "La sigla non pu&ograve; contenere pi&ugrave; di 3 caratteri.<br>";
			}
		}

		if($controllo == 0){
			$risultato = inserisci("province",["nome","sigla","id_regione"],[$nome,$sigla,$id_regione],"Provincia creata correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante la creazione della provincia.<br>";
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