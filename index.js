(() => {

	// function find_link_by_href() {
	// 	const regexFB = /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:[\w\-]*\/)*([\w\-\.]+)$/
	// 	let links = [...document.querySelectorAll("a")];
	// 	let filteredLink = links.filter(link =>{
	// 		if (regexFB.test(link.href) && link.innerHTML === 'View Profile') {
	// 			return link
	// 		}
	// 		return null;
	// 	});
	// 	return filteredLink[0].href
	// }
	//
	var user;

	function sendBroadcast(user, blockname) {
		const url = 'https://thawing-island-66101.herokuapp.com/broadcast';//TODO check the URI
		// const url = 'http://localhost:5000';
		console.log(user,blockname);
		fetch(url, {
		    method : "POST",
			headers: {
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
					}}
			} // .json(), etc.
		).then(
		    res => console.log(res)
		).catch(err => console.log(err));
	}

	function createButton(name) {
		let btn = document.createElement('button');
		let textnode = document.createTextNode(name);
		btn.setAttribute('class','btn-chatbotex');
		btn.setAttribute('id', name);
		btn.appendChild(textnode);
		return btn
	}

	function createArea() {
		const area = document.querySelector('#globalContainer');
		const div = document.createElement('div');
		div.setAttribute("id", "area");
		area.appendChild(div);
		div.appendChild(createButton('test'));
		div.appendChild(createButton('broadcast'));
		div.appendChild(createButton('with space'));
		// div.innerHTML = createElements()
	}

	//helper func
	function whenAvailable(node, callback) {
		const interval = 100; // ms
		window.setTimeout(function () {
			if (node) {
				callback(node);
			} else {
				window.setTimeout(arguments.callee, interval);
			}
		}, interval);
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
		const area = document.querySelector('#area');

		area.addEventListener('click',event => {
			if ( event.target.classList.contains( 'btn-chatbotex' ) ) {
				sendBroadcast(user,event.target.innerText)
			}
		});
	}
})();


