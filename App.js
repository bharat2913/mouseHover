(function () {
  // Creates a new canvas element and appends it as a child
  // to the parent element, and returns the reference to
  // the newly created canvas element

  var cursor = document.getElementById('cursor');
  let isDragging = false;
  var dragElement = document.getElementById('drag');
  var mediaQueryList = window.matchMedia('(max-width: 600px)');

  function createCanvas(parent, width, height) {
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    canvas.node.width = width || 100;
    canvas.node.height = height || 100;
    parent.appendChild(canvas.node);
    return canvas;
  }

  function init(container, width, height, fillColor) {
    var canvas = createCanvas(container, width, height);
    var ctx = canvas.context;
    // define a custom fillCircle method
    ctx.fillCircle = function (x, y, radius, fillColor) {
      this.fillStyle = fillColor;
      this.beginPath();
      this.moveTo(x, y);
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.fill();
    };
    ctx.clearTo = function (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, width, height);
    };
    ctx.clearTo(fillColor || '#ddd');

    // bind mouse events
    canvas.node.onmousemove = function (e) {
      if (!canvas.isDrawing) {
        return;
      }

      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var radius = 60; // or whatever
      var fillColor = '#F87171';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillCircle(x, y, radius, fillColor);
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      cursor.style.display = 'block';
      cursor.classList.add('hover');
      canvas.node.style.cursor = 'none';
      dragElement.style.display = 'none';
    };
    canvas.node.onmouseover = function (e) {
      canvas.isDrawing = true;
    };
    canvas.node.onmouseleave = function (e) {
      canvas.isDrawing = false;
      cursor.classList.remove('hover');
    };
    // Touch Events
    dragElement.ontouchstart = function (e) {
      canvas.isDrawing = true;
    };

    canvas.node.ontouchend = function (e) {
      canvas.isDrawing = false;
    };

    dragElement.ontouchmove = function (e) {
      canvas.isDrawing = true;
      if (!canvas.isDrawing) {
        return null;
      } else {
        e.preventDefault();
        var touches = e.changedTouches;

        function ongoingTouchIndexById(idToFind) {
          for (let i = 0; i < touches.length; i++) {
            const id = touches[i].identifier;

            if (id == idToFind) {
              return i;
            }
          }
          return -1; // not found
        }
        for (var i = 0; i < touches.length; i++) {
          var idx = ongoingTouchIndexById(touches[i].identifier);

          if (idx >= 0) {
            // console.log('continuing touch' + idx);

            //touch position ->
            // console.log('ctx.moveTo(' +touches[idx].pageX +', ' +touches[idx].pageY +');');
            //line position ->
            // console.log('ctx.lineTo(' + touches[i].pageX + ', ' + touches[i].pageY + ');');
            var x = touches[idx].pageX;
            var y = touches[idx].pageY;
            var radius = 45;
            var fillColor = '#F87171';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);
            if (!mediaQueryList) {
              dragElement.style.transform = `translate(${x}px, ${y}px)`;
            } else if (mediaQueryList) {
              dragElement.style.transform = `translate(${x}px, ${y}px)`;
              dragElement.style.opacity = '1';
            }
          }
        }
      }
    };
    // dragElement.ontouchmove = function (e) {
    //   e.preventDefault();
    //   var touches = e.changedTouches;
    //   function ongoingTouchIndexById(idToFind) {
    //     for (let i = 0; i < touches.length; i++) {
    //       const id = touches[i].identifier;

    //       if (id == idToFind) {
    //         return i;
    //       }
    //     }
    //     return -1; // not found
    //   }

    //   for (var i = 0; i < touches.length; i++) {
    //     var idx = ongoingTouchIndexById(touches[i].identifier);

    //     if (idx >= 0) {
    //       var x = touches[idx].pageX;
    //       var y = touches[idx].pageY;
    //       var radius = 30;
    //       var fillColor = '#F87171';
    //       ctx.globalCompositeOperation = 'destination-out';
    //       ctx.fillCircle(x, y, radius, fillColor);
    //       dragElement.style.transform = `translate(${x}px, ${y}px)`;
    //     }
    //   }
    //   canvas.isDrawing = true;

    //   console.log(e.changedTouches);
    //   console.log(canvas.isDrawing);
    // };
  }

  var container = document.getElementById('canvas');
  init(container, 2531, 1038, 'black');
})();
