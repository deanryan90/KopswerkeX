#pragma strict
private var hit : RaycastHit;
private var allow_placement : boolean;
var pipePrice : int;
var cementPrice : int;


function Start () 
{
	allow_placement = false;
	try
	{
		var cols : Collider[] = GameObject.FindGameObjectWithTag("Player").GetComponents.<Collider>();
	    for (var playerCols : Collider in cols)
	    {
	        Physics.IgnoreCollision( collider, playerCols );
	    }
	}
	catch(err)
	{
	
	}	
}

function Update ()
{
	
}	

function OnMouseDown()
{
	Debug.Log(this.name + "Pressed");
	var temp : GameObject = HUD.CURRENT_OBJECT;
	var clone : GameObject = null;
	if (temp.name == "CementBlock" || temp.name == "CementBlock(Clone)") {
		clone = Instantiate(temp, transform.position, transform.rotation) as GameObject;
		HUD.money -= cementPrice;
		Destroy(this.gameObject);
	} else {
		// Start Raycast to find waterpipes.
		FindWaterpipes();
		if (allow_placement){
			//Place waterpipe
			clone = Instantiate(temp, transform.position, transform.rotation) as GameObject;
			HUD.money -= pipePrice;
			Destroy(this.gameObject);
			//At the end set the placement back to not allowed for the next block.
			allow_placement = false;
		}
	}
}

private function CheckPipes(s:String){
	var n = hit.collider.gameObject.name;
	print(s + n);
	if (n == "CurvedBottomRight(Clone)" || n == "CurvedBottomRight" || n == "CurvedRightTop(Clone)" 
	|| n == "CurvedRightTop" || n == "CurvedTopLeft(Clone)" || n == "CurvedTopLeft" || n == "CurvedLeftBottom" || n == "CurvedLeftBottom(Clone)"
	|| n == "PipeTsplitDown(Clone)" || n == "PipeTsplitDown" || n == "PipeTsplitLeft" || n == "PipeTsplitLeft(Clone)"
	|| n == "PipeTsplitRight" || n == "PipeTsplitRight(Clone)" || n == "PipeTsplitUp" || n == "PipeTsplitUp(Clone)"
	|| n == "PumpTsplit" || n == "PumpTsplit(Clone)" || n == "StraightPipeUpDown" || n == "StraightPipeUpDown(Clone)"
	|| n == "StraightPipLeftRight" || n == "StraightPipLeftRight(Clone)") {
		//Allow pipe placement
		allow_placement = true;
	}
}


function FindWaterpipes(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.right), hit, 0.9)) {
		CheckPipes("right: ");
	}
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.left), hit, 0.9)) {
		CheckPipes("left: ");
	}
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.down), hit, 0.9)) {
		CheckPipes("down: ");
	}
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.up), hit, 0.9)) {
		CheckPipes("up: ");
	}
}