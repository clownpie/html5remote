$(window).addEvent('load',function(){

	//initialize the CANVAS object
	CANVAS.init({ canvasElement : 'canvas' });
	
	//attach a new layer
	CANVAS.layers.add( new Layer({
		id : 'myLayer'
	}));
	
	//set globalCompositeOperation on the canvas
	CANVAS.ctx.globalCompositeOperation = 'lighter';

	//just some arrays
	var colors = [
		'rgba(255,0,0,1)',
		'rgba(0,255,0,1)',
		'rgba(0,0,255,1)'
		];
	
	var pos = [
		{ x: 150, y : 100 },
		{ x: 200, y : 150 },
		{ x: 250, y : 50 }
	]
	
	//create three items on the layer
	for(var i = 0; i < colors.length; i++)
	{
		/* select the layer, then add a new CanvasItem
		 * with the property from the respective array
		 * */
		
		CANVAS.layers.get('myLayer').add( new CanvasItem({
			id : 'item-'+i,
			x : pos[i].x,
			y : pos[i].y,
			fillStyle : colors[i],
			events : {
				onDraw : function(ctx)
				{
					/* this is the code that is called
					 * every time the canvas is drawn.
					 * */
					ctx.fillStyle = this.fillStyle;
					ctx.fillRect(this.x,this.y,200,200);
				}
			}
		}));
	}
	
	//finally draw the canvas once
	CANVAS.draw();
});

