//generate random string of letters
function getRandomString(length, chars) {		
    var result = '';		
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];		
    return result;		
}


//show an element
function showPage(doc_ele) {
    doc_ele.style.visibility = 'visible';
    doc_ele.style.display = 'inline';
}


//hide an element
function hidePage(doc_ele) {
    doc_ele.style.visibility = 'hidden';
    doc_ele.style.display = 'none';
}


//determine if value is in array
function isInArray(value, array) {return array.indexOf(value) > -1;}


//hide all display elements (here, divs and btns)
function hideAllDivs(){
  var divs = document.getElementsByTagName('div');
  var btns = document.getElementsByTagName('button');
  for (var i = 0; i < divs.length; i++){
    hidePage(divs[i]);
  }

  for (i = 0; i < btns.length;i++){
    hidePage(btns[i]);
  }
  hidePage(lab_header);
}


//reset default radio values
function resetInputValues(){
  var ele = document.getElementsByTagName('input');
  for (var i = 0; i < ele.length; i++){
    ele[i].checked = false;
  }
}

//reset trial counters
function updateBlockCounters(){
    this_trial = 0;
    this_probe = 0;
    this_block++;
    letter_list = [];
}


//set participant values		
const studyid = '9999-9999';		
const ss_code = getRandomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


// get references to buttons
const start_btn = document.getElementById('start-btn');
const yes_consent_btn = document.getElementById('yes-consent-btn');
const no_consent_btn = document.getElementById('no-consent-btn');
const inst_next_btn = document.getElementById('inst-next-btn');
const inst_back_btn = document.getElementById('inst-back-btn');
const save_resp_btn = document.getElementById('save-resp-btn');
const save_captcha_resp_btn = document.getElementById('save-captcha-resp-btn');


//get references to containers
const stim = document.getElementById('stim-container');
const letter_ctn = document.getElementById('letter-container');
const cross = document.getElementById('cross-container');


//get references to pages
const lab_header = document.getElementById('lab-header');
const info_consent_letter = document.getElementById('info-consent-letter');
const task_inst = document.getElementById('task-inst');
const thought_probe_1 = document.getElementById('thought-probe-1');
const thought_probe_2 = document.getElementById('thought-probe-2');
const captcha_ctn = document.getElementById('captcha-ctn');
const decline_to_participate = document.getElementById('decline-to-participate');
const redo_practice = document.getElementById('redo-practice');
const show_rating = document.getElementById('show-rating');
const practice_over = document.getElementById('practice-over');
const do_not_refresh = document.getElementById('do-not-refresh');


//experimental toggles
var probe_avail = true;
var captcha_avail = true;
var is_practice = true;
var getting_ready = true;
var is_probe = false;
var is_captcha = false;
var checked = false;


//default data value
var key_pressed = false;
var current_letter = '';
var match = false;
var correct_resp = false;


//set up practice trials
var practice_rating = 0;
var this_pract_ltr = '';
var pract_ltr_list = ["H","H","M","H","F","K","B","M","F","M","K","R","F","Q","F","F","R","F","K","B"];
var pract_ltr_list_index = 0;
var redo_practice_req = false;


//experimental counter
var this_trial = 0;
var this_probe = 0;
var this_block = 0;
var crossTimer = '';
var trialTimer = '';


//experimental constants
const num_trials = 50; // 250
const num_practice = 20; // set in pract_ltr_list - must be 20
const trial_duration = 2500; // 2500
const time_to_cross = trial_duration/5;


//probe information
var num_probes = 10; //10
var probe_steps = num_trials / num_probes;


//default probe responses
var probe_1_resp = '';
var probe_2_resp = '';
var captcha_resp = '';


//containers
var trial_headers = [
    'ss_code',
    'browser',
    'is_practice',
    'practice_rating',
    'this_trial',
    'current_letter',
    'key_pressed',
    'match',
    'correct_resp',
    'is_probe',
    'is_captcha',
    'this_probe',
    'probe_1_resp',
    'probe_2_resp',
    'captcha_resp'
];


//data holders
var trial_data = [];
var letter_list = [];
var captcha_list = [25]; //200


//write headers first
for (var i in trial_headers){
  if({}.hasOwnProperty.call(trial_headers,i)){
  trial_data+=trial_headers[i];
  if (i < trial_headers.length-1){trial_data+=',';}
    else{trial_data+='\n';}}
}


