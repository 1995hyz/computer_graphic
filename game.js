"use strict";

var canvas;
var gl;
const block_length = 200;
const block_width = 160;
const block_height = 40;
const gap = 50;
var program;
var points = [];
var colors = [];
var normals = [];
var textures = [];
var NumVertices = 36*4;
var NumCubes = 8;
var numLanePanels = 7;
const z_near = 1;
const z_far = 100;
var vertices = [
    vec4( -gap/2-block_length-(block_length+gap),    -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length-(block_length+gap),    block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length-(block_length+gap),    -block_height/2,    -block_width/2, 1.0 ),
    vec4( -gap/2-block_length-(block_length+gap),    block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 -block_height/2,    -block_width/2, 1.0 ),

    vec4( -gap/2-block_length,   -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length,   block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2,                block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2,                -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length,   -block_height/2,    -block_width/2, 1.0 ),
    vec4( -gap/2-block_length,   block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2,                block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2,                -block_height/2,    -block_width/2, 1.0 ),

    vec4(  gap/2,               -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2,               block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2,               -block_height/2,    -block_width/2, 1.0 ),
    vec4(  gap/2,               block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  -block_height/2,    -block_width/2, 1.0 ),

    vec4(  gap/2+(block_length+gap),               -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2+(block_length+gap),               block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2+(block_length+gap),               -block_height/2,    -block_width/2, 1.0 ),
    vec4(  gap/2+(block_length+gap),               block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  -block_height/2,    -block_width/2, 1.0 ),

    vec4( -gap/2-block_length-(block_length+gap),    -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length-(block_length+gap),    block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length-(block_length+gap),    -block_height/2,    -block_width/2, 1.0 ),
    vec4( -gap/2-block_length-(block_length+gap),    block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2-(block_length+gap),                 -block_height/2,    -block_width/2, 1.0 ),

    vec4( -gap/2-block_length,   -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length,   block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2,                block_height/2,     block_width/2, 1.0 ),
    vec4( -gap/2,                -block_height/2,    block_width/2, 1.0 ),
    vec4( -gap/2-block_length,   -block_height/2,    -block_width/2, 1.0 ),
    vec4( -gap/2-block_length,   block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2,                block_height/2,     -block_width/2, 1.0 ),
    vec4( -gap/2,                -block_height/2,    -block_width/2, 1.0 ),

    vec4(  gap/2,               -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2,               block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2,               -block_height/2,    -block_width/2, 1.0 ),
    vec4(  gap/2,               block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length,  -block_height/2,    -block_width/2, 1.0 ),

    vec4(  gap/2+(block_length+gap),               -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2+(block_length+gap),               block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  block_height/2,     block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  -block_height/2,    block_width/2, 1.0 ),
    vec4(  gap/2+(block_length+gap),               -block_height/2,    -block_width/2, 1.0 ),
    vec4(  gap/2+(block_length+gap),               block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  block_height/2,     -block_width/2, 1.0 ),
    vec4(  gap/2+block_length+(block_length+gap),  -block_height/2,    -block_width/2, 1.0 )
];

var verticesLane = [
    vec4( -gap/2-300,      -block_height/2+block_height*30,    -z_far*60,       1.0 ),
    vec4( -gap/2+70,       -block_height/2+block_height*30,    -z_far*60,       1.0 ),
    vec4( -gap/2+300,      -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2-1900,     -block_height/2+block_height*30,    block_width*30, 1.0 ),

    vec4(-gap/2-600,      -block_height/2+block_height*30,    -z_far*60, 1.0 ),
    vec4(-gap/2-300,      -block_height/2+block_height*30,    -z_far*60, 1.0 ),
    vec4(-gap/2-1900,     -block_height/2+block_height*30,    block_width*30,  1.0),
    vec4(-gap/2-4000,     -block_height/2+block_height*30,    block_width*30,  1.0),

    vec4( -gap/2+70,      -block_height/2+block_height*30,    -z_far*60,       1.0 ),
    vec4( -gap/2+440,     -block_height/2+block_height*30,    -z_far*60,       1.0 ),
    vec4( -gap/2+2500,    -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2+300,     -block_height/2+block_height*30,    block_width*30, 1.0 ),

    vec4( -gap/2+440,     -block_height/2+block_height*30,    -z_far*60,       1.0 ),
    vec4( -gap/2+810,     -block_height/2+block_height*30,    -z_far*60,       1.0 ),
    vec4( -gap/2+4800,    -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2+2500,    -block_height/2+block_height*30,    block_width*30, 1.0 ),

    // Blue 1
    vec4( -gap/2+300,      -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2-1900,     -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2-2300,     -block_height/2+block_height*30,    block_width*50, 1.0 ),
    vec4( -gap/2+400,      -block_height/2+block_height*30,    block_width*50, 1.0 ),

    // Blue 2
    vec4( -gap/2-1900,     -block_height/2+block_height*30,    block_width*30,  1.0),
    vec4( -gap/2-4000,     -block_height/2+block_height*30,    block_width*30,  1.0),
    vec4( -gap/2-5000,     -block_height/2+block_height*30,    block_width*50, 1.0 ),
    vec4( -gap/2-2300,      -block_height/2+block_height*30,    block_width*50, 1.0 ),

    // Blue 3
    vec4( -gap/2+2500,    -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2+300,     -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2+400,     -block_height/2+block_height*30,    block_width*50, 1.0 ),
    vec4( -gap/2+3100,      -block_height/2+block_height*30,    block_width*50, 1.0 ),

    // Blue 4
    vec4( -gap/2+4800,    -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2+2500,    -block_height/2+block_height*30,    block_width*30, 1.0 ),
    vec4( -gap/2+3100,     -block_height/2+block_height*30,    block_width*50, 1.0 ),
    vec4( -gap/2+6100,      -block_height/2+block_height*30,    block_width*50, 1.0 )

];

