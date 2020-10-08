//get references to pages

const do_not_refresh = document.getElementById('do-not-refresh');

const studyid = '9999-9999';

const survey_instr = document.getElementById('survey-instr');
const spontaneous_mw_survey = document.getElementById('spontaneous-mw-survey');
const deliberate_mw_survey = document.getElementById('deliberate-mw-survey');
const unguided_thought_survey = document.getElementById('unguided-thought-survey');
const dass = document.getElementById('dass');
const asrs = document.getElementById('asrs');
const docs = document.getElementById('docs');
const docs_p1 = document.getElementById('docs-p1');
const docs_p2 = document.getElementById('docs-p2');
const docs_p3 = document.getElementById('docs-p3');
const docs_p4 = document.getElementById('docs-p4');
const aut_instr = document.getElementById('aut-instr');
const aut_container = document.getElementById('aut-container');
const aut_after = document.getElementById('aut-after');
const demographics = document.getElementById('demographics');
const demo_age = document.getElementById('demo-age');
const demo_gender = document.getElementById('demo-gender');
const demo_education = document.getElementById('demo-education');
const demo_browser = document.getElementById('demo-browser');

const start_surveys_btn = document.getElementById('start-surveys-btn');
const next_docs_btn = document.getElementById('next-docs-btn');
const docs_p1_btn = document.getElementById('docs-p1-btn');
const docs_p2_btn = document.getElementById('docs-p2-btn');
const docs_p3_btn = document.getElementById('docs-p3-btn');
const next_aut_btn = document.getElementById('next-aut-btn');
const inter_aut_btn = document.getElementById('inter-aut-btn');

const save_smw_btn = document.getElementById('save-smw-btn');
const save_dmw_btn = document.getElementById('save-dmw-btn');
const save_ut_btn = document.getElementById('save-ut-btn');
const save_dass_btn = document.getElementById('save-dass-btn');
const save_asrs_btn = document.getElementById('save-asrs-btn');
const save_docs_btn = document.getElementById('save-docs-btn');
const save_aut_btn = document.getElementById('save-aut-btn');
const save_demo_btn = document.getElementById('save-demo-btn');

var survey_headers = [
    'sscode',
    'smw1',
    'smw2',
    'smw3',
    'smw4',
    'dmw1',
    'dmw2',
    'dmw3',
    'dmw4',
    'ut1',
    'ut2',
    'ut3',
    'ut4',
    'ut5',
    'ut6',
    'ut7',
    'ut8',
    'dass1',
    'dass2',
    'dass3',
    'dass4',
    'dass5',
    'dass6',
    'dass7',
    'dass8',
    'dass9',
    'dass10',
    'dass11',
    'dass12',
    'dass13',
    'dass14',
    'dass15',
    'dass16',
    'dass17',
    'dass18',
    'dass19',
    'dass20',
    'dass21',
    'asrs1',
    'asrs2',
    'asrs3',
    'asrs4',
    'asrs5',
    'asrs6',
    'docs1',
    'docs2',
    'docs3',
    'docs4',
    'docs5',
    'docs6',
    'docs7',
    'docs8',
    'docs9',
    'docs10',
    'docs11',
    'docs12',
    'docs13',
    'docs14',
    'docs15',
    'docs16',
    'docs17',
    'docs18',
    'docs19',
    'docs20',
    'aut_balloon_resp',
    'aut_marble_resp',
    'aut_check',
    'age',
    'gender',
    'education',
    'browser',
    'userAgent'
];

var survey_data = '';
var counter = 0;

var smw1,
    smw2,
    smw3,
    smw4,
    dmw1,
    dmw2,
    dmw3,
    dmw4,
    ut1,
    ut2,
    ut3,
    ut4,
    ut5,
    ut6,
    ut7,
    ut8,
    dass1,
    dass2,
    dass3,
    dass4,
    dass5,
    dass6,
    dass7,
    dass8,
    dass9,
    dass10,
    dass11,
    dass12,
    dass13,
    dass14,
    dass15,
    dass16,
    dass17,
    dass18,
    dass19,
    dass20,
    dass21,
    asrs1,
    asrs2,
    asrs3,
    asrs4,
    asrs5,
    asrs6,
    docs1,
    docs2,
    docs3,
    docs4,
    docs5,
    docs6,
    docs7,
    docs8,
    docs9,
    docs10,
    docs11,
    docs12,
    docs13,
    docs14,
    docs15,
    docs16,
    docs17,
    docs18,
    docs19,
    docs20,
    aut_balloon_resp,
    aut_marble_resp,
    aut_check,
    age,
    gender,
    education,
    browser = '';

