#pragma strict

static public var energyToDestroy : float;
static public var damageTaken : float;
private var secured : boolean;
var securedMaterial : Material;
var securePrice : int;

function Start () 
{
	energyToDestroy = 0.6;
	damageTaken = 0.5;
	secured = false;
}

function Update () {
	if (!secured)
	{
		var hit : RaycastHit;
		if (Physics.Raycast(this.transform.position, transform.TransformDirection(-Vector3.up), hit, 0.6))
		{
			if (hit.collider.gameObject.name == "EmptyBlock(Clone)")
			{
				var oldPos : Vector3 = this.transform.position;
				this.transform.position = hit.collider.transform.position;
				hit.collider.transform.position = oldPos;
			}
		}
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

function SetSecured()
{
	secured = true;
	HUD.money -= securePrice;
	this.renderer.material = securedMaterial;
}

function OnMouseDown()
{
	if (!secured && (HUD.CURRENT_OBJECT.name == "GravelBlock(Clone)" || HUD.CURRENT_OBJECT.name == "GravelBlock")) {
		SetSecured();
	}
	Debug.Log(this.name + "Pressed");
}