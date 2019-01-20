#pragma strict

private var changeRate : int;
private static var buyPriceMin : int = 900;
private static var buyPriceMax : int = 1100;
private static var buyPriceRise : int = 60;
var buyPrice = 1000;

private static var sellPriceMin : int = 750;
private static var sellPriceMax : int = 1000;
private static var sellPriceRise : int = 40;
var sellPrice = 800;
private var cyclesPerUpdate : int;
private var cyclesSinceUpdate : int;

static public var CURRENT_OBJECT : GameObject;

public var pipe1 : GameObject;
public var pipe2 : GameObject;
public var pipe3 : GameObject;
public var pipe4 : GameObject;
public var pipe5 : GameObject;
public var pipe6 : GameObject;
public var pipe7 : GameObject;
public var pipe8 : GameObject;
public var pipe9 : GameObject;
public var pipe10 : GameObject;
public var pipe11 : GameObject;
public var block1 : GameObject;
public var block2 : GameObject;

static public var hasBought = false;
static public var hasSold = false;



//////
var energyBar : float = 1;
var overheatBar : float = 1;

private var pos : Vector2 = new Vector2(465,25);
private var size : Vector2 = new Vector2(180,30);

private var pos1 : Vector2 = new Vector2(465,75);
private var size1 : Vector2 = new Vector2(180,30);

private var posSM : Vector2 = new Vector2(15,10);
private var sizeSM : Vector2 = new Vector2(200,200);

private var posBM : Vector2 = new Vector2(665,10);
private var sizeBM : Vector2 = new Vector2(600,120);

private var buttonSize : Vector2 = new Vector2(70,20);

public var progressBarEmpty : Texture2D;
public var  progressBarFull : Texture2D;

private var posMoneyBar : Vector2 = new Vector2(230,20);
private var sizeMoneyBar : Vector2 = new Vector2(35,48);
private var sizeOfPipes : Vector2 = new Vector2(70,70);

var Energy : Texture2D;
var OverHeating : Texture2D;
var EuroSign : Texture2D;
var timerIcon : Texture2D;
var scoreIcon : Texture2D;

var Amount : int = 100;
private var amountCalc : int = 0;


private var startTime : int ;
private var restSeconds : int;
private var roundedRestSeconds : int;
private var displaySeconds : int ;
private var displayMinutes : int ;
private var countDownSeconds : int ;
private var text : String;

static public var money : int = 20000;
private var score : int = 0;

private var x : float;

private var y : float;

private var resolution : Vector2;


var box1 : Texture2D;
var box2: Texture2D;
var box3: Texture2D;
var box4: Texture2D;
var box5 : Texture2D;
var box6 : Texture2D;
var box7 : Texture2D;
var box8 : Texture2D;
var box9 : Texture2D;
var box10 : Texture2D;
var box11 : Texture2D;
var box12 : Texture2D;
var box13 : Texture2D;


var customGuiStyle : GUIStyle;
var buttonStyle :GUISkin;



var buttonClicked1 = false;
var buttonClicked2 = false;
var buttonClicked3 = false;
var buttonClicked4 = false;
var buttonClicked5 = false;
var buttonClicked6 = false;
var buttonClicked7 = false;
var buttonClicked8 = false;
var buttonClicked9 = false;
var buttonClicked10 = false;
var buttonClicked11 = false;
var buttonClicked12 = false;
var buttonClicked13 = false;

var GUIStyle : GUIStyle;

private var posObjectSelected : Vector2 = new Vector2(280,130);
private var sizeObjectSelected : Vector2 = new Vector2(80,80);

