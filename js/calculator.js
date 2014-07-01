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

var init = function() {
	onDeviceReady();
	FastClick.attach(document.body);
}

$(document).ready(init);

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
	//var obj = document.getElementById("outtext");
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
	var prog = Math.floor((maxtime - countdown)/maxtime * 100);
	$(".progress-bar").css('width', prog+'%').attr("aria-valuenow", prog);
	if (countdown == 0) {
		alert("Game End");
		clearInterval(myTimer);
	}
}

function start() {
	score = 0;
	$('#score').text(score);
	countdown = maxtime;
	myTimer = setInterval(function() {
		timerEvent()
	}, 1000);
	process();
}

function reset()
{
	seq = "first";
	firstNum = 0;
	oper = "";
	operNum = 0;
	for ( var i=1; i <= 4; i++ ){
		$('#in' + i).prop('disabled', false);
		$('#in' + i).text(inputs[i-1]);
	}
}

function numKey(num) {
	var res = 0;
	if (seq == "first") {
		$('#in' + num).prop('disabled', true);
		firstNum = Number($('#in' + num).text());
		seq = "second";
		lastKey = num;
		op = "";
	} else if (seq == "second") {
		operNum++;
		if (oper == '+') {
			res = (firstNum + Number($('#in' + num).text()));
		} else if (oper == '-') {
			res = (firstNum - Number($('#in' + num).text()));
		} else if (oper == 'x') {
			res = (firstNum * Number($('#in' + num).text()));
		} else if (oper == '/') {
			res = (firstNum / Number($('#in' + num).text()));
		}
		if (operNum == 3 && res == wanted) {
			//alert("Game completed!")
			score++;
			$('#score').text(score);
			process();
		} else {
			$('#in' + num).text(res);
			seq = "first";
			op = "";
		}
	}
}

function opKey(op) {
	oper = op;
}
