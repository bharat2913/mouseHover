(function () {
  // Creates a new canvas element and appends it as a child
  // to the parent element, and returns the reference to
  // the newly created canvas element

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
      var radius = 40; // or whatever
      var fillColor = '#F87171';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillCircle(x, y, radius, fillColor);
    };
    canvas.node.onmouseover = function (e) {
      canvas.isDrawing = true;
    };
    canvas.node.onmouseleave = function (e) {
      canvas.isDrawing = false;
    };
    // Touch Events
    canvas.node.ontouchstart = function (e) {
      canvas.isDrawing = true;
    };
    canvas.node.ontouchend = function (e) {
      canvas.isDrawing = false;
    };
    canvas.node.ontouchmove = function (e) {
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
            var radius = 20;
            var fillColor = '#F87171';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);
          }
        }
      }
    };
  }

  var container = document.getElementById('canvas');
  init(container, 1531, 1038, '#9CA3AF');
})();
