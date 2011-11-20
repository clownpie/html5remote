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

	var circle = new Joystick(HEIGHT / 2, WIDTH / 2, 45, 75);
	var circleItem = new CanvasItem(circle);
	layer.add(circleItem);
	
	//simple thread...
	CANVAS.addThread(new Thread({
		id : 'myThread',
		onExec : function(){
			CANVAS.clear();
			CANVAS.draw();
		}
	}));

});
