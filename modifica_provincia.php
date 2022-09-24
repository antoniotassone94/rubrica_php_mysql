<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['dato']) && isset($_POST['valore']) && isset($_POST['id_provincia'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$dato = sanitizza($_POST['dato']);
		$valore = sanitizza($_POST['valore']);
		$id_provincia = intval(sanitizza($_POST['id_provincia']));
		$controllo = 0;
		$messaggio = "";

		//controllo effettuato solo sul server
		if($token != $_SESSION['token']){
			$controllo = 1;
			$messaggio .= "Utente non autorizzato a procedere nell'operazione.<br>";
		}

		if($dato == ""){
			$controllo = 1;
			$messaggio .= "Selezionare il dato da modificare.<br>";
		}
		if($valore == ""){
			$controllo = 1;
			$messaggio .= "Scrivere il nuovo valore del dato selezionato.<br>";
		}

		//controllo effettuato solo sul server
		if($id_provincia <= 0){
			$controllo = 1;
			$messaggio .= "La provincia selezionata non &egrave; valida.<br>";
		}else{

			//controllo effettuato solo sul server
			$dettaglio_provincia = estrai("province",["id_provincia"],[$id_provincia]);
			if($dato == "nome"){
				$numero_utenti = estrai("province",["nome","sigla","id_regione"],[$valore,$dettaglio_provincia[0]['sigla'],$dettaglio_provincia[0]['id_regione']]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica la provincia risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			if($dato == "sigla"){
				$numero_utenti = estrai("province",["nome","sigla","id_regione"],[$dettaglio_provincia[0]['nome'],$valore,$dettaglio_provincia[0]['id_regione']]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica la provincia risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			if($dato == "id_regione"){
				$numero_utenti = estrai("province",["nome","sigla","id_regione"],[$dettaglio_provincia[0]['nome'],$dettaglio_provincia[0]['sigla'],$valore]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica la provincia risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			$modifica_non_necessaria = estrai("province",["id_provincia",$dato],[$id_provincia,$valore]);
			if(count($modifica_non_necessaria) > 0){
				$controllo = 1;
				$messaggio .= "Impossibile modificare ";
				if($dato == "nome"){
					$messaggio .= "il ".$dato;
				}else{
					if($dato == "sigla"){
						$messaggio .= "la ".$dato;
					}else{
						$messaggio .= "la regione di riferimento";
					}
				}
				$messaggio .= ", dopo la modifica il suo valore non cambierebbe.<br>";
			}
		}

		if($controllo == 0){
			$risultato = modifica("province",$dato,$valore,"id_provincia",$id_provincia,"Provincia modificata correttamente.<br>");
			if($risultato != null){
				$messaggio .= $risultato;
			}else{
				$controllo = 1;
				$messaggio .= "Errore di esecuzione della query.<br>";
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