//set up keyboard test
const next_test_btn = document.getElementById('next-test-btn');
const back_test_btn = document.getElementById('back-test-btn');
const test_screen = document.getElementById('test-screen');
const spacebar = document.getElementById('spacebar');
var test = false;
        
function keyUpTextField(e) {
    if(test==true){
        document.getElementById('spacebar').style.backgroundColor = 'white';
    }
}

function keyDownTextField(e) {
    if(test==true){
        var keyCode = e.keyCode;
        if(keyCode==32) {
            document.getElementById('spacebar').style.backgroundColor = 'lightblue';
            showPage(next_test_btn);
            document.getElementById('next-test-btn').blur();
        }
    }
}


//modular task instruction pages

var inst_p1 =
    "<p>For this task, you will be presented with a series of letters. Each time the presented letter matches the letter shown <u>two letters ago</u> you will press the SPACEBAR.</p>"
    +"<p>Please do not press the spacebar, or any other key, unless the letter on the screen matches the letter shown <u>two letters ago</u>.</p>"
    +"<hr>"
    +"<p>For example, you might see the sequence:</p>"
    +"<p><b>F-B-X-B-K-M</b></p>"
    +"<p>In the above example, a correct response pattern would be:</p>"
    +"<p><i>press nothing</i> - <i>press nothing</i> - <i>press nothing</i> - <b>press 'SPACEBAR'</b> - <i>press nothing</i> - <i>press nothing</i></p>";

var inst_p2 =
    "<p>As you complete the task, you may find yourself thinking about things other than what you are doing. These thoughts are referred to as ‘task-unrelated thoughts.’ Having task-unrelated thoughts is perfectly normal, especially when you have to do the same thing for a long period of time.</p>" 
    +"<p>While you are completing this task, we would like to determine how frequently you are focused on the task and how frequently you are thinking about thoughts that are unrelated to the task. To do this, every once in a while, the task will temporarily stop and you will be presented with a thought-sampling screen that will ask you to indicate whether, just before seeing the thought-sampling screen, you were focused on the task or focused on task-unrelated thoughts.</p>";

var inst_p3 =
    "<p>Being <b>focused on the task</b> means that, just before the thought-sampling screen appeared, you were focused on some aspect of the task at hand. For example, if you were thinking about your performance on the task, or if you were thinking about when you should make a button press, these thoughts would count as being on-task.</p>" 
    +"<p>On the other hand, experiencing <b>task-unrelated thoughts</b> means that you were thinking about something completely unrelated to the task. Some examples of task-unrelated thoughts include thoughts about what to eat for dinner, thoughts about an upcoming event, or thoughts about something that happened to you earlier in the day. Any thoughts that you have that are not related to the task you are completing count as task-unrelated.</p>"; 

var inst_p4 =
    "<p>Importantly, task-unrelated thoughts can occur in cases where <u>you are trying to focus on the task</u>, but your thoughts unintentionally drift to task-unrelated topics, OR they can occur in cases where <u>you are not trying to focus on the task</u>, and you begin to think about task-unrelated topics. When the thought-sampling screen is presented, we will ask you to indicate which (if any) of these two types of task-unrelated thoughts you were experiencing.</p>" 
    +"<br>"
    +"<p>To do this, we will present you with a thought-sampling screen that looks like this:</p>"
  +thought_probe_1.innerHTML;

var inst_p5 =
    "<p>In addition to the first thought-sampling screen, we will present a second screen that will ask you whether your thoughts were moving freely or not. Your thoughts move freely when:</p>"
    +"<p><ul>-They seem to wander around on their own, flowing from one thing to another</ul><ul>-There is no overarching purpose or direction to your thinking (although there may still be some connection between one thought and the next)</ul><ul>-Images and memories seem to spontaneously come into your mind</ul><ul>-It feels like your thoughts could land on pretty much anything, and they seem to flow with ease.</ul></p>"
    +"<br>"
    +"<p>The second thought-sampling screen, which will be used to determine whether your thoughts were moving freely or not, will look like this:</p>"
    +thought_probe_2.innerHTML
    +"<br>";

var inst_p6 =
    "<p>We will now begin a few practice trials to help you become familiar with the task.</p>"
    +"<p>Remember, each time the presented letter matches the letter shown <u>two letters ago</u> you will press the SPACEBAR.</p>"
    +"<p>When you are ready to start, please click the 'Begin Practice Trials' button below.</p>";


