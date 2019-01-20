#pragma strict
private var hit : RaycastHit;
static public var PIPES_FOUND = 0;
private var FOUND_PIPE : boolean;
private var cyclesPerUpdate : int;
private var cyclesSinceUpdate : int;
var moneyInc : int;

function Start () {
	FOUND_PIPE = false;
	cyclesPerUpdate = 120;
	cyclesSinceUpdate = 0;
}

function Update () {
	
	if (FOUND_PIPE){
		cyclesSinceUpdate++;
		if (cyclesSinceUpdate > cyclesPerUpdate)
		{
			
	    	cyclesSinceUpdate = 0;
	    	
			HUD.money = HUD.money + moneyInc;
		}
	}
	else {
		FindWaterpipes();
	}
	
}

private function CheckPipes(s:String){
	var n = hit.collider.gameObject.name;
	//print(s + n);
	if (n == "PumpTsplit" || n == "PumpTsplit(Clone)") {
		FOUND_PIPE = true;
		PIPES_FOUND++;
	}
}


function FindWaterpipes(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.up), hit, 0.9)) {
		Debug.DrawLine (transform.position, Vector3.up, Color.red);
		CheckPipes("up: ");
	}
	if (this.gameObject.name == "WaterBlockBig" || this.gameObject.name == "WaterBlockBig(Clone)" ||
		this.gameObject.name == "WaterBlockBiggest" || this.gameObject.name == "WaterBlockBiggest(Clone)"){
		if (Physics.Raycast(Vector3(transform.position.x+1,transform.position.y, transform.position.z), transform.TransformDirection(Vector3.up), hit, 0.9)) {
		  	Debug.DrawLine (Vector3(transform.position.x+1,transform.position.y, transform.position.z), Vector3.up, Color.red);
			CheckPipes("up2: ");
		}
	}
}
