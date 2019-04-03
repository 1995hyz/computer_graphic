"use strict";

var canvas;
var gl;

var NumVertices  = 27 * 36;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;
var modelViewMatrixLoc;
var rotateDirectionLoc;
var ctm;

var tempPoints = [];

var faceFlag = 1;
var userRotateDirection = -1;
var rotateDirection = -1;

const edgeLength = 0.2;
const gap = 0.01;
var vertices = [
    //1
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    //2
    vec4( -edgeLength/2, -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    //3
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    //4
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    //5
    vec4( -edgeLength/2, -edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    //6
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, -edgeLength/2, 1.0 ),
    //7
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    //8
    vec4( -edgeLength/2, -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    //9
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    //10
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    //11
    vec4( -edgeLength/2, -edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    //12
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2, -edgeLength/2+edgeLength+gap, 1.0 ),
    //13
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2, -edgeLength/2, 1.0 ),
    //14
    vec4( -edgeLength/2, -edgeLength/2,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2, -edgeLength/2, 1.0 ),
    //15
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2, -edgeLength/2, 1.0 ),
    //16
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    //17
    vec4( -edgeLength/2, -edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    //18
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2, -edgeLength/2-edgeLength-gap, 1.0 ),
    //19
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    //20
    vec4( -edgeLength/2, -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    //21
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, 1.0 ),
    //22
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    //23
    vec4( -edgeLength/2, -edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    //24
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap,  edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, -edgeLength/2, 1.0 ),
    //25
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap,  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2-edgeLength-gap, -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    //26
    vec4( -edgeLength/2, -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2, -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2,  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2,  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2, -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    //27
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap,  edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4( -edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap,  edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 ),
    vec4(  edgeLength/2+edgeLength+gap, -edgeLength/2+edgeLength+gap, -edgeLength/2-edgeLength-gap, 1.0 )
];

var thetaArray = [];

const black = [ 0.0, 0.0, 0.0, 1.0 ];
const red = [ 1.0, 0.0, 0.0, 1.0 ];
const yellow = [ 1.0, 1.0, 0.0, 1.0 ];
const green = [ 0.0, 1.0, 0.0, 1.0 ];
const blue = [ 0.0, 0.0, 1.0, 1.0 ];
const magenta = [ 1.0, 0.0, 1.0, 1.0 ];
const cyan = [ 0.0, 1.0, 1.0, 1.0 ];
const white = [ 0.85, 0.85, 0.85, 1.0 ];

var program;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();
    for(let i = 0; i < NumVertices; i++) {
        thetaArray.push([0.0, 0.0, 0.0]);
    }

    document.addEventListener("keydown", keyDownHandler, false);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.DYNAMIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(thetaArray), gl.STATIC_DRAW );


    var vTheta = gl.getAttribLocation( program, "vTheta" );
    gl.vertexAttribPointer( vTheta, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTheta );

    thetaLoc = gl.getUniformLocation(program, "theta");
    rotateDirectionLoc = gl.getUniformLocation(program, "rotateDirection");

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    //event listeners for buttons

    document.getElementById( "bottom" ).onclick = function () {
        flag = 1;
        faceFlag = getBottomFace();
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        rotatePlane(faceFlag);
    };
    document.getElementById( "middleBT" ).onclick = function () {
        flag = 1;
        faceFlag = 1;
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        rotatePlane(faceFlag);
    };
    document.getElementById( "top" ).onclick = function () {
        flag = 1;
        faceFlag = getTopFace();
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        rotatePlane(faceFlag)
    };
    document.getElementById("front").onclick = function () {
        flag = 1;
        faceFlag = getFrontFace();
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        rotatePlane(faceFlag);
    };
    document.getElementById("middleFB").onclick = function () {
        flag = 1;
        faceFlag = getFrontFace();
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        faceFlag = getMiddleFace(faceFlag);
        rotatePlane(faceFlag);
    };
    document.getElementById("back").onclick = function () {
        flag = 1;
        faceFlag = getBackFace();
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        rotatePlane(faceFlag);
    };
    document.getElementById("left").onclick = function() {
        flag = 1;
        faceFlag = getLeftFace();
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        rotatePlane(faceFlag);
    };
    document.getElementById("middleLR").onclick = function() {

    };
    document.getElementById("right").onclick = function() {
        flag = 1;
        faceFlag = getRightFace();
        setRotateDirection("front", faceFlag);
        tempPoints = Object.assign([], points);
        rotatePlane(faceFlag);
    };
    document.getElementById("test" ).onclick = getPlaneLocation;

    document.getElementById("clockwise").onclick = function () {
        userRotateDirection = clockWise;
    };
    document.getElementById("counterclockwise").onclick = function () {
        userRotateDirection = counterClockWise;
    };

    render();
};

