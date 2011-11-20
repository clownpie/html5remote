var Shape = new Class({

	id : 'shape',
	rotation : 0,
	scale : 1,
	interactive : true,

	initialize: function(init_x, init_y) {
		this.init_x = init_x;
		this.init_y = init_y;
		this.x = init_x;
		this.y = init_y;
	},

	events : {
		// TODO add all the reset of the onAction methods
		onDraw : function(ctx) { this.onDraw(ctx); },
		onMousedown : function(x, y) { this.onMousedown(x, y); },
		onMousemove : function(x, y) { this.onMousemove(x, y); },
		onDblclick : function() { this.onDblclick(); },
		onMouseup : function() { this.onMouseup(); },
	},

	setStyle : function(ctx, fillStyle, lineStyle) {
		ctx.fillStyle = fillStyle;
		ctx.lineStyle = lineStyle;
	},

});

var Circle = new Class({
	Extends: Shape,

	id : 'circle',
	lineStyle : '#000',
	fillStyle : '#F00',
	offset : [0,0],

	initialize: function(init_x, init_y, init_r) {
		this.parent(init_x, init_y);

		this.r = init_r;
	},

	/* event callbacks */
	onDraw : function(ctx)
	{
		this.setStyle(ctx, this.fillStyle, this.lineStyle);

		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.arc(this.x, this.y, this.r / 2, 0, Math.PI * 2);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		// use the dimensions of the rect enclosing our circle
		// might want to change this later to only be our circle
		this.setDims(
			this.x - .5 * this.r,
			this.y - .5 * this.r,
			this.r,
			this.r
		);
	},

	onMousedown : function(x, y)
	{
		console.log('down ' + x + ' ' + y);
		this.dragging = true;
		CANVAS.setDrag(this);

		this.offset = [
			x - this.x,
			y - this.y
		];
	},

	onDblclick : function()
	{
		console.log('clear');
		CANVAS.clear();
	},

	onMousemove : function(x, y)
	{
		console.log(x + ' ' + y);
		if (this.dragging) {
			this.x = x - this.offset[0];
			this.y = y - this.offset[1];
		}
	},

	onMouseup : function()
	{
		this.dragging = false;
		CANVAS.clearDrag();
		console.log('up')

		new Cmorph(this,{
			duration : 150,
			transition : 'sine:in:out'
		}).morph({ 
			scale : 1,
			x : this.init_x,
			y : this.init_y,
			rotation : 0
		});
	},
});

function distBetween(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

var BoundCircle = new Class( {
	Extends : Circle,

	initialize : function(init_x, init_y, r, max_r) {
		this.parent(init_x, init_y, r);
		this.max_r = max_r;
	},

	onMousemove : function(x, y)
	{
		distance = distBetween(x, y, this.init_x, this.init_y);
		console.log('dist ' + distance + ' max_r' + this.max_r);

		if (distance > this.max_r) {
			console.log('too far!');
			var scale = this.max_r / distance;
			this.parent(this.init_x + (x - this.init_x) * scale,
						this.init_y + (y - this.init_y) * scale);
		}
		else {
			console.log('just fine');
			this.parent(x, y);
		}
	},
});

