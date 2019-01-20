#pragma strict
static public var COLLISION_DETECTED:boolean;
static public var DESTROY_COLLISION:boolean;
static public var CHECK_COLLISION:boolean;


function Start () {
	COLLISION_DETECTED = false;
	CHECK_COLLISION = false;
	DESTROY_COLLISION = false;
}

function Update () {
	//if (CHECK_COLLISION){
		Check_Collision();
	//}
}

function Check_Collision(){
	var fwd = transform.TransformDirection(Vector3.right);
    var hit : RaycastHit;    
    Debug.DrawRay(this.transform.position, fwd, Color.green);
 
    if(Physics.Raycast(this.transform.position, fwd, hit, 0.5)){
    	COLLISION_DETECTED = true;
    	if (DESTROY_COLLISION){  
    		var temp : GameObject = hit.collider.gameObject;
    		temp.GetComponent(Block).Destroy();
			//Destroy(hit.collider.gameObject); //Destroy object which is colliding
			DESTROY_COLLISION = false;
		}
	}else {
		//print("no collision");
		COLLISION_DETECTED = false;
	}
}