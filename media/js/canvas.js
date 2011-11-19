var WIDTH = 500;
var HEIGHT = 500;

var c = document.createElement('canvas');
c.setAttribute('id', 'canvas');
c.setAttribute('width', WIDTH);
c.setAttribute('height', HEIGHT);

document.getElementsByTagName('body')[0].appendChild(c)

$(window).addEvent('load', function(){

	//initialize the CANVAS object
	CANVAS.init({ canvasElement : 'canvas' });
	
	//attach a new layer
	var layer = CANVAS.layers.add( new Layer({
		id : 'myLayer'
	}));
	
	layer.add({
		id : 'joystick',
		x : WIDTH / 2,
		y : HEIGHT / 2,
		radius : 30,
		events : {
			onDraw : function(ctx) {
				ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
				ctx.lineWidth = 8;
				ctx.strokeStyle = 'rgba(0,0,0,1)';
				ctx.stroke();
				ctx.fillStyle = 'rgba(255,0,0,1)';
				ctx.fill();
			}
		}
	});

	CANVAS.addThread(new Thread({
		id : 'myThread',
		onExec : function(){
			CANVAS.clear().draw();
		}
	}));

});

