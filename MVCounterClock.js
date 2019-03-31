function rotateXCounterClock(theta) {
    var c = Math.cos( radians(theta) );
    var s = Math.sin( radians(theta) );
    var rx = mat4( 1.0,  0.0,  0.0, 0.0,
        0.0,  c,  -s, 0.0,
        0.0, -s,  -c, 0.0,
        0.0,  0.0,  0.0, 1.0 );
    return rx;
}
function rotateYCounterClock(theta) {
    var c = Math.cos( radians(theta) );
    var s = Math.sin( radians(theta) );
    var ry = mat4( c, 0.0, -s, 0.0,
        0.0, 1.0,  0.0, 0.0,
        s, 0.0,  c, 0.0,
        0.0, 0.0,  0.0, 1.0 );
    return ry;
}
function rotateZCounterClock(theta) {
    var c = Math.cos( radians(theta) );
    var s = Math.sin( radians(theta) );
    var rz = mat4( c, s, 0.0, 0.0,
        -s,  c, 0.0, 0.0,
        0.0,  0.0, 1.0, 0.0,
        0.0,  0.0, 0.0, 1.0 );
    return rz;
}