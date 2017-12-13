function keyPressed()
{
	if (!isMobile)
	{
		// Left Arrow Key && Right Arrow Key
		if (keyCode == 37 || keyCode == 39)
		{
			player.toggleOn(keyCode);
		}

		// Up Arrow Key && Space Bar
		if (keyCode == 38 || keyCode == 32 && (player.isOnGround || !player.dJump))
		{
			if (!player.isOnGround)
			{
				player.vel.set(player.vel.x, 0);
				player.dJump = !player.dJump;
			}

			player.applyForce([0, -10]);
		}

		// Down Arrow Key
		/*if (keyCode == 40)
		{
			player.applyForce([0, 1]);
		}*/

		// R Key
		if (keyCode == 82)
			resetMap();
	}
}

function keyReleased()
{
	if (!isMobile)
	{
		// Left Arrow Key && Right Arrow Key
		if (keyCode == 37 || keyCode == 39)
		{
			player.toggleOff(keyCode);
		}
	}
}

function mousePressed()
{
	if (isMobile)
	{
		// Left
		if (mouseX < windowWidth/4)
		{
			player.toggleOn(37);
		}
		
		// Right
		else if (mouseX > 3 * windowWidth/4)
		{
			player.toggleOn(39);	
		}

		// Up
		if (mouseY < windowHeight/4 && (player.isOnGround || !player.dJump))
		{
			if (!player.isOnGround)
			{
				player.vel.set(player.vel.x, 0);
				player.dJump = !player.dJump;
			}

			player.applyForce([0, -10]);
		}

		// Bottom Middle
		if ((mouseX > windowWidth/4 && mouseX < 3 * windowWidth/4) && mouseY > 3 * windowHeight/4)
			resetMap();
	}
}

function mouseReleased()
{
	if (isMobile)
	{
		// Left
		if (mouseX < windowWidth/4)
		{
			player.toggleOff(37);
		}
		
		// Right
		else if (mouseX > 3 * windowWidth/4)
		{
			player.toggleOff(39);	
		}
	}
}

function windowResized()
{
	createCanvas(windowWidth, windowHeight);
}