var texCoord = [
vec2(0.0, 0.0),
vec2(0.0, 1.0),
vec2(1.0, 1.0),
vec2(1.0, 0.0)
];

var lightPosition = vec4(1.0, 1.0, 1.0, 1.0);
var lightAmbient = vec4(0.5, 0.5, 0.5, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 1.0, 1.0);
var materialSpecular = vec4( 1.0, 0.8, 1.0, 1.0 );
var materialShininess = 1.0;
var ambientColor, diffuseColor, specularColor;

var uViewMatrixLoc;
var uViewMatrix;
var theta = [20, 0, 0];
var cubeTranslateLoc;
var cubeTranslate;
const x_init = 1.1;
const y_init = -2;
const z_init = -50;
var x_trans, y_trans, z_trans;
var cubeTransIndex = [
    vec3(x_init, y_init, z_init),
    vec3(x_init, y_init, z_init),
    vec3(x_init, y_init, z_init),
    vec3(x_init, y_init, z_init),
    vec3(x_init, y_init, z_init),
    vec3(x_init, y_init, z_init),
    vec3(x_init, y_init, z_init),
    vec3(x_init, y_init, z_init)
];
const dropSequence = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1];
const musicSequence = ["D", "D", "A", "A", "B", "B", "A", "G", "G", "F", "F", "E", "E", "D"];
var perspectiveLoc;
var perspectiveMatrix;
var orthoMatrixLoc;
var orthoMatrix;

var eye;
var radius = 5.0;
const at = vec3(0.0, 2.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);
eye = vec3(radius*Math.sin(0)*Math.cos(0),
radius*Math.sin(0)*Math.sin(0), radius*Math.cos(0));

var left = 0;
var right;
var bottom;
var top;
var near = 400;
var far = -400;

const black = [ 0.0, 0.0, 0.0, 1.0 ];
const red = [ 1.0, 0.0, 0.0, 1.0 ];
const yellow = [ 1.0, 1.0, 0.0, 1.0 ];
const green = [ 0.0, 1.0, 0.0, 1.0 ];
const blue = [ 0.0, 0.0, 1.0, 1.0 ];
const magenta = [ 1.0, 0.5, 0.0, 1.0 ];
const white = [1.0, 1.0, 1.0, 1.0 ];

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    gl.enable(gl.DEPTH_TEST);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //initLanePos(numLanePanels);
    init_block();

    right = gl.canvas.clientWidth;
    bottom = gl.canvas.clientHeight;

    // Binding Color Buffer
    let cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    let vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    loadImage();

    // Binding Texture Buffer
    let tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(textures), gl.STATIC_DRAW);
    let texcoordLoc = gl.getAttribLocation(program, "atexcoord");
    gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texcoordLoc);

    // Binding Normal Buffer
    let nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
    let vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    // Binding Vertex-Coordinate Buffer
    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    let vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Perspective Matrix and Orthogonal-Projection Matrix Setup
    uViewMatrixLoc = gl.getUniformLocation(program, "u_matrix");
    cubeTranslateLoc = gl.getUniformLocation(program, "trans_matrix");
    perspectiveLoc = gl.getUniformLocation(program, "perspective_matrix");
    orthoMatrixLoc = gl.getUniformLocation(program, "ortho_matrix");

    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    perspectiveMatrix = mat4();
    perspectiveMatrix = perspective(40, aspect, z_near, z_far);

    orthoMatrix = ortho(left, right, bottom, 0, near, far);

    x_trans = 0;
    y_trans = -2;
    z_trans = -50;

    // Lighting Setup
    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
        flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
        flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
        flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
        flatten(lightPosition) );
    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"),materialShininess);

    // Keyboard Setup
    document.addEventListener("keydown", keyDownHandler, false);

    render();
};

