#pragma strict

// Speed and acceleration variables
var acceleration : float;
var deceleration : float;
var gravity : float;
var maxSpeed : float;

// Private vars used with player movement and drilling
private var mov : Vector3;
private var c : CharacterController;
private var hit : RaycastHit;

function Start () {
	mov = Vector3.zero;
	c = GetComponent(CharacterController);
}

function Update () {
	HandleInput();
}

private function HandleInput() {
	mov = Vector3.zero;
	// Accel/decel in x-direction
	if (Input.GetKey(KeyCode.A)) {
		// Move left, turn drill left, maybe drill left if space is pressed
		MoveLeft();
		if (Input.GetKey(KeyCode.Space)) {
			// Attempt to drill left
			Drill();
		}
	} else if (Input.GetKey(KeyCode.D)) {
		// Move right, turn drill right, maybe drill right if space is pressed
		MoveRight();
		if (Input.GetKey(KeyCode.Space)) {
			// Attempt to drill right
			Drill();
		}
	} else if (Input.GetKey(KeyCode.S)) {
		// Apply gravity, decelerate and point drill downwards and drill down if space is pressed
		MoveDown();
		if (Input.GetKey(KeyCode.Space)) {
			// Attempt to drill down
			Drill();
		}
	} else {
		// Only Decelerate
		Decelerate();
	}
	
	// Accel/decel in y-direction
	if (Input.GetKey(KeyCode.W)) {
		// Fly upwards
		MoveUp();
	} else {
		// Just apply gravity
		ApplyGravity();
	} 
	
	// Move the player
	c.Move(mov * Time.deltaTime);
}

private function MoveLeft() {
	mov.x = Mathf.Clamp((c.velocity.x - acceleration), -maxSpeed, maxSpeed);
	transform.eulerAngles = Vector3(0, 0, 180);
}

private function MoveRight() {
	mov.x = Mathf.Clamp((c.velocity.x + acceleration), -maxSpeed, maxSpeed);
	transform.eulerAngles = Vector3(0, 0, 0);
}

private function MoveDown() {
	ApplyGravity();
	Decelerate();
	transform.eulerAngles = Vector3(0, 0, 270);
}

private function MoveUp() {
	mov.y = Mathf.Clamp((c.velocity.y + acceleration), -maxSpeed, maxSpeed);
}

private function Drill() {
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.right), hit, 1)) {
		// Collison found: drill down (destroy block)
		// TODO: Maybe make the player drill slowly into the block and be unable to move?
		hit.collider.gameObject.GetComponent(Block).Destroy();
	}
}

private function Decelerate() {
	var v = c.velocity.x;
	 if (v < 0) {
			mov.x = c.velocity.x * deceleration;
		 } else if (v > 0) {
		 	mov.x = c.velocity.x * deceleration;
	} 
}

private function ApplyGravity() {
	mov.y = c.velocity.y - gravity;
}