//setup modular task instructions
var inst_pg_list = new Array(inst_p1,inst_p2,inst_p3,inst_p4,inst_p5,inst_p6);
var this_inst_pg = 0;


//generate probe list
function generateProbes(num_probes,in_blocks_of){
    var min = 1; //10
    var max = in_blocks_of-5; //in_block_of-10
    var probe_list = [];

    for (var i=0;i<num_probes;){
	var thisValue = Math.floor(Math.random()*(max-min+1))+min; //min max included
        
        if (captcha_list.includes(thisValue)){
            generateProbes();
        }
        else if (probe_list.includes(thisValue)){
            generateProbes();
        }
        else{
            probe_list.push(thisValue);
            min = min + in_blocks_of;
            max = max + in_blocks_of;
            i++;
        }
    }
    return probe_list;
}


//initial get ready message
function getReady(){
    console.log("get ready");
    hideAllDivs();
    stim.innerHTML = "<p style='font-size:14pt;'>Get Ready...</p>";
    showPage(stim);
    getting_ready = true;
    if (is_practice==true){
        setTimeout(doPractice,trial_duration);}
    if (is_practice==false){
        setTimeout(runTrial,trial_duration);}
}


//start Practice
function doPractice(){
    console.log("practice trial "+ this_trial+" begins");
    
    //reset relevant values
    key_pressed = false;
    current_letter = '';
    match = false;
    correct_resp = false;
    
    if(getting_ready){hidePage(stim);getting_ready=false;}
    
  //practice over?
    if (this_trial == num_practice){endPractice();}
    
  //else do practice trial
    else{doTrial();}
}

    
//end practice
function endPractice(){
    
    showPage(show_rating);
    show_rating.innerHTML = "<p>Your score was " + practice_rating + " out of 4.</p>";
    
    if (practice_rating<2){ //<2 normally
        redo_practice_req = true;
        inst_next_btn.innerHTML = 'Begin Practice Trials';
        showPage(mal_header);
        showPage(redo_practice);
        showPage(inst_next_btn);
        showPage(do_not_refresh);
    }
    
    else{
        redo_practice_req = false;
        is_practice = false;
        inst_next_btn.innerHTML = 'Begin Task';
        showPage(lab_header);
        showPage(practice_over);
        showPage(inst_next_btn);
        showPage(do_not_refresh);

        //should be global
        probe_steps = num_trials / num_probes;
        probe_list = generateProbes(num_probes,probe_steps);
        console.log(probe_list);   
    }
}

//start 2back loop
function runTrial(){
    console.log("trial "+ this_trial+" begins");
    
    //reset relevant values
    key_pressed = false;
    current_letter = '';
    match = false;
    correct_resp = false;
    
    if(getting_ready){hidePage(stim);getting_ready=false;}
    
  //experiment over?
    if (this_trial == num_trials){submitData();}
    
  //else do trial
    else{doTrial();}
}

    
//main 2back loop
function doTrial () {
    
    console.log("doTrial");
    
    //set timers to show cross and move to next trial
    crossTimer = window.setTimeout(showCross,time_to_cross);
    trialTimer = window.setTimeout(checkWork,trial_duration);
    
    //check if probe trial
    is_probe = isInArray(this_trial,probe_list);
    
    //check if captcha trial
    is_captcha=isInArray(this_trial,captcha_list);
    
    //pull practice letter
    if(is_practice==true){
        current_letter = pract_ltr_list[pract_ltr_list_index];
        console.log(current_letter);
    }
    
    //generate current letter
    else{
        current_letter = getRandomString(1, 'BFKHMQRXZ');
        console.log(current_letter);
        
    }
    
    //add current letter to list
    letter_list.push(current_letter);
    
    //show relevant letters in console
    if(letter_list.length < 5){
        console.log(letter_list);
    }
    
    else{
        var sub_ltr_list = [letter_list[letter_list.length - 5],letter_list[letter_list.length - 4],letter_list[letter_list.length - 3],letter_list[letter_list.length - 2],letter_list[letter_list.length - 1]];
        console.log(sub_ltr_list);   
    }
    
    //show current letter
    letter_ctn.innerHTML = current_letter;
    showPage(letter_ctn);
}

    
//check current letter against 2 back
function checkLetter(){
        
    console.log("checkletter");
        
    var two_back = letter_list[letter_list.length - 3];        
    
    if (two_back == current_letter) {
        match = true;
    }
    
    checked = true;
    return match;
}


