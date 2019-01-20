#pragma strict

var lightOffsetY : float;
var lightPositionZ : float;

function Start () {
	this.transform.position.z = -lightPositionZ;
}

function Update () {
	var target = GameObject.FindGameObjectWithTag("Player").transform;
	this.transform.position.y = target.position.y + lightOffsetY;
	this.transform.position.x = target.position.x;
	this.transform.LookAt(target);
}