<?php
require("funzioni.php");
require("header.php");
?>
<h1 class="title">Gestione archivio delle province</h1>
<span id="messaggio"></span><br>
<form name="modulo" method="POST">
<input type="hidden" name="token" value="">
<label for="selezione_regione" class="label">Seleziona una regione:</label>
<div class="select is-primary is-rounded is-fullwidth">
<select name="selezione_regione" id="selezione_regione" onchange="archivio_province()">
<option value=""></option>
<?php
$elenco_regioni = estrai("regioni");
foreach($elenco_regioni as $regione){
?>
<option value="<?= $regione["id_regione"] ?>"><?= $regione["nome"] ?></option>
<?php
}
?>
</select>
</div>
</form>
<a href="javascript:aggiungi_provincia()">Inserisci nuova provincia</a>
<div id="archivio_province"></div>
<?php require("footer.php"); ?>