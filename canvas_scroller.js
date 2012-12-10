$( document ).ready( function() {
    
  // Helper function to get the x,y coordinates
  function getCursorPosition(e, canvasId) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
      x = e.pageX - document.getElementById( canvasId ).offsetLeft;
      y = e.pageY - document.getElementById( canvasId ).offsetTop;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - document.getElementById( canvasId ).offsetLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - document.getElementById( canvasId ).offsetTop;
    };
  
    return [ x, y ];
  };
  
  // Get the canvas element, and drawing context
  var canvas = document.getElementById( 'scroll' ); 
  var ctx = canvas.getContext( '2d' ); 
    
  // Some general variables to make the scroller work
  var mouseDown = false;
  var deltaX = 0;
  var positionList = [];
  var currPosition = 0;
  var prevPosition = 0;
    
  // Queue the images up to be loaded
  var loader = new PxLoader(), 
    image0 = loader.addImage( 'image0.jpg' ), 
    image1 = loader.addImage( 'image1.jpg' ), 
    image2 = loader.addImage( 'image2.jpg' ),
    image3 = loader.addImage( 'image3.jpg' );

  // Lets us know when all of our images are loaded
  loader.addCompletionListener( function() { 
    window.setInterval( draw, 1000 / 40 ); 
  });
  
  $( '#scroll' ).on( 'mousedown', function(e) {
    mouseDown = true;
    currPosition = getCursorPosition( e, 'scroll' )[0];
  });
  
  $( '#scroll' ).on( 'mouseup', function() {
    mouseDown = false;
  });
  
  $( '#scroll' ).on( 'mouseleave', function() {
    mouseDown = false;
  });
  
  $( '#scroll' ).on( 'mousemove', function(e) {
    if ( mouseDown ) {
      prevPosition = currPosition;
      currPosition = getCursorPosition( e, 'scroll' )[0];
      deltaX -= ( prevPosition - currPosition );
    };
  });
  
  // General Draw Function
  function draw() {
    
    ctx.save();
    ctx.translate(deltaX, 0);
    
    // Clear the viewport
    ctx.clearRect(-deltaX, 0, canvas.width, canvas.height);
    
    // Draw the images at fixed positions (optimization opportunity: draw only what is visible in the viewport)
    ctx.drawImage(image0, 0, 0); 
    ctx.drawImage(image1, 400, 0); 
    ctx.drawImage(image2, 800, 0);
    ctx.drawImage(image3, 1200, 0);
    
    ctx.restore();
  };
  
  loader.start();
  
});