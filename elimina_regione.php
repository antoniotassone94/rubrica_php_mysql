<?php
session_start();
if($_SERVER['REQUEST_METHOD'] == "POST"){
	if(isset($_POST['token']) && isset($_POST['id_regione'])){
		require("funzioni.php");
		$token = sanitizza($_POST['token'],false);
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

		//controllo effettuato solo sul server
		$conteggio = 0;
		$elenco_province = estrai("province",["id_regione"],[$id_regione]);
		foreach($elenco_province as $provincia){
			$elenco_comuni = estrai("comuni",["id_provincia"],[$provincia["id_provincia"]]);
			foreach($elenco_comuni as $comune){
				$numero_contatti = estrai("contatti",["id_comune"],[$comune["id_comune"]]);
				if(count($numero_contatti) > 0){
					$conteggio++;
				}
			}
		}
		if($conteggio > 0){
			$controllo = 1;
			$messaggio .= "Esistono contatti che vivono nella regione selezionata, impossibile eliminarla.<br>";
		}

		if($controllo == 0){
			$messaggio1 = "";
			foreach($elenco_province as $provincia){
				$risultato1 = elimina("comuni","id_provincia",$provincia["id_provincia"],"Comuni della regione eliminati correttamente.<br>");
				if($risultato1 != null){
					$messaggio1 = $risultato1;
				}else{
					$controllo = 1;
					$messaggio1 = "Errore durante l'eliminazione dei comuni della regione.<br>";
				}
			}
			$messaggio .= $messaggio1;
			$risultato2 = elimina("province","id_regione",$id_regione,"Province della regione eliminate correttamente.<br>");
			if($risultato2 != null){
				$messaggio .= $risultato2;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante l'eliminazione delle province della regione.<br>";
			}
			$risultato3 = elimina("regioni","id_regione",$id_regione,"Regione eliminata correttamente.<br>");
			if($risultato3 != null){
				$messaggio .= $risultato3;
			}else{
				$controllo = 1;
				$messaggio .= "Errore durante l'eliminazione della regione.<br>";
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