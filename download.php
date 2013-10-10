<?php
if (!isset($_GET['lang'])) {
    die('No language specified');
}

if (!in_array($_GET['lang'], array('en', 'ar'))) {
    die('Unsupported language');
}

$lang = $_GET['lang'];
$books = array(
    'en' => 'TheLastProphet-English.pdf',
    'ar' => 'TheLastProphet-Arabic.pdf',
);

$fp = fopen('clicks/tracking.txt', 'a');
fwrite($fp, '['.date('Y-m-d H:i:s').'] '.$_SERVER['REMOTE_ADDR'].' : '.($lang == 'en' ? 'English' : 'Arabic').PHP_EOL);
fclose($fp);

header('Content-Transfer-Encoding: binary');  // For Gecko browsers mainly
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime($books[$lang])) . ' GMT');
header('Accept-Ranges: bytes');  // For download resume
header('Content-Length: ' . filesize($books[$lang]));  // File size
header('Content-Encoding: none');
header('Content-Type: application/pdf');  // Change this mime type if the file is not PDF
header('Content-Disposition: attachment; filename=' . $books[$lang]);  // Make the browser display the Save As dialog
readfile($books[$lang]);
