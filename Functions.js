function resetMap()
{
	platforms.splice(0, platforms.length);
	
	platforms.push(new Platform(windowWidth/2 - 20, windowHeight/2 + 60, 100, 20, .85));
	
	for (let i = 1; i < 8; i++)
		platforms.push(new Platform(i * random(100, 300), i * random(50, 200), 100, 20, .85));
}

function resetEntity(entity, x, y)
{
	entity.vel.set(0,0);
	entity.pos.set(x,y);
}
