#pragma strict

var cameraOffsetY : float;
var cameraPositionZ : float;
private var minPos:Vector3;
private var maxPos:Vector3;

function Start () {
	this.transform.position.z = -cameraPositionZ;
	minPos = Vector3(1,-50,transform.position.z);
	maxPos = Vector3(10,1.5,transform.position.z);
}

function Update () {
	var target = GameObject.FindGameObjectWithTag("Player").transform;
	this.transform.position.y = target.position.y + cameraOffsetY;
	this.transform.position.x = target.position.x;
	this.transform.LookAt(target);
	
	transform.position = Vector3(Mathf.Clamp(transform.position.x, minPos.x, maxPos.x),Mathf.Clamp(transform.position.y, minPos.y, maxPos.y), transform.position.z);
}