function colorCube()
{
    createCubeColor();
}

function rectangleDrawer(a, b, c, d, color) {
    let indices = [a, b, c, a, c, d];
    for( let i = 0; i < 6; i++) {
        points.push(vertices[indices[i]]);
        colors.push((color));
    }
}

function createCubeColor() {
    //1
    let i = 0;
    rectangleDrawer(1, 0, 3, 2, green);
    rectangleDrawer(2, 3, 7, 6, black);
    rectangleDrawer(3, 0, 4, 7, yellow);
    rectangleDrawer(6, 5, 1, 2, black);
    rectangleDrawer(4, 5, 6, 7, black);
    rectangleDrawer(5, 4, 0, 1, magenta);
    //2
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //3
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //4
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //5
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //6
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //7
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //8
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //9
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, yellow);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //10
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //11
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //12
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //13
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //14
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //15
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //16
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //17
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //18
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, black);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //19
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //20
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //21
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, green);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //22
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //23
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //24
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, black);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //25
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, magenta);
    //26
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, black);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
    //27
    i += 8;
    rectangleDrawer(1+i, i, 3+i, 2+i, black);
    rectangleDrawer(2+i, 3+i, 7+i, 6+i, red);
    rectangleDrawer(3+i, i, 4+i, 7+i, black);
    rectangleDrawer(6+i, 5+i, 1+i, 2+i, white);
    rectangleDrawer(4+i, 5+i, 6+i, 7+i, blue);
    rectangleDrawer(5+i, 4+i, i, 1+i, black);
}

function keyDownHandler(event) {
    switch (event.key) {
        case "ArrowUp":
            theta[xAxis] = (theta[xAxis] - 2.0) % 360;
            break;
        case "ArrowDown":
            theta[xAxis] = (theta[xAxis] + 2.0) % 360;
            break;
        case "ArrowLeft":
            theta[zAxis] = (theta[zAxis] + 2.0) % 360;
            break;
        case "ArrowRight":
            theta[zAxis] = (theta[zAxis] - 2.0) % 360;
            break;
        case ",":
            theta[yAxis] = (theta[yAxis] - 2.0) % 360;
            break;
        case ".":
            theta[yAxis] = (theta[yAxis] + 2.0) % 360;
            break;
        default:
            console.log("Unknown Key Pressed");
    }
}

var flag = 0;
var counter = 0;
const times = 45;
const angle = 90 / times;
const clockWise = 1;
const counterClockWise = -1;
var faceIndex = {
    1: [0, 1, 2, 11, 20, 19, 18, 9, 10],
    2: [3, 4, 5, 14, 23, 22, 21, 12, 13],
    3: [6, 7, 8, 17, 26, 25, 24, 15, 16],
    4: [0, 3, 6, 15, 24, 21, 18, 9, 12],
    5: [1, 4, 7, 16, 25, 22, 19, 10, 13],
    6: [2, 5, 8, 17, 26, 23, 20, 11, 14],
    7: [0, 1, 2, 5, 8, 7, 6, 3, 4],
    8: [9, 10, 11, 14, 17, 16, 15, 12, 13],
    9: [18, 19, 20, 23, 26, 25, 24, 21, 22]
};
var faceAngle = {
    1: [0, 0, 0],
    3: [180, 180, 0],
    4: [0, 90, 0],
    6: [0, 270, 0],
    7: [270, 0, 0],
    9: [90, 0, 0]
};
var faceVec = {
    1: [0, 0, 1, 1],
    3: [0, 0, -1, 1],
    4: [-1, 0, 0, 1],
    6: [1, 0, 0, 1],
    7: [0, -1, 0, 1],
    9: [0, 1, 0, 1]
};

