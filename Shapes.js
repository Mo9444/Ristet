//loops
//move checking for obstacles
//orientation
//

class BasicShape {
    constructor(positionx, positiony) {

        this.positionx = positionx;
        this.positiony = positiony;
        this.sizex;
        this.sizey;
        this.color;
        this.hitbox
    }

    moveto(posx, posy) {
        this.positionx = posx;
        this.positiony = posy;
    }

    rotate(map, direction) {
        this.removefromarray(map);
        this.trytorotate(map, direction);
        if (this.drawtoarray(map) == -1) {

            if (direction == "right") {
                this.trytorotate(map, "left");
            }
            if (direction == "left") {
                this.trytorotate(map, "right");
            }
            this.drawtoarray(map)
        }
    }

    trytorotate(map, direction) {
        if (direction == "right") {
            var newsizex = this.sizey;
            var newsizey = this.sizex;
            var newhitbox = new Array(this.sizex);

            var succesfull;


            for (var x = 0; x < newsizex; x++) {
                newhitbox[x] = new Array(this.sizey);
                for (var y = 0; y < newsizey; y++) {
                    newhitbox[x][y] = this.hitbox[newsizey - y - 1][x];
                }
            }
            this.sizex = newsizex;
            this.sizey = newsizey;
            this.hitbox = newhitbox;
        } else if (direction == "left") {
            var newsizex = this.sizey;
            var newsizey = this.sizex;
            var newhitbox = new Array(this.sizex);

            for (var x = 0; x < newsizex; x++) {
                newhitbox[x] = new Array(this.sizey);
                for (var y = 0; y < newsizey; y++) {
                    newhitbox[x][y] = this.hitbox[y][newsizex - x - 1];
                }
            }
            this.sizex = newsizex;
            this.sizey = newsizey;
            this.hitbox = newhitbox;
        }
    }

    drawtoarray(map) { //Methode drawt das Shape mit der farbe auf ein 2d Array wenn der platz leer ist, wenn nicht returnt sie -1
        var succesfull = true;
        for (var y = 0; y < this.sizey; y++) { //map.size
            for (var x = 0; x < this.sizex; x++) {
                if (this.hitbox[x][y]) {
                    if (x + this.positionx < 0 || x + this.positionx >= 10 || y + this.positiony < 0 || x + this.positiony >= 20 || map[x + this.positionx][y + this.positiony] != "") {
                        succesfull = false;
                    }
                }
            }
        }
        if (succesfull) {
            for (var y = 0; y < this.sizey; y++) { //map.size
                for (var x = 0; x < this.sizex; x++) {
                    if (this.hitbox[x][y]) {
                        map[x + this.positionx][y + this.positiony] = this.color;
                    }
                }
            }

            return map;

        } else {
            return -1;
        }

    }

    removefromarray(map) {
        for (var y = 0; y < this.sizey; y++) { //map.size
            for (var x = 0; x < this.sizex; x++) {
                if (this.hitbox[x][y]) {
                    map[x + this.positionx][y + this.positiony] = "";
                }
            }
        }
        return map;
    }

    move(map, direktion) {
        let oldpositionx = this.positionx;
        let oldpositiony = this.positiony;

        this.removefromarray(map);

        if (direktion == "down") {
            this.positiony--;
        } else if (direktion == "up") {
            this.positiony++;
        } else if (direktion == "left") {
            this.positionx--;
        } else if (direktion == "right") {
            this.positionx++;
        }

        if (this.drawtoarray(map) == -1) {
            this.positionx = oldpositionx;
            this.positiony = oldpositiony;
            this.drawtoarray(map);
            return -1;
        }
    }
}

class ShapeL extends BasicShape {
    constructor(positionx, positiony) {
        super(positionx, positiony);
        this.sizex = 2;
        this.sizey = 3;
        this.color = "orange";
        this.hitbox = new Array(this.sizex);
        for (var x = 0; x < this.sizex; x++) {
            this.hitbox[x] = new Array(this.sizey);
            for (var y = 0; y < this.sizey; y++) {
                this.hitbox[x][y] = false;
            }
        }
        this.hitbox[0][2] = true;
        this.hitbox[0][1] = true;
        this.hitbox[0][0] = true;
        this.hitbox[1][0] = true;

    }
}

class ShapeLmirrored extends BasicShape {
    constructor(positionx, positiony) {
        super(positionx, positiony);
        this.sizex = 2;
        this.sizey = 3;
        this.color = "darkblue";
        this.hitbox = new Array(this.sizex);
        for (var x = 0; x < this.sizex; x++) {
            this.hitbox[x] = new Array(this.sizey);
            for (var y = 0; y < this.sizey; y++) {
                this.hitbox[x][y] = false;
            }
        }
        this.hitbox[1][2] = true;
        this.hitbox[1][1] = true;
        this.hitbox[1][0] = true;
        this.hitbox[0][0] = true;

    }
}

class ShapeZ extends BasicShape {
    constructor(positionx, positiony) {
        super(positionx, positiony);
        this.sizex = 2;
        this.sizey = 3;
        this.color = "green";
        this.hitbox = new Array(this.sizex);
        for (var x = 0; x < this.sizex; x++) {
            this.hitbox[x] = new Array(this.sizey);
            for (var y = 0; y < this.sizey; y++) {
                this.hitbox[x][y] = false;
            }
        }
        this.hitbox[0][2] = true;
        this.hitbox[0][1] = true;
        this.hitbox[1][1] = true;
        this.hitbox[1][0] = true;

    }
}

class ShapeZmirrored extends BasicShape {
    constructor(positionx, positiony) {
        super(positionx, positiony);
        this.sizex = 2;
        this.sizey = 3;
        this.color = "red";
        this.hitbox = new Array(this.sizex);
        for (var x = 0; x < this.sizex; x++) {
            this.hitbox[x] = new Array(this.sizey);
            for (var y = 0; y < this.sizey; y++) {
                this.hitbox[x][y] = false;
            }
        }
        this.hitbox[1][2] = true;
        this.hitbox[1][1] = true;
        this.hitbox[0][1] = true;
        this.hitbox[0][0] = true;
    }
}

class ShapeT extends BasicShape {
    constructor(positionx, positiony) {
        super(positionx, positiony);
        this.sizex = 2;
        this.sizey = 3;
        this.color = "purple";
        this.hitbox = new Array(this.sizex);
        for (var x = 0; x < this.sizex; x++) {
            this.hitbox[x] = new Array(this.sizey);
            for (var y = 0; y < this.sizey; y++) {
                this.hitbox[x][y] = false;
            }
        }
        this.hitbox[0][0] = true;
        this.hitbox[0][1] = true;
        this.hitbox[0][2] = true;
        this.hitbox[1][1] = true;
    }

}

class ShapeI extends BasicShape {
    constructor(positionx, positiony) {
        super(positionx, positiony);
        this.sizex = 1;
        this.sizey = 4;
        this.color = "lightblue";
        this.hitbox = new Array(this.sizex);
        for (var x = 0; x < this.sizex; x++) {
            this.hitbox[x] = new Array(this.sizey);
            for (var y = 0; y < this.sizey; y++) {
                this.hitbox[x][y] = false;
            }
        }
        this.hitbox[0][0] = true;
        this.hitbox[0][1] = true;
        this.hitbox[0][2] = true;
        this.hitbox[0][3] = true;
    }
}

class Shapeblock extends BasicShape {
    constructor(positionx, positiony) {
        super(positionx, positiony);
        this.sizex = 2;
        this.sizey = 2;
        this.color = "yellow";
        this.hitbox = new Array(this.sizex);
        for (var x = 0; x < this.sizex; x++) {
            this.hitbox[x] = new Array(this.sizey);
            for (var y = 0; y < this.sizey; y++) {
                this.hitbox[x][y] = false;
            }
        }
        this.hitbox[0][0] = true;
        this.hitbox[0][1] = true;
        this.hitbox[1][0] = true;
        this.hitbox[1][1] = true;
    }
}