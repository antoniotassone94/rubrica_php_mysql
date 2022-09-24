<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['email']) && isset($_POST['id_indirizzo']) && isset($_POST['id_contatto'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$email = sanitizza($_POST['email']);
		$id_indirizzo = intval(sanitizza($_POST['id_indirizzo']));
		$id_contatto = intval(sanitizza($_POST['id_contatto']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		if($email == "" || $email == "null"){
			$controllo = 1;
			$messaggio .= "Nessun indirizzo e-mail inserito.<br>";
		}

		//controllo effettuato solo sul server
		if($id_indirizzo == 0){
			$controllo = 1;
			$messaggio .= "L'indirizzo e-mail selezionato non &egrave; valido.<br>";
		}

		//controllo effettuato solo sul server
		if($id_contatto == 0){
			$controllo = 1;
			$messaggio .= "Il contatto selezionato non &egrave; valido.<br>";
		}

		if($controllo == 0){
			$numero_utenti = estrai("possedere_2",["id_indirizzo"],[$id_indirizzo]);
			if(count($numero_utenti) > 1){
				$sql2 = "DELETE FROM possedere_2 WHERE id_contatto = '".$id_contatto."' AND id_indirizzo = '".$id_indirizzo."'";
				$risultato2 = esegui($sql2);
				if($risultato2){
					$messaggio .= "Associazione con l'indirizzo e-mail eliminata correttamente.<br>";
				}else{
					$controllo = 1;
					$messaggio .= "Impossibile eliminare l'associazione tra l'indirizzo e-mail ed il contatto.<br>";
				}
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

			}else{
				$presente = estrai("indirizzi_email",["indirizzo_email"],[$email]);
				if(count($presente) > 0){
					$sql2 = "DELETE FROM possedere_2 WHERE id_contatto = '".$id_contatto."' AND id_indirizzo = '".$id_indirizzo."'";
					$risultato2 = esegui($sql2);
					if($risultato2){
						$messaggio .= "Associazione con l'indirizzo e-mail eliminata correttamente.<br>";
						$risultato3 = elimina("indirizzi_email","id_indirizzo",$id_indirizzo,"Indirizzo e-mail eliminato correttamente.<br>");
						if($risultato3 != null){
							$messaggio .= $risultato3;
						}else{
							$controllo = 1;
							$messaggio = "Impossibile eliminare l'indirizzo e-mail.<br>";
						}
					}else{
						$controllo = 1;
						$messaggio .= "Impossibile eliminare l'associazione tra l'indirizzo e-mail ed il contatto.<br>";
					}
					$risultato1 = inserisci("possedere_2",["id_contatto","id_indirizzo"],[$id_contatto,$presente[0]['id_indirizzo']],"Indirizzo e-mail inserito correttamente.<br>");
					if($risultato1 != null){
						$messaggio .= $risultato1;
					}else{
						$controllo = 1;
						$messaggio .= "Errore di inserimento dell'indirizzo e-mail.<br>";
					}
				}else{
					$risultato = modifica("indirizzi_email","indirizzo_email",$email,"id_indirizzo",$id_indirizzo,"Indirizzo e-mail modificato correttamente.<br>");
					if($risultato != null){
						$messaggio .= $risultato;
					}else{
						$controllo = 1;
						$messaggio .= "Impossibile modificare l'indirizzo e-mail.<br>";
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