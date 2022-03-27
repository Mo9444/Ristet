var feld1 = "leer";
var map = [];
var activplayer = "X";
var playing = true;
var goingrightkeydown = false;
var goingleftkeydown = false;
var rotaterightkeydown = false;
var rotateleftkeydown = false;
var score = 0;
var mapsizex = 10;
var mapsizey = 20;


var downfallspeed = 100;
var leftrightspeed = 10;


function laden() {
    for (var x = 0; x < 10; x++) {
        map[x] = new Array();

        for (var y = 0; y < 20; y++) {
            map[x][y] = "";
        }
    }

    gameloop();
}

var isfalling = false;
var lastdown = 0;
var lastleftright = 0;

function gameloop() {
    if (!isfalling) {
        checkforrow();
        aktiveblock = spawnrandomblock();
        isfalling = true;
    }
    if (Date.now() - lastdown > downfallspeed) {
        lastdown = Date.now();
        if (aktiveblock.move(map, "down") == -1) {
            isfalling = false;
        }
    }
    if (Date.now() - lastleftright > leftrightspeed) {
        lastleftright = Date.now();
        if (goingrightkeydown) {
            aktiveblock.move(map, "right");
            goingrightkeydown = false;
        } else if (goingleftkeydown) {
            aktiveblock.move(map, "left");
            goingleftkeydown = false;
        }
    }
    if (rotaterightkeydown) {
        aktiveblock.rotate(map, "right");
        rotaterightkeydown = false;
    } else if (rotateleftkeydown) {
        aktiveblock.rotate(map, "left");
        rotateleftkeydown = false;
    }
    drawfield();

    if (playing) {
        window.requestAnimationFrame(gameloop);

    }
}

function spawnrandomblock() {
    var randomshapenumber = Math.floor(Math.random() * 7)
    var succesfull;
    succesfull = true;

    var newshape;

    if (randomshapenumber == 0) {
        newshape = new ShapeL(0, 0)
    } else if (randomshapenumber == 1) {
        newshape = new ShapeLmirrored(0, 0)
    } else if (randomshapenumber == 2) {
        newshape = new ShapeZ(0, 0)
    } else if (randomshapenumber == 3) {
        newshape = new ShapeZmirrored(0, 0)
    } else if (randomshapenumber == 4) {
        newshape = new ShapeT(0, 0)
    } else if (randomshapenumber == 5) {
        newshape = new ShapeI(0, 0)
    } else if (randomshapenumber == 6) {
        newshape = new Shapeblock(0, 0)
    }

    var posx = Math.floor(Math.random() * (mapsizex - newshape.sizex + 1));
    var posy = 20 - newshape.sizey;

    newshape.moveto(posx, posy);
    if (newshape.drawtoarray(map) == -1) {
        playing = false;
    }
    return newshape;
}

function checkforrow() {
    var rowfull;
    do {
        for (let y = 0; y < 20; y++) {
            rowfull = true;
            for (let x = 0; x < mapsizex; x++) {
                if (map[x][y] == "") {
                    rowfull = false;
                }
            }
            if (rowfull) {
                score += 100;
                for (let y2 = y; y2 < 20; y2++) {
                    for (let x2 = 0; x2 < mapsizex; x2++) {
                        map[x2][y2] = map[x2][y2 + 1];
                    }
                }
            }
        }
    } while (rowfull)

}


function drawfield() {
    var maxX = 10;
    var maxY = 20;
    document.getElementById("gamefield").innerHTML = "";
    var newmap = "";
    for (var y = maxY - 1; y >= 0; y--) {
        for (var x = 0; x < maxX; x++) {
            var idstring = "feld" + x + "," + y;
            newmap = newmap + '<div class="onefield' + " " + map[x][y] + ' " id=' + idstring + ' onclick="geklickt(' + x + "," + y + ');"></div>';
            //document.getElementById("gamefield").innerHTML = document.getElementById("gamefield").innerHTML + '<div class="onefield' + " " + map[x][y] + ' " id=' + idstring + ' onclick="geklickt(' + x + "," + y + ');"></div>';
        }
    }
    document.getElementById("gamefield").innerHTML = newmap;
    document.getElementById("score").innerHTML = "score:" + score;

}



function tasterunter(e) {
    if (e.key == "d") {
        goingrightkeydown = true;
    } else if (e.key == "a") {
        goingleftkeydown = true;
    } else if (e.key == "e") {
        rotaterightkeydown = true;
    } else if (e.key == "q") {
        rotateleftkeydown = true;
    }
}