function getFrontFace() {
    let zProjection = 0;
    let faceKey = 1;
    for(let key in faceVec) {
        let temp = mult(ctm, faceVec[key]);
        if(temp[2] > zProjection) {
            zProjection = temp[2];
            faceKey = Number(key);
        }
    }
    return faceKey;
}

function getBackFace() {
    let frontFace = getFrontFace();
    let backFace = 0;
    switch (frontFace) {
        case 1: backFace = 3; break;
        case 3: backFace = 1; break;
        case 4: backFace = 6; break;
        case 6: backFace = 4; break;
        case 7: backFace = 9; break;
        case 9: backFace = 7; break;
    }
    return Number(backFace);
}

function getLeftFace() {
    let xProjection = 0;
    let faceKey = 1;
    for(let key in faceVec) {
        let temp = mult(ctm, faceVec[key]);
        if(temp[0] < xProjection) {
            xProjection = temp[0];
            faceKey = Number(key);
        }
    }
    return faceKey;
}

function getRightFace() {
    let leftFace = getLeftFace();
    let rightFace = 0;
    switch (leftFace) {
        case 1: rightFace = 3; break;
        case 3: rightFace = 1; break;
        case 4: rightFace = 6; break;
        case 6: rightFace = 4; break;
        case 7: rightFace = 9; break;
        case 9: rightFace = 7; break;
    }
    return Number(rightFace);
}
function getTopFace() {
    let yProjection = 0;
    let faceKey = 1;
    for(let key in faceVec) {
        let temp = mult(ctm, faceVec[key]);
        if(temp[1] > yProjection) {
            yProjection = temp[1];
            faceKey = Number(key);
        }
    }
    return faceKey;
}

function getBottomFace() {
    let topFace = getTopFace();
    let bottomFace = 0;
    switch (topFace) {
        case 1: bottomFace = 3; break;
        case 3: bottomFace = 1; break;
        case 4: bottomFace = 6; break;
        case 6: bottomFace = 4; break;
        case 7: bottomFace = 9; break;
        case 9: bottomFace = 7; break;
    }
    return Number(bottomFace);
}

function setRotateDirection(face, faceKey) {
    switch (face) {
        case "front": {
            switch (faceKey) {
                case 1:
                case 6:
                case 9:
                    rotateDirection = userRotateDirection * (-1);
                    break;
                case 3:
                case 4:
                case 7:
                    rotateDirection = userRotateDirection;
                    break;
                default:
                    console.log("Unknown Face-key");
            }
            break;
        }
        default:
            console.log("Unknown Face");
    }
}

function rotatePlane(faceKey) {
    counter += 1;
    let rotateAxis = xAxis;
    let transMatrix = mat4();
    switch (faceKey) {
        case 1:
        case 2:
        case 3: {
            rotateAxis = zAxis;
            break;
        }
        case 4: {
            rotateAxis = xAxis;
            break;
        }
        case 5: {
            rotateAxis = xAxis;
            break;
        }
        case 6: {
            rotateAxis = xAxis;
            break;
        }
        case 7: {
            rotateAxis = yAxis;
            break;
        }
        case 8: {
            rotateAxis = yAxis;
            break;
        }
        case 9: {
            rotateAxis = yAxis;
            break;
        }
    }
    for (let i = 0; i < faceIndex[faceKey].length; i++) {
        for (let j = 0; j < 36; j++) {
            //points[faceIndex[faceKey][i]*36 + j] = mult(transMatrix, points[faceIndex[faceKey][i]*36+j]);
            thetaArray[faceIndex[faceKey][i]*36+j][rotateAxis] += angle*rotateDirection;
        }
    }

    gl.bufferData( gl.ARRAY_BUFFER, flatten(thetaArray), gl.STATIC_DRAW );
    if (counter === times) {
        flag = 0;
        counter = 0;
        console.log(faceKey);
        console.log(faceIndex);
        console.log(thetaArray);
        transMatrix = rotatePoints(faceKey);
        replaceFaceIndex(faceKey, rotateDirection);
        for (let i = 0; i < faceIndex[faceKey].length; i++) {
            for (let j = 0; j < 36; j++) {
                points[faceIndex[faceKey][i]*36 + j] = mult(transMatrix, points[faceIndex[faceKey][i]*36+j]);
            }
        }
        var vBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );
        for(let i = 0; i < NumVertices; i++) {
            thetaArray[i] = [0.0, 0.0, 0.0];
        }
        var tBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(thetaArray), gl.STATIC_DRAW );
        var vTheta = gl.getAttribLocation( program, "vTheta" );
        gl.vertexAttribPointer( vTheta, 3, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vTheta );
    }
}

