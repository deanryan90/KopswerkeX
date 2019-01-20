#pragma strict
static public var COLLISION_DETECTED:boolean;
static public var CHECK_COLLISION:boolean;


function Start () {
	COLLISION_DETECTED = false;
	CHECK_COLLISION = false;
}

function Update () {

	Check_Collision();

}

function Check_Collision(){
	var fwd = transform.TransformDirection(Vector3.up);
    var hit : RaycastHit;    
    Debug.DrawRay(this.transform.position, fwd*0.01, Color.green);
 
    if(Physics.Raycast(transform.position, fwd*0.01, hit, 1)){
    	//print("collision");
    	COLLISION_DETECTED = true;
	}else {
		//print("no collision");
		COLLISION_DETECTED = false;
	}
}