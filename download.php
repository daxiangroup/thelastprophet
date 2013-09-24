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

header('Content-Transfer-Encoding: binary');  // For Gecko browsers mainly
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime($books[$lang])) . ' GMT');
header('Accept-Ranges: bytes');  // For download resume
header('Content-Length: ' . filesize($books[$lang]));  // File size
header('Content-Encoding: none');
header('Content-Type: application/pdf');  // Change this mime type if the file is not PDF
header('Content-Disposition: attachment; filename=' . $books[$lang]);  // Make the browser display the Save As dialog
readfile($books[$lang]);