function init_block(){
    let i;
    rectangleDrawer(1, 0, 3, 2, white);
    rectangleDrawer(2, 3, 7, 6, white);
    rectangleDrawer(3, 0, 4, 7, white);
    rectangleDrawer(6, 5, 1, 2, white);
    rectangleDrawer(4, 5, 6, 7, white);
    rectangleDrawer(5, 4, 0, 1, white);

    i = 1;
    rectangleDrawer(1+i*8, 0+i*8, 3+i*8, 2+i*8, white);
    rectangleDrawer(2+i*8, 3+i*8, 7+i*8, 6+i*8, white);
    rectangleDrawer(3+i*8, 0+i*8, 4+i*8, 7+i*8, white);
    rectangleDrawer(6+i*8, 5+i*8, 1+i*8, 2+i*8, white);
    rectangleDrawer(4+i*8, 5+i*8, 6+i*8, 7+i*8, white);
    rectangleDrawer(5+i*8, 4+i*8, 0+i*8, 1+i*8, white);

    i = 2;
    rectangleDrawer(1+i*8, 0+i*8, 3+i*8, 2+i*8, white);
    rectangleDrawer(2+i*8, 3+i*8, 7+i*8, 6+i*8, white);
    rectangleDrawer(3+i*8, 0+i*8, 4+i*8, 7+i*8, white);
    rectangleDrawer(6+i*8, 5+i*8, 1+i*8, 2+i*8, white);
    rectangleDrawer(4+i*8, 5+i*8, 6+i*8, 7+i*8, white);
    rectangleDrawer(5+i*8, 4+i*8, 0+i*8, 1+i*8, white);

    i = 3;
    rectangleDrawer(1+i*8, 0+i*8, 3+i*8, 2+i*8, white);
    rectangleDrawer(2+i*8, 3+i*8, 7+i*8, 6+i*8, white);
    rectangleDrawer(3+i*8, 0+i*8, 4+i*8, 7+i*8, white);
    rectangleDrawer(6+i*8, 5+i*8, 1+i*8, 2+i*8, white);
    rectangleDrawer(4+i*8, 5+i*8, 6+i*8, 7+i*8, white);
    rectangleDrawer(5+i*8, 4+i*8, 0+i*8, 1+i*8, white);

    i = 4;
    rectangleDrawer(1+i*8, 0+i*8, 3+i*8, 2+i*8, white);
    rectangleDrawer(2+i*8, 3+i*8, 7+i*8, 6+i*8, white);
    rectangleDrawer(3+i*8, 0+i*8, 4+i*8, 7+i*8, white);
    rectangleDrawer(6+i*8, 5+i*8, 1+i*8, 2+i*8, white);
    rectangleDrawer(4+i*8, 5+i*8, 6+i*8, 7+i*8, white);
    rectangleDrawer(5+i*8, 4+i*8, 0+i*8, 1+i*8, white);

    i = 5;
    rectangleDrawer(1+i*8, 0+i*8, 3+i*8, 2+i*8, white);
    rectangleDrawer(2+i*8, 3+i*8, 7+i*8, 6+i*8, white);
    rectangleDrawer(3+i*8, 0+i*8, 4+i*8, 7+i*8, white);
    rectangleDrawer(6+i*8, 5+i*8, 1+i*8, 2+i*8, white);
    rectangleDrawer(4+i*8, 5+i*8, 6+i*8, 7+i*8, white);
    rectangleDrawer(5+i*8, 4+i*8, 0+i*8, 1+i*8, white);

    i = 6;
    rectangleDrawer(1+i*8, 0+i*8, 3+i*8, 2+i*8, white);
    rectangleDrawer(2+i*8, 3+i*8, 7+i*8, 6+i*8, white);
    rectangleDrawer(3+i*8, 0+i*8, 4+i*8, 7+i*8, white);
    rectangleDrawer(6+i*8, 5+i*8, 1+i*8, 2+i*8, white);
    rectangleDrawer(4+i*8, 5+i*8, 6+i*8, 7+i*8, white);
    rectangleDrawer(5+i*8, 4+i*8, 0+i*8, 1+i*8, white);

    i = 7;
    rectangleDrawer(1+i*8, 0+i*8, 3+i*8, 2+i*8, white);
    rectangleDrawer(2+i*8, 3+i*8, 7+i*8, 6+i*8, white);
    rectangleDrawer(3+i*8, 0+i*8, 4+i*8, 7+i*8, white);
    rectangleDrawer(6+i*8, 5+i*8, 1+i*8, 2+i*8, white);
    rectangleDrawer(4+i*8, 5+i*8, 6+i*8, 7+i*8, white);
    rectangleDrawer(5+i*8, 4+i*8, 0+i*8, 1+i*8, white);

    textureDrawer(3, 2, renderSeq);
    laneDrawer(1, 0, 3, 2, green);
    let j = 1;
    laneDrawer(1+j*4, 0+j*4, 3+j*4, 2+j*4, red);
    j = 2;
    laneDrawer(1+j*4, 0+j*4, 3+j*4, 2+j*4, red);
    j = 3;
    laneDrawer(1+j*4, 0+j*4, 3+j*4, 2+j*4, green);
    j = 4;
    laneDrawer(1+j*4, 0+j*4, 3+j*4, 2+j*4, blue);
    j = 5;
    laneDrawer(1+j*4, 0+j*4, 3+j*4, 2+j*4, blue);
    j = 6;
    laneDrawer(1+j*4, 0+j*4, 3+j*4, 2+j*4, blue);
    j = 7;
    laneDrawer(1+j*4, 0+j*4, 3+j*4, 2+j*4, blue);
}

