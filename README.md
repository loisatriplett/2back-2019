# 2back-2019

This is a 2-back program created in summer 2019.

It has been edited from its original form to remove study-specific details.

<ul>This program was created using HTML, CSS, Javascript, and PHP to meet the following specifications:
  <li>Exclude / redirect participants using mobile phones</li>
  <li>Exclude / redirect participants using browsers other than Chrome, Firefox, Edge, or Opera</li>
  <li>Obtain participant consent or redirect</li>
  <li>Test participant equipment to verify that keyboard presses are recorded</li>
  <li>Present detailed task instructions and show probe question examples</li>
  <li>Run participants through a number of practice 2-back trials and give feedback</li>
  <li>Re-run participants through practice trials until they reach a predetermined goal</li>
  <li>Run participants through a number of test 2-back trials</li>
  <li>Ask participant mind wandering level a number of times, randomly and evenly distributed among the trials</li>
  <li>Gauge participant freely moving thought directly after those mind wandering probes</li>
  <li>Present one captcha meant to filter out the use of bots</li>
  <li>Administer a series of mental health questionnaires, requiring answers for all questions</li>
  <li>Administer a creativity task with two randomly presented prompts</li>
  <li>Obtain participant demongraphics information</li>
  <li>Save 2-back and survey data as .txt files and add participant ids to a running participant list</li>
  <li>Return assigned verification code and present debriefing information</li>
  <li>Provide a feedback form and save these responses</li>
</ul>
  
<ul>The 2-back itself was programmed as follows:
  <li>Each trial lasted 2500ms, with a letter presented for 1/5 that time, followed by a focus cross</li>  
  <li>The letters used were BFKHMQRXZ</li>
  <li>Participants pressed their spacebar if the letter presented matched the letter presented two trials ago</li>
  <li>Each match was considered a target</li>
  <li>During practice trials, letters were presented in a predetermined order, containing 4 possible targets</li>
  <li>During test trials, letters were presented in random order</li>
  <li>Response time, trial number, letter presented, target match, false alarms, and start and end times were recorded, among other variables</li> 
</ul>  
