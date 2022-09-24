<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['dato']) && isset($_POST['valore']) && isset($_POST['id_comune'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
		$dato = sanitizza($_POST['dato']);
		$valore = sanitizza($_POST['valore']);
		$id_comune = intval(sanitizza($_POST['id_comune']));
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
		if($id_comune <= 0){
			$controllo = 1;
			$messaggio .= "Il comune selezionato non &egrave; valido.<br>";
		}else{

			//controllo effettuato solo sul server
			$dettaglio_comune = estrai("comuni",["id_comune"],[$id_comune]);
			if($dato == "nome"){
				$numero_utenti = estrai("comuni",["nome","id_provincia"],[$valore,$dettaglio_comune[0]['id_provincia']]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica il comune risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			if($dato == "id_provincia"){
				$numero_utenti = estrai("comuni",["nome","id_provincia"],[$dettaglio_comune[0]['nome'],$valore]);
				if(count($numero_utenti) > 0){
					$controllo = 1;
					$messaggio .= "Dopo la modifica il comune risulter&agrave; uguale ad uno gi&agrave; presente in rubrica.<br>";
				}
			}

			//controllo effettuato solo sul server
			$modifica_non_necessaria = estrai("comuni",["id_comune",$dato],[$id_comune,$valore]);
			if(count($modifica_non_necessaria) > 0){
				$controllo = 1;
				$messaggio .= "Impossibile modificare ";
				if($dato == "nome"){
					$messaggio .= "il ".$dato;
				}else{
					$messaggio .= "la provincia di riferimento";
				}
				$messaggio .= ", dopo la modifica il suo valore non cambierebbe.<br>";
			}
		}

		if($controllo == 0){
			$risultato = modifica("comuni",$dato,$valore,"id_comune",$id_comune,"Comune modificato correttamente.<br>");
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