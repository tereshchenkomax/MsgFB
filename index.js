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
	// function getFBid(user) {
	// 	const url = "https://findmyfbid.in/apiv1/";
	// 	const TOKEN = "68aaacffca53ad8022ebdd28299f195044a259f0";
	// 	fetch(url, {
	// 	    method : "POST",
	// 		headers: `Authorization: Token ${TOKEN}`,
	// 	    // body: new FormData(document.getElementById("inputform")),
	// 	    // -- or --
	// 	    body : JSON.stringify({
	// 	        fburl : user
	// 	    })
	// 	}).then(
	// 	    response => response.text() // .json(), etc.
	// 	    // same as function(response) {return response.text();}
	// 	).then(
	// 	    html => console.log(html)
	// 	);
	// }
	//
	// async function mainFunc () {
	// 	let link = await find_link_by_href();
	// 	getFBid(link);
	// }

	function whenAvailable(name, callback) {
		const interval = 100; // ms
		window.setTimeout(function () {
			if (window[name]) {
				callback(window[name]);
			} else {
				window.setTimeout(arguments.callee, interval);
			}
		}, interval);
	}


	// window.onload = setTimeout(mainFunc, 10000);//TODO find the better way
	// window.addEventListener('load', console.log('changed'))
	//
	// window.addEventListener('popstate', function (e) {
	// 	console.log('url changed')
	// });

	chrome.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			// listen for messages sent from background.js
			if (request.message === 'hello!') {
				console.log(request.url) // new url is now in content scripts!
			}
		});
})();

//https://screencast.com/t/dGnFZj0RY0