var user_agent = navigator.userAgent;


var aut_balloon = 
    "<p>Your object is <b>BALLOON</b></p>"
    +"<p>Please list all of the creative, unusual uses for a <b>BALLOON</b> you can think of.</p>"
    +"<p>Separate your ideas with a semicolon (;)</p>"
    +"<p>You have <u>three minutes</u> to generate as many creative responses as possible, after which this page will submit.</p>"
    +"<textarea id='aut1' rows='4' cols='50'></textarea>";

var aut_marble = 
    "<p>Your object is <b>MARBLE</b></p>"
    +"<p>Please list all of the creative, unusual uses for a <b>MARBLE</b> you can think of.</p>"
    +"<p>Separate your ideas with a semicolon (;)</p>"
    +"<p>You have <u>three minutes</u> to generate as many creative responses as possible, after which this page will submit.</p>"
    +"<textarea id='aut2' rows='4' cols='50'></textarea>";

//write headers first
for (var i in survey_headers){
  if({}.hasOwnProperty.call(survey_headers,i)){
  survey_data+=survey_headers[i];
  if (i < survey_headers.length-1){survey_data+=',';}
    else{survey_data+='\n';}}
}

//show an element
function showPage(doc_ele) {
    doc_ele.style.visibility = 'visible';
    doc_ele.style.display = 'inline';
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//hide an element
function hidePage(doc_ele) {
    doc_ele.style.visibility = 'hidden';
    doc_ele.style.display = 'none';
}

//reset default slider values
function resetInputValues(){
  var ele = document.getElementsByTagName('input');
  for (var i = 0; i < ele.length; i++){
    ele[i].checked = false;
  }
}

//page functions

function smwSurvey() {
    hidePage(survey_instr);
    hidePage(start_surveys_btn);
    showPage(spontaneous_mw_survey);
    showPage(save_smw_btn);
}

function dmwSurvey(){
    hidePage(spontaneous_mw_survey);
    hidePage(save_smw_btn);
    showPage(deliberate_mw_survey);
    showPage(save_dmw_btn);
}

function utSurvey(){
    hidePage(deliberate_mw_survey);
    hidePage(save_dmw_btn);
    showPage(unguided_thought_survey);
    showPage(save_ut_btn);
}

function dassSurvey(){
    hidePage(unguided_thought_survey);
    hidePage(save_ut_btn);
    showPage(dass);
    showPage(save_dass_btn);
}

function asrsSurvey(){
    hidePage(dass);
    hidePage(save_dass_btn);
    showPage(asrs);
    showPage(save_asrs_btn);
}

function docsSurvey(){
    hidePage(asrs);
    hidePage(save_asrs_btn);
    showPage(docs);
    showPage(next_docs_btn);
}

function autSurvey(){
    hidePage(docs_p4);
    hidePage(save_docs_btn);
    showPage(aut_instr);
    showPage(next_aut_btn);
}

function autSurveyBalloon(){
    showPage(aut_container);
    aut_container.innerHTML = aut_balloon;
    window.setTimeout(autIntermission,180000);//180000
}

function autSurveyMarble(){
    counter = 1;
    aut_container.innerHTML = aut_marble;
    showPage(aut_container);
    window.setTimeout(autIntermission,180000);//180000
}

function autIntermission(){
    var comma = ",";
    var aut_raw = "";
    if(counter==1){
        aut_raw = document.getElementById('aut2').value;
        if( aut_raw == null || aut_raw == ""){
            aut_raw = "no answer";
        }
        if(aut_raw.includes(comma)){
            aut_marble_resp = aut_raw.replace(/,/g, ';');
        }
        else{
            aut_marble_resp = aut_raw;
        }
        console.log("aut_marble_resp = " + aut_marble_resp);
        survey_data+=aut_marble_resp + ',';
    }
    else{
        aut_raw = document.getElementById('aut1').value;
        if( aut_raw == null || aut_raw == ""){
            aut_raw = "no answer";
        }
        if(aut_raw.includes(comma)){
            aut_balloon_resp = aut_raw.replace(/,/g, ';');
        }
        else{
            aut_balloon_resp = aut_raw;
        }
        console.log("aut_balloon_resp = " + aut_balloon_resp);
        survey_data+=aut_balloon_resp + ',';
    }
    resetInputValues();
    aut_container.innerHTML = 
        "<p>Your time is up. Click below to continue.</p>";
    showPage(inter_aut_btn);
}

function autCheck(){
    hidePage(aut_container);
    showPage(aut_after);
    showPage(save_aut_btn);
}

function demoSurvey(){
    hidePage(aut_after);
    hidePage(save_aut_btn);
    showPage(demographics);
    showPage(demo_age);
    showPage(demo_gender);
    showPage(demo_education);
    showPage(demo_browser);
    showPage(save_demo_btn);
}

function submitData(){
    survey_data+='\n';
    document.getElementById('put-study-id-here').value = studyid;
    document.getElementById('put-ss-code-here').value = ss_code;
    document.getElementById('put-survey-data-here').value = survey_data;
    document.getElementById('survey-form').submit();
}

//buttons

start_surveys_btn.addEventListener('click',function(event){
    smwSurvey();
});

save_smw_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==4?true:false){
        smw1 = document.querySelector('input[name="smw1"]:checked').value;
        smw2 = document.querySelector('input[name="smw2"]:checked').value;
        smw3 = document.querySelector('input[name="smw3"]:checked').value;
        smw4 = document.querySelector('input[name="smw4"]:checked').value;
        resetInputValues();
        var output = [
            smw1,
            smw2,
            smw3,
            smw4
        ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                survey_data+=output[i];
                if(i<output.length){survey_data+=',';}
            }
        }  
        dmwSurvey();
    }
    else{alert("Please select your response to the questions");}
});

