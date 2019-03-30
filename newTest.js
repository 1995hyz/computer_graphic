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
var ctm;

var ctm2;
var angle = 0;

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

var leftCenter = vec4(-edgeLength, 0, 0, 1);

const black = [ 0.0, 0.0, 0.0, 1.0 ];
const red = [ 1.0, 0.0, 0.0, 1.0 ];
const yellow = [ 1.0, 1.0, 0.0, 1.0 ];
const green = [ 0.0, 1.0, 0.0, 1.0+edgeLength ];
const blue = [ 0.0, 0.0, 1.0, 1.0 ];
const magenta = [ 1.0, 0.0, 1.0, 1.0 ];
const cyan = [ 0.0, 1.0, 1.0, 1.0 ];
const white = [ 0.85, 0.85, 0.85, 1.0 ];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    document.addEventListener("keydown", keyDownHandler, false);

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

    document.getElementById( "left1" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "left2" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "left3" ).onclick = function () {
        axis = zAxis;
    };
    document.getElementById("test" ).onclick = function () {

    }

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
            theta[xAxis] = (theta[xAxis] - 2.0) %  360;
            break;
        case "ArrowDown":
            theta[xAxis] = (theta[xAxis] + 2.0) %  360;
            break;
        case "ArrowLeft":
            theta[zAxis] = (theta[zAxis] + 2.0) %  360;
            break;
        case "ArrowRight":
            theta[zAxis] = (theta[zAxis] - 2.0) %  360;
            break;
        default:
            console.log("Unknown Key Pressed");
    }
    console.log(theta);
}

function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //theta[axis] += 2.0;
    //angle += 1;
    ctm = mat4();
    ctm = mult(ctm, rotateX(theta[xAxis]));
    ctm = mult(ctm, rotateY(theta[yAxis]));
    ctm = mult(ctm, rotateZ(theta[zAxis]));

    //ctm2 = mat4();
    //ctm2 = mult(ctm, rotate(angle))

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm));

    //console.log(points);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}
