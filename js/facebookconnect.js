var fb_Score = 0;
var fb_login = false;

FB.init({
	appId : '775607835795969',
	xfbml : true,
	version : 'v2.0'
});

//<!-- These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->
/*
 if (( typeof cordova == 'undefined') && ( typeof Cordova == 'undefined'))
 alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
 if ( typeof CDV == 'undefined')
 alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');

 if ( typeof FB == 'undefined')
 alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
 */

FB.Event.subscribe('auth.login', function(response) {
	//alert('auth.login event');
});

FB.Event.subscribe('auth.logout', function(response) {
	//alert('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function(response) {
	//alert('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function(response) {
	//alert('auth.statusChange event');
});

document.addEventListener('deviceready', function() {
	try {
		//alert('Device is ready! Make sure you set your app_id below this alert.');
		FB.init({
			appId : "775607835795969",
			nativeInterface : CDV.FB,
			useCachedDialogs : false
		});
	} catch (e) {
		alert(e);
	}

}, false);

function fbLogin() {
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			FB.logout(function(response) {
				//alert('Logged Out Successfully!');
				isLogin();
			});
		} else {
			FB.login(function(response) {
				if (response.status == 'connected') {
					//alert('Logged In Successfully!');
				} else {
					alert('Unable to Log In');
				}
				isLogin();
			}, {
				scope : "public_profile,email,user_friends"
			});
		}
	});

}

function getLoginStatus() {
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			fb_login = true;
			readScore();
			FB.api("/me", {
				fields : 'id, name, picture, email'
			}, function(response) {
				if (response.error) {
					alert(JSON.stringify(response.error));
				} else {
					//alert(response.name);
					alert(response.picture.data.url);
				}
			});

			alert('logged in');
		} else {
			alert('not logged in');
		}
	});
}

function updateScore(score) {
	//fb_Score = score;
	FB.api("/me/scores", "POST", {
		'score' : score
	}, function(response) {
		if (response && !response.error) {
			/* handle the result */
		} else {
			//alert(JSON.stringify(response.error))
		}
	});
}

function readScore() {
	FB.api("/me/scores", function(response) {
		if (response && !response.error) {
			fb_Score = response.data[0].score
		} else {
			alert(JSON.stringify(response.error))
		}
	});
}

function isLogin() {
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			//alert("connected")
			fb_login = true;
			$('#btn-login').html('<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/t1.0-1/c153.3.545.545/s50x50/625676_10151614307134009_614745219_n.jpg"> Logout');
			
		} else {
			//alert("disconnected")
			$('#btn-login').html("Log In");
		}
	});
}

function getFbScore(){
	return fb_Score;
}

function getFbLogin(){
	return fb_login;
}
