<?php
	$emailTo = "mattguy19@gmail.com"; // Enter your email for feedbacks here

	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8\r\n";
	$headers .= "From: restate \r\n";

	if (!isset($_POST['subject'])) {
		$subject = "Consultation form message"; // Enter your subject here
	} else {
		$subject = $_POST['subject'];
	}

	reset($_POST);

	$body = "";
	$body .= "<p><b>Subject: </b>".$subject."</p>";
	$body .= "<p><b>Phone: </b>".$_POST['phone']."</p>";

	if( mail($emailTo, $subject, $body, $headers) ){
		$mail_sent = true;
	} else {
		$mail_sent = false;
	}
	if(!isset($resp)){
		echo json_encode($mail_sent);
	}
?>
