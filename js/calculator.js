var inputs = new Array;
var resstr = new String;
var numofsol = 0;
resstr = "";
var wanted = 24;
var ifpower = false;
var maxtime = 300;
var countdown = maxtime;
var myTimer = null;
var seq = "first";
var firstNum = 0;
var oper = "";
var operNum = 0;
var score = 0;
var lastKey = 0;
var passes = 3;
var fbscore = 0;
var buttonTone = null;
var clearTone = null;
var badTone = null;
var bgTone = null;
var path = "";
var playPath = "";
var goodPath = "";
var badPath = "";

var init = function() {
	initLocalStorage();
	if (window.localStorage.getItem("volume") == 0)
		$('#volume-btn>i').toggleClass('fa-volume-up fa-volume-off');
	path = window.location.pathname;
	path = path.substr(path, path.length - 10);
	playPath = path + "media/tone.wav";
	goodPath = path + "media/good.wav";
	badPath = path + "media/bad.wav";
	bgPath = path + "media/bg.mp3";

	buttonTone = new Media(playPath, // success callback
	function() {
	},
	// error callback
	function(err) {
	});
	buttonTone.setVolume(window.localStorage.getItem("volume"));

	clearTone = new Media(goodPath, // success callback
	function() {
	},
	// error callback
	function(err) {
	});
	clearTone.setVolume(window.localStorage.getItem("volume"));

	badTone = new Media(badPath, // success callback
	function() {
	},
	// error callback
	function(err) {
	});
	badTone.setVolume(window.localStorage.getItem("volume"));

/*
	bgTone = new Media(bgPath, // success callback
	function() {
	},
	// error callback
	function(err) {
	},
	// status
	function(status) {
		if (status == Media.MEDIA_STOPPED) {
			bgTone.play();
		}
	});
	bgTone.setVolume(window.localStorage.getItem(0.0));
	*/
}
//	onDeviceReady();

function initLocalStorage() {
	if (window.localStorage.getItem("highest") == null)
		window.localStorage.setItem("highest", 0);
	if (window.localStorage.getItem("volume") == null)
		window.localStorage.setItem("volume", '1.0');
}


$(document).ready(init);
/*
 window.addEventListener('load', function() {
 new FastClick(document.body);
 }, false);
 */
function node(leftChild, rightChild, weight, opera) {
	this.leftChild = leftChild;
	this.rightChild = rightChild;
	this.weight = weight;
	this.opera = opera;
}

function BuildUnbalLeftLong(root, num1, num2, num3, num4, opera1, opera2, opera3) {
	var leftGrandGrand = new node(null, null, num1, -1);
	var rightGrandGrand = new node(null, null, num2, -1);
	var leftGrand = new node(leftGrandGrand, rightGrandGrand, -10000, opera1);
	var rightGrand = new node(null, null, num3, -1);
	var Childleft = new node(leftGrand, rightGrand, -10000, opera2);
	var Childright = new node(null, null, num4, -1);
	root = new node(Childleft, Childright, -10000, opera3);
	return root;
}

function BuildUnbalRightLong(root, num1, num2, num3, num4, opera1, opera2, opera3) {
	var leftGrandGrand = new node(null, null, num1, -1);
	var rightGrandGrand = new node(null, null, num2, -1);
	var rightGrand = new node(leftGrandGrand, rightGrandGrand, -10000, opera1);
	var leftGrand = new node(null, null, num3, -1);
	var Childright = new node(leftGrand, rightGrand, -10000, opera2);
	var Childleft = new node(null, null, num4, -1);
	root = new node(Childleft, Childright, -10000, opera3);
	return root;
}

function BuildBal(root, num1, num2, num3, num4, opera1, opera2, opera3) {
	var leftleftChild = new node(null, null, num1, -1);
	var leftrightChild = new node(null, null, num2, -1);
	var leftChild = new node(leftleftChild, leftrightChild, -10000, opera1);
	var rightleftChild = new node(null, null, num3, -1);
	var rightrightChild = new node(null, null, num4, -1);
	var rightChild = new node(rightleftChild, rightrightChild, -10000, opera2);
	root = new node(leftChild, rightChild, -10000, opera3);
	return root;
}

function BuildMidLeft(root, num1, num2, num3, num4, opera1, opera2, opera3) {
	var leftGrandGrand = new node(null, null, num1, -1);
	var rightGrandGrand = new node(null, null, num2, -1);
	var rightGrand = new node(leftGrandGrand, rightGrandGrand, -10000, opera1);
	var leftGrand = new node(null, null, num3, -1);
	var Childleft = new node(leftGrand, rightGrand, -10000, opera2);
	var Childright = new node(null, null, num4, -1);
	root = new node(Childleft, Childright, -10000, opera3);
	return root;
}