save_dmw_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==4?true:false){
        dmw1 = document.querySelector('input[name="dmw1"]:checked').value;
        dmw2 = document.querySelector('input[name="dmw2"]:checked').value;
        dmw3 = document.querySelector('input[name="dmw3"]:checked').value;
        dmw4 = document.querySelector('input[name="dmw4"]:checked').value;
        resetInputValues();
        var output = [
            dmw1,
            dmw2,
            dmw3,
            dmw4
        ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                survey_data+=output[i];
                if(i<output.length){survey_data+=',';}
            }
        }
        utSurvey();
    }
    else{alert("Please select your response to the questions");}
});

save_ut_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==8?true:false){
        ut1 = document.querySelector('input[name="ut1"]:checked').value;
        ut2 = document.querySelector('input[name="ut2"]:checked').value;
        ut3 = document.querySelector('input[name="ut3"]:checked').value;
        ut4 = document.querySelector('input[name="ut4"]:checked').value;
        ut5 = document.querySelector('input[name="ut5"]:checked').value;
        ut6 = document.querySelector('input[name="ut6"]:checked').value;
        ut7 = document.querySelector('input[name="ut7"]:checked').value;
        ut8 = document.querySelector('input[name="ut8"]:checked').value;
        resetInputValues();
        var output = [
            ut1,
            ut2,
            ut3,
            ut4,
            ut5,
            ut6,
            ut7,
            ut8
        ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                survey_data+=output[i];
                if(i<output.length){survey_data+=',';}
            }
        }
        dassSurvey();
    }
    else{alert("Please select your response to the questions");}
});

