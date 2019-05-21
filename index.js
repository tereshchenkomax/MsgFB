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
					console.log('everything is OK');
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
		btn.setAttribute('id', name.replace(/\s/g, ''));
		btn.appendChild(textnode);
		return btn;
	}

	function createButtonForDropdown(name) {
		let btn = createButton(name);
		btn.setAttribute('class', 'btn-chatbotex');
		return btn;
	}

	function createButtonForArea(name) {
		let btn = createButton(name);
		btn.setAttribute('class', 'btn-area');
		return btn;
	}

	function createLink(name) {
		let link = document.createElement('a');
		let textnode = document.createTextNode(name);
		link.setAttribute('class', 'dropdown-link');
		link.appendChild(textnode);
		return link;
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

	function loopThroughSettings(settings) {
		const area = document.querySelector('#area');
		const cats = Object.keys(settings.categories);
		const btns = settings.buttons;
		if (cats && cats.length > 0) {
			cats.forEach(btn => {
				let button = area.appendChild(createButtonForDropdown(btn));
				let div = document.createElement('div');
				div.setAttribute('class', 'dropdown-content');
				button.appendChild(div);
				settings.categories[btn].forEach(link => {
					div.appendChild(createLink(link));
				});
			})
		}
		if (btns && cats.length > 0) {
			btns.forEach(btn => {
				area.appendChild(createButtonForArea(btn));
			})
		}

	}

	function makeDisabled(btn) {
		btn.setAttribute('class', 'disabled');
		setTimeout(() => {
				btn.setAttribute('class', 'btn-area');
			}
			, 1500);
	}

	function closeDropdown(event) {
		let dropdowns = document.getElementsByClassName("dropdown-content");
		for (let i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}

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
			if (event.target.classList.contains('dropdown-link') || event.target.classList.contains('btn-area')) {
				sendBroadcast(user, event.target.innerText);
				closeDropdown(event);
				makeDisabled(event.target);
			} else if (event.target.classList.contains('btn-chatbotex')) {
				document.getElementById(event.target.id).children[0].classList.toggle("show");
			} else {
				closeDropdown(event);
			}
		});
	}
})();