function BuildMidRight(root, num1, num2, num3, num4, opera1, opera2, opera3) {
	var leftGrandGrand = new node(null, null, num1, -1);
	var rightGrandGrand = new node(null, null, num2, -1);
	var leftGrand = new node(leftGrandGrand, rightGrandGrand, -10000, opera1);
	var rightGrand = new node(null, null, num3, -1);
	var Childright = new node(leftGrand, rightGrand, -10000, opera2);
	var Childleft = new node(null, null, num4, -1);
	root = new node(Childleft, Childright, -10000, opera3);
	return root;
}

function operate(left, right, opera) {
	switch(opera) {
		case 0:
			result = left + right;
			return result;
			break;
		case 1:
			result = left - right;
			return result;
			break;
		case 2:
			result = left * right;
			return result;
			break;
		case 3:
			result = left / right;
			return result;
			break;
		case 4:
			result = Math.pow(left, right);
			return result;
			break;
		default:
			result = -10000;
			return result;
	}
}

function operation_table(opera) {
	switch(opera) {
		case 0:
			return "+";
			break;
		case 1:
			return "-";
			break;
		case 2:
			return "*";
			break;
		case 3:
			return "/";
			break;
		case 4:
			return "^";
			break;
		default:
			return "_";
	}
}

function regular_prepare(opera) {
	switch(opera) {
		case 0:
			return "\\+";
			break;
		case 1:
			return "\\-";
			break;
		case 2:
			return "\\*";
			break;
		case 3:
			return "\\/";
			break;
		case 4:
			return "\\^";
			break;
		default:
			return "_";
	}
}

function generate_result(root) {
	if (root.leftChild != null && root.rightChild != null)
		return "(" + generate_result(root.leftChild) + operation_table(root.opera) + generate_result(root.rightChild) + ")";
	return root.weight;
}

function generate_RegExp(root) {
	if (root.leftChild != null && root.rightChild != null)
		return "\\(" + generate_RegExp(root.leftChild) + regular_prepare(root.opera) + generate_RegExp(root.rightChild) + "\\)";
	return root.weight;
}

function weighten(root) {
	if (root.leftChild != null && root.leftChild.weight == -10000)
		weighten(root.leftChild);
	if (root.rightChild != null && root.rightChild.weight == -10000)
		weighten(root.rightChild);
	root.weight = operate(root.leftChild.weight, root.rightChild.weight, root.opera);
}

function myRound(input) {
	if (Math.abs(input - Math.round(input)) < 0.0001)
		return Math.round(input);
}

function tree_construct() {
	var i;
	var j;
	var k;
	var l;
	var o1;
	var o2;
	var o3;
	var op_limit = 4;
	if (ifpower) {
		op_limit = 5;
	}
	for ( i = 0; i < 4; i++) {
		for ( j = 0; j < 4; j++) {
			if (i != j)
				for ( k = 0; k < 4; k++) {
					if (i != k && j != k)
						for ( l = 0; l < 4; l++) {
							if (i != l && j != l && k != l)
								for ( o1 = 0; o1 < op_limit; o1++) {
									for ( o2 = 0; o2 < op_limit; o2++) {
										for ( o3 = 0; o3 < op_limit; o3++) {
											var root = new node(null, null, -10000, -1);
											root = BuildUnbalLeftLong(root, Number(inputs[i]), Number(inputs[j]), Number(inputs[k]), Number(inputs[l]), o1, o2, o3);
											weighten(root);
											if (myRound(root.weight) == wanted) {
												add_result(generate_result(root), generate_RegExp(root));
											}

											root = BuildUnbalRightLong(root, Number(inputs[i]), Number(inputs[j]), Number(inputs[k]), Number(inputs[l]), o1, o2, o3);
											weighten(root);
											if (myRound(root.weight) == wanted) {
												add_result(generate_result(root), generate_RegExp(root));
											}

											root = BuildBal(root, Number(inputs[i]), Number(inputs[j]), Number(inputs[k]), Number(inputs[l]), o1, o2, o3);
											weighten(root);
											if (myRound(root.weight) == wanted) {
												add_result(generate_result(root), generate_RegExp(root));

											}
											root = BuildMidLeft(root, Number(inputs[i]), Number(inputs[j]), Number(inputs[k]), Number(inputs[l]), o1, o2, o3);
											weighten(root);
											if (myRound(root.weight) == wanted) {
												add_result(generate_result(root), generate_RegExp(root));
											}
											root = BuildMidRight(root, Number(inputs[i]), Number(inputs[j]), Number(inputs[k]), Number(inputs[l]), o1, o2, o3);
											weighten(root);
											if (myRound(root.weight) == wanted) {
												add_result(generate_result(root), generate_RegExp(root));
											}

										}

									}

								}
						}
				}
		}
	}
}

function print_output() {
	if (resstr != "") {
		//obj.value = resstr;
		return;
	} else {
		//obj.value = "Sorry, no solution found."
		process();
	}
}

function add_result(one_result, regularExp) {
	var patt1 = new RegExp(regularExp + " = " + wanted + "\n");
	if (patt1.test(resstr) == true) {
		return;
	}
	resstr = resstr + one_result + " = " + wanted + "\n";
	numofsol++;
}