save_dass_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==21?true:false){
        dass1 = document.querySelector('input[name="dass1"]:checked').value;
        dass2 = document.querySelector('input[name="dass2"]:checked').value;
        dass3 = document.querySelector('input[name="dass3"]:checked').value;
        dass4 = document.querySelector('input[name="dass4"]:checked').value;
        dass5 = document.querySelector('input[name="dass5"]:checked').value;
        dass6 = document.querySelector('input[name="dass6"]:checked').value;
        dass7 = document.querySelector('input[name="dass7"]:checked').value;
        dass8 = document.querySelector('input[name="dass8"]:checked').value;
        dass9 = document.querySelector('input[name="dass9"]:checked').value;
        dass10 = document.querySelector('input[name="dass10"]:checked').value;
        dass11 = document.querySelector('input[name="dass11"]:checked').value;
        dass12 = document.querySelector('input[name="dass12"]:checked').value;
        dass13 = document.querySelector('input[name="dass13"]:checked').value;
        dass14 = document.querySelector('input[name="dass14"]:checked').value;
        dass15 = document.querySelector('input[name="dass15"]:checked').value;
        dass16 = document.querySelector('input[name="dass16"]:checked').value;
        dass17 = document.querySelector('input[name="dass17"]:checked').value;
        dass18 = document.querySelector('input[name="dass18"]:checked').value;
        dass19 = document.querySelector('input[name="dass19"]:checked').value;
        dass20 = document.querySelector('input[name="dass20"]:checked').value;
        dass21 = document.querySelector('input[name="dass21"]:checked').value;
        resetInputValues();
        var output = [
            dass1,
            dass2,
            dass3,
            dass4,
            dass5,
            dass6,
            dass7,
            dass8,
            dass9,
            dass10,
            dass11,
            dass12,
            dass13,
            dass14,
            dass15,
            dass16,
            dass17,
            dass18,
            dass19,
            dass20,
            dass21
        ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                survey_data+=output[i];
                if(i<output.length){survey_data+=',';}
            }
        }
        asrsSurvey();
    }
    else{alert("Please select your response to the questions");}
});

save_asrs_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==6?true:false){
        asrs1 = document.querySelector('input[name="asrs1"]:checked').value;
        asrs2 = document.querySelector('input[name="asrs2"]:checked').value;
        asrs3 = document.querySelector('input[name="asrs3"]:checked').value;
        asrs4 = document.querySelector('input[name="asrs4"]:checked').value;
        asrs5 = document.querySelector('input[name="asrs5"]:checked').value;
        asrs6 = document.querySelector('input[name="asrs6"]:checked').value;
        resetInputValues();
        var output = [          
            asrs1,
            asrs2,
            asrs3,
            asrs4,
            asrs5,
            asrs6
        ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                survey_data+=output[i];
                if(i<output.length){survey_data+=',';}
            }
        }
        docsSurvey();
    }
    else{alert("Please select your response to the questions");}
});

next_docs_btn.addEventListener('click',function(event){
    hidePage(docs);
    hidePage(next_docs_btn);
    showPage(docs_p1);
    showPage(docs_p1_btn);
});

docs_p1_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==5?true:false){
    docs1 = document.querySelector('input[name="docs1"]:checked').value;
    docs2 = document.querySelector('input[name="docs2"]:checked').value;
    docs3 = document.querySelector('input[name="docs3"]:checked').value;
    docs4 = document.querySelector('input[name="docs4"]:checked').value;
    docs5 = document.querySelector('input[name="docs5"]:checked').value;
    resetInputValues();
    hidePage(docs_p1);
    hidePage(docs_p1_btn);
    showPage(docs_p2);
    showPage(docs_p2_btn);
    }
    else{alert("Please select your response to the questions");}
});

docs_p2_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==5?true:false){
    docs6 = document.querySelector('input[name="docs6"]:checked').value;
    docs7 = document.querySelector('input[name="docs7"]:checked').value;
    docs8 = document.querySelector('input[name="docs8"]:checked').value;
    docs9 = document.querySelector('input[name="docs9"]:checked').value;
    docs10 = document.querySelector('input[name="docs10"]:checked').value;
    resetInputValues();
    hidePage(docs_p2);
    hidePage(docs_p2_btn);
    showPage(docs_p3);
    showPage(docs_p3_btn);
    }
    else{alert("Please select your response to the questions");}
});

