#pragma strict

function Start () 
{

}

function Update () 
{

}

function Destroy()
{
	Destroy(this.gameObject);
	Debug.Log(this.name +  " dead");
}

function Animate()
{

}

function OnMouseDown()
{
	Debug.Log(this.name + "Pressed");
}
