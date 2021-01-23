let retrieve= JSON.parse(localStorage.getItem("questions"));

let x = " ";
let j=0;

if (retrieve === null) {
  alert("there is no quiz available at the moment")
}

else{
for (let i=0; i<retrieve.length; i++)
{
	for (j in retrieve[i].options) {
    x += ("<br>" + retrieve[i].options[j] + "<br>");
}
	
	document.getElementById("questionText", "options").innerHTML += ( "question" + " " + (i+1) + " :" + " " + retrieve[i].questionText + "<br>"+ retrieve[i].code + "<br>" + " " + retrieve[i].options + "<br>" );
   

}
	
}	
 
 
 function check(){
	 
	 
	 
	 
 }
