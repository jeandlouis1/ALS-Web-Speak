 var speed = 200;//delay until the next key is accepted
    var option =1;
    var down = false;
    document.addEventListener('keydown', function (evt) {
        if(down) return;
        down = true;

        evt = evt || window.event;
        if (evt.keyCode == 90 & flag) {//z key
                disable();
                flag = false
                //alert("Ctrl-Z");
                if(option == 1){
                    myStopFunction();//stop col
                    option *= -1;
                }
                else{
                    myStopInnerFunction();//select item
                    option *= -1;
                }
                flag= true;
            }
    }, false);

//set a time out for when it will accept the next key press
document.addEventListener('keyup', function () {
   timeout = setTimeout(() => down = false, speed);
    
}, false);


function disable(){
    flag=false;
}



//container div is outer divs
var intervalSpeed = 680; // speed of highlight
var containerDiv = document.getElementById("keybPad0");//key pad
var innerDivs = containerDiv.getElementsByTagName("DIV");//rows
var columnInterval;// = setInterval(loopCol(containerDiv), 2000);
var rowInterval;//inter val to run through row
var cols;//current column 
var flag = true;
var chat = document.getElementById("chat-window");
var currSentence = document.getElementById('output');
var hRate = document.getElementById('Hrate');
 function enable(){
            console.log("enabling");
            //document.onkeydown=run();
            flag=true;
}
function disable2(){
            document.onkeydown = function (e){
            return false;
             }
}


//--------------------------------------------------------------start everything--------------------------------------------
function myFunction(){


    //starts the process
     rowInterval = setInterval(function(){loopRow();}, intervalSpeed);

}

//------------------row and col manipulation-----------------------
//stops looping through columns and start rows
function myStopFunction() {
    const p = new Promise((resolve, reject) =>{
    StopRow();
    resolve('Success!');
    })
    .then(startCol())
    .then(console.log("Row selected")); 
}

//stop looping through rows and select the current tile as the next letter to output
function myStopInnerFunction() {
    const p2 = new Promise((resolve, reject) =>{
    StopCol();
    resolve('Success!');
    }).then(buttonType(currItemType))
    .then(startRow())
    .then(console.log("button selected"));
}

//stops both inerval loops
function myGlobalStop(){
    const p3 = new Promise((resolve, reject) =>{
    clearInterval(rowInterval); 
    counts =-1;
    innercount =-1;   
    resolve('Success!');
    })
    .then(clearInterval(columnInterval));   
}

//used in the stop function to terminate column highlighting
function StopCol(){
    clearInterval(columnInterval);    
}
function StopRow(){
    clearInterval(rowInterval);
}

//takes array of an inner div and start looping through its buttons 
function startRow(){
    if(innercount >=0){
        cols[innercount].style.backgroundColor = 'initial'; //blank out pass selection
    }
    else{
        cols[0].style.backgroundColor = 'initial';
    }
    counts=-1;
    innercount=-1;
    rowInterval = setInterval(function(){loopRow();}, intervalSpeed);  
}

function startCol(){
    if(counts >=0){
        cols = innerDivs[counts].getElementsByTagName("BUTTON");
    }
    else{
        cols = innerDivs[0].getElementsByTagName("BUTTON");
    }
    //reset global position for the loops
    innercount=-1;
    counts=-1;
    columnInterval = setInterval(function(){loopCol(cols);}, intervalSpeed);  
}


//----------------------handle buttons--------------------
function buttonType(currItemType){//button type
    switch(currItemType) {
        case "chars":
            appendChar(currElement);
            break;
        case "suggestion":
            appendChar(currElement);
            break;
        case "functions":
            doFunction(currElement)
            break;
        case "options":
            switchPage(currElement);
            break;
        default:
            
    }
}
function doFunction(currElement){//function selectioon
    switch(currElement) {
        case "ENTER":
            //appendChar('\n');
            sendSentence();//send sentece to chat view
            break;
        case "Backspace":
            appendChar(currElement);//remove a har
            //change currword for word prediction
            break;
        case "[Space]":
            appendChar(currElement);//remove a har
            //change currword for word prediction
            break;
        case "ALT":
            //SwitchPage();
            break;
        default:
            
    }
}

