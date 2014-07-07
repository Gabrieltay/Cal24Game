//<!-- These are the notifications that are displayed to the user through pop-ups if the above JS files does not exist in the same directory-->
if (( typeof cordova == 'undefined') && ( typeof Cordova == 'undefined'))
	alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if ( typeof CDV == 'undefined')
	alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if ( typeof FB == 'undefined')
	alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

FB.Event.subscribe('auth.login', function(response) {
	alert('auth.login event');
});

FB.Event.subscribe('auth.logout', function(response) {
	alert('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function(response) {
	alert('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function(response) {
	alert('auth.statusChange event');
});

function fblogin() {
	FB.login(function(response) {
		if (response.status == 'connected') {
			alert('logged in');
		} else {
			alert('not logged in');
		}
	}, {
		scope : "email"
	});
}