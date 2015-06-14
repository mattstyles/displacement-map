(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

var map = new _lib2['default']();

window.map = map;

var canvas = document.createElement('canvas');
canvas.classList.add('Surface', 'js-surface');
canvas.setAttribute('width', 400);
canvas.setAttribute('height', 400);

document.body.appendChild(canvas);

},{"../lib":2}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var DisplacementMap = (function () {
    function DisplacementMap() {
        _classCallCheck(this, DisplacementMap);

        this.width = 65;

        this.buffer = new ArrayBuffer(this.width * this.width);
        this.array = new Uint8Array(this.buffer);

        this.generate();

        console.log(this.array);

        console.log(this.to1d(4, 0));
        console.log(this.to1d(2, 1));
    }

    DisplacementMap.prototype.to1d = function to1d(x, y) {
        return y * this.width + x;
    };

    DisplacementMap.prototype.generate = function generate() {
        // No universal TypedArray.map so go old school
        for (var x = 0; x < this.array.length; x++) {
            this.array[x] = ~ ~(Math.random() * 255);
        }

        return this.array;
    };

    return DisplacementMap;
})();

exports["default"] = DisplacementMap;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF0dHN0eWxlcy9wcm9qZWN0cy9wcm9jZWR1cmFsL2Rpc3BsYWNlbWVudC1tYXAvZXhhbXBsZXMvc3JjLmpzIiwiL1VzZXJzL21hdHRzdHlsZXMvcHJvamVjdHMvcHJvY2VkdXJhbC9kaXNwbGFjZW1lbnQtbWFwL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7bUJDQ2dCLFFBQVE7Ozs7QUFDeEIsSUFBSSxHQUFHLEdBQUcsc0JBQVMsQ0FBQTs7QUFFbkIsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7O0FBRWhCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUUsUUFBUSxDQUFFLENBQUE7QUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUUsU0FBUyxFQUFFLFlBQVksQ0FBRSxDQUFBO0FBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBRSxDQUFBO0FBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBRSxDQUFBOztBQUVwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBRSxNQUFNLENBQUUsQ0FBQTs7O0FDWG5DLFlBQVksQ0FBQzs7QUFFYixPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs7QUFFMUIsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUFFO0NBQUU7O0FBRXpKLElBQUksZUFBZSxHQUFHLENBQUMsWUFBWTtBQUMvQixhQUFTLGVBQWUsR0FBRztBQUN2Qix1QkFBZSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFdkMsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWhCLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkQsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXpDLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFaEIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXhCLGVBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixlQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEM7O0FBRUQsbUJBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDakQsZUFBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDN0IsQ0FBQzs7QUFFRixtQkFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxRQUFRLEdBQUc7O0FBRXJELGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4QyxnQkFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQSxBQUFDLENBQUM7U0FDNUM7O0FBRUQsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3JCLENBQUM7O0FBRUYsV0FBTyxlQUFlLENBQUM7Q0FDMUIsQ0FBQSxFQUFHLENBQUM7O0FBRUwsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLGVBQWUsQ0FBQztBQUNyQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbmltcG9ydCBNYXAgZnJvbSAnLi4vbGliJ1xubGV0IG1hcCA9IG5ldyBNYXAoKVxuXG53aW5kb3cubWFwID0gbWFwXG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApXG5jYW52YXMuY2xhc3NMaXN0LmFkZCggJ1N1cmZhY2UnLCAnanMtc3VyZmFjZScgKVxuY2FudmFzLnNldEF0dHJpYnV0ZSggJ3dpZHRoJywgNDAwIClcbmNhbnZhcy5zZXRBdHRyaWJ1dGUoICdoZWlnaHQnLCA0MDAgKVxuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBjYW52YXMgKVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBEaXNwbGFjZW1lbnRNYXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpc3BsYWNlbWVudE1hcCgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERpc3BsYWNlbWVudE1hcCk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IDY1O1xuXG4gICAgICAgIHRoaXMuYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMud2lkdGggKiB0aGlzLndpZHRoKTtcbiAgICAgICAgdGhpcy5hcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyKTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hcnJheSk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy50bzFkKDQsIDApKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50bzFkKDIsIDEpKTtcbiAgICB9XG5cbiAgICBEaXNwbGFjZW1lbnRNYXAucHJvdG90eXBlLnRvMWQgPSBmdW5jdGlvbiB0bzFkKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHkgKiB0aGlzLndpZHRoICsgeDtcbiAgICB9O1xuXG4gICAgRGlzcGxhY2VtZW50TWFwLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICAgICAgICAvLyBObyB1bml2ZXJzYWwgVHlwZWRBcnJheS5tYXAgc28gZ28gb2xkIHNjaG9vbFxuICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuYXJyYXkubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIHRoaXMuYXJyYXlbeF0gPSB+IH4oTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5hcnJheTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERpc3BsYWNlbWVudE1hcDtcbn0pKCk7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRGlzcGxhY2VtZW50TWFwO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiXX0=
