<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['email']) && isset($_POST['id_contatto'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$email = sanitizza($_POST['email']);
		$id_contatto = intval(sanitizza($_POST['id_contatto']));
		$controllo = 0;
		$messaggio = "";
		if($email == "" || $email == "null"){
			$controllo = 1;
			$messaggio .= "Nessun indirizzo e-mail inserito.<br>";
		}

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		//controllo effettuato solo sul server
		if($id_contatto == 0){
			$controllo = 1;
			$messaggio .= "Il contatto selezionato non &egrave; valido.<br>";
		}

		//controllo effettuato solo sul server
		$inserito = estrai("indirizzi_email",["indirizzo_email"],[$email]);
		if(count($inserito) > 0){
			$inserito1 = estrai("possedere_2",["id_contatto","id_indirizzo"],[$id_contatto,$inserito[0]['id_indirizzo']]);
			if(count($inserito1) > 0){
				$controllo = 1;
				$messaggio .= "L'indirizzo e-mail inserito è già associato al contatto selezionato.<br>";
			}
		}

		if($controllo == 0){
			$presente = estrai("indirizzi_email",["indirizzo_email"],[$email]);
			if(count($presente) > 0){
				$risultato1 = inserisci("possedere_2",["id_contatto","id_indirizzo"],[$id_contatto,$presente[0]['id_indirizzo']],"Indirizzo e-mail inserito correttamente.<br>");
				if($risultato1 != null){
					$messaggio .= $risultato1;
				}else{
					$controllo = 1;
					$messaggio .= "Errore di inserimento dell'indirizzo e-mail.<br>";
				}
			}else{
				$risultato2 = inserisci("indirizzi_email",["indirizzo_email"],[$email],"Indirizzo e-mail creato correttamente.<br>");
				if($risultato2 != null){
					$messaggio .= $risultato2;
					$dettaglio_email = estrai("indirizzi_email",["indirizzo_email"],[$email]);
					$risultato3 = inserisci("possedere_2",["id_contatto","id_indirizzo"],[$id_contatto,$dettaglio_email[0]['id_indirizzo']],"Indirizzo e-mail associato al contatto correttamente.<br>");
					if($risultato3 != null){
						$messaggio .= $risultato3;
					}else{
						$controllo = 1;
						$messaggio .= "Errore di associazione dell'indirizzo e-mail all'utente.<br>";
					}
				}else{
					$controllo = 1;
					$messaggio .= "Errore di creazione dell'indirizzo e-mail.<br>";
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