<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['id_provincia'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
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

		//controllo effettuato solo sul server
		$conteggio = 0;
		$elenco_comuni = estrai("comuni",["id_provincia"],[$id_provincia]);
		foreach($elenco_comuni as $comune){
			$numero_contatti = estrai("contatti",["id_comune"],[$comune["id_comune"]]);
			if(count($numero_contatti) > 0){
				$conteggio++;
			}
		}
		if($conteggio > 0){
			$controllo = 1;
			$messaggio .= "Esistono contatti che vivono nella provincia selezionata, impossibile eliminarla.<br>";
		}

		if($controllo == 0){
			$risultato1 = elimina("comuni","id_provincia",$id_provincia,"Comuni della provincia eliminati correttamente.<br>");
			if($risultato1 != null){
				$messaggio .= $risultato1;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante l'eliminazione dei comuni della provincia.<br>";
			}
			$risultato2 = elimina("province","id_provincia",$id_provincia,"Provincia eliminata correttamente.<br>");
			if($risultato2 != null){
				$messaggio .= $risultato2;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante l'eliminazione della provincia.<br>";
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