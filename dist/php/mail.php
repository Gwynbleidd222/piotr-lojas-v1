<?php

/* Namespace alias. */

require '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// require 'C:\xampp\vendor\phpmailer\phpmailer\src\Exception.php';
// require 'C:\xampp\vendor\phpmailer\phpmailer\src\PHPMailer.php';
// require 'C:\xampp\vendor\phpmailer\phpmailer\src\SMTP.php';

$name = $_POST["name"]; // input name="name"
$from = $_POST["email"]; // input name="email"
$to = "kontakt@piotrlojas.pl"; // adres, na który ma zostać wysłany mail
$subject = "Wiadomość z formularza na stronie Piotr Łojas";
$message = $_POST["message"]; // textarea name="msg"

/* Create a new PHPMailer object. Passing TRUE to the constructor enables exceptions. */
$mail = new PHPMailer(TRUE);
/* Open the try/catch block. */
try {
   // $mail->SMTPDebug = true;
   $mail->isSMTP();
   $mail->Host = 'smtp.titan.email';
   $mail->SMTPAuth = true;
   $mail->Username = 'kontakt@piotrlojas.pl';
   $mail->Password = 'testjasiu@23';
   $mail->SMTPSecure = 'ssl';
   $mail->Port = 465;
   $mail->CharSet = "UTF-8";
   /* Set the mail sender. */
   $mail->setFrom($to);
   /* Add a recipient. */
   $mail->addAddress($to);
   /* Set the subject. */
   $mail->Subject = $subject;
   /* Set the mail message body. */
   $mail->Body = "Wiadomość od: " . $name . "\r\n" . "Email: " . $from . "\r\n" . "\r\n" . "Treść: " . $message;
   /* Finally send the mail. */
   $mail->send();
} catch (Exception $e) {
   /* PHPMailer exception. */
   echo $e->errorMessage();
} catch (\Exception $e) {
   /* PHP exception (note the backslash to select the global namespace Exception class). */
   echo $e->getMessage();
}