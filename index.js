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
		fetch(url, {
		    method : "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({"pageid": user})
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

	function createArea() {
		const area = document.querySelector('#content');
		const div = document.createElement('div');
		const button = document.createElement('button');
		const button2 = document.createElement('button');
		const textnode = document.createTextNode('Send 1st block');
		const textnode2 = document.createTextNode('Send 2nd block');
		div.setAttribute("id", "area");
		button.setAttribute("class", "btn-chatbotex");
		button2.setAttribute("class", "btn-chatbotex");
		area.appendChild(div);
		div.appendChild(button);
		div.appendChild(button2);
		button.appendChild(textnode);
		button2.appendChild(textnode2);
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
				const myParam = urlParams.get('selected_item_id');
				console.log(myParam);
				user = myParam;
			}
		});

	window.onload = () => {
		createArea();
		const buttons = document.querySelectorAll('.btn-chatbotex');
		if (buttons.length > 0){
			const btn1 = buttons[0];
			const btn2 = buttons[1];
			btn1.addEventListener('click',()=>{
				sendBroadcast(user,'broadcast')
			});
			btn2.addEventListener('click',()=>{
				sendBroadcast(user,'test')
			})
		}
	}
})();