function rectangleDrawer(a, b, c, d, color) {
    let indices = [a, b, c, a, c, d];
    for( let i = 0; i < 6; i++) {
        points.push(vertices[indices[i]]);
        colors.push((color));
        normals.push(vec3(0,1,0));
    }
}

var renderSeq = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(0, 2),
    vec2(1, 0),
    vec2(0, 0),
    vec2(0, 1),
    vec2(0, 2),
    vec2(1, 0)
];

function textureDrawer(rowLength, columnLength, renderSeq) {
    for(let i = 0; i<renderSeq.length; i++) {
        for(let j = 0; j<6; j++) {
            textures.push(vec2(1.0 / rowLength * renderSeq[i][0], 1.0 / columnLength * renderSeq[i][1]));
            textures.push(vec2(1.0 / rowLength * renderSeq[i][0], 1.0 / columnLength * (renderSeq[i][1] + 1)));
            textures.push(vec2(1.0 / rowLength * (renderSeq[i][0] + 1), 1.0 / columnLength * (renderSeq[i][1] + 1)));
            textures.push(vec2(1.0 / rowLength * renderSeq[i][0], 1.0 / columnLength * renderSeq[i][1]));
            textures.push(vec2(1.0 / rowLength * (renderSeq[i][0] + 1), 1.0 / columnLength * (renderSeq[i][1] + 1)));
            textures.push(vec2(1.0 / rowLength * (renderSeq[i][0] + 1), 1.0 / columnLength * renderSeq[i][1]));
        }
    }
}

function laneDrawer(a, b, c, d, color) {
    let indices = [a, b, c, a, c, d];
    for( let i = 0; i < 6; i++) {
        points.push(verticesLane[indices[i]]);
        colors.push((color));
    }
    textures.push(vec2(0, 0));
    textures.push(vec2(0, 0));
    textures.push(vec2(0, 0));
    textures.push(vec2(0, 0));
    textures.push(vec2(0, 0));
    textures.push(vec2(0, 0));
    normals.push(vec3(0,1,0));
    normals.push(vec3(0,1,0));
    normals.push(vec3(0,1,0));
    normals.push(vec3(0,1,0));
    normals.push(vec3(0,1,0));
    normals.push(vec3(0,1,0));
}

