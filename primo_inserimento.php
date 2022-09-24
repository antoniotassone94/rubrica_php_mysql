<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['telefono']) && isset($_POST['email']) && isset($_POST['id_contatto'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$telefono = sanitizza($_POST['telefono']);
		$email = sanitizza($_POST['email']);
		$id_contatto = sanitizza($_POST['id_contatto']);
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		if($telefono == "" && $email == ""){
			$controllo = 1;
			$messaggio .= "Compilare almeno uno dei due campi a disposizione.<br>";
		}

		//controllo effettuato solo sul server
		if($id_contatto == ""){
			$controllo = 1;
			$messaggio .= "Il contatto selezionato non &egrave; disponibile.<br>";
		}

		if($controllo == 0){
			if($telefono != ""){
				$presente1 = estrai("numeri_telefono",["numero_telefono"],[$telefono]);
				if(count($presente1) > 0){
					$risultato1 = inserisci("possedere_1",["id_contatto","id_numero"],[$id_contatto,$presente1[0]['id_numero']],"Numero di telefono inserito correttamente.<br>");
					if($risultato1 != null){
						$messaggio .= $risultato1;
					}else{
						$controllo = 1;
						$messaggio .= "Errore di inserimento del numero di telefono.<br>";
					}
				}else{
					$risultato2 = inserisci("numeri_telefono",["numero_telefono"],[$telefono],"Numero di telefono creato correttamente.<br>");
					if($risultato2 != null){
						$messaggio .= $risultato2;
						$dettaglio_telefono = estrai("numeri_telefono",["numero_telefono"],[$telefono]);
						$risultato3 = inserisci("possedere_1",["id_contatto","id_numero"],[$id_contatto,$dettaglio_telefono[0]['id_numero']],"Numero di telefono associato al contatto correttamente.<br>");
						if($risultato3 != null){
							$messaggio .= $risultato3;
						}else{
							$controllo = 1;
							$messaggio .= "Errore di associazione del numero di telefono all'utente.<br>";
						}
					}else{
						$controllo = 1;
						$messaggio .= "Errore di creazione del numero di telefono.<br>";
					}
				}
			}
			if($email != ""){
				$presente2 = estrai("indirizzi_email",["indirizzo_email"],[$email]);
				if(count($presente2) > 0){
					$risultato4 = inserisci("possedere_2",["id_contatto","id_indirizzo"],[$id_contatto,$presente2[0]['id_indirizzo']],"Indirizzo e-mail inserito correttamente.<br>");
					if($risultato4 != null){
						$messaggio .= $risultato4;
					}else{
						$controllo = 1;
						$messaggio .= "Errore di inserimento dell'indirizzo e-mail.<br>";
					}
				}else{
					$risultato5 = inserisci("indirizzi_email",["indirizzo_email"],[$email],"Indirizzo e-mail creato correttamente.<br>");
					if($risultato5 != null){
						$messaggio .= $risultato5;
						$dettaglio_email = estrai("indirizzi_email",["indirizzo_email"],[$email]);
						$risultato6 = inserisci("possedere_2",["id_contatto","id_indirizzo"],[$id_contatto,$dettaglio_email[0]['id_indirizzo']],"Indirizzo e-mail associato al contatto correttamente.<br>");
						if($risultato6 != null){
							$messaggio .= $risultato6;
						}else{
							$controllo = 1;
							$messaggio .= "Errore di associazione dell'indirizzo e-mail all'utente.<br>";
						}
					}else{
						$controllo = 1;
						$messaggio .= "Errore di creazione dell'indirizzo e-mail.<br>";
					}
				}
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