#pragma strict

static public var energyToDestroy : float;
static public var damageTaken : float;

function Start () 
{
	energyToDestroy = 0.2;
	damageTaken = 0.35;
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
