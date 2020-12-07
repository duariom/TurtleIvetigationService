document.addEventListener("DOMContentLoaded",function() {
	let konami = [ 38,38,40,40,37,39,37,39,66,65]
	let pos = 0
	let body = document.querySelector("body")
	body.addEventListener("keyup",function(event) {
		if (konami[pos] == event.keyCode){
			pos++
		}
		else
			pos = 0;
		if (pos == konami.length) {
			//code		
      	
		}
	});
});