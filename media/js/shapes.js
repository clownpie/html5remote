var Circle = new Class({
	initialize: function(init_x, init_y, init_r) {
		this.options = {
			id : 'circle',
			x : init_x,
			y : init_y,
			r : init_r,
			rotation : 0,
			scale : 1,
			lineStyle : '#000',
			fillStyle : '#F00',
			interactive : true,
			offset : [0,0],
			events : {
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
						x : init_x,
						y : init_y,
						rotation : 0
					});
				},
			},
		}
	},

	getCanvasItem : function() {
		if (this.canvasItem) {
			return this.canvasItem;
		} else {
			return new CanvasItem(this.options);
		}
	}
});
