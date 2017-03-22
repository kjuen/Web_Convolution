﻿
function getOffset() {
    //NOT YET WORKING
    //this function gets what the user types in the offset box
    var myValue = document.getElementById('myTextBox').value;
    return myValue;
}

function rect(t, a = 0) {
    //calculates the rect function value for a specific input
    if (Math.abs(t-a) >  1 / 2) { return 0; }
    if (Math.abs(t-a) == 1 / 2) { return 1 / 2; }
    return 1;
}

function tri(t, a = 0) {
    //calculates the Tri function value for a specific input
    if (Math.abs(t - a) > 1 / 2)            { return 0; }
    if ((t - a) >= 0 && (t - a) <= 1 / 2)   { return 1 - 2 * (t - a); }
    if ((t - a) <  0 && (t - a) >= - 1 / 2) { return 1 + 2 * (t - a); }
}

function step(t, a = 0) {
    //calculates the step function value for a specific input
    if ((t - a) >= 0) { return 1; }
    return 0;
}

function sinc(t, a = 0) {
    //calculates the sinc function value for a specific input
    if ((t - a) == 0) { return 1; }
    return Math.sin(t - a) / (t - a);
}

function gaussian(t, a = 1) {
    //calculates the gaussian function value for a specific input
    return Math.exp(-a*t*t);
}

function fun1(x) { return rect(x,-2); }
function fun2(x) { return tri(x,1); }


function draw() {
    var canvas = document.getElementById("canvas");
    if (null == canvas || !canvas.getContext) return;

    canvas.width = 700;
    canvas.height = 300;

    var axes = {}, ctx = canvas.getContext("2d");
    axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
    axes.scale = 30;                 // 30 pixels from x=0 to x=1
    axes.doNegativeX = true;

    showAxes(ctx, axes);
    funGraph(ctx, axes, fun1, "rgb(11,153,11)", 1);
    funGraph(ctx, axes, fun2, "rgb(66,44,255)", 2);
}

function funGraph(ctx, axes, func, color, thick) {
    var xx, yy, dx = 0.001, x0 = axes.x0, y0 = axes.y0, scale = axes.scale;
    var iMax = Math.round((ctx.canvas.width - x0) / dx);
    var iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (var i = iMin; i <= iMax; i++) {
        xx = dx * i; yy = scale * func(xx / scale);
        if (i == iMin) ctx.moveTo(x0 + xx, y0 - yy);
        else ctx.lineTo(x0 + xx, y0 - yy);
    }

    ctx.stroke();
}

function showAxes(ctx, axes) {
    var x0 = axes.x0, w = ctx.canvas.width;
    var y0 = axes.y0, h = ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(xmin, y0); ctx.lineTo(w, y0);  // X axis
    ctx.moveTo(x0, 0); ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();
}

