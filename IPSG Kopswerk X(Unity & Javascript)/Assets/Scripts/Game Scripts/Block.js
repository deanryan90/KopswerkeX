#pragma strict
var newEmpty : GameObject;


function Start () 
{

}

function Update ()
{

}

//Call to destroy block
function Destroy()
{
	var tempBlock : GameObject;
	var tempEnergyDamage : float = 0.555;
	var tempDamageTaken : float = 0.4;
	if(this.name == "HardBlock(Clone)" || this.name == "HardBlock" 
	|| this.name == "CementBlock" || this.name == "CementBlock(Clone)")
	{
		tempBlock = GameObject.Find("HardBlock");
		tempEnergyDamage = tempBlock.GetComponent(HardBlock).energyToDestroy;
		tempDamageTaken = tempBlock.GetComponent(HardBlock).damageTaken;
	}
	else if(this.name == "NormalBlock(Clone)" || this.name == "NormalBlock")
	{
		tempBlock = GameObject.Find("NormalBlock");
		tempEnergyDamage = tempBlock.GetComponent(NormalBlock).energyToDestroy;
		tempDamageTaken = tempBlock.GetComponent(NormalBlock).damageTaken;
	}
	else if(this.name == "GravelBlock(Clone)" || this.name == "GravelBlock")
	{
		tempBlock = GameObject.Find("GravelBlock");
		tempEnergyDamage = tempBlock.GetComponent(GravelBlock).energyToDestroy;
		tempDamageTaken = tempBlock.GetComponent(GravelBlock).damageTaken;
	}
	
	Destroy(this.gameObject);	//destroy Block

	//instantciate empty block
	var clone : GameObject = Instantiate(newEmpty, transform.position, transform.rotation) as GameObject;
	
	EnergyManager.DECREASE_ENERGY(tempEnergyDamage);
	DrillManager.TAKE_DAMAGE(tempDamageTaken);
}

function GetEnergyToDestroy(s:String) {
	var tempBlock : GameObject;
	if(this.name == "HardBlock(Clone)" || this.name == "HardBlock" 
		|| this.name == "CementBlock" || this.name == "CementBlock(Clone)")
	{
		tempBlock = GameObject.Find("HardBlock");
		return tempBlock.GetComponent(HardBlock).energyToDestroy;
	}
	else if(this.name == "NormalBlock(Clone)" || this.name == "NormalBlock")
	{
		tempBlock = GameObject.Find("NormalBlock");
		return tempBlock.GetComponent(NormalBlock).energyToDestroy;
	}
	else if(this.name == "GravelBlock(Clone)" || this.name == "GravelBlock")
	{
		tempBlock = GameObject.Find("GravelBlock");
		return tempBlock.GetComponent(GravelBlock).energyToDestroy;
	}
	return 1;
}

function GetDamageToDestroy(s:String) {
	var tempBlock : GameObject;
	if(this.name == "HardBlock(Clone)" || this.name == "HardBlock" 
		|| this.name == "CementBlock" || this.name == "CementBlock(Clone)")
	{
		tempBlock = GameObject.Find("HardBlock");
		return tempBlock.GetComponent(HardBlock).damageTaken;
	}
	else if(this.name == "NormalBlock(Clone)" || this.name == "NormalBlock")
	{
		tempBlock = GameObject.Find("NormalBlock");
		return tempBlock.GetComponent(NormalBlock).damageTaken;
	}
	else if(this.name == "GravelBlock(Clone)" || this.name == "GravelBlock")
	{
		tempBlock = GameObject.Find("GravelBlock");
		return tempBlock.GetComponent(GravelBlock).damageTaken;
	}
	return 1;
}

function Animate()
{
	//Start animations for destorying
}