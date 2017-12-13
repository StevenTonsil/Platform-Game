class Platform
{
	constructor(x,y, width, height, friction)
	{
		this.pos = new p5.Vector(x,y);
		this.width = width;
		this.height = height;
		this.friction = friction;
	}

	show()
	{
		push();
		strokeWeight(2);
		stroke(255);
		fill(0);
		rect(this.pos.x, this.pos.y, this.width, this.height);
		pop();
	}
}