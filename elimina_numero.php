<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['id_numero']) && isset($_POST['id_contatto'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$id_numero = intval(sanitizza($_POST['id_numero']));
		$id_contatto = intval(sanitizza($_POST['id_contatto']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		//controllo effettuato solo sul server
		if($id_numero == 0){
			$controllo = 1;
			$messaggio .= "Il numero di telefono selezionato non &egrave; valido.<br>";
		}

		//controllo effettuato solo sul server
		if($id_contatto == 0){
			$controllo = 1;
			$messaggio .= "Il contatto selezionato non &egrave; valido.<br>";
		}

		if($controllo == 0){
			$numero_utenti = estrai("possedere_1",["id_numero"],[$id_numero]);
			if(count($numero_utenti) > 1){
				$sql1 = "DELETE FROM possedere_1 WHERE id_contatto = '".$id_contatto."' AND id_numero = '".$id_numero."'";
				$risultato1 = esegui($sql1);
				if($risultato1){
					$messaggio .= "Associazione con il numero di telefono eliminata correttamente.<br>";
				}else{
					$controllo = 1;
					$messaggio .= "Impossibile eliminare l'associazione tra il numero di telefono ed il contatto.<br>";
				}
			}else{
				$sql2 = "DELETE FROM possedere_1 WHERE id_contatto = '".$id_contatto."' AND id_numero = '".$id_numero."'";
				$risultato2 = esegui($sql2);
				if($risultato2){
					$messaggio .= "Associazione con il numero di telefono eliminata correttamente.<br>";
					$risultato3 = elimina("numeri_telefono","id_numero",$id_numero,"Numero di telefono eliminato correttamente.<br>");
					if($risultato3 != null){
						$messaggio .= $risultato3;
					}else{
						$controllo = 1;
						$messaggio = "Impossibile eliminare il numero di telefono.<br>";
					}
				}else{
					$controllo = 1;
					$messaggio .= "Impossibile eliminare l'associazione tra il numero di telefono ed il contatto.<br>";
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