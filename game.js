"use strict";

var canvas;
var gl;
var block_length = 1;
var block_width = 1;
var block_height = 1;
var gap = 0.1;
var program;
var points = [];
var colors = [];
var NumVertices = 36;
var vertices = [
    vec4( -block_length/2-block_length-gap, -block_height/2-block_height-gap,  block_width/2+block_width+gap, 1.0 ),
    vec4( -block_length/2-block_length-gap,  block_height/2-block_height-gap,  block_width/2+block_width+gap, 1.0 ),
    vec4(  block_length/2-block_length-gap,  block_height/2-block_height-gap,  block_width/2+block_width+gap, 1.0 ),
    vec4(  block_length/2-block_length-gap, -block_height/2-block_height-gap,  block_width/2+block_width+gap, 1.0 ),
    vec4( -block_length/2-block_length-gap, -block_height/2-block_height-gap, -block_width/2+block_width+gap, 1.0 ),
    vec4( -block_length/2-block_length-gap,  block_height/2-block_height-gap, -block_width/2+block_width+gap, 1.0 ),
    vec4(  block_length/2-block_length-gap,  block_height/2-block_height-gap, -block_width/2+block_width+gap, 1.0 ),
    vec4(  block_length/2-block_length-gap, -block_height/2-block_height-gap, -block_width/2+block_width+gap, 1.0 )
];
var uViewMatrixLoc;
var uViewMatrix;
var theta = [20, 10, 0];
var cubeTranslateLoc;
var cubeTranslate;
var x_trans, y_trans, z_trans;
var perspectiveLoc;
var perspectiveMatrix;

const black = [ 0.0, 0.0, 0.0, 1.0 ];
const red = [ 1.0, 0.0, 0.0, 1.0 ];
const yellow = [ 1.0, 1.0, 0.0, 1.0 ];
const green = [ 0.0, 1.0, 0.0, 1.0 ];
const blue = [ 0.0, 0.0, 1.0, 1.0 ];
const magenta = [ 1.0, 0.5, 0.0, 1.0 ];

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    init_block();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    uViewMatrixLoc = gl.getUniformLocation(program, "u_matrix");
    cubeTranslateLoc = gl.getUniformLocation(program, "trans_matrix");
    perspectiveLoc = gl.getUniformLocation(program, "perspective_matrix");

    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    perspectiveMatrix = mat4();
    perspectiveMatrix = perspective(45, aspect, 0.3, 3.0);

    x_trans = 1;
    y_trans = 1;
    z_trans = 0;

    render();
};

function init_block(){
    rectangleDrawer(1, 0, 3, 2, green);
    rectangleDrawer(2, 3, 7, 6, red);
    rectangleDrawer(3, 0, 4, 7, blue);
    rectangleDrawer(6, 5, 1, 2, yellow);
    rectangleDrawer(4, 5, 6, 7, black);
    rectangleDrawer(5, 4, 0, 1, magenta);
}

function rectangleDrawer(a, b, c, d, color) {
    let indices = [a, b, c, a, c, d];
    for( let i = 0; i < 6; i++) {
        points.push(vertices[indices[i]]);
        colors.push((color));
    }
}

function slide(x, y, z) {
    return translate(x, y, z);
}

function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    uViewMatrix = mat4();
    uViewMatrix = mult(uViewMatrix, rotateX(theta[0]));
    uViewMatrix = mult(uViewMatrix, rotateY(theta[1]));
    uViewMatrix = mult(uViewMatrix, rotateZ(theta[2]));

    y_trans = y_trans - 0.005;
    cubeTranslate = slide(x_trans, y_trans, z_trans);

    gl.uniformMatrix4fv(uViewMatrixLoc, false, flatten(uViewMatrix));
    gl.uniformMatrix4fv(cubeTranslateLoc, false, flatten(cubeTranslate));
    gl.uniformMatrix4fv(perspectiveLoc, false, flatten(perspectiveMatrix));
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    requestAnimFrame( render );
}