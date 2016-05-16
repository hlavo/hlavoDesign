<?php
    // SESSION
    if( !session_id() ) @session_start();
    if (! isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = base64_encode(openssl_random_pseudo_bytes(32));
    }
    if($_SERVER['HTTP_HOST']==="localhost"){
        define('BASE_URL','http://localhost/hlavoDesign/dist/');
    }else{
        define('BASE_URL','http://hlavodesign.eu/');
    }
