	#pragma strict
private var hit : RaycastHit;
static public var NOT_SECURE:boolean;


function Start () {
	NOT_SECURE = false;
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

function Update () {
	FindWaterpipes();
}

private function CheckPipes(s:String){
	var n = hit.collider.gameObject.name;
	//print(s + n);
	if (n == "EmptyBlock(Clone)" || n == "EmptyBlock") {
		//Allow pipe placement
		NOT_SECURE = true;
	}else if (!n == "EmptyBlock(Clone)" || !n == "EmptyBlock"){
		NOT_SECURE = false;
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