function getPlaneLocation() {
    changeFaceColor(getFrontFace());
}

function changeFaceColor(faceKey) {
    for(let i = 0; i < 9; i++) {
        let cubeIndex = faceVec[faceKey][i];
        for( let j = 0; j < 36; j++) {
            colors[cubeIndex*36+j] = cyan;
        }
    }
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.DYNAMIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
}

function replaceFaceIndex(faceKey, direction) {
    let tempface = Object.assign( [], faceIndex[faceKey]);
    if(direction === clockWise) {
        replaceCubeIndex(faceIndex[faceKey][0], 50);
        replaceCubeIndex(faceIndex[faceKey][1], 51);
        for (let i = 3; i < 8; i += 2) {
            replaceCubeIndex(faceIndex[faceKey][i], tempface[i - 2]);
            replaceCubeIndex(faceIndex[faceKey][i - 1], tempface[i - 3]);
        }
        replaceCubeIndex(50, tempface[6]);
        replaceCubeIndex(51, tempface[7]);
        //console.log(faceIndex);
    }
    else {
        replaceCubeIndex(faceIndex[faceKey][6], 50);
        replaceCubeIndex(faceIndex[faceKey][7], 51);
        for (let i = 5; i > 0; i -= 2) {
            replaceCubeIndex(faceIndex[faceKey][i], tempface[i + 2]);
            replaceCubeIndex(faceIndex[faceKey][i - 1], tempface[i + 1]);
        }
        replaceCubeIndex(50, tempface[0]);
        replaceCubeIndex(51, tempface[1]);
        console.log(faceIndex);
    }
}

function replaceCubeIndex(oldIndex, newIndex) {
    for( let key in faceIndex) {
        for( let i = 0; i<9; i++ ) {
            if (faceIndex[key][i] === oldIndex){
                faceIndex[key][i] = newIndex;
            }
        }
    }
}

function getMiddleFace(faceKey) {
    let tempFace = 1;
    switch (faceKey) {
        case 1:
        case 3: tempFace = 2; break;
        case 4:
        case 6: tempFace = 5; break;
        case 7:
        case 9: tempFace = 8; break;
    }
    return Number(tempFace);
}

function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //theta[axis] += 2.0;
    ctm = mat4();
    ctm = mult(ctm, rotateX(theta[xAxis]));
    ctm = mult(ctm, rotateY(theta[yAxis]));
    ctm = mult(ctm, rotateZ(theta[zAxis]));

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm));
    gl.uniform1i(rotateDirectionLoc, rotateDirection);

    if(flag) {
        rotatePlane(faceFlag);
    }

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
    requestAnimFrame( render );
}

function rotatePoints(faceKey) {
    let transMatrix = mat4();
    switch (faceKey) {
        case 1:
        case 2:
        case 3: {
            if(rotateDirection === clockWise) {
                transMatrix = rotateZ(90);
            }
            else {
                transMatrix = rotateZCounterClock(90);
            }
            break;
        }
        case 4: {
            if (rotateDirection === clockWise) {
                transMatrix = rotateX(90);
            }
            else {
                transMatrix = rotateX(-90);
            }
            break;
        }
        case 5: {
            transMatrix = rotateX(90);
            break;
        }
        case 6: {
            transMatrix = rotateX(90);
            break;
        }
        case 7: {
            if(rotateDirection === clockWise) {
                transMatrix = rotateY(90);
            }
            else {
                transMatrix = rotateYCounterClock(90);
            }
            break;
        }
        case 8: {
            transMatrix = rotateY(90);
            break;
        }
        case 9: {
            if(rotateDirection === clockWise) {
                transMatrix = rotateY(90);
            }
            else {
                transMatrix = rotateYCounterClock(90);
            }
            break;
        }
    }
    return transMatrix;
}