#pragma strict

import System.IO;

/*
* Loads the level from a .txt file. Look at the .txt file to get
* and idea on how to design it.
*
* @Author: Karl
*
*/

// Example of a level:
/*
// A = Normal block
// B = Hard block
// U = Unbreakable block
// G = Gravel block
// W = Underground water block
// R = Reservoir block, top (?)
// S = Reservoir valve (start)
// M = Generator valve (end)
// P = Player start location
AASAAAAAAAAAAA
AAAAAAAAAAAAAA
AAAAAAAAAAAAAA
AAAGGAAAUUUUUU
AAAGAAAAAAAAAA
AAAAAAAAAAAAAA
AAAAAAARRAAAAA
AAAAAAAAAAAAAA
AARRAAAAAAAAAM
AAAAAAAAAAAAAA
//<-14 wide ->
*/


private var PATH = "Assets/Levels/";

// Temp, should be loaded programimatically
private var fileName = "level1.txt";

public var isTutorial : boolean;

// Blocks
public var normalBlock : GameObject;
public var hardBlock : GameObject;
public var unbreakableBlock : GameObject;
public var gravelBlock : GameObject;
public var waterBlock : GameObject;
public var waterBlockBig : GameObject;
public var waterBlockBiggestestest : GameObject;
public var lowerGenerator : GameObject;
public var endPipe : GameObject;

private var nextLineSkip = new Array();

// PLayer
public var player : GameObject;

// Used for filling blocks
private var map_height : int = -1;
private var map_width : int = -1;
private var FIRST_ROW : int = -2;
private var lowerGenPosition = [-1, -1];

// Variables used for placing blocks in correct possitions.
private var rot : Quaternion = Quaternion.identity;
private var pos = new Vector3(0, 0, 0);

function Start () {
	if(isTutorial)
		fileName = "level_tutorial.txt";

	readFile(PATH + fileName);
	fillGenericBlocks();
}

/*
* Read a .txt file. Iterates through the lines, discards the comments.
* Adds the blocks to the level based on the letter, each letter represents
* a block.
*/
function readFile(fileToRead : String) {
	//World position iteration of the blocks.
	var block_x = 0;
	var block_y = 0;
	
    try {
        var sr = new StreamReader(fileToRead);
        var line : String = sr.ReadLine();
        
        var nextLine : String = null;
        if (line != null)
        	nextLine = sr.ReadLine();
        
        while (line != null) {
        	// Checks if it's a comments.
        	if (line[0] != '/') {
        		// Not a comment, itterates the letters and add blocks.
        		map_width = line.length;
        		block_y--;	
	            for (var i = 0; i < line.length; i++) {
	            	if (!isSkip(i)) {
		            	block_x = i+0.01;
		            	if (line[i] != 'W') {
		            		addBlock(line[i], block_x, block_y);
		            	} else {
	            			if (isQuadWater(line, nextLine, i)) {
	            				addBlock('Z'[0] ,block_x, block_y);
	            				nextLineSkip.Add(i);
	            				nextLineSkip.Add(i+1);
	            				i++; // Increments to skip the next checking for the block.
	            			} else if (isDoubleWater(line, nextLine, i)) {
	        					addBlock('X'[0] ,block_x, block_y);
	        					i++; // Increments to skip checking the next block.
	            			} else {
	            				addBlock('W'[0] ,block_x, block_y);
	            			}
	            		}
            		}
	            }
	            
	            block_x = 0;
            }
            
            // Next line.
            line = nextLine;
            if (line != null)
        		nextLine = sr.ReadLine();
        	if (nextLine == null)
        		map_height = block_y;
            
        }
        
        // Closes the file reader.
        sr.Close();
        print("Map h#w: " + map_height + "#" + map_width);
    }

    catch (e) {
        print("Unable to read the file: ");
        print(e.Message);
    }
}

function fillGenericBlocks() {
	// Just the top row.
	for (var b = -10; b < map_width-17; b++) { 
		addBlock('U'[0], b, -2);
	}

	// Add left side and below map.
	for (var i = FIRST_ROW-1; i >= map_height-10; i--) {
		var longer = (i < map_height) ? (map_width+10) : 0;
		for (var j = -10; j < 0 + longer; j++) {
			addBlock('U'[0], j, i);
		}
	}
	
	// Add right side.
	for (var p = FIRST_ROW; p >= map_height-10; p--) {
		var add = (lowerGenPosition[1] < p+3 && lowerGenPosition[1] >= p) ? 1 : 0;
		for (var v = map_width+add; v < map_width+10; v++) {
			//print(lowerGenPosition[0] + ":::" + lowerGenPosition[1]);
			addBlock('U'[0], v, p);
		}
	}
}

/*
* Adds a block (prefab) to the world based on the letter.
*/
function addBlock(letter : char, x_pos : int, y_pos : int) {
	var test : GameObject;
	pos.x = x_pos;
	pos.y = y_pos;
	switch(letter) {
		case 'A':
			test = Instantiate(normalBlock, pos, rot) as GameObject;
			break;
		case 'B':
			test = Instantiate(hardBlock, pos, rot) as GameObject;
			break;
		case 'U':
			test = Instantiate(unbreakableBlock, pos, rot) as GameObject;
			break;
		case 'G':
			test = Instantiate(gravelBlock, pos, rot) as GameObject;
			break;
		case 'W':
			test = Instantiate(waterBlock, pos, rot) as GameObject;
			test.GetComponent(WaterBlock).waterPercent = Random.Range(0.05, 0.9);
			break;
		case 'X':
			test = Instantiate(waterBlockBig, pos, rot) as GameObject;
			test.GetComponent(WaterBlock).waterPercent = Random.Range(0.05, 0.9);
			break;
		case 'Z':
			test = Instantiate(waterBlockBiggestestest, pos, rot) as GameObject;
			test.GetComponent(WaterBlock).waterPercent = Random.Range(0.05, 0.9);
			break;
		case 'M':
			test = Instantiate(endPipe, pos, rot);
			pos.x++;
			test = Instantiate(lowerGenerator, pos, rot) as GameObject;
			lowerGenPosition[0] = pos.x;
			lowerGenPosition[1] = pos.y;
			
			break;
		case 'P':
			test = Instantiate(player, pos, rot) as GameObject;
			break;
	}
}

private function isDoubleWater(l1 : String, l2 : String, pos : int) {
	try {
		if(l1[pos+1] == 'W') {
			// So far it's a double.
			if (l2[pos] != 'W') {
				// The line below doesn't contain a W, therefore it must be double.
				return true;
			}
		}
	} catch(err) {} // Out of bounds exception

	return false;
}

private function isQuadWater(l1 : String, l2 : String, pos : int) {
	try {
		if(l1[pos+1] == 'W') {
			// So far it's a might be a quad, but also might be a double.
			if (l2[pos] == 'W') {
				// The line below contain a W, therefore it must be quad.
				return true;
			}
		}
	} catch(err) {} // Out of bounds exception
	return false;
}

private function isSkip(val : int) {
	for (var i = 0; i < nextLineSkip.length; i++) {
		if (val == nextLineSkip[i]) {
			nextLineSkip.RemoveAt(i);
			return true;
		}
	}

	return false;
}