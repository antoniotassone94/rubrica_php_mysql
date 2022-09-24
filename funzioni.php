<?php
function sanitizza($stringa,$limita = true){
	if(is_array($stringa)){
		$array_filtrato = [];
		for($i = 0;$i < count($stringa);$i++){
			if($limita == true){
				//limitazione della lunghezza della stringa in input (max 50 caratteri)
				$lunghezza_massima = 50;
				if(strlen($stringa[$i]) > $lunghezza_massima){
					$stringa[$i] = substr($stringa[$i],0,$lunghezza_massima);
				}
			}
			$array_filtrato[$i] = htmlspecialchars($stringa[$i]);
		}
		return $array_filtrato;
	}else{
		if($limita == true){
			//limitazione della lunghezza della stringa in input (max 50 caratteri)
			$lunghezza_massima = 50;
			if(strlen($stringa) > $lunghezza_massima){
				$stringa = substr($stringa,0,$lunghezza_massima);
			}
		}
		return htmlspecialchars($stringa);
	}
}

function esegui($query){
	require("connessione.php");
	$risultato = mysqli_query($conn,$query);
	mysqli_close($conn);
	return $risultato;
}

function inserisci($tabella,$campi,$valori,$conferma){
	$campi1 = implode(",",$campi);
	$valori1 = implode("','",$valori);
	$query = "INSERT INTO " . $tabella . " (" . $campi1 . ") VALUES ('" . $valori1 . "')";
	$risultato = esegui($query);
	$messaggio = "";
	if($risultato){
		$messaggio = $conferma;
	}else{
		$messaggio = null;
	}
	return $messaggio;
}

function modifica($tabella,$campo_modificato,$valore_modificato,$campo_vincolo,$valore_vincolo,$conferma){
	$query = "UPDATE " . $tabella . " SET " . $campo_modificato . " = '" . $valore_modificato . "' WHERE " . $campo_vincolo . " = '" . $valore_vincolo . "'";
	$risultato = esegui($query);
	$messaggio = "";
	if($risultato){
		$messaggio = $conferma;
	}else{
		$messaggio = null;
	}
	return $messaggio;
}

function elimina($tabella,$campo,$valore,$conferma){
	$query = "DELETE FROM " . $tabella . " WHERE " . $campo . " = '" . $valore . "'";
	$risultato = esegui($query);
	$messaggio = "";
	if($risultato){
		$messaggio = $conferma;
	}else{
		$messaggio = null;
	}
	return $messaggio;
}

function estrai($tabella,$condizioni1 = [],$condizioni2 = [],$diverso = false){
	$query = "";
	if(count($condizioni1)==0){
		$query .= "SELECT * FROM " . $tabella;
	}else{
		$query .= "SELECT * FROM " . $tabella . " WHERE ";
		for($i = 0;$i < count($condizioni1);$i++){
			$query .= $condizioni1[$i];
			if($diverso == false){
				$query .= "='";
			}else{
				$query .= "<>'";
			}
			$query .= $condizioni2[$i];
			$query .= "'";
			if($i != (count($condizioni1)-1)){
				$query .= " AND ";
			}
		}
	}
	$risultato = esegui($query);
	$righe = [];
	if($risultato){
		$i = 0;
		while($riga = mysqli_fetch_array($risultato,MYSQLI_ASSOC)){
			$righe[$i] = $riga;
			$i++;
		}
	}
	return $righe;
}

function estrai_senza_ripetizioni($tabella,$condizioni1 = [],$condizioni2 = [],$diverso = false){
	$query = "";
	if(count($condizioni1)==0){
		$query .= "SELECT DISTINCT * FROM " . $tabella;
	}else{
		$query .= "SELECT DISTINCT * FROM " . $tabella . " WHERE ";
		for($i = 0;$i < count($condizioni1);$i++){
			$query .= $condizioni1[$i];
			if($diverso == false){
				$query .= "='";
			}else{
				$query .= "<>'";
			}
			$query .= $condizioni2[$i];
			$query .= "'";
			if($i != (count($condizioni1)-1)){
				$query .= " AND ";
			}
		}
	}
	$risultato = esegui($query);
	$righe = [];
	if($risultato){
		$i = 0;
		while($riga = mysqli_fetch_array($risultato,MYSQLI_ASSOC)){
			$righe[$i] = $riga;
			$i++;
		}
	}
	return $righe;
}
?>