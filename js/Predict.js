
//console.log(dic["FAWN"]);
var div0 = document.getElementById('output0');
var div1 = document.getElementById('output1');
var div2 = document.getElementById('output2');
var div3 = document.getElementById('output3');
var div4 = document.getElementById('output4');

var divs = [div0,div1,div2,div3,div4];
var limit = 4;


function predictNextWord(word){
	console.log("current word: "+ word);
	div0.innerHTML = word;
	if(dic.hasOwnProperty(word)){
		let subtree = dic[word];
		for(let i=0;i<subtree.length && i<limit;i++){
			divs[i].innerHTML = (subtree[i][0]);
			console.log(subtree[i][0]+ "   ---with fq--- "+subtree[i][1])
		}
	}
}

//predict("the");

//predictNextWord("WROTE");













function predictNewWord(word,wordPart){

}