//show focus screen
function showCross () {
    hidePage(letter_ctn);
    cross.innerHTML = "+";
    showPage(cross);
}

    
//grab spacebar press
window.onkeydown = function(e){
    var key = e.keyCode ? e.keyCode: e.which;
    if(!key_pressed && key == 32) {
        key_pressed = true;
        console.log('key pressed');
    }
};


//check participant response
function checkWork (){
    
    checkLetter();
    
    console.log("checkWork");
    
    //determine if correct response
    if (key_pressed == match){   
        correct_resp = true;
    }
    
    if (is_practice == true && correct_resp == true && match == true){
        practice_rating++;
        console.log("practice rating= " + practice_rating);
    }
    
    else if (is_practice == true && key_pressed == true && match == false){
        practice_rating--;
        console.log("practice rating= " + practice_rating);
    }
    
    //clear trial timers
    window.clearTimeout(crossTimer);
    window.clearTimeout(trialTimer);
    
    //hide focus 
    hidePage(cross);
                          
    console.log("match=" + match);
    console.log("correct resp=" + correct_resp);
    
    nextTrial(); 
}
    
//move to next trial
function nextTrial (){
    
    console.log("trial "+ this_trial+" end");
    
    //should we draw a probe?
    if ((probe_avail && is_probe) || (captcha_avail && is_captcha)){
        
        //should we draw a probe?
        if (probe_avail && is_probe){doProbe();}
        
        //should we draw an captcha chk?
        if (captcha_avail && is_captcha){doCaptcha();}
    }
    
    //if not...
    else {
    
        //log data & increase trial counter
        logData();
        this_trial++;
        
        if(is_practice==true){
            pract_ltr_list_index++;
        }
    
        //reset probe data if just had probe
        if(!probe_avail){
            probe_avail = true;
            this_probe++;
            probe_1_resp = '';
            probe_2_resp = '';
        
            //send to get ready if just had probe
            getReady();
        }
        
        //reset captcha chk data if just had chk
        else if(!captcha_avail){
            captcha_avail = true;
            captcha_resp = '';
        
            //send to get ready if just had chk
            getReady();
        }
    
        //if no probe straight to next trial
        else{
            if(is_practice==true){
                doPractice();
            }
            else{
                runTrial();
            }
        }
    }
}

    
//draw probe
function doProbe(){

  //hide everything
    hideAllDivs();

  //need to turn probe availability off until next trial is updated
  probe_avail = false;

  //show probe questions
  showPage(thought_probe_1);
  showPage(thought_probe_2);
  showPage(save_resp_btn);
}

    
//draw captcha chk
function doCaptcha(){
    
    console.log("captcha!");
    
    //hide everything
    hideAllDivs();
    
    //turn off check availability until next trial is updated
    captcha_avail = false;
    
    //show captcha chk
    showPage(captcha_ctn);
    showPage(save_captcha_resp_btn);
}

    
//end probe
function endProbe(){
  hideAllDivs();
  probe_1_resp = document.querySelector('input[name="mw-probe-rad"]:checked').value;
  probe_2_resp = document.querySelector('input[name="guidance-probe-rad"]:checked').value;
  console.log(probe_1_resp);
  console.log(probe_2_resp);
  resetInputValues();
  nextTrial();
}
    
//end captcha chk
function endCaptcha(){
    hideAllDivs();
    var x = document.querySelector('input[name="captcha"]').value;
    captcha_resp = x.toLowerCase();
    console.log(captcha_resp);
    resetInputValues();
    nextTrial();
}

    
function logData(){
  var output = [
        ss_code,
        browser,
        is_practice,
        practice_rating,
        this_trial,
        current_letter,
        key_pressed,
        match,
        correct_resp,
        is_probe,
        is_captcha,
        this_probe,
        probe_1_resp,
        probe_2_resp,
        captcha_resp
    ];
  for (var i in output){
    if({}.hasOwnProperty.call(output,i)){
      trial_data+=output[i];
      if (i < output.length-1){trial_data+=',';}
      else{trial_data+='\n';}
    }
  }
}


