#pragma strict

var water : GameObject;
var waterPercent = 0.9;
private var MAX_WATER = 1.2;
private var MIN_WATER = 0.05;

// X from 0.05 to 1.2
// Y pos at max: 0.12
// Y pos at min: -0.25

function Start () {
	adjustWater();
}

function Update () {
	adjustWater();
}

function adjustWater() {
	var per : float;

	if (waterPercent > MAX_WATER)
			per = MAX_WATER;
		else if (waterPercent < MIN_WATER)
			per = MIN_WATER;
		else
			per = waterPercent;

	water.transform.localScale.y = per;
	water.transform.localPosition.y = (37*per - 31)/115;
}