function process() {
	generate();
	reset();
	resstr = "";
	numofsol = 0;
	tree_construct();
	print_output();
}

function pass(listener) {
	if (passes == 0) {
		alert("No more chance!");
		return;
	}
	passes--;
	$('#chance' + passes).removeClass("chance");
	process();
}

function generate() {
	inputs[0] = Math.floor((Math.random() * 10) + 1);
	inputs[1] = Math.floor((Math.random() * 10) + 1);
	inputs[2] = Math.floor((Math.random() * 10) + 1);
	inputs[3] = Math.floor((Math.random() * 10) + 1);
	$('#in1').text(inputs[0]);
	$('#in2').text(inputs[1]);
	$('#in3').text(inputs[2]);
	$('#in4').text(inputs[3]);
}

function timerEvent() {
	countdown--;
	var prog = Math.floor((maxtime - countdown) / maxtime * 100);
	$('#time-label').html(toMinSec(countdown));
	if (countdown == 0) {
		complete();
		clearInterval(myTimer);
	}
}

function start() {
	//bgTone.play();
	score = 0;
	passes = 3;
	$("[id^=chance]").addClass("chance");
	$(".op-btn").removeClass("selected");
	clearInterval(myTimer);
	$('#score-label').text("Score: " + score);
	countdown = maxtime;
	$('#time-label').html(toMinSec(countdown));
	myTimer = setInterval(function() {
		timerEvent()
	}, 1000);
	process();
}

function reset(listener) {
	seq = "first";
	firstNum = 0;
	lastKey = "";
	oper = "";
	operNum = 0;
	$(".op-btn").removeClass("selected");
	for (var i = 1; i <= 4; i++) {
		$('#in' + i).removeClass("disabled");
		$('#in' + i).removeClass("selected");
		$('#in' + i).text(inputs[i - 1]);
	}
}

function numKey(num) {
	buttonTone.stop();
	buttonTone.play();
	if (lastKey != num) {
		$('#in' + lastKey).removeClass("selected");
		$('#in' + num).addClass("selected");
	} else {
		return;
	}

	var res = 0;
	if (seq == "first" || oper == "") {

		lastKey = num;
		oper = "";
	} else if (seq == "second") {

		if (oper == '+') {
			res = (firstNum + Number($('#in' + num).text()));
		} else if (oper == '-') {
			res = (firstNum - Number($('#in' + num).text()));
		} else if (oper == 'x') {
			res = (firstNum * Number($('#in' + num).text()));
		} else if (oper == '/') {
			if (Number($('#in' + num).text()) == 0) {
				alert("Toast - Cannot be divided by 0");
				return;
			}
			res = (firstNum / Number($('#in' + num).text()));
		} else {
			return;
		}
		$(".op-btn").removeClass("selected");
		operNum++;
		if (operNum == 3 && res == wanted) {
			$('#in' + num).text(res);
			display();
			clearTone.play();
			score++;
			$('#score-label').text("Score: " + score);
			process();
		} else {
			if (operNum == 3)
				badTone.play();
			$('#in' + num).text(res);
			$('#in' + lastKey).addClass('disabled');
			lastKey = num;
			seq = "first";
			oper = "";
		}
	}
}

function opKey(listener, op) {
	if (lastKey == "")
		return;
	$(".op-btn").removeClass("selected");
	$(listener).addClass("selected");
	seq = "second";
	firstNum = Number($('#in' + lastKey).text());
	oper = op;
}

function toMinSec(seconds) {
	var min = Math.floor(seconds / 60);
	var sec = seconds - (min * 60);
	var result = min + ":" + (sec < 10 ? "0" + sec : sec);
	return '<i class="fa fa-clock-o"></i>  ' + result;
}

function getScore() {
	return score;
}

function complete() {
	var highest = window.localStorage.getItem("highest");
	if (highest < score)
		window.localStorage.setItem("highest", score);

	/*
	 if (getFbLogin()) {
	 //alert(score + ' - ' + getFbScore())
	 if (score > getFbScore()) {
	 updateScore(score);
	 }
	 }
	 */
	$("#yourscore").text("Your Score: " + score);
	$('#highestscore').text("Highest Score: " + window.localStorage.getItem("highest"));
	$(':mobile-pagecontainer').pagecontainer('change', '#result-page', {
		transition : 'flip',
		changeHash : true,
		reverse : true
	});
}

function display() {
	$('#good24').show();
	$('#good24').animo({
		animation : 'zoomIn',
		duration : 0.5
	}, function() {
		$('#good24').hide();
	});
}

function toggleVolume() {
	$('#volume-btn>i').toggleClass('fa-volume-up fa-volume-off');
	if (window.localStorage.getItem("volume") == '1.0') {
		window.localStorage.setItem("volume", '0.0');
	} else {
		window.localStorage.setItem("volume", '1.0');
	}
	buttonTone.setVolume(window.localStorage.getItem("volume"));
	clearTone.setVolume(window.localStorage.getItem("volume"));
	badTone.setVolume(window.localStorage.getItem("volume"));
}