function submitData(){
  document.getElementById('put-study-id-here').value = studyid;
  document.getElementById('put-ss-code-here').value = ss_code;
  document.getElementById('put-data-here').value = trial_data;
  document.getElementById('sendtoPHP').submit();
}

start_btn.addEventListener("click", getReady);

//consent to participate
yes_consent_btn.addEventListener('click',function(event){
//  hidePage(info_consent_letter);
//  hidePage(yes_consent_btn);
//  hidePage(no_consent_btn);
//  showPage(task_inst);
//  showPage(inst_next_btn);
//  showPage(inst_back_btn);
//  showPage(do_not_refresh);
//  task_inst.innerHTML = inst_pg_list[this_inst_pg];
    hidePage(info_consent_letter);
    hidePage(yes_consent_btn);
    hidePage(no_consent_btn);
    test = true; 
    showPage(spacebar);
    showPage(test_screen);
    showPage(do_not_refresh);
    showPage(back_test_btn);
    document.addEventListener("keydown", keyDownTextField, false);
    document.addEventListener("keyup",keyUpTextField,false);
});

//decline to participate
no_consent_btn.addEventListener('click',function(event){
  hidePage(info_consent_letter);
  hidePage(yes_consent_btn);
  hidePage(no_consent_btn);
  showPage(decline_to_participate);
});

next_test_btn.addEventListener('click',function(event){
    hidePage(spacebar);
    hidePage(test_screen);
    hidePage(next_test_btn);
    hidePage(back_test_btn);
    test = false; 
    showPage(task_inst);
    showPage(inst_next_btn);
    showPage(inst_back_btn);
    task_inst.innerHTML = inst_pg_list[this_inst_pg]; 
});

back_test_btn.addEventListener('click',function(event){
    hidePage(spacebar);
    hidePage(test_screen);
    hidePage(next_test_btn);
    hidePage(back_test_btn);
    hidePage(do_not_refresh);
    test = false; 
    showPage(info_consent_letter);
    showPage(yes_consent_btn);
    showPage(no_consent_btn);
});

inst_next_btn.addEventListener('click',function(event){
  if(this_inst_pg<inst_pg_list.length-1){
    this_inst_pg++;
    task_inst.innerHTML = inst_pg_list[this_inst_pg];
    if(this_inst_pg==inst_pg_list.length-1){inst_next_btn.innerHTML =
'Begin Practice Trials';}
  }
  else{
      if(redo_practice_req==true){
          practice_rating=0;
          this_pract_ltr='';
          pract_ltr_list_index=0;
      }
      updateBlockCounters();
      getReady();
  }
});

inst_back_btn.addEventListener('click',function(event){
    if(this_inst_pg>0){
        this_inst_pg-=1;
        task_inst.innerHTML = inst_pg_list[this_inst_pg];
        if(this_inst_pg!=inst_pg_list.length-1){inst_next_btn.innerHTML = 'Next';}
    }
    else{
        hidePage(task_inst);
        hidePage(inst_next_btn);
        hidePage(inst_back_btn);
        test = true; 
        showPage(spacebar);
        showPage(test_screen);
        showPage(back_test_btn);
        showPage(next_test_btn);
  }
});

save_resp_btn.addEventListener('click',function(){
    console.log("thought probe save button clicked");
    console.log(document.querySelectorAll('input[type="radio"]:checked'));
    if(document.querySelectorAll('input[type="radio"]:checked').length==2?true:false){
	   endProbe();
    }
    else{
	   alert("Please select your responses to the thought probes");
    }
});

//save captcha response button
save_captcha_resp_btn.addEventListener('click',function(){
    if(validateForm()==false){
        alert("Please answer all questions");
        document.getElementById('captcha-ctn').focus();
    }
    else{
        endCaptcha();
    }
});

//validate captcha input
function validateForm() {
    var x = document.querySelector('input[name="captcha"]').value;
    if (x == null || x == "") {
        return false;
    }
}
    
var probe_list = [num_practice/2];

//--log some testing stuff
console.log(ss_code);
console.log(studyid);
console.log(probe_list);
console.log(browser);

sessionStorage.setItem("sscode", ss_code);

//--show starting page and buttons
showPage(info_consent_letter);
showPage(yes_consent_btn);
showPage(no_consent_btn);


