#pragma strict
private var hit : RaycastHit;
static public var GAME_COMPLETE:boolean;


function Start () {
	GAME_COMPLETE = false;
}

function Update () {

	FindWaterpipes();
	if (GAME_COMPLETE){
		print("Penisfaceassvaginapoop");
	}
}

private function CheckPipes(s:String){
	var n = hit.collider.gameObject.name;
	if (n == "CurvedBottomRight(Clone)" || n == "CurvedBottomRight" || n == "CurvedRightTop(Clone)" 
	|| n == "CurvedRightTop" || n == "CurvedTopLeft(Clone)" || n == "CurvedTopLeft" || n == "CurvedLeftBottom(Clone)" || n == "CurvedLeftBottom"
	|| n == "PipeTsplitDown(Clone)" || n == "PipeTsplitDown" || n == "PipeTsplitLeft" || n == "PipeTsplitLeft(Clone)"
	|| n == "PipeTsplitRight" || n == "PipeTsplitRight(Clone)" || n == "PipeTsplitUp" || n == "PipeTsplitUp(Clone)"
	|| n == "PumpTsplit" || n == "PumpTsplit(Clone)" || n == "StraightPipeUpDown" || n == "StraightPipeUpDown(Clone)"
	|| n == "StraightPipLeftRight" || n == "StraightPipLeftRight(Clone)") {
		//Allow pipe placement
		GAME_COMPLETE = true;
	}
}


function FindWaterpipes(){
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.left), hit, 0.9)) {
		CheckPipes("left");
	}
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.down), hit, 0.9)) {
		CheckPipes("down");
	}
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.up), hit, 0.9)) {
		CheckPipes("up");
	}
}