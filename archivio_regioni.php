<?php require("header.php"); ?>
<h1 class="title">Gestione archivio delle regioni</h1>
<span id="messaggio"></span><br>
<a href="javascript:aggiungi_regione()">Inserisci nuova regione</a><br>
<div id="archivio_regioni"></div>
<script>archivio_regioni();</script>
<?php require("footer.php"); ?>