<?php

    session_cache_limiter('nocache');
    header('Expires: ' . gmdate( 'r',0));
    header('Content-type: application/json');


    $to = 'contact@emmanuellefevre.com';
    $email_template = 'simple.html';

    $subject = strip_tags($_POST['subject']);
    $email   = strip_tags($_POST['email']);
    $name    = strip_tags($_POST['name']);
    $message = nl2br( htmlspecialchars($_POST['message'], ENT_QUOTES) );
    $result  = array();


    if(empty($name)){

        $result = array( 'response' => 'error', 'empty'=>'name', 'message'=>'<strong>Erreur!</strong>&nbsp; Le champ nom est vide.' );
        echo json_encode($result);
        die;
    }

    if(empty($email)){

        $result = array( 'response' => 'error', 'empty'=>'email', 'message'=>'<strong>Erreur!</strong>&nbsp; Le champ email est vide.' );
        echo json_encode($result);
        die;
    }

    if(empty($subject)){

        $result = array( 'response' => 'error', 'empty'=>'message', 'message'=>'<strong>Erreur!</strong>&nbsp; Vous n\'avez saisi aucun sujet.' );
        echo json_encode($result);
        die;
    }

    if(empty($message)){

        $result = array( 'response' => 'error', 'empty'=>'message', 'message'=>'<strong>Erreur!</strong>&nbsp; Vous n\'avez saisi aucun message.' );
        echo json_encode($result);
        die;
    }


    $headers  = "From: " . $name . ' <' . $email . '>' . "\r\n";
    $headers .= "Reply-To: ". $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";


    $templateTags = array(
        '{{subject}}' => $subject,
        '{{email}}'   => $email,
        '{{message}}' => $message,
        '{{name}}'    => $name
        );


    $templateContents = file_get_contents( dirname(__FILE__) . '/email-templates/'.$email_template);

    $contents =  strtr($templateContents, $templateTags);

    $result = mail($to, $subject, $contents, $headers)
        ? array('response' => 'success', 'message' => '<strong>Merci!</strong>&nbsp; Votre email a bien été envoyé.')
        : array('response' => 'error', 'message' => '<strong>Erreur!</strong>&nbsp; Votre email n\'a pas été envoyé.');


    echo json_encode( $result );

    die;