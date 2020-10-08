<?php
    
//get data pushed
    $studyid=$_POST['put-study-id-here'];
    $sscode=$_POST['put-ss-code-here'];
    $data=$_POST['put-data-here'];

// write 2back data to file
    file_put_contents('data/2back/' . $studyid . '-' . $sscode . '-data.txt', $data, FILE_APPEND);

// write ss code to list
    file_put_contents('data/2back/data-submit-list.txt', $sscode . PHP_EOL, FILE_APPEND);

//direct to questionnaires
    header('Location: quest.html');
    exit;
?>

