 // Activity 3
// VFW
//Troy Stevenson
//main javascript

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function () {
	
	//getElementId Function.
	function qq(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Creat select field element and populate with options.
	function makeGuest () {
		var formTag = document.getElementsByTagName("form");  //formTag is an Array of all the tag names
		var selectLi = qq("select");
		var makeSelect = document.createElement("select");
		makeSelect.setAttribute("id", "groups");
	
	for(var i=0, j=contactGroups.length; i<j; i++){
		var makeOption = document.createElement("option");
		var optText = contactGroups[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}		

	//Find the value of selected radio button.
	function getSelectedRadio () {
		var radios = document.forms[0].time;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				timeValue = radios[i].value;
			}
		}
	}

	//using js to change CSS properties.
	function toggleControls (n) {
		switch(n) {
			case "on":
			qq("guestForm").style.display = "none";
			qq("clearLink").style.display = "inline";
			qq("displayLink").style.display = "none";
			qq("addNew").style.display = "inline";
			break;
			case "off":
			qq("guestForm").style.display = "block";
			qq("clearLink").style.display = "inline";
			qq("displayLink").style.display = "inline";
			qq("addNew").style.display = "none";
			qq("items").style.display = "none";
			break;
			default:
			return false;
		}
	}

	function storeData (key) {
		if (!key){
			var id = Math.floor(Math.random ()*10000000001);
			}else{
	//set the id to the existing key we're editing tso that it will save over data
	//the key is the same key thats been passed along from the edit Submit handler
	//to validate function, then passed there, in to the storeData Function
		id  = key;
		}
	//Gather all Form field value and store in an object
	//Objext properties contain array with the form and input value.
		getSelectedRadio();
		var item = {};
			item.group = ["Rate:", qq("groups").value];
			item.fName = ["Firest Name:", qq("fName").value];
			item.lName = ["Last Name:", qq("lName").value];
			item.email = ["Email:", qq("email").value];
			item.pNumber = ["Phone Number:", qq("pNumber").value];
			item.maintenance = ["Maintenance:", qq("maintenance").value];
			item.time = ["Time:", timeValue];
			item.notes = ["Notes:", qq("notes").value];
		
	//Save data into Local storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Guest is Saved!"); 	
		}
	     	
		function addNew () {
			window.location.reload();
	}
        
	function getData () {
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage!"); 
			autoFillData();
		}
		
	//Write Data from local storage to the browser.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		qq("items").style.display = "block";
		 	
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
	//Convert string from local storage value back to an obj by using JSON.parse.
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("ul");
		makeli.appendChild(makeSubList);
		getImage(obj.group[1], makeSubList);
		for(var n in obj){
			var makeSubli = document.createElement("li");
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0] +" "+ obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
			}
		}
		makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/Link for each item in local storage.
	}
	 	
	//get the image for the right job
	function getImage (jobName, makeSubList) {
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/"+ jobName + ".png");
		imageLi.appendChild(newImg);	 	
	}

	function autoFillData(){
	//Storing JSON Object to local storage
		for(var n in json){
			var id = Math.floor(Math.random ()*10000000001);
			localStorage.setItem(id, JSON.stringify(json[n])); 
		}
	}

	//make Item Links
	//Create the edit and delete links for each stored item when displayed
	function makeItemLinks (key, linksLi){
	//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Guest";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
	//add break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);	 	
	//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Guest";	
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
	//Grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
	//Show form
		toggleControls ("off");
	//populat the form foelds this the current localstorage values
		qq("groups").value = item.group[1];
		qq("fName").value = item.fName[1];
		qq("lName").value = item.lName[1];
		qq("email").value = item.email[1];
		qq("pNumber").value = item.pNumber[1];
		var radios = document.form[0].time;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value = "Day" && item.time[1] == "Day"){
				radios[i].setAttribute("checked", "checked");
				}else if(radios[i].value = "Night" && item.time[1] == "Night"){
					radios[i].setAttribute("checked", "checked");
			}
		}
		qq("maintenance").value = item.maintenance[1];
		qq("notes").value = item.notes[1];
	//REmove the initial listener from the input "save contact' button
		save.removeEventListener("click", storeData);
	//Change Submit button value to Edit Button
		qq("submit").value = "Edit Guest";
		var editSubmit = qq("submit");
	//save the key value established in this function as a property of the event
	//so I can use that value when I save
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;		
	}			
		
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this guest?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Guest was deleted!");
			window.location.reload();
			}else{
				alert("Guest was NOT deleted.");
		}
	}
	
	function clearLocal () {
		if(localStorage.length === 0){
			alert("Nothing to Clear!");
			}else{
				localStorage.clear();
				alert("All Guest's are Deleted!");
				window.location.reload();
				return false;
		}
	}

	function validate (e){
	//define the elements I want to check
		var getGroup = qq("groups");
		var getFname = qq("fName");
		var getLname = qq("lName");
		var getEmail = qq("email");
	//reset the error messages
		errMsg.innerHTML = "";
		getGroup.style.border = "2px solid black";
		getFname.style.border = "2px solid black";
		getLname.style.border = "2px solid black";
		getEmail.style.border = "2px solid black";
	//Get error messages
		var messageAry = [];
	//group validation
		if(getGroup.value === "--Choose A Group--"){
			var groupError = "Please choose a rate.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		 
	//first name valitation
		if(getFname.value === ""){
			var fNameError = "Please enter a first name.";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		 	
	//last name validation
		if(getLname.value === ""){
			var lNameError = "Please enter a last name.";
			getLname.style.border = "1px solid red";
			messageAry.push(lNameError);
		}
		 	
	//email valitation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid Email Address";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
			 
	//if there were errors, display then on the screen
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
		}else{			
	//if all is ok, save our data.  send the key value that came from the editData funcution
	//remember the is was passed through the editSubmit
	storeData (this.key);
		} 
	}

	//Variable defaults
	var contactGroups = ["--Choose A Rate--", "Rack", "SRS", "Military"],
		timeValue;
		errMsg = qq("errors");
	;
	makeGuest ();

	errMsg = qq("errors");

	//Set Link & Submit Click Events
	var displayLink = qq("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = qq("clearLink");
	clearLink.addEventListener("click", clearLocal);
	var save = qq("save");
	save.addEventListener("click", validate);
	var add = qq("addNew");
	add.addEventListener("click", addNew);
});