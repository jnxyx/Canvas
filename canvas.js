$(function() {
	var pen = new Pen('canvas_d');
	var point = new Point(100, 100);
	pen.drawLine(point);
});

(function(win, doc) {
	"use strict";

	var point = {
		x: 0,
		y: 0
	}

	function getCanvasElement(canvasId) {
		return doc.getElementById(canvasId);
	}

	function isNull(obj) {
		if (typeof obj === 'undefined') {
			return true;
		} else if (obj == null) {
			return true;
		} else if (typeof obj === 'string' && obj == '') {
			return true;
		}
		return false;
	}

	function isNumber(num) {
		return 'number' === typeof num;
	}

	function Error(ex) {
		throw (ex);
	}

	function isPoint(point) {
		if (isNull(point)) {
			Error('the argument is not a point');
			return false;
		} else {
			if (!isNumber(point.x) || !isNumber(point.y)) {
				Error('the argument is not a point');
				return false;
			}
		}
		return true;
	}

	function myPoint(x, y) {
		var args_len = arguments.length;
		if (args_len == 1 && !isNull(arguments[0]) && isPoint(arguments[0])) {
			x = arguments[0].x;
			y = arguments[0].y;
		} else if (args_len == 2 && isNumber(x) && isNumber(y)) {

		} else if (args_len == 0) {
			x = point.x;
			y = point.y;
		} else {
			Error('arguments error');
		}
		var point = {
			x: x,
			y: y
		}
		return point;
	}

	function myPen(canvasId) {
		canvasId = canvasId || 'canvas_d';
		this.canvas = getCanvasElement(canvasId);
		this.context = this.canvas.getContext("2d");
		this.point = {
			x: 0,
			y: 0
		};
		this.fillStyle = '#000000';
		return this;
	}

	var pro = myPen.prototype;
	pro.constructor = {};
	pro.setPoint = function(point) {
		if (isPoint(point)) {
			this.point = point;
		}
	}
	pro.getPoint = function() {
		return this.point;
	}
	pro.setFillStyle = function(color) {
		this.fillStyle = color;
		this.context.fillStyle = this.fillStyle;
	}
	pro.getFillStyle = function() {
		return this.fillStyle;
	}
	pro.drawLine = function(pointStart, pointEnd) {
		if (arguments.length == 1) {
			pointStart = this.point;
			pointEnd = arguments[0];
		} else if (arguments.length == 2) {
			pointStart = arguments[0];
			pointEnd = arguments[1];
		} else {
			return;
		}
		if (isPoint(pointStart) && isPoint(pointEnd)) {
			var ctx = this.context;
			ctx.moveTo(pointStart.x, pointStart.y);
			ctx.lineTo(pointEnd.x, pointEnd.y);
			ctx.stroke();
			this.setPoint(pointEnd);
		}
	}
	win.Pen = myPen;
	win.Point = myPoint;
})(window, document)