function switchPage(currElement){
    switch(currElement) {
        case "Letters":
            switchKeys(0);
            break;
        case "Numbers":
            switchKeys(1);
            break;
        case "Emoji":
            switchKeys(2);
            break;
        default:
            
    }
}



//append letter to sentence div
function appendChar(letter){
    if(letter == "Backspace"){
        console.log("back");
        if(currSentence.innerHTML.length > 0){
            currSentence.innerHTML = currSentence.innerHTML.slice(0, -1);
            console.log("pre curr "+currWord);
            currWord =currWord.slice(0,-1);
            console.log("pre curr "+currWord);
        }
    }
    else if(letter == "[Space]"){
        console.log("space");
        currSentence.innerHTML += '&#32';
        prevWord = currWord;//for word prediction
        console.log(prevWord);
        predictNextWord(prevWord);
        currWord="";
    }
    else{
        currWord +=letter; //for word prediction
        currSentence.innerHTML += letter; 
        //if prevWord>0
        //predictNewWord(prevWord,currWord);
    }
   // console.log("currWord: "+currWord);
   // console.log("currsent: "+currSentence);
   // console.log("prevword: "+prevWord);
}

function sendSentence(){
    console.log('enter!!!!!!!!!!!!!');
    var node = document.createElement("h3");                 // Create a <li> node
    var textnode = document.createTextNode(currSentence.innerHTML);         // Create a text node
    speak(currSentence.innerHTML);
    node.appendChild(textnode);                              // Append the text to <li>
    chat.appendChild(node);     // Append <li> to <ul> with id="myList"
    currSentence.innerHTML ="";
    //chat.appendChild(currSentence);
    updateScroll();
}

function updateScroll(){
    chat.scrollTop = chat.scrollHeight;
}

//-------------------word prediction--------------


//----------------key Pads-------------------------
var key0 = document.getElementById("keybPad0"); 
var key1 = document.getElementById("keybPad1");
var key2 = document.getElementById("keybPad2");
var keyPads = [key0,key1,key2];

function switchKeys(pad){

    for (let i =0; i<keyPads.length;i++){
        if(i == pad){
            containerDiv = document.getElementById(keyPads[i].getAttribute("id"));//re assigne key pad
            innerDivs = containerDiv.getElementsByTagName("DIV");//rows
            keyPads[i].style.display = "block";
            //console.log(keyPads[i].getAttribute("value"));
        }
        else{
            keyPads[i].style.display = "none";
        }
    }
}

//------------------------------------------------------







//---------------------row and col loops-------------------
//initialize global positions to -1
let counts =-1;
let innercount =-1;
let currElement;
let currItemType;
var currWord="";
var prevWord="";

function loopRow(){
     intervalSpeed =700/parseFloat(hRate.value);
    counts =(counts+1)%innerDivs.length;
    //remove the background from the other elements and add it to the current element
    for (var i =0;i<innerDivs.length;i++){
        if(counts == i & i>=0){
            innerDivs[i].style.backgroundColor = "#FFC107"; 
            currItemType = innerDivs[i].getAttribute("name");
        }
        else{
            innerDivs[i].style.backgroundColor = 'transparent';    
        }
    }  
   
}

function loopCol(row){
     innercount =(innercount+1)%row.length;
    for (var i =0;i<row.length;i++){
        if(innercount == i& i>=0){
            row[i].style.backgroundColor = "#BDBDBD"; 
            currElement =  row[i].innerHTML;
        }
        else{

            row[i].style.backgroundColor = 'initial';    
        }
    }

}