function Start () 
{
	//Debug.Log(EnergyManager.ENERGY_AMOUNT);
	changeRate = 10;
	cyclesPerUpdate = 60;
	cyclesSinceUpdate = 0;

    var resolution : Vector2 = new Vector2(Screen.width, Screen.height);

    x =Screen.width/1920.0f; // 1920 is the x value of the work ing resolution (as described in the first point)

    y =Screen.height/1042.0f; // 1042 is the y value of the working resolution (as described in the first point)

    startTime = Time.time;
    CURRENT_OBJECT = pipe1;
}
function Update () 
{
    if(Screen.width!=resolution.x || Screen.height!=resolution.y)
    {
               resolution=new Vector2(Screen.width, Screen.height);
               x=resolution.x/1366.0f;
               y=resolution.y/568.0f;
    }
    energyBar = EnergyManager.ENERGY_AMOUNT;
    //Debug.Log(EnergyManager.ENERGY_AMOUNT);
    overheatBar = DrillManager.DRILL_HP;
    //barDisplay = barDisplay - 0.1;
    if(Amount < 0)
    {
    	Amount = 0;
    }
    
    cyclesSinceUpdate++;
	if (cyclesSinceUpdate > cyclesPerUpdate)
	{
    	cyclesSinceUpdate = 0;
    	
	    var Rand : int = Random.Range(0, 100);
	    
	    //Buying
	    if (Rand < buyPriceRise) 
			{
				if (buyPrice < buyPriceMax)
				{
					buyPrice += changeRate;
				}
			}
		else if (buyPrice > buyPriceMin)
		{
			buyPrice -= changeRate;
		}
		//Selling
		if (Rand < sellPriceRise) 
			{
				if (sellPrice < sellPriceMax)
				{
					sellPrice += changeRate;
				}
			}
		else if (sellPrice > sellPriceMin)
		{
			sellPrice -= changeRate;
		}
		
	}
    
}
function OnGUI()
{   
    BuildingMaterials(posBM);
    SpotMarket(posSM,sizeSM,buttonSize);
    MoneyBar(posMoneyBar,sizeMoneyBar);  
    Timer(posMoneyBar);
    //scoreBar(posMoneyBar);
    DrawBars();
    DrawSelectedObject(posObjectSelected,sizeObjectSelected);
} 
function DrawSelectedObject(pos:Vector2,size:Vector2)
{
    GUI.Box (Rect (pos.x,pos.y, size.x, size.y),""); 
    GUI.contentColor = Color.white;
    if(buttonClicked1 == true)
    {
         GUI.Label(Rect(pos.x + 2,pos.y,size.x,size.y),box1);
    }
    if(buttonClicked2 == true)
    {
        GUI.Label(Rect(pos.x + 2,pos.y ,size.x,size.y ),box2);
    }
    if(buttonClicked3 == true)
    {
         GUI.Label(Rect(pos.x + 5,pos.y,size.x ,size.y),box3);
    }
    if(buttonClicked4 == true)
    {
        GUI.Label(Rect(pos.x + 2,pos.y ,size.x,size.y),box4);
    }
    if(buttonClicked5 == true)
    {
        GUI.Label(Rect(pos.x + 2,pos.y ,size.x,size.y),box5);
    }
    if(buttonClicked6 == true)
    {
        GUI.Label(Rect(pos.x + 5,pos.y,size.x,size.y),box6);
    }
    if(buttonClicked7 == true)
    {
        GUI.Label(Rect(pos.x + 5,pos.y,size.x,size.y),box7);
    }
    if(buttonClicked8 == true)
    {
        GUI.Label(Rect(pos.x + 5,pos.y,size.x,size.y),box8);
    }
    if(buttonClicked9 == true)
    {
        GUI.Label(Rect(pos.x + 5,pos.y,size.x,size.y),box9);
    }
    if(buttonClicked10 == true)
    {
        GUI.Label(Rect(pos.x + 23,pos.y,size.x,size.y),box10);
    }
    if(buttonClicked11 == true)
    {
        GUI.Label(Rect(pos.x ,pos.y + 20,size.x,size.y),box11);
    }
    if(buttonClicked12 == true)
    {
        GUI.Label(Rect(pos.x + 23,pos.y + 22,size.x,size.y),box12);
    }
     if(buttonClicked13 == true)
    {
        GUI.Label(Rect(pos.x + 23,pos.y + 22,size.x,size.y),box13);
    }
}
function DrawBars()
{

    // Draws GUI for Energy Bar
    GUI.Label(Rect (pos.x - 40,pos.y - 2, 100,100),Energy);
    GUI.BeginGroup (new Rect(pos.x, pos.y, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty); 
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size.x * energyBar, size.y));
            GUI.Box (Rect (0,0, size.x , size.y ),progressBarFull);
        GUI.EndGroup ();
    GUI.EndGroup ();

    //GUI for OverHeatingBar
    GUI.Label(Rect (pos1.x - 40,pos1.y - 5, 100,100),OverHeating);
    GUI.BeginGroup (new Rect (pos1.x, pos1.y, size1.x, size1.y ));
        GUI.Box (Rect (0,0, size1.x, size1.y ),progressBarEmpty); 
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, size1.x * overheatBar, size1.y));
            GUI.Box (Rect (0,0, size1.x , size1.y ),progressBarFull);
        GUI.EndGroup ();
    GUI.EndGroup ();  
}
function SpotMarket(pos : Vector2, size : Vector2, buttonSize : Vector2)
{
    GUI.contentColor = Color.yellow;
      // Spot Market Box and All elements in it.
    GUI.Box(Rect(pos.x,pos.y,size.x,size.y),"");
    GUI.Box(Rect(pos.x + 40,pos.y+10,size.x,size.y), " Spot Market",customGuiStyle);
    GUI.Label(Rect(pos.x + 20 ,pos.y + 50,100,100),"Amount",customGuiStyle);
    GUI.Label(Rect(pos.x + 135,pos.y + 50,100,100),"" + Amount);
    GUI.Label(Rect(pos.x + 20 ,pos.y + 160,100,100),"Price",customGuiStyle);
    GUI.Label(Rect(pos.x + 100 ,pos.y + 160,100,100),"" + buyPrice + "        " + sellPrice);
    //GUI.Label(Rect(pos.x + 205 ,pos.y + 150,100,100),"" + sellPrice);    

    if(GUI.Button(Rect (pos.x + 95 ,pos.y + 50  ,buttonSize.x - 40,buttonSize.y ),""))
    {
        print(Amount);
        Amount+=100;
    }
    GUI.Label(Rect (pos.x   + 105,pos.y + 50 ,buttonSize.x,buttonSize.y),"+",customGuiStyle);

    if(GUI.Button(Rect (pos.x + 165 ,pos.y + 50  ,buttonSize.x - 40,buttonSize.y),""))
    {
        print(Amount);
        Amount-=100;
    }
    GUI.Label (Rect (pos.x + 175 ,pos.y + 50 ,buttonSize.x - 50,buttonSize.y),"-",customGuiStyle);



    ///Buy and Sell buttons 
    if(GUI.Button(Rect (pos.x + 80,pos.y + 100  ,buttonSize.x - 10,buttonSize.y +20),""))
    {
        if(energyBar < 1)
        {
            print("Buy");
            money = money - buyPrice;
            amountCalc = Amount / 100;
            EnergyManager.INCREASE_ENERGY((0.10* amountCalc));
            hasBought = true;
        }
    }
    GUI.Label (Rect (pos.x +  97,pos.y + 110,buttonSize.x,buttonSize.y+20),"Buy",customGuiStyle);
       
    if(GUI.Button(Rect (pos.x + 140,pos.y + 100  ,buttonSize.x - 10,buttonSize.y +20),""))
    {
        if(energyBar > 0)
        {
            print("Sell");
            //money = money + Amount;
            money = money + sellPrice;
            amountCalc = Amount / 100;
            EnergyManager.DECREASE_ENERGY((0.10* amountCalc));
            hasSold = true;
        }
    }
    GUI.Label(Rect (pos.x  + 155,pos.y + 110 ,buttonSize.x,buttonSize.y+20),"Sell",customGuiStyle); 
}
function Timer(pos : Vector2)
{
    var guiTime = Time.time - startTime;
 
    restSeconds = countDownSeconds + (guiTime);
 
    //display messages or whatever here -->do stuff based on your timer
    if (restSeconds == 60) {
    }
    if (restSeconds == 0) {
    }

    //display the timer
    roundedRestSeconds = Mathf.CeilToInt(restSeconds);
    displaySeconds = roundedRestSeconds % 60;
    displayMinutes = roundedRestSeconds / 60; 
    GUI.contentColor = Color.yellow;
    text = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds); 
    GUI.contentColor = Color.white;
    GUI.Label(Rect(pos.x,pos.y + 50,200,200),timerIcon);
     GUI.contentColor = Color.yellow;
    //(100,48);
    GUI.Box(Rect (pos.x + 50, pos.y + 55, 70, 30), text);

    //GUI.Box(Rect(pos.x+ 50,pos.y + 5,size.x + 50,size.y - 30), "" + money);
}
function BuildingMaterials(pos : Vector2)
{
   GUI.contentColor = Color.yellow;
   
   GUI.Box(Rect(pos.x, pos.y, 390,260),"");
   GUI.Label(Rect(pos.x + 110 ,pos.y + 10, 250,200), " Building Materials",customGuiStyle);
   GUI.contentColor = Color.white;

   
   if(GUI.Button(Rect(pos.x + 25,pos.y + 40,65,65),box1))
   {
       buttonClicked1 = true;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
       CURRENT_OBJECT = pipe1;
       Debug.Log(CURRENT_OBJECT);
   }
   if(GUI.Button(Rect(pos.x + 95,pos.y + 40,65,65),box2))
   {
      buttonClicked1 = false;   
      buttonClicked2 = true;
      buttonClicked3 = false;
      buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
        buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
      CURRENT_OBJECT = pipe2;
       
   }
   if(GUI.Button(Rect(pos.x + 165,pos.y + 40,65,65),box3))
   {
      buttonClicked1 = false;   
      buttonClicked2 = false;
      buttonClicked3 = true;
      buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
        buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
        CURRENT_OBJECT = pipe3;
       
   }
   if(GUI.Button(Rect(pos.x + 25,pos.y + 110,65,65),box4))
   {
       buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =true;
        buttonClicked5=false;
        buttonClicked6=false;
         buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
       CURRENT_OBJECT = pipe4;
   }
   if(GUI.Button(Rect(pos.x + 95,pos.y + 110,65,65),box5))
   {
       buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
        buttonClicked5=true;
        buttonClicked6=false;
         buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
       CURRENT_OBJECT = pipe5;
   }
   if(GUI.Button(Rect(pos.x + 165 ,pos.y + 110,65,65),box6))
   {
       buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=true;
        buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
       CURRENT_OBJECT = pipe6;
   }
   if(GUI.Button(Rect(pos.x + 25 ,pos.y + 180,65,65),box7))
   {
       buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=true;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
       CURRENT_OBJECT = pipe7;
   }
   if(GUI.Button(Rect(pos.x + 95 ,pos.y + 180,65,65),box8))
   {
       buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=false;
       buttonClicked8=true;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
       CURRENT_OBJECT = pipe8;
   }
   if(GUI.Button(Rect(pos.x + 165 ,pos.y + 180,65,65),box9))
   {
       buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=true;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
      CURRENT_OBJECT = pipe9;
   }
   if(GUI.Button(Rect(pos.x + 235,pos.y + 40,65,65),box10))
   {
      buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=true;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=false;
      CURRENT_OBJECT = pipe10;
   }
   if(GUI.Button(Rect(pos.x + 235,pos.y + 110,65,65),box11))
   {
      buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=true;
       buttonClicked12=false;
       buttonClicked13=false;
      CURRENT_OBJECT = pipe11;
   }
   if(GUI.Button(Rect(pos.x + 235,pos.y + 180,65,65),box12))
   {
      buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=true;
       buttonClicked13=false;
      CURRENT_OBJECT = block1;
   }
    if(GUI.Button(Rect(pos.x + 305,pos.y + 40,65,65),box13))
   {
      buttonClicked1 = false;
       buttonClicked2= false;
       buttonClicked3= false;
       buttonClicked4 =false;
       buttonClicked5=false;
       buttonClicked6=false;
       buttonClicked7=false;
       buttonClicked8=false;
       buttonClicked9=false;
       buttonClicked10=false;
       buttonClicked11=false;
       buttonClicked12=false;
       buttonClicked13=true;
      CURRENT_OBJECT = block2;
   }

}
function MoneyBar(pos:Vector2,size:Vector2)
{

    GUI.contentColor = Color.yellow;
    GUI.Label(Rect(pos.x,pos.y,size.x,size.y),EuroSign);
    var  moneyNew : String;
    //moneyNew= money.ToString();
    GUI.Box(Rect(pos.x+ 50,pos.y + 5,size.x + 80,size.y - 20), "" + money);//,customGuiStyle); 
}
function scoreBar(pos:Vector2)
{
    GUI.contentColor = Color.white;
    GUI.Label(Rect(pos.x,pos.y + 100,size.x + 30,size.y + 30),scoreIcon);
    var  moneyNew : String;
    
    GUI.contentColor = Color.yellow;
    GUI.Box(Rect(pos.x+ 50,pos.y + 105,180, 30 ),"" + score);//,customGuiStyle);   
    
}
   