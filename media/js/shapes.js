var Shape = new Class({
	initialize: function() {},

	events : {
		onDraw : function(ctx) { this.onDraw(ctx); },
		onMousedown : function(x, y) { this.onMousedown(x, y); },
		onMousemove : function(x, y) { this.onMousemove(x, y); },
		onDblclick : function() { this.onDblclick(); },
		onMouseup : function() { this.onMouseup(); },
	}
});

var Circle = new Class({
	Extends: Shape,

	initialize: function(init_x, init_y, init_r) {
		this.parent();

		this.init_x = init_x;
		this.init_y = init_y;
		this.x = init_x;
		this.y = init_y;
		this.r = init_r;
	},

	id : 'circle',
	rotation : 0,
	scale : 1,
	lineStyle : '#000',
	fillStyle : '#F00',
	interactive : true,
	offset : [0,0],

	/* event callbacks */
	onDraw : function(ctx)
	{
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.lineStyle = this.lineStyle;
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

var BoundCircle = new Class( {
	Extends : Circle,

	initialize : function(init_x, init_y, r, max_r) {
		this.parent(init_x, init_y, r);
		this.max_r = max_r;
	},

	onMousemove : function(x, y)
	{
		console.log('BoundCircle.onMousemove');
		this.parent(x, y);
	},
});

