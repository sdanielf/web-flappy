var bgwidth = 963;

var stage = new Kinetic.Stage({
  container: 'container',
  width: 700,
  height: 602
});

// Background
var bg= new Kinetic.Layer();
var bgimg = new Image();
var bgobj1;
var bgobj2;
var bgx = 0;
var loaded = 0;

bgimg.onload = function() {
  bgobj1 = new Kinetic.Image({
    x: bgx,
    y: 0,
    image: bgimg,
    width: bgwidth,
    height: 602
  });
  bg.add(bgobj1);
  bgobj2 = new Kinetic.Image({
    x: bgx + bgwidth,
    y: 0,
    image: bgimg,
    width: bgwidth,
    height: 602
  });
  bg.add(bgobj2);

  loaded += 1;
};
bgimg.src = 'img/background.jpg';
stage.add(bg);

// Tubes
var tubes= new Kinetic.Layer();
tubeupimg = new Image();
tubedownimg = new Image();
var xdis = 300;
var ydis = 150;
var tubewidth = 60;
var tubeheight = 275;
var tubeup1, tubedown1;
var tubex = 0;
var tube1y = -275;
var tube2y = -275;
var tube3y = -275;

tubeupimg.onload = function () {
  tubeup1 = new Kinetic.Image({
    x: tubex,
    y: tube1y,
    image: tubeupimg,
    width: tubewidth,
    height: tubeheight * 2
  });
  tubes.add(tubeup1);
  tubeup2 = new Kinetic.Image({
    x: tubex + xdis,
    y: tube2y,
    image: tubeupimg,
    width: tubewidth,
    height: tubeheight * 2
  });
  tubes.add(tubeup2);
  tubeup3 = new Kinetic.Image({
    x: tubex + xdis * 2,
    y: tube3y,
    image: tubeupimg,
    width: tubewidth,
    height: tubeheight * 2
  });
  tubes.add(tubeup3);
  tubes.draw()
  loaded += 1;
}

tubedownimg.onload = function (){
  tubedown1 = new Kinetic.Image({
    x: tubex,
    y: tube1y + tubeheight * 2 + ydis,
    image: tubedownimg,
    width: tubewidth,
    height: tubeheight * 2
  });
  tubes.add(tubedown1);
  tubedown2 = new Kinetic.Image({
    x: tubex + xdis,
    y: tube2y + tubeheight * 2 + ydis,
    image: tubedownimg,
    width: tubewidth,
    height: tubeheight * 2
  });
  tubes.add(tubedown2);
  tubedown3 = new Kinetic.Image({
    x: tubex + xdis * 2,
    y: tube3y + tubeheight * 2 + ydis,
    image: tubedownimg,
    width: tubewidth,
    height: tubeheight * 2
  });
  tubes.add(tubedown3);
  tubes.draw()
  loaded += 1;
};

tubeupimg.src = 'img/tube1.png';
tubedownimg.src = 'img/tube2.png';

stage.add(tubes);

var bird = new Kinetic.Layer();
birdimg = new Image()
var birdy = 400;
var up = false;
var upcount = 0;
birdimg.onload = function () {
  birdobj = new Kinetic.Image({
    x: 100,
    y: birdy,
    image: birdimg,
    width: 60,
    height: 60
  });
  bird.add(birdobj);
}
birdimg.src = 'img/bird.png';
stage.add(bird);

// Animation
setInterval(function () {
  if (loaded == 3) {
    bgx -= 1
    if (bgx + bgwidth === 0) {
      bgx = 0;
      bgobj1.move({x: bgwidth, y: 0});
      bgobj2.move({x: bgwidth, y: 0});
    } else {
      bgobj1.move({x: -1, y: 0});
      bgobj2.move({x: -1, y: 0});
    }
    bg.draw();
    if (tubex + tubewidth === 0) {
      tubex = tubex + xdis * 3;
      var newy = Math.floor(Math.random() * (tubeheight * 2 - ydis / 4)) - tubeheight * 2;
      console.log(newy);
      tubeup1.move({x: xdis * 3, y: newy - tube1y});
      tubedown1.move({x: xdis * 3, y: newy - tube1y});
      tube1y = newy;
      tubeup2.move({x: -1, y: 0});
      tubedown2.move({x: -1, y: 0});
      tubeup3.move({x: -1, y: 0});
      tubedown3.move({x: -1, y: 0});
    } else if (tubex - xdis * 2 + tubewidth === 0) {
      tubex--;
      var newy = Math.floor(Math.random() * (tubeheight * 2 - ydis / 4)) - tubeheight * 2;
      tubeup2.move({x: xdis * 3, y: newy - tube2y});
      tubedown2.move({x: xdis * 3, y: newy - tube2y});
      tube2y = newy;
      tubeup1.move({x: -1, y: 0});
      tubedown1.move({x: -1, y: 0});
      tubeup3.move({x: -1, y: 0});
      tubedown3.move({x: -1, y: 0});
    } else if (tubex - xdis + tubewidth == 0){
      tubex--;
      var newy = Math.floor(Math.random() * (tubeheight * 2 - ydis / 4)) - tubeheight * 2;
      tubeup3.move({x: xdis * 3, y: newy - tube3y});
      tubedown3.move({x: xdis * 3, y: newy - tube3y});
      tube3y = newy;
      tubeup1.move({x: -1, y: 0});
      tubedown1.move({x: -1, y: 0});
      tubeup2.move({x: -1, y: 0});
      tubedown2.move({x: -1, y: 0});
    } else {
      tubex--;
      tubeup1.move({x: -1, y: 0});
      tubedown1.move({x: -1, y: 0});
      tubeup2.move({x: -1, y: 0});
      tubedown2.move({x: -1, y: 0});
      tubeup3.move({x: -1, y: 0});
      tubedown3.move({x: -1, y: 0});
    }
    tubes.draw();
    if (!up) {
      if (upcount !== 0) {
        birdy += 2
        birdobj.move({x:0, y: 2});
      } else {
        birdy += 4;
        birdobj.move({x:0, y: 4});
        upcount--;
      }
    } else {
      upcount++;
      birdy -= 8;
      birdobj.move({x: 0, y: -8});
      if (upcount == 5) {
        up =false;
      }
    }
    bird.draw();

    var tube2 = tubex - xdis * 2;
    var tube3 = tubex - xdis;
    if (tubex > 95 - tubewidth && tubex < 155) {
      var min = tube1y + tubeheight * 2;
      var max = min + ydis;
      if (birdy < min || birdy > max) {
        alert('Game over, press F5 to start again');
      }
    }
    else if (tube2 > 95 - tubewidth && tube2 < 155 ) {
      var min = tube2y + tubeheight * 2;
      var max = min + ydis;
      if (birdy < min || birdy + 60 > max) {
        alert('Game over, press F5 to start again');
      }
    }
    else if (tube3 > 95 - tubewidth && tube3 < 155) {
      var min = tube3y + tubeheight * 2;
      var max = min + ydis;
      if (birdy < min || birdy > max) {
        alert('Game over, press F5 to start again');
      }
    }
  }
}, 0);

window.onkeypress = function () {
  up = true;
  upcount = 0;
}
