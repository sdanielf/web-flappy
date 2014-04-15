var birdx = 100;
var stage = new Kinetic.Stage({
  container: 'container',
  width: 700,
  height: 602
});

function Background() {
  var self = this;
  self.layer = new Kinetic.Layer();
  self.image = new Image();
  self.ready = false;
  self.width = 963;
  self.height = 602;
  self.pos = 0;

  self.image.onload = function() {
    self.shape1 = new Kinetic.Image({
      x: self.pos,
      y: 0,
      image: self.image,
      width: self.width,
      height: self.height
    });
    self.layer.add(self.shape1);
    self.shape2 = new Kinetic.Image({
      x: self.pos + self.width,
      y: 0,
      image: self.image,
      width: self.width,
      height: self.height
    });
    self.layer.add(self.shape2);

    self.ready = true;
  };

  self.image.src = 'img/background.jpg';
  stage.add(self.layer);

  self.update = function () {
    self.pos -= 1
    if (self.pos + self.width === 0) {
      self.pos = 0;
      self.shape1.move({x: self.width, y: 0});
      self.shape2.move({x: self.width, y: 0});
    } else {
      self.shape1.move({x: -1, y: 0});
      self.shape2.move({x: -1, y: 0});
    }
    self.layer.draw();
  }
}

function TubePair(x, distance, relation, onready) {
  var self = this;
  self.x = x + distance * relation;
  self.y = -275;
  self.ydis = 150;
  self.width = 60;
  self.height = 275;

  self.actual_height = 275 * 2;
  self.hiddenx = self.x + self.width;

  self.loadUp = function (img) {
    self.upshape = new Kinetic.Image({
      x: self.x,
      y: self.y,
      image: img,
      width: self.width,
      height: self.actual_height
    });
    onready(self.upshape);
  }

  self.loadDown = function (img) {
    self.downshape = new Kinetic.Image({
      x: self.x,
      y: self.y + self.actual_height + self.ydis,
      image: img,
      width: self.width,
      height: self.actual_height
    });
    onready(self.downshape);
  }

  self.matches = function (y) {
    if (birdx + 50 > self.x) {
      var maxx = self.x + self.width;
      if (birdx < maxx) {
        var minY = self.y + self.actual_height - 10;
        if (minY > y) {
          return true;
        }
        var maxY = minY + self.ydis;
        if (maxY < y) {
          return true;
        }
      }
    }
    return false;
  }

  self.update = function () {
    if (self.hiddenx === 0) {
      var deltax = distance * 3;
      var newy = Math.floor(Math.random() *
                            (self.actual_height - self.ydis / 4)) -
                            self.actual_height;
      self.upshape.move({x: deltax, y: newy - self.y});
      self.downshape.move({x: deltax, y: newy - self.y});
      self.y = newy;
      self.x += deltax;
      self.hiddenx = self.x + self.width;
    } else {
      self.x--;
      self.hiddenx = self.x + self.width;
      self.upshape.move({x: -1, y: 0});
      self.downshape.move({x: -1, y: 0});
    }
  }
}

function TubeEngine() {
  var self = this;
  self.layer = new Kinetic.Layer();
  self.downimg = new Image();
  self.upimg = new Image();
  xdis = 300;
  var tubes = [];
  var loadedup = false;
  var loadeddown = false;
  self.ready = false;

  for (var i = 0; i < 3; i++) {
    tubes.push(new TubePair(0, xdis, i, function (shape) {
      self.layer.add(shape);
      self.layer.draw();
    }));
  }

  self.upimg.onload = function () {
    loadedup = true;
    tubes.forEach(function (tube){
      tube.loadUp(self.upimg);
    });
    if (loadeddown) {
      self.ready = true;
    }
  }
  self.downimg.onload = function () {
    loadeddown = true
    tubes.forEach(function (tube){
      tube.loadDown(self.downimg);
      console.log(tubes.length);
    });
    if (loadedup) {
      self.ready = true;
    }
  }

  self.upimg.src = 'img/tube1.png';
  self.downimg.src = 'img/tube2.png';
  stage.add(self.layer);

  self.update = function () {
    tubes.forEach(function (tube) {
      tube.update();
    });
    self.layer.draw();
  }

  self.matchBird = function (y) {
    for (var i = 0, l = tubes.length; i < l; i ++) {
      var tube = tubes[i];
      if (tube.matches(y)) {
        console.log('matches')
        return true;
      }
    }
    return false;
  }
}

function Bird () {
  var self = this;
  self.layer = new Kinetic.Layer();
  self.image = new Image();
  self.y = 400;
  self.width = 60;
  self.height = 60;
  self.up = false;
  self.upcount = 0;

  self.image.onload = function () {
    self.shape = new Kinetic.Image({
      x: birdx,
      y: self.y,
      image: self.image,
      width: self.width,
      height: self.height
    });
    self.layer.add(self.shape);
  }
  stage.add(self.layer);
  self.image.src = 'img/bird.png';

  self.update = function () {
    if (!self.up) {
      if (self.upcount !== 0) {
        self.y += 2
        self.shape.move({x:0, y: 2});
      } else {
        self.y += 4;
        self.shape.move({x:0, y: 4});
        self.upcount--;
      }
    } else {
      self.upcount++;
      self.y -= 8;
      self.shape.move({x: 0, y: -8});
      if (self.upcount == 5) {
        self.up = false;
      }
    }
    self.layer.draw();
  }
}

var background = new Background();
var tubes = new TubeEngine();
var bird = new Bird();


// Animation
setInterval(function () {
  if (background.ready && tubes.ready) {
    background.update();
    tubes.update();
    bird.update()

    if (tubes.matchBird(bird.y)){
      alert('Game over, press F5 to start again');
    }
  }
}, 0);

window.onkeypress = function () {
  bird.up = true;
  bird.upcount = 0;
}
