<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['nome']) && isset($_POST['cognome']) && isset($_POST['indirizzo']) && isset($_POST['id_comune'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$nome = sanitizza($_POST['nome']);
		$cognome = sanitizza($_POST['cognome']);
		$indirizzo = sanitizza($_POST['indirizzo']);
		$id_comune = intval(sanitizza($_POST['id_comune']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		if($nome == ""){
			$controllo = 1;
			$messaggio .= "Inserire il nome del nuovo contatto.<br>";
		}
		if($cognome == ""){
			$controllo = 1;
			$messaggio .= "Inserire il cognome del nuovo contatto.<br>";
		}
		if($indirizzo == ""){
			$controllo = 1;
			$messaggio .= "Inserire l'indirizzo del nuovo contatto.<br>";
		}
		if($id_comune <= 0){
			$controllo = 1;
			$messaggio .= "Selezionare il comune di residenza del nuovo contatto.<br>";
		}

		//controllo effettuato solo sul server
		$contatto = estrai("contatti",["nome","cognome","indirizzo","id_comune"],[$nome,$cognome,$indirizzo,$id_comune]);
		if(count($contatto) > 0){
			$controllo = 1;
			$messaggio .= "Contatto gi&agrave; presente in rubrica.<br>";
		}

		if($controllo == 0){
			$risultato = inserisci("contatti",["nome","cognome","indirizzo","id_comune"],[$nome,$cognome,$indirizzo,$id_comune],"Contatto creato correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore di creazione del contatto.<br>";
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