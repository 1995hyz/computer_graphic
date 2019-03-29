"use strict";

var canvas;
var gl;

var NumVertices  = 9 * 36;

var points = [];
var colors = [];

var colors2 = [];

var points2 = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;
var modelViewMatrixLoc;
var ctm;
var R;
var ctm2;

var angle = 0;
var test = vec2();

var edgeLength = 0.2;
var vertices = [
    //1
    vec4( -edgeLength/2-edgeLength, -edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2-edgeLength,  edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength,  edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength, -edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    //2
    vec4( -edgeLength/2, -edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    //3
    vec4( -edgeLength/2+edgeLength, -edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2+edgeLength,  edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength,  edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength, -edgeLength/2-edgeLength,  edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2+edgeLength, -edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4( -edgeLength/2+edgeLength,  edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength,  edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength, -edgeLength/2-edgeLength, -edgeLength/2+edgeLength, 1.0 ),
    //4
    vec4( -edgeLength/2-edgeLength, -edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength,  edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength,  edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength, -edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    //5
    vec4( -edgeLength/2, -edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    //6
    vec4( -edgeLength/2+edgeLength, -edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength,  edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength,  edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength, -edgeLength/2-edgeLength,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength, -edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength,  edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength,  edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength, -edgeLength/2-edgeLength, -edgeLength/2, 1.0 ),
    //7
    vec4( -edgeLength/2-edgeLength, -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2-edgeLength,  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength,  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength, -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    //8
    vec4( -edgeLength/2, -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    //9
    vec4( -edgeLength/2+edgeLength, -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2+edgeLength,  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength,  edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength, -edgeLength/2-edgeLength,  edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2+edgeLength, -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4( -edgeLength/2+edgeLength,  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength,  edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 ),
    vec4(  edgeLength/2+edgeLength, -edgeLength/2-edgeLength, -edgeLength/2-edgeLength, 1.0 )
];

const black = [ 0.0, 0.0, 0.0, 1.0 ];
const red = [ 1.0, 0.0, 0.0, 1.0 ];
const yellow = [ 1.0, 1.0, 0.0, 1.0 ];
const green = [ 0.0, 1.0, 0.0, 1.0 ];
const blue = [ 0.0, 0.0, 1.0, 1.0 ];
const magenta = [ 1.0, 0.0, 1.0, 1.0 ];
const cyan = [ 0.0, 1.0, 1.0, 1.0 ];
const white = [ 1.0, 1.0, 1.0, 1.0 ];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    render();
}

function colorCube()
{
    /*for(var i=0; i<9; i++) {
        var offset = i * 8;
        quad(1+offset, 0+offset, 3+offset, 2+offset);
        quad(2+offset, 3+offset, 7+offset, 6+offset);
        quad(3+offset, 0+offset, 4+offset, 7+offset);
        quad(6+offset, 5+offset, 1+offset, 2+offset);
        quad(4+offset, 5+offset, 6+offset, 7+offset);
        quad(5+offset, 4+offset, 0+offset, 1+offset);
    }*/
    createCubeColor();
}

function quad(a, b, c, d)
{
    const vertexColors = [
        black,
        red,
        yellow,
        green,
        blue,
        magenta,
        cyan,
        white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        //colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a%8]);

    }
}

function rectangleDrawer(a, b, c, d, color) {
    var indices = [a, b, c, a, c, d];
    for( var i = 0; i < 6; i++) {
        points.push(vertices[indices[i]]);
        colors.push((color));
    }
}

function createCubeColor() {
    //1
    var i = 0;
    rectangleDrawer(1, 0, 3, 2, green);
    rectangleDrawer(2, 3, 7, 6, red);
    rectangleDrawer(3, 0, 4, 7, yellow);
    rectangleDrawer(6, 5, 1, 2, black);
    rectangleDrawer(4, 5, 6, 7, black);
    rectangleDrawer(5, 4, 0, 1, magenta);
    //2
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, black);
    //3
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, black);
    //4
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, magenta);
    //5
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, black);
    //6
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, black);
    //7
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, magenta);
    //8
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, black);
    //9
    i += 8;
    rectangleDrawer(1+i, 0+i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, 0+i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, 0+i, 1+i, magenta);
}

function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    //angle += 1;
    ctm = mat4();
    ctm = mult(ctm, rotateX(theta[xAxis]));
    ctm = mult(ctm, rotateY(theta[yAxis]));
    ctm = mult(ctm, rotateZ(theta[zAxis]));

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm));

    console.log(points);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}
