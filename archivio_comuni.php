<?php
require("funzioni.php");
require("header.php");
?>
<h1 class="title">Gestione archivio dei comuni</h1>
<span id="messaggio"></span><br>
<form name="modulo" method="POST">
<input type="hidden" name="token" value="">
<label for="selezione_provincia" class="label">Seleziona una provincia:</label>
<div class="select is-primary is-rounded is-fullwidth">
<select name="selezione_provincia" id="selezione_provincia" onchange="archivio_comuni()">
<option value=""></option>
<?php
$elenco_province = estrai("province");
foreach($elenco_province as $provincia){
?>
<option value="<?= $provincia["id_provincia"] ?>"><?= $provincia["nome"] ?></option>
<?php
}
?>
</select>
</div>
</form>
<a href="javascript:aggiungi_comune()">Inserisci nuovo comune</a><br>
<div id="archivio_comuni"></div>
<?php require("footer.php"); ?>