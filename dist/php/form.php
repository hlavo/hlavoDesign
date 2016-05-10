<?php
/**
 * Created by PhpStorm.
 * User: Hlavo
 * Date: 5.5.16
 * Time: 0:01
 */

require_once 'config.php';
require_once 'functions.php';

if( isset($_POST['csrf_token']) && isset($_POST['meno']) && isset($_POST['email']) && isset($_POST['text']) ){

  $token = plain($_POST['csrf_token']);
  $meno = plain($_POST['meno']);
  $email = plain($_POST['email']);
  $text = plain($_POST['text']);
  if($_SESSION['csrf_token']!==$token) echo json_encode(["success"=>false]);
  elseif( strlen($meno) < 3 || strlen($text) < 3 ) echo json_encode(["success"=>false]);
  elseif( !preg_match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/i", $email) ) echo json_encode(["success"=>false]);
  else{
    $text = $text."\r\n".$meno."\r\n".$email;
    $msg = wordwrap($text,70);
    mail("hlavodesign@gmail.com","Žiadosť",$msg);
    echo json_encode(["success"=>true]);
  }

}else{
  echo json_encode(["success"=>false]);
}
