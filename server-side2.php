<?php

//get data pushed
    $studyid=$_POST['put-study-id-here'];
    $sscode=$_POST['put-ss-code-here'];
    $data=$_POST['put-survey-data-here'];

// write survey data to file
    file_put_contents('data/surveys/' . $studyid . '-' . $sscode . '-survey-data.txt', $data, FILE_APPEND);

// write ss code to list
    file_put_contents('data/surveys/survey-submit-list.txt', $sscode . PHP_EOL, FILE_APPEND);

//direct to debriefing
    header('Location: feedback-letter.html');
    exit;

?>
