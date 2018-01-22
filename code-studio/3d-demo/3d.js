// camera position + rotation
var c = {
  x: 0, y: 30, z: 0,
  r: {x: Math.PI*-0.2, y: Math.PI/4, z: 0}
};
// viewer position to the screen            this is fov (in the parentheses)
var e = {x: 320/2, y: 450/2, z: 1/Math.tan((Math.PI/3)/2)}; 

// starts the looping
start();
function start() {
  // repeats the drawing
  setInterval(function() {
    // the rotation of the camera
    c.r.y = (c.r.y > Math.PI*2) ? 0 : c.r.y += 0.05;
    // the counter movement of the camera
    c.x = 200*Math.cos(-Math.PI/2-c.r.y)+150;
    c.z = 200*Math.sin(-Math.PI/2-c.r.y)+150;
    
    // clear the screen
    penRGB(255, 255, 255);
    dot(700);

    // create the 8 points of the cube
    var p = [];
    p.push(getPoint({x: 100, y: 100, z: 100}));
    p.push(getPoint({x: 200, y: 100, z: 100}));
    p.push(getPoint({x: 200, y: 200, z: 100}));
    p.push(getPoint({x: 100, y: 200, z: 100}));
    p.push(getPoint({x: 100, y: 100, z: 200}));
    p.push(getPoint({x: 200, y: 100, z: 200}));
    p.push(getPoint({x: 200, y: 200, z: 200}));
    p.push(getPoint({x: 100, y: 200, z: 200}));
    
    // draw the vertices of the cube
    penRGB(255, 0, 0);
    penUp();
    moveTo(p[3].x, p[3].y);
    penDown();
    for (var i = 0; i < 4; i++) {
      moveTo(p[i].x, p[i].y);
    }
    penRGB(0, 255, 0);
    penUp();
    moveTo(p[7].x, p[7].y);
    penDown();
    for (i = 4; i < 8; i++) {
      moveTo(p[i].x, p[i].y);
      moveTo(p[i-4].x, p[i-4].y);
      moveTo(p[i].x, p[i].y);
    }
    
    // draw the corners of the cube
    penRGB(0, 0, 255);
    penUp();
    for (i = 0; i < p.length; i++) {
      moveTo(p[i].x, p[i].y);
      dot(5);
    }
    
    // hide the cursor
    penUp();
    moveTo(325, 455);
  }, 25); // time between each frame (ms)
}

/**
 * turns a 3d point into a 2d projected point
 */
function getPoint(a) {
  // shortcuts
  var p = {
    x: a.x-c.x,
    y: a.y-c.y,
    z: a.z-c.z
  };
  var sin = {
    x: Math.sin(c.r.x),
    y: Math.sin(c.r.y),
    z: Math.sin(c.r.z)
  };
  var cos = {
    x: Math.cos(c.r.x),
    y: Math.cos(c.r.y),
    z: Math.cos(c.r.z)
  };
  
  // camera transformation
  var d = {
    x: cos.y*(sin.z*p.y + cos.z*p.x) - sin.y*p.z,
    y: sin.x*(cos.y*p.z + sin.y*(sin.z*p.y + cos.z*p.x)) + cos.x*(cos.z*p.y - sin.z*p.x),
    z: cos.x*(cos.y*p.z + sin.y*(sin.z*p.y + cos.z*p.x)) - sin.x*(cos.z*p.y - sin.z*p.x)
  };
  
  // point projection
  var b = {
    x: e.z/d.z*d.x*((e.x < e.y) ? e.y : e.x) + e.x,
    y: e.z/d.z*d.y*((e.x < e.y) ? e.y : e.x) + e.y
  };
  
  return b;
}
