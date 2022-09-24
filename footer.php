	</div>
</section>
<?php
$link = $_SERVER["PHP_SELF"];
$pagine = ["amministrazione.php","archivio_regioni.php","archivio_province.php","archivio_comuni.php"];
$presente = false;
for($i = 0;$i < count($pagine);$i++){
	$posizione = strpos($link,$pagine[$i],0);
	if($posizione > 0){
		$presente = true;
	}
}
if($presente === false){
?>
<div class="modal" id="finestra_caricamento">
	<div class="modal-background"></div>
	<div class="modal-content">
		<div class="box">
			<h1 class="title">Caricamento applicazione in corso...</h1>
		</div>
	</div>
</div>
<?php
}
?>
</body>
<script>
$(document).ready(function(){
	$(".navbar-burger").click(function(){
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
	});
});
</script>
</html>