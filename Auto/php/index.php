<?php
$txt = $_POST['data'];
$file = $_POST['file'];
$myfile = fopen($file, "w")
fwrite($myfile, $txt);
fclose($myfile);
exit;
?> 