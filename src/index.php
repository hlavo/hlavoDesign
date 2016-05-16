<?
    require_once './php/config.php';
    require_once './php/functions.php';

    if( getSegment() && getSegment()==="en" ){
        require_once 'english/mutation.html';
    }elseif( !getSegment() ){
        require_once 'slovak/mutation.html';
    }else{
        redirect();
    }

?>