// _______________
// |  |  |  |  |  |
// |==============|
// |  |  |  |  |  |
// |==============|
// |  |  |  |  |  |
// |==============|
// |  |  |  |  |  |
// |==============|
// |__|__|__|__|__|
// Build a rotating matrix

describe('#Matrix', function () {
    var matrix;
    beforeEach(function () {
        matrix = new Matrix(5, 5);
    });
    it('should init matrix with mock data', function () {
        expect(matrix.traverseXF()).toContain('|0:0|1:0|2:0|3:0|4:0|\n' +
            '|0:1|1:1|2:1|3:1|4:1|\n' +
            '|0:2|1:2|2:2|3:2|4:2|\n' +
            '|0:3|1:3|2:3|3:3|4:3|\n' +
            '|0:4|1:4|2:4|3:4|4:4|');
    });

    it('should be rotateable by 90 degrees clockwise', function () {
        matrix.rotateClockwise();
        expect(matrix.traverseXF()).toContain('|0:4|0:3|0:2|0:1|0:0|\n' +
            '|1:4|1:3|1:2|1:1|1:0|\n' +
            '|2:4|2:3|2:2|2:1|2:0|\n' +
            '|3:4|3:3|3:2|3:1|3:0|\n' +
            '|4:4|4:3|4:2|4:1|4:0|');
    });
    it('should be rotateable by 180 degrees clockwise', function () {
        matrix.rotateClockwise();
        matrix.rotateClockwise();
        expect(matrix.traverseXF()).toContain('|4:4|3:4|2:4|1:4|0:4|\n' +
            '|4:3|3:3|2:3|1:3|0:3|\n' +
            '|4:2|3:2|2:2|1:2|0:2|\n' +
            '|4:1|3:1|2:1|1:1|0:1|\n' +
            '|4:0|3:0|2:0|1:0|0:0|');
    });
    it('should be rotateable by 270 degrees clockwise', function () {
        matrix.rotateClockwise();
        matrix.rotateClockwise();
        matrix.rotateClockwise();
        expect(matrix.traverseXF()).toContain('|4:0|4:1|4:2|4:3|4:4|\n' +
            '|3:0|3:1|3:2|3:3|3:4|\n' +
            '|2:0|2:1|2:2|2:3|2:4|\n' +
            '|1:0|1:1|1:2|1:3|1:4|\n' +
            '|0:0|0:1|0:2|0:3|0:4|');
    });
    describe('#rotateAndTransform', function () {
        it('should permanently rotate positional elements', function () {
            matrix = new Matrix(3, 3);
            expect(matrix.rotateAndTransform(90).traverseXF()).toContain('|0:2|0:1|0:0|\n'+
                                                                         '|1:2|1:1|1:0|\n'+
                                                                         '|2:2|2:1|2:0|');
        })
    });
});


function MatrixNode(data) {
    this.data = data;
}

MatrixNode.prototype.isTopRight = function () {
    return !this.right && !this.up;
}
MatrixNode.prototype.isTopLeft = function () {
    return !this.left && !this.up;
}
MatrixNode.prototype.isBottomRight = function () {
    return !this.right && !this.down;
}
MatrixNode.prototype.isBottomLeft = function () {
    return !this.left && !this.down;
}

Matrix.prototype.rotateClockwise = function () {
    this._rotation = (this._rotation + 90) % 360;
}

var traverseMap = {
    0: {
        up: 'up',
        right: 'right',
        down: 'down',
        left: 'left',
        root: 'topleft'
    },
    90: {
        up: 'left',
        right: 'up',
        down: 'right',
        left: 'down',
        root: 'bottomleft'
    },
    180: {
        up: 'down',
        right: 'left',
        down: 'up',
        left: 'right',
        root: 'bottomright'
    },
    270: {
        up: 'right',
        right: 'down',
        down: 'left',
        left: 'up',
        root: 'topright'
    }
}

Matrix.prototype.traverseXF = function traverseXF() {
    var that = this;
    debugger;
    var traverseProps = traverseMap[that._rotation];
    var rootNode = that[traverseProps.root];
    var printer = '';
    (function traverseY(yNode) {
        printer += '|';
        (function traverseX(xNode) {
            printer += xNode.data + '|';
            var nextXNode = xNode[traverseProps.right];
            return nextXNode ? traverseX(nextXNode) : xNode;
        })(yNode);
        printer += '\n';
        var nextYNode = yNode[traverseProps.down];
        return nextYNode ? traverseY(nextYNode) : yNode;
    })(that[traverseProps.root]);
    return printer;
}
Matrix.prototype.rotateAndTransform = function (rotation) {
    this._rotation = rotation;
    var that = this;
    var traverseProps = traverseMap[that._rotation];
    var rootNode = that[traverseProps.root];
    (function traverseY(yNode) {
        (function traverseX(xNode) {
            var newRight = xNode[traverseProps.right];
            var newLeft = xNode[traverseProps.left];
            var newDown = xNode[traverseProps.down];
            var newUp = xNode[traverseProps.up];
            xNode.right = newRight;
            xNode.left = newLeft;
            xNode.down = newDown;
            xNode.up = newUp;
            if (xNode.isBottomLeft()) {
                console.info('bl',xNode.data)
                that.bottomleft = xNode;
            } else if (xNode.isBottomRight()) {
                that.bottomright = xNode;
                console.info('br',xNode.data)
            } else if (xNode.isTopLeft()) {
                console.info('tl',xNode.data)
                that.topleft = xNode;
            } else if (xNode.isTopRight()) {
                console.info('tr',xNode.data)
                that.topright = xNode;
            }
            debugger;
            if (xNode.right){
                return traverseX(xNode.right)
            }
            return xNode;
        })(yNode);
        //point refs have been updated
        var nextYNode = yNode.down;
        return nextYNode ? traverseY(nextYNode) : yNode;
    })(that[traverseProps.root]);
    this._rotation = 0;
    return this;
};

function Matrix(xLength, yLength) {
    this._rotation = 0;
    var y = 0;
    var that = this;
    (function createNextVerticalNode(previousVNode) {
        var x = 0;
        var newVNode = new MatrixNode(x + ':' + y);
        newVNode.up = previousVNode;
        if (previousVNode) {
            previousVNode.down = newVNode;
            newVNode._root = previousVNode._root;
        }
        var lastXNode = (function createNextHorizontalNode(previousXNode) {
            x++; // first time this is called with an existing node so it can start at 1
            var newXNode = new MatrixNode(x + ':' + y);
            newXNode.left = previousXNode;
            newXNode.up = newXNode.left && newXNode.left.up && newXNode.left.up.right;
            if (newXNode.up) newXNode.up.down = newXNode;
            previousXNode.right = newXNode;
            return x < xLength - 1 ? createNextHorizontalNode(newXNode) : newXNode;
        })(newVNode);
        y++;
        if (y < yLength) {
            if (y === 1) {
                that.topleft = newVNode;
                that.topright = lastXNode;
            }
            createNextVerticalNode(newVNode)
        } else {
            that.bottomright = lastXNode;
            that.bottomleft = newVNode
            return newVNode;
        }
    })(this._root);
}
var matrix = new Matrix(5, 5);
matrix.traverseXF();
matrix.rotateClockwise();
matrix.traverseXF();
matrix.rotateClockwise();
matrix.traverseXF();
matrix.rotateClockwise();
matrix.traverseXF();
matrix.rotateClockwise();
matrix.traverseXF();