function loadImage() {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]));
    var image1 = new Image();
    image1.src = "./textures/colorful_1_768x512.jpg";
    image1.addEventListener('load', function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image1);
        if (isPowerOf2(image1.width) && isPowerOf2(image1.height)) {
            // If the texture file is a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    });
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

function slide(x, y, z) {
    return translate(x, y, z);
}

function keyDownHandler(event) {
    switch (event.key) {
        case "ArrowUp":
            theta[0] = (theta[0] - 2.0) % 360;
            break;
        case "ArrowDown":
            theta[0] = (theta[0] + 2.0) % 360;
            break;
        case "ArrowLeft":
            theta[2] = (theta[2] + 2.0) % 360;
            break;
        case "ArrowRight":
            theta[2] = (theta[2] - 2.0) % 360;
            break;
        case ",":
            theta[1] = (theta[1] - 2.0) % 360;
            break;
        case ".":
            theta[1] = (theta[1] + 2.0) % 360;
            break;
        case "s":
            //playSound("C1vH");
            hitCube("s");
            break;
        case "d":
            hitCube("d");
            break;
        case "j":
            hitCube("j");
            break;
        case "k":
            hitCube("k");
            break;
        default:
            console.log("Unknown Key Pressed");
    }
}

function initCubePos(index) {
    cubeTransIndex[index] = vec3(x_init, y_init, z_init);
}

function initLanePos(num) {
    for(let i=0; i<num; i++) {
        verticesLane.push(vec4( -gap/2-block_length, -block_height/2, -block_width/2+block_width*i, 1.0 ));
        verticesLane.push(vec4( -gap/2, -block_height/2, -block_width/2+block_width*i, 1.0 ));
        verticesLane.push(vec4( -gap/2, -block_height/2, block_width/2+block_width*i, 1.0 ));
        verticesLane.push(vec4( -gap/2-block_length, -block_height/2, block_width/2+block_width*i, 1.0 ));
    }
}

var dropCounter = 0;
var dropHeap = [];
var indexCounter = 0;
var cubeFlag = [0, 0, 0, 0, 0, 0, 0, 0];
function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    uViewMatrix = mat4();
    uViewMatrix = mult(uViewMatrix, rotateX(theta[0]));
    uViewMatrix = mult(uViewMatrix, rotateY(theta[1]));
    uViewMatrix = mult(uViewMatrix, rotateZ(theta[2]));

    for(let k = 0; k<cubeFlag.length; k++) {
        if(cubeFlag[k] !== 0) {
            if (cubeTransIndex[k][2] > -10) {
                cubeTransIndex[k][2] += 0.05;
            } else {
                cubeTransIndex[k][2] += 0.2;
            }
            if (cubeTransIndex[k][2] > 0) {
                cubeFlag[k] = 0;
                initCubePos(k);
            }
        }
    }

    gl.uniformMatrix4fv(uViewMatrixLoc, false, flatten(uViewMatrix));
    //gl.uniformMatrix4fv(cubeTranslateLoc, false, flatten(cubeTranslate));
    gl.uniformMatrix4fv(perspectiveLoc, false, flatten(perspectiveMatrix));
    gl.uniformMatrix4fv(orthoMatrixLoc, false, flatten(orthoMatrix));

    for(let i=0; i<NumCubes; i++) {
        cubeTranslate = slide(cubeTransIndex[i][0], cubeTransIndex[i][1], cubeTransIndex[i][2]);
        gl.uniformMatrix4fv(cubeTranslateLoc, false, flatten(cubeTranslate));
        gl.drawArrays(gl.TRIANGLES, i*36, 36);
    }
    cubeTranslate = slide(x_init, y_init, z_init);//slide(x_init, y_init-0.2, z_init+45);
    gl.uniformMatrix4fv(cubeTranslateLoc, false, flatten(cubeTranslate));
    gl.drawArrays(gl.TRIANGLES, NumCubes*36, 6*numLanePanels);
    gl.drawArrays(gl.TRIANGLES, NumCubes*36+6*numLanePanels, 6);

    dropCounter = dropCounter + 1;
    if(indexCounter < dropSequence.length) {
        if (dropCounter === 180) {
            dropCounter = 0;
            if (dropSequence[indexCounter] !== -1) {
                //initCubePos(dropSequence[indexCounter]);
                cubeFlag[dropSequence[indexCounter]] = 1;
                dropHeap.push(indexCounter);
                //console.log(cubeFlag);
            } else {

            }
            indexCounter = (indexCounter + 1);// % 4;
        }
    }
    requestAnimFrame( render );
}

function hitCube(keyStroke) {
    let cubeIndex = 0;
    switch (keyStroke) {
        case 's':
            cubeIndex = 0;
            break;
        case 'd':
            cubeIndex = 1;
            break;
        case 'j':
            cubeIndex = 2;
            break;
        case 'k':
            cubeIndex = 3;
            break;
        default:
            console.log("Error: Unknown Key Stroke.");
    }
    if (0 > cubeTransIndex[cubeIndex][2] && cubeTransIndex[cubeIndex][2] > -5) {
        cubeFlag[cubeIndex] = 0;
        initCubePos(cubeIndex);
        let musicIndex = dropHeap.shift();
        console.log(musicIndex);
        playSound(musicSequence[musicIndex]);
    }
}

function playSound(tone) {
    let audio = new Audio("./samples/" + tone + "4vH.wav");
    audio.play();
}