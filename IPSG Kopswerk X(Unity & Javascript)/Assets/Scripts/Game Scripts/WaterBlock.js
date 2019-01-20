#pragma strict

var isBiggest : boolean;
var water : GameObject;
var waterPercent : float = 0.9;
private var MAX_WATER : float = 0.9;
private var MIN_WATER : float = 0.05;


function Start () 
{

}

function Update () 
{
	checkPercent();
}

function FixedUpdate() {
	waterPercent += 0.00005;
}

function checkPercent() {
	var per : float;

	if (waterPercent > MAX_WATER)
			per = MAX_WATER;
		else if (waterPercent < MIN_WATER)
			per = MIN_WATER;
		else
			per = waterPercent;

	if (!isBiggest) {
		water.transform.localScale.y = per;
		water.transform.localPosition.y = (0.42*per - 0.378)/0.9;
	} else {
		per *= 2;
		water.transform.localScale.y = per;
		water.transform.localPosition.y = (0.5)*per - 1.4;
	}
}


function Destroy()
{
	Destroy(this.gameObject);
	Debug.Log(this.name +  " dead");
}

function Animate()
{

}