docs_p3_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==5?true:false){
        docs11 = document.querySelector('input[name="docs11"]:checked').value;
        docs12 = document.querySelector('input[name="docs12"]:checked').value;
        docs13 = document.querySelector('input[name="docs13"]:checked').value;
        docs14 = document.querySelector('input[name="docs14"]:checked').value;
        docs15 = document.querySelector('input[name="docs15"]:checked').value;
        resetInputValues();
        hidePage(docs_p3);
        hidePage(docs_p3_btn);
        showPage(docs_p4);
        showPage(save_docs_btn);
    }
    else{alert("Please select your response to the questions");}
});

save_docs_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==5?true:false){
        docs16 = document.querySelector('input[name="docs16"]:checked').value;
        docs17 = document.querySelector('input[name="docs17"]:checked').value;
        docs18 = document.querySelector('input[name="docs18"]:checked').value;
        docs19 = document.querySelector('input[name="docs19"]:checked').value;
        docs20 = document.querySelector('input[name="docs20"]:checked').value;
        resetInputValues();
            var output = [
                docs1,
                docs2,
                docs3,
                docs4,
                docs5,
                docs6,
                docs7,
                docs8,
                docs9,
                docs10,
                docs11,
                docs12,
                docs13,
                docs14,
                docs15,
                docs16,
                docs17,
                docs18,
                docs19,
                docs20
            ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                survey_data+=output[i];
                if(i<output.length){survey_data+=',';}
            }
        }
        autSurvey();
    }
    else{alert("Please select your response to the questions");}
});

next_aut_btn.addEventListener('click',function(event){
    hidePage(aut_instr);
    hidePage(next_aut_btn);
    autSurveyBalloon();
});

inter_aut_btn.addEventListener('click',function(event){
    hidePage(inter_aut_btn);
    if (counter==0){
        autSurveyMarble();
    }
    else{autCheck();}
});

save_aut_btn.addEventListener('click',function(event){
    if(document.querySelectorAll('input[type="radio"]:checked').length==1?true:false){
	aut_check = document.querySelector('input[name="aut3"]:checked').value;
    survey_data+=aut_check + ',';
    demoSurvey();
    }
    else{alert("Please select your response to the question");}
});

save_demo_btn.addEventListener('click',function(event){           
    if(validateAge()==false){
        alert("Please answer all questions");
        demo_age.scrollIntoView();
        document.getElementById('demo-age').focus();
    }
    else if(validateGender()==false){
        alert("Please answer all questions");
        demo_gender.scrollIntoView();
        document.getElementById('demo-gender').focus();
    }
    else if(validateEducation()==false){
        alert("Please answer all questions");
        demo_education.scrollIntoView();
        document.getElementById('demo-education').focus();
    }
    else if(validateBrowser()==false){
        alert("Please answer all questions");
        demo_browser.scrollIntoView();
        document.getElementById('demo-browser').focus();
    }
    else{
        age = document.querySelector('input[name="age"]').value;
        gender = document.querySelector('input[name="gender"]:checked').value;
        education = document.querySelector('input[name="education"]:checked').value;
        browser = document.querySelector('input[name="browser"]:checked').value;
        var output = [
            age,
            gender,
            education,
            browser
        ];
        for (var i in output){
            if({}.hasOwnProperty.call(output,i)){
                survey_data+=output[i];
                if(i<output.length){survey_data+=',';}
            }
        }
        survey_data+=user_agent;
        submitData();
    }                
});

//validate data
function validateAge() {
    var x = document.querySelector('input[name="age"]').value;
    if (x == null || x == "") {
        return false;
    }
}
function validateGender() {
    if (document.querySelectorAll('input[name="gender"]:checked').length==1?true:false){
        return true;
    }
    else {
        return false;
    }
}
function validateEducation() {
    if (document.querySelectorAll('input[name="education"]:checked').length==1?true:false){
        return true;
    }
    else {
        return false;
    }
}
function validateBrowser() {
    if (document.querySelectorAll('input[name="browser"]:checked').length==1?true:false){
        return true;
    }
    else {
        return false;
    }
}


//pages on startup
showPage(survey_instr);
showPage(start_surveys_btn);
showPage(do_not_refresh);



var ss_code = sessionStorage.getItem("sscode");
console.log("the ss code is " + ss_code);
survey_data+=ss_code + ',';
console.log(user_agent);

var form_submit = 0;
sessionStorage.setItem("form_submit", form_submit);
console.log(form_submit);