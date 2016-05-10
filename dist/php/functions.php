<?php

    function getSegment($segment=1){
        $url = (isset($_SERVER['HTTPS'])) ? 'https://' : 'http://';
        $url.=$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $url = trim(str_replace(BASE_URL,"",$url),"/");
        $path = explode('/',$url);
        if($segment==='all'){
            return $url;
        }
        return $path[$segment-1];
    };

    function redirect($statusCode=302){
        $location = BASE_URL;
        header("Location:".$location,true,$statusCode);
        die();
    }

    function plain($string){
        return htmlspecialchars( $string, ENT_QUOTES );
    }