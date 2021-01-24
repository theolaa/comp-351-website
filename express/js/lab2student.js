

let retrieve= JSON.parse(localStorage.getItem("questions"));
let j=0;
 
  
if (retrieve === null) {
  alert("there is no quiz available at the moment")
}

else{
for (let i=0; i<retrieve.length; i++)
{
	let x=" ";
	
	ques = document.createElement("div");
	ques.setAttribute("id", "que"+i);
	ques.innerText=retrieve[i].questionText;
	
	
	code = document.createElement("code");
	code.setAttribute("id", "code"+i);
	code.innerText=retrieve[i].code;
	
	newline = document.createElement("br");

	
	
	

	
	for (j in retrieve[i].options) {
	x += retrieve[i].options[j];
	
	
	
     inputValue = document.createElement("choice");
	 inputValue.setAttribute("id", "choice")
     inputValue.type = "radio";
	 inputValue.id = "option"
	 inputValue.value = "choice"
	 inputValue.innerText=x;
	 
	 
	 //option = document.createTextNode("option");
	 //option.setAttribute("id", "option");
	//option.innerText=x;
	
	 //inputValue.appendChild(option);
     
      
	
}



	document.getElementById("questionText", "code", "options").append(ques, code, newline, inputValue);
	
	
	
	
	
	
}
	
}
