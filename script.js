var playerButtons=$(".player");
var activebutton=$(".activebtn");

setInterval(colorchange,500)

name();

var index=0;
var gameover=0;
var flag1=0;
var flag2=0;
var select="";/* if select is 1 ,we bat first else we bowl first.*/

var totalPlayerScore=0;
var totalComputerScore=0;
var playerChoice=0;
var computerChoice=0;

toss();

$(playerButtons).click(function()
{
	$(".message").text("");
	playerChoice=Number($(this).val());
	if (select==1)
	{
		if (flag1==0)
		{
			batting();
		}
		else if (flag2==0)
		{
			bowling();
		}
	}
	else
	{
		if (flag2==0)
		{
			bowling();
		}
		else if (flag1==0)
		{
			batting();
		}
	}
});

$(".resetbtn").click(function()
{

	index=0;
	gameover=0;
	flag1=0;
	flag2=0;
	select="";
	totalPlayerScore=0;
	totalComputerScore=0;
	playerChoice=0;
	computerChoice=0;
	$(".resetbtn").val("RESET GAME");
	$(".resetbtn").css( {"background-color" : "#fc0303" , "border":"1px solid #fc0303"});
	$("#playerscore").text(totalPlayerScore);
	$("#computerscore").text(totalComputerScore);
	$(playerButtons).attr('disabled',false);
	$(".message").text("");
	toss();
});



function name()
{
	var name=prompt("Please enter your Nick name");
	var playerName=$("#name");
	if (name!="" && name!="null")
	{
		$(playerName).text(name.toUpperCase()+"'S");
	}
}


function toss()
{
	var tossnumber=Number(prompt("What's your call? 1 for Heads/ 2 for Tails"));
	while(tossnumber!=1 && tossnumber!=2)
	{
		tossnumber=Number(prompt("Sorry to ask you again. What's your call? 1 for Heads/ 2 for Tails"));
	}
	
	var randomtossnumber=Math.floor(Math.random()*2 +1);
	if (tossnumber==randomtossnumber)
	{
		select=Number(prompt("You have won the toss. What's your decision? 1 for Batting /2 for Bowling"));
		while(select!=1 && select!=2)
		{
			select=Number(prompt("Sorry to ask you again. What's your decision? 1 for Batting /2 for Bowling"));
		}
		if (select==1)
		{
			$(".message").text("You have won the toss and opted for Batting.");
		}
		else
		{
			$(".message").text("You have won the toss and opted for Bowling");
		}
	}

	else
	{
		if (randomtossnumber==1)
		{
			$(".message").text("Comp have won the toss and opted for Batting");
			select=2;
		}
		else
		{
			$(".message").text("Comp have won the toss and opted for Bowling");
			select=1;
		}
		
	}
}

function batting()
{

		computerChoice=Math.floor(Math.random()*6 +1);
		$(".message").text("Comp Choice: "+computerChoice);
		if (flag1==0)
		{
			if (computerChoice==playerChoice)
			{
				if (select==1)
				{
					$(".message").text("Wicket. Its your turn to Bowl now.");
				}
				else
				{
					if (totalPlayerScore<totalComputerScore)
					{
						$(".message").text("Wicket. You have lost the match.");
					}
					else if (totalPlayerScore==totalComputerScore)
					{
						$(".message").text("Tie match.");
					}
					gameover=1;

				}
				flag1=1;
			}
			else
			{
				totalPlayerScore+=playerChoice;
				$("#playerscore").text(totalPlayerScore);
			}

		}
	
		if (select==2 && gameover==0)
		{
			check(); /*calling check function to check whether we have won the match or not */
		}
};



function bowling()
{
	
		computerChoice= Math.floor(Math.random()*6 +1);
		$(".message").text("Comp Choice: "+computerChoice);
		if (flag2==0)
		{

			if (computerChoice==playerChoice)
			{
				if (select==2)
				{
					$(".message").text("Wicket. Its your turn to Bat now");
				}
				else
				{
					if (totalComputerScore<totalPlayerScore)
					{
						$(".message").text("You have won the match by "+(totalPlayerScore - totalComputerScore)+" runs.");
					}
					else if (totalComputerScore==totalPlayerScore)
					{
						$(".message").text("Tie match.");
					}
					gameover=1;

				}
				flag2=1;
			}
			else
			{
				totalComputerScore+=Number(computerChoice);
				$("#computerscore").text(totalComputerScore);
			}
		}
		if (select==1 && gameover==0)
		{
			check(); /*to check whether computer have won the match or not */
		}

};


function check()
{
	if (select==1)
	{
		if (totalComputerScore>totalPlayerScore)
		{
			$(".message").text("You have lost the match.");
			flag2=1;
			gameover=1;

		}
	}
	else
	{
		if (totalPlayerScore>totalComputerScore)
		{
			$(".message").text("You have won the match.");
			flag1=1;
			gameover=1;
		}
	}

};


function colorchange()
{
	$(activebutton).removeClass("colorchange");
	$(activebutton).removeClass("gameover");
	if (gameover==0)
	{
		$(activebutton[index%8]).addClass("colorchange");
		index+=1
	}
	else 
	{
		$(activebutton).addClass("gameover");
		$(".resetbtn").val("PLAY AGAIN?");
		$(".resetbtn").css({"background-color": "#2de036","border": "1px solid #2de036"});
		$(playerButtons).attr('disabled',true);
	}
};