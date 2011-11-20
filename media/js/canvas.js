var WIDTH = 250;
var HEIGHT = 250;

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

	var circle = new Circle(HEIGHT / 2, WIDTH / 2, 45);
	//add an item
	layer.add(circle.getCanvasItem());
	
	//simple thread...
	CANVAS.addThread(new Thread({
		id : 'myThread',
		onExec : function(){
			CANVAS.clear();
			CANVAS.draw();
		}
	}));

});
