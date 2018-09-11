'use strict';
var heading = document.querySelector('h1');

function pollDashServer(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			heading.textContent = req.responseText;
			if(req.responseText === 'true'){
				document.body.classList.add('truthy');
			}
			else{
				document.body.classList.remove('truthy');
			}
			setTimeout(pollDashServer, 5000);
		}
	};

	req.open('GET', '/status', true);
	req.send(null);
}

pollDashServer();