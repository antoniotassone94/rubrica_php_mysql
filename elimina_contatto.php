<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['id_contatto'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$id_contatto = intval(sanitizza($_POST['id_contatto']));
		$controllo = 0;
		$messaggio = "";

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

		if($controllo == 0){
			//eliminazione dei numeri di telefono del contatto
			$elenco_numeri = estrai("possedere_1",["id_contatto"],[$id_contatto]);
			$messaggio1 = "";
			$messaggio2 = "";
			foreach($elenco_numeri as $numero){
				$numero_utenti1 = estrai("possedere_1",["id_numero"],[$numero['id_numero']]);
				if(count($numero_utenti1) > 1){
					$sql1 = "DELETE FROM possedere_1 WHERE id_contatto = '".$id_contatto."' AND id_numero = '".$numero['id_numero']."'";
					$risultato1 = esegui($sql1);
					if($risultato1){
						$messaggio1 = "Associazione con il numero di telefono eliminata correttamente.<br>";
					}else{
						$controllo = 1;
						$messaggio1 = "Impossibile eliminare l'associazione tra il numero di telefono ed il contatto.<br>";
					}
				}else{
					$sql2 = "DELETE FROM possedere_1 WHERE id_contatto = '".$id_contatto."' AND id_numero = '".$numero['id_numero']."'";
					$risultato2 = esegui($sql2);
					if($risultato2){
						$messaggio1 = "Associazione con il numero di telefono eliminata correttamente.<br>";
						$risultato3 = elimina("numeri_telefono","id_numero",$numero['id_numero'],"Numero di telefono eliminato correttamente.<br>");
						if($risultato3 != null){
							$messaggio2 .= $risultato3;
						}else{
							$controllo = 1;
							$messaggio2 = "Impossibile eliminare il numero di telefono.<br>";
						}
					}else{
						$controllo = 1;
						$messaggio1 = "Impossibile eliminare l'associazione tra il numero di telefono ed il contatto.<br>";
					}
				}
			}
			$messaggio .= $messaggio1;
			$messaggio .= $messaggio2;

			//eliminazione indirizzi e-mail del contatto
			$elenco_email = estrai("possedere_2",["id_contatto"],[$id_contatto]);
			foreach($elenco_email as $email){
				$numero_utenti2 = estrai("possedere_2",["id_indirizzo"],[$email['id_indirizzo']]);
				if(count($numero_utenti2) > 1){
					$sql4 = "DELETE FROM possedere_2 WHERE id_contatto = '".$id_contatto."' AND id_indirizzo = '".$email['id_indirizzo']."'";
					$risultato4 = esegui($sql4);
					if($risultato4){
						$messaggio1 = "Associazione con l'indirizzo e-mail eliminata correttamente.<br>";
					}else{
						$controllo = 1;
						$messaggio1 = "Impossibile eliminare l'associazione tra l'indirizzo e-mail ed il contatto.<br>";
					}
				}else{
					$sql5 = "DELETE FROM possedere_2 WHERE id_contatto = '".$id_contatto."' AND id_indirizzo = '".$email['id_indirizzo']."'";
					$risultato5 = esegui($sql5);
					if($risultato5){
						$messaggio1 = "Associazione con l'indirizzo e-mail eliminata correttamente.<br>";
						$risultato6 = elimina("indirizzi_email","id_indirizzo",$email['id_indirizzo'],"Indirizzo e-mail eliminato correttamente.<br>");
						if($risultato6 != null){
							$messaggio2 .= $risultato6;
						}else{
							$controllo = 1;
							$messaggio2 = "Impossibile eliminare l'indirizzo e-mail.<br>";
						}
					}else{
						$controllo = 1;
						$messaggio1 = "Impossibile eliminare l'associazione tra l'indirizzo e-mail ed il contatto.<br>";
					}
				}
			}
			$messaggio .= $messaggio1;
			$messaggio .= $messaggio2;

			//eliminazione del contatto
			$risultato7 = elimina("contatti","id_contatto",$id_contatto,"Contatto eliminato correttamente.<br>");
			if($risultato7 != null){
				$messaggio .= $risultato7;
			}else{
				$controllo = 1;
				$messaggio .= "Errore di eliminazione del contatto.<br>";
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