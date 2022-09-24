<?php
require("funzioni.php");
$elenco_comuni = estrai("comuni");
$elenco_province = estrai("province");
$elenco_regioni = estrai("regioni");
echo json_encode(["elenco_comuni" => $elenco_comuni,"elenco_province" => $elenco_province,"elenco_regioni" => $elenco_regioni]);
?>