<?php
error_reporting(85);
header("Content-Type: text/html; charset=UTF-8");

$_POST['phone'] = preg_replace("/[^0-9\+]/ui", "", $_POST['phone']);


$mail_to = "studiadr@sk-yulian.ru"; // E-mail на который будут отправляться уведомления
$mail_from = "mail@".preg_replace("/^www\./ui", "", $_SERVER['HTTP_HOST']); $mail_from_name = $_SERVER['HTTP_HOST']; // E-mail с которого будут отправляться уведомления ($_SERVER['HTTP_HOST'] - домен текущего сайта)
$mail_subject = "Заявка"; // Тема уведомлений

$labels = array(
	"name" => "Имя", 
	"email" => "E-mail", 
	"phone" => "Телефон", 
	"quiz1" => "Объект", 
	"quiz2" => "Площадь", 
	"quiz4" => "Вид ремонта", 
	"quiz5" => "Дизайн-проект", 
	"quiz6" => "Начало", 
	"quiz7" => "Бонус", 
	"social" => "Способ связи", 
	"bonus" => "Бонус", 
	"form" => "Форма", 
);


$tg_token = "5567587146:AAGfgatd2dDvwlGP-OleC4DZDMfGixroAFM";

$tg_data = array(
	"parse_mode" => "HTML", 
	"chat_id" => "-655731158", 
	"text" => "Заявка с сайта <b>".$_SERVER['HTTP_HOST']."</b>\n\n", 
);



$mail_boundary = "boun".md5(uniqid())."dary";
$mail_headers = array("MIME-Version: 1.0", "From: =?UTF-8?B?".base64_encode($mail_from_name)."?= <".$mail_from.">", "Content-Type: multipart/mixed; boundary=\"".$mail_boundary."\"");
if(preg_match("/^[^\n]+\@[^\n]+\.[^\n]+$/ui", trim($_POST['email']))){$mail_headers[] = "Reply-To: ".trim($_POST['email']);}

$mail_message = ""; foreach($_POST as $k=>$v){if($v&&$k!="formname"){$mail_message .= (($labels[trim($k)])?:htmlspecialchars(trim($k))).": <b>".nl2br(htmlspecialchars(trim(is_array($v)?implode(", ", $v):$v)))."</b><br>";}}


$tg_data['text'] .= trim(str_replace(array("<br>", "&nbsp;"), array("\n", " "), $mail_message));


$mail_message1 = "--".$mail_boundary."
Content-Type: text/html; charset=\"UTF-8\"
Content-Transfer-Encoding: base64

".base64_encode($mail_message)."

--".$mail_boundary;


foreach($_FILES as $v){
if($v['type']&&$v['tmp_name']){
$mail_message1 .= "
Content-Disposition: attachment; filename=\"=?UTF-8?B?".base64_encode($v['name'])."?=\"
Content-Type: ".$v['type']."; name=\"=?UTF-8?B?".base64_encode($v['name'])."?=\"
Content-Transfer-Encoding: base64

".base64_encode(file_get_contents($v['tmp_name']))."

--".$mail_boundary;
}
}


function f_curl($url, $post){
	$ch = curl_init();
	
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_TIMEOUT, 6);
	
	if($post){
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	}
	
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$rez = curl_exec($ch);
	curl_close($ch);
	return $rez;
}


if(trim($_POST['email'])||trim($_POST['phone'])){
	$mail = mail($mail_to, "=?UTF-8?B?".base64_encode($mail_subject)."?=", $mail_message1."--", implode("\r\n", $mail_headers));
	
	$tg_z = json_decode(f_curl("https://api.telegram.org/bot".$tg_token."/sendMessage", http_build_query($tg_data)), true);
	if($_GET['var_dump']=="tg_z"){var_dump($tg_z); exit;}
	
	if($mail||$tg_z['ok']){
		echo "1"; exit;
	}else{echo "Error".(($tg_z['description'])?": ".htmlspecialchars($tg_z['description']):"");}
}else{echo "Email or Phone required";}
?>