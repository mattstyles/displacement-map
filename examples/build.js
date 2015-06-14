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

    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

    DisplacementMap.prototype.generate = function generate() {
        // No universal TypedArray.map so go old school
        for (var x = 0; x < this.array.length; x++) {
            this.array[x] = ~ ~(Math.random() * 255);
        }

        return this.array;
    };

    /*-----------------------------------------------------------*
     *
     *  Helpers
     *
     *-----------------------------------------------------------*/

    /**
     * Converts from 2d to 1d
     */

    DisplacementMap.prototype.to1d = function to1d(x, y) {
        return y * this.width + x;
    };

    /**
     * Wraps 0...255 i.e. 257 becomes 1 (because 0 is important)
     */

    DisplacementMap.prototype.wrap = function wrap(value) {
        return value & 255;
    };

    /**
     * Clamps to 0...255
     */

    DisplacementMap.prototype.clamp = function clamp(value) {
        return Math.max(Math.min(value, 255), 0);
    };

    return DisplacementMap;
})();

exports["default"] = DisplacementMap;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF0dHN0eWxlcy9wcm9qZWN0cy9wcm9jZWR1cmFsL2Rpc3BsYWNlbWVudC1tYXAvZXhhbXBsZXMvc3JjLmpzIiwiL1VzZXJzL21hdHRzdHlsZXMvcHJvamVjdHMvcHJvY2VkdXJhbC9kaXNwbGFjZW1lbnQtbWFwL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7bUJDQ2dCLFFBQVE7Ozs7QUFDeEIsSUFBSSxHQUFHLEdBQUcsc0JBQVMsQ0FBQTs7QUFFbkIsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7O0FBRWhCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUUsUUFBUSxDQUFFLENBQUE7QUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUUsU0FBUyxFQUFFLFlBQVksQ0FBRSxDQUFBO0FBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBRSxDQUFBO0FBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBRSxDQUFBOztBQUVwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBRSxNQUFNLENBQUUsQ0FBQTs7O0FDWG5DLFlBQVksQ0FBQzs7QUFFYixPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs7QUFFMUIsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRTtBQUFFLFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUFFLGNBQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztLQUFFO0NBQUU7O0FBRXpKLElBQUksZUFBZSxHQUFHLENBQUMsWUFBWTtBQUMvQixhQUFTLGVBQWUsR0FBRztBQUN2Qix1QkFBZSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFdkMsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWhCLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkQsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXpDLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7QUFFaEIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXhCLGVBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixlQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEM7Ozs7Ozs7O0FBUUQsbUJBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsUUFBUSxHQUFHOztBQUVyRCxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsZ0JBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUEsQUFBQyxDQUFDO1NBQzVDOztBQUVELGVBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNyQixDQUFDOzs7Ozs7Ozs7Ozs7QUFZRixtQkFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNqRCxlQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztLQUM3QixDQUFDOzs7Ozs7QUFNRixtQkFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2xELGVBQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUN0QixDQUFDOzs7Ozs7QUFNRixtQkFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ3BELGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM1QyxDQUFDOztBQUVGLFdBQU8sZUFBZSxDQUFDO0NBQzFCLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxlQUFlLENBQUM7QUFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5pbXBvcnQgTWFwIGZyb20gJy4uL2xpYidcbmxldCBtYXAgPSBuZXcgTWFwKClcblxud2luZG93Lm1hcCA9IG1hcFxuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKVxuY2FudmFzLmNsYXNzTGlzdC5hZGQoICdTdXJmYWNlJywgJ2pzLXN1cmZhY2UnIClcbmNhbnZhcy5zZXRBdHRyaWJ1dGUoICd3aWR0aCcsIDQwMCApXG5jYW52YXMuc2V0QXR0cmlidXRlKCAnaGVpZ2h0JywgNDAwIClcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggY2FudmFzIClcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRGlzcGxhY2VtZW50TWFwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaXNwbGFjZW1lbnRNYXAoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEaXNwbGFjZW1lbnRNYXApO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSA2NTtcblxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcih0aGlzLndpZHRoICogdGhpcy53aWR0aCk7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlcik7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXJyYXkpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG8xZCg0LCAwKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG8xZCgyLCAxKSk7XG4gICAgfVxuXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcbiAgICAgKlxuICAgICAqICBHZW5lcmF0aW9uIG1ldGhvZHNcbiAgICAgKlxuICAgICAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgRGlzcGxhY2VtZW50TWFwLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICAgICAgICAvLyBObyB1bml2ZXJzYWwgVHlwZWRBcnJheS5tYXAgc28gZ28gb2xkIHNjaG9vbFxuICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuYXJyYXkubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIHRoaXMuYXJyYXlbeF0gPSB+IH4oTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5hcnJheTtcbiAgICB9O1xuXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcbiAgICAgKlxuICAgICAqICBIZWxwZXJzXG4gICAgICpcbiAgICAgKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGZyb20gMmQgdG8gMWRcbiAgICAgKi9cblxuICAgIERpc3BsYWNlbWVudE1hcC5wcm90b3R5cGUudG8xZCA9IGZ1bmN0aW9uIHRvMWQoeCwgeSkge1xuICAgICAgICByZXR1cm4geSAqIHRoaXMud2lkdGggKyB4O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyAwLi4uMjU1IGkuZS4gMjU3IGJlY29tZXMgMSAoYmVjYXVzZSAwIGlzIGltcG9ydGFudClcbiAgICAgKi9cblxuICAgIERpc3BsYWNlbWVudE1hcC5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uIHdyYXAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYgMjU1O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcHMgdG8gMC4uLjI1NVxuICAgICAqL1xuXG4gICAgRGlzcGxhY2VtZW50TWFwLnByb3RvdHlwZS5jbGFtcCA9IGZ1bmN0aW9uIGNsYW1wKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgMjU1KSwgMCk7XG4gICAgfTtcblxuICAgIHJldHVybiBEaXNwbGFjZW1lbnRNYXA7XG59KSgpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IERpc3BsYWNlbWVudE1hcDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07Il19
