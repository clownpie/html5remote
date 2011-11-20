var WIDTH = 500;
var HEIGHT = 500;

var c = document.createElement('canvas');
c.setAttribute('id', 'canvas');
c.setAttribute('width', WIDTH);
c.setAttribute('height', HEIGHT);

document.getElementsByTagName('body')[0].appendChild(c);

$(window).addEvent('load',function(){
	// initialize the CANVAS object and enable mouse events

	CANVAS.init({ 
		canvasElement : 'canvas',
		enableMouse : true
	});
	
	//add a layer
	var layer = CANVAS.layers.add({
		id : 'myLayer'
	});

	//add an item
	layer.add({
			id : 'item',
			home_x : WIDTH / 2,
			home_y : HEIGHT / 2,
			x : HEIGHT / 2,
			y : HEIGHT / 2,
			w : 50,
			h : 50,
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
					ctx.arc(this.x, this.y, this.h / 2, 0, Math.PI * 2);
					ctx.closePath();
					ctx.stroke();
					ctx.fill();

					// use the dimensions of the rect enclosing our circle
					// might want to change this later to only be our circle
					this.setDims(
						this.x - .5 * this.w,
						this.y - .5 * this.h,
						this.w,
						this.h
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
						x : this.home_x,
						y : this.home_y,
						rotation : 0
					});					
				},
				
			},
	});
	
	//simple thread...
	CANVAS.addThread(new Thread({
		id : 'myThread',
		onExec : function(){
			CANVAS.clear();
			CANVAS.draw();
		}
	}));

});
