(() => {

	var user;

	function sendBroadcast(user, blockname) {
		const url = 'https://thawing-island-66101.herokuapp.com/broadcast';//TODO check the URI
		// const url = 'http://localhost:5000';
		console.log(user, blockname);
		fetch(url, {
			method: "POST",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"pageid": user,
				"blockname": blockname
			})
		}).then(
			response => {
				if (response.ok) {
					// you can call response.json() here too if you want to return json
					console.log('everything is OK')
					const btn = document.querySelector(`#${blockname}`);
					//TODO change the color or smth
				} else {
					//handle errors in the way you want to
					switch (response.status) {
						case 404:
							console.log('404 - PSID has not found in the Database');
							//TODO change the color or smth
							break;
						case 400:
							console.log('400 - server could not understand the request due to invalid syntax');
							//TODO change the color or smth
							break;
						case 500:
							console.log('500 - Internal server error');
							//TODO change the color or smth
							break;
						default:
							console.log('Some error occured');
							//TODO change the color or smth
							break;
					}
				}
			} // .json(), etc.
		).catch(err => console.log(err));
	}

	function createButton(name) {
		let btn = document.createElement('button');
		let textnode = document.createTextNode(name);
		btn.setAttribute('class', 'btn-chatbotex');
		btn.setAttribute('id', name);
		btn.appendChild(textnode);
		return btn
	}

	function createArea() {
		const area = document.querySelector('#globalContainer');
		const div = document.createElement('div');
		div.setAttribute('id', 'area');
		area.appendChild(div);
	}

	function getJSONsettings() {
		const url = chrome.runtime.getURL('settings.json');

		fetch(url)
			.then((response) => response.json()) //assuming file contains json
			.then((json) => loopThroughSettings(json))
			.catch(err => console.log(err))
	}

	function loopThroughSettings({buttons}) {
		const div = document.querySelector('#area');
		if (buttons && buttons.length > 0){
			buttons.forEach(btn =>{
				div.appendChild(createButton(btn));
			})
		}
	}

	function makeDisabled(btn){
		btn.setAttribute('class','disabled');
		setTimeout(() => {
			btn.setAttribute('class', 'btn-chatbotex');
		}
		,1500);
	}

	chrome.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			// listen for messages sent from background.js
			if (request.message === 'hello!') {
				const urlParams = new URLSearchParams(request.url);
				user = urlParams.get('selected_item_id');
				console.log(user)
			}
		});

	window.onload = () => {
		createArea();
		getJSONsettings();
		const area = document.querySelector('#area');

		area.addEventListener('click', event => {
			if (event.target.classList.contains('btn-chatbotex')) {
				sendBroadcast(user, event.target.innerText); //TODO turn on
				makeDisabled(event.target);
			}
		});
	}
})();


