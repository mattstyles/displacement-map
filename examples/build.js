(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

var WIDTH = 5;
var HEIGHT = 5;
var CELL_SIZE = 100;

var map = new _lib2['default']({
    width: WIDTH,
    height: HEIGHT
});

window.map = map;

var canvas = document.createElement('canvas');
canvas.classList.add('Surface', 'js-surface');
canvas.setAttribute('width', WIDTH * CELL_SIZE);
canvas.setAttribute('height', HEIGHT * CELL_SIZE);

var ctx = canvas.getContext('2d');

function lerp(value) {
    return 'rgba( 255, 255, 255, ' + value / 255 + ' )';
}

for (var x = 0; x < WIDTH; x++) {
    for (var y = 0; y < HEIGHT; y++) {
        ctx.fillStyle = lerp(map.get(x, y));
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

document.body.appendChild(canvas);

},{"../lib":2}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var DisplacementMap = (function () {
    function DisplacementMap(opts) {
        var _this = this;

        _classCallCheck(this, DisplacementMap);

        this.generateSquare = function (x1, y1, x2, y2, step) {
            console.log('square', x1, y1, x2, y2);
            var mid = ~ ~(x2 - x1) / 2;
            var avg = _this.getAvgCorner(x1, y1, x2, y2);
            _this.set(x1 + mid, y1 + mid, avg);
        };

        var options = opts || {};

        // Assign defaults or use opts
        // @TODO check power of 2 + 1 values
        this.width = options.width || 65;
        this.height = options.height || 65;

        this.buffer = new ArrayBuffer(this.width * this.height);
        this.array = new Uint8Array(this.buffer);

        // Seed corners
        this.array[this.to1d(0, 0)] = 255;
        this.array[this.to1d(0, this.height - 1)] = 255;
        this.array[this.to1d(this.width - 1, 0)] = 255;
        this.array[this.to1d(this.width - 1, this.height - 1)] = 255;

        this.generate(1);

        console.log(this.array);
    }

    DisplacementMap.prototype.get = function get(x, y) {
        return this.array[this.to1d(this.wrap(x), this.wrap(y))];
    };

    DisplacementMap.prototype.set = function set(x, y, value) {
        this.array[this.to1d(this.wrap(x), this.wrap(y))] = this.clamp(value);
    };

    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

    DisplacementMap.prototype.getAvg = function getAvg() {
        return Array.prototype.reduce.call(arguments, function (prev, num) {
            return prev + num;
        }) / arguments.length;
    };

    /**
     * Grabs the average of each edge point
     */

    DisplacementMap.prototype.getAvgEdge = function getAvgEdge(x1, y1, x2, y2) {
        var size = ~ ~(x2 - x1) / 2;
        return this.getAvg(this.get(x1 + size, y1), this.get(x1, y1 + size), this.get(x2, y1 + size), this.get(x1 + size, y2));
    };

    /**
     * Grabs the average from each corner point
     */

    DisplacementMap.prototype.getAvgCorner = function getAvgCorner(x1, y1, x2, y2) {
        return this.getAvg(this.get(x1, y1), this.get(x2, y1), this.get(x1, y2), this.get(x2, y2));
    };

    /**
     * @param cb <function> iterator to call
     * @param step <float> 0...1
     */

    DisplacementMap.prototype.iterate = function iterate(cb, step) {
        var size = (this.width - 1) * step;
        for (var x = 0; x < this.width - 1; x += size) {
            for (var y = 0; y < this.height - 1; y += size) {
                cb(x, y, x + size, y + size, step);
            }
        }
    };

    DisplacementMap.prototype.generate = function generate(step) {
        var dist = (this.width - 1) * step;

        //  this.iterate( function( x1, y1, x2, y2 ) {
        //      console.log( x1, y1, x2, y2 )
        //      this.set( x1, y1, 127 )
        //  }.bind( this ), step )
        this.iterate(this.generateSquare, step);

        if (dist > 2) {
            this.generate(step / 2);
        }
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

exports['default'] = DisplacementMap;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbWF0dHN0eWxlcy9wcm9qZWN0cy9wcm9jZWR1cmFsL2Rpc3BsYWNlbWVudC1tYXAvZXhhbXBsZXMvc3JjLmpzIiwiL1VzZXJzL21hdHRzdHlsZXMvcHJvamVjdHMvcHJvY2VkdXJhbC9kaXNwbGFjZW1lbnQtbWFwL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7bUJDQ2dCLFFBQVE7Ozs7QUFFeEIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0FBQ2YsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFBO0FBQ2hCLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQTs7QUFFckIsSUFBSSxHQUFHLEdBQUcscUJBQVE7QUFDZCxTQUFLLEVBQUUsS0FBSztBQUNaLFVBQU0sRUFBRSxNQUFNO0NBQ2pCLENBQUMsQ0FBQTs7QUFFRixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTs7QUFFaEIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBRSxRQUFRLENBQUUsQ0FBQTtBQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRSxTQUFTLEVBQUUsWUFBWSxDQUFFLENBQUE7QUFDL0MsTUFBTSxDQUFDLFlBQVksQ0FBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLFNBQVMsQ0FBRSxDQUFBO0FBQ2pELE1BQU0sQ0FBQyxZQUFZLENBQUUsUUFBUSxFQUFFLE1BQU0sR0FBRyxTQUFTLENBQUUsQ0FBQTs7QUFFbkQsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUUsQ0FBQTs7QUFFbkMsU0FBUyxJQUFJLENBQUUsS0FBSyxFQUFHO0FBQ25CLFdBQU8sdUJBQXVCLEdBQUssS0FBSyxHQUFHLEdBQUksQUFBRSxHQUFHLElBQUksQ0FBQTtDQUMzRDs7QUFHRCxLQUFNLElBQUks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QUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQ3ZFLFlBQUksSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFBLEFBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsZUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzFILENBQUM7Ozs7OztBQU1GLG1CQUFlLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDM0UsZUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDOUYsQ0FBQzs7Ozs7OztBQU9GLG1CQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQzNELFlBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUM7QUFDbkMsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDM0MsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQzVDLGtCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdEM7U0FDSjtLQUNKLENBQUM7O0FBRUYsbUJBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRTtBQUN6RCxZQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDOzs7Ozs7QUFNbkMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV4QyxZQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7QUFDVixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0I7S0FDSixDQUFDOzs7Ozs7Ozs7Ozs7QUFZRixtQkFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNqRCxlQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztLQUM3QixDQUFDOzs7Ozs7QUFNRixtQkFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2xELGVBQU8sS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUN0QixDQUFDOzs7Ozs7QUFNRixtQkFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ3BELGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM1QyxDQUFDOztBQUVGLFdBQU8sZUFBZSxDQUFDO0NBQzFCLENBQUEsRUFBRyxDQUFDOztBQUVMLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxlQUFlLENBQUM7QUFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5pbXBvcnQgTWFwIGZyb20gJy4uL2xpYidcblxuY29uc3QgV0lEVEggPSA1XG5jb25zdCBIRUlHSFQgPSA1XG5jb25zdCBDRUxMX1NJWkUgPSAxMDBcblxubGV0IG1hcCA9IG5ldyBNYXAoe1xuICAgIHdpZHRoOiBXSURUSCxcbiAgICBoZWlnaHQ6IEhFSUdIVFxufSlcblxud2luZG93Lm1hcCA9IG1hcFxuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKVxuY2FudmFzLmNsYXNzTGlzdC5hZGQoICdTdXJmYWNlJywgJ2pzLXN1cmZhY2UnIClcbmNhbnZhcy5zZXRBdHRyaWJ1dGUoICd3aWR0aCcsIFdJRFRIICogQ0VMTF9TSVpFIClcbmNhbnZhcy5zZXRBdHRyaWJ1dGUoICdoZWlnaHQnLCBIRUlHSFQgKiBDRUxMX1NJWkUgKVxuXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKVxuXG5mdW5jdGlvbiBsZXJwKCB2YWx1ZSApIHtcbiAgICByZXR1cm4gJ3JnYmEoIDI1NSwgMjU1LCAyNTUsICcgKyAoIHZhbHVlIC8gMHhmZiApICsgJyApJ1xufVxuXG5cbmZvciAoIGxldCB4ID0gMDsgeCA8IFdJRFRIOyB4KysgKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBIRUlHSFQ7IHkrKyApIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGxlcnAoIG1hcC5nZXQoIHgsIHkgKSApXG4gICAgICAgIGN0eC5maWxsUmVjdCggeCAqIENFTExfU0laRSwgeSAqIENFTExfU0laRSwgQ0VMTF9TSVpFLCBDRUxMX1NJWkUgKVxuICAgIH1cbn1cblxuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBjYW52YXMgKVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIERpc3BsYWNlbWVudE1hcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlzcGxhY2VtZW50TWFwKG9wdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGlzcGxhY2VtZW50TWFwKTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlU3F1YXJlID0gZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyLCBzdGVwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3F1YXJlJywgeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICAgICAgdmFyIG1pZCA9IH4gfih4MiAtIHgxKSAvIDI7XG4gICAgICAgICAgICB2YXIgYXZnID0gX3RoaXMuZ2V0QXZnQ29ybmVyKHgxLCB5MSwgeDIsIHkyKTtcbiAgICAgICAgICAgIF90aGlzLnNldCh4MSArIG1pZCwgeTEgKyBtaWQsIGF2Zyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9O1xuXG4gICAgICAgIC8vIEFzc2lnbiBkZWZhdWx0cyBvciB1c2Ugb3B0c1xuICAgICAgICAvLyBAVE9ETyBjaGVjayBwb3dlciBvZiAyICsgMSB2YWx1ZXNcbiAgICAgICAgdGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNjU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNjU7XG5cbiAgICAgICAgdGhpcy5idWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5hcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyKTtcblxuICAgICAgICAvLyBTZWVkIGNvcm5lcnNcbiAgICAgICAgdGhpcy5hcnJheVt0aGlzLnRvMWQoMCwgMCldID0gMjU1O1xuICAgICAgICB0aGlzLmFycmF5W3RoaXMudG8xZCgwLCB0aGlzLmhlaWdodCAtIDEpXSA9IDI1NTtcbiAgICAgICAgdGhpcy5hcnJheVt0aGlzLnRvMWQodGhpcy53aWR0aCAtIDEsIDApXSA9IDI1NTtcbiAgICAgICAgdGhpcy5hcnJheVt0aGlzLnRvMWQodGhpcy53aWR0aCAtIDEsIHRoaXMuaGVpZ2h0IC0gMSldID0gMjU1O1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoMSk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hcnJheSk7XG4gICAgfVxuXG4gICAgRGlzcGxhY2VtZW50TWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnJheVt0aGlzLnRvMWQodGhpcy53cmFwKHgpLCB0aGlzLndyYXAoeSkpXTtcbiAgICB9O1xuXG4gICAgRGlzcGxhY2VtZW50TWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoeCwgeSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5hcnJheVt0aGlzLnRvMWQodGhpcy53cmFwKHgpLCB0aGlzLndyYXAoeSkpXSA9IHRoaXMuY2xhbXAodmFsdWUpO1xuICAgIH07XG5cbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxuICAgICAqXG4gICAgICogIEdlbmVyYXRpb24gbWV0aG9kc1xuICAgICAqXG4gICAgICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICBEaXNwbGFjZW1lbnRNYXAucHJvdG90eXBlLmdldEF2ZyA9IGZ1bmN0aW9uIGdldEF2ZygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uIChwcmV2LCBudW0pIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2ICsgbnVtO1xuICAgICAgICB9KSAvIGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdyYWJzIHRoZSBhdmVyYWdlIG9mIGVhY2ggZWRnZSBwb2ludFxuICAgICAqL1xuXG4gICAgRGlzcGxhY2VtZW50TWFwLnByb3RvdHlwZS5nZXRBdmdFZGdlID0gZnVuY3Rpb24gZ2V0QXZnRWRnZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICB2YXIgc2l6ZSA9IH4gfih4MiAtIHgxKSAvIDI7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF2Zyh0aGlzLmdldCh4MSArIHNpemUsIHkxKSwgdGhpcy5nZXQoeDEsIHkxICsgc2l6ZSksIHRoaXMuZ2V0KHgyLCB5MSArIHNpemUpLCB0aGlzLmdldCh4MSArIHNpemUsIHkyKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdyYWJzIHRoZSBhdmVyYWdlIGZyb20gZWFjaCBjb3JuZXIgcG9pbnRcbiAgICAgKi9cblxuICAgIERpc3BsYWNlbWVudE1hcC5wcm90b3R5cGUuZ2V0QXZnQ29ybmVyID0gZnVuY3Rpb24gZ2V0QXZnQ29ybmVyKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF2Zyh0aGlzLmdldCh4MSwgeTEpLCB0aGlzLmdldCh4MiwgeTEpLCB0aGlzLmdldCh4MSwgeTIpLCB0aGlzLmdldCh4MiwgeTIpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGNiIDxmdW5jdGlvbj4gaXRlcmF0b3IgdG8gY2FsbFxuICAgICAqIEBwYXJhbSBzdGVwIDxmbG9hdD4gMC4uLjFcbiAgICAgKi9cblxuICAgIERpc3BsYWNlbWVudE1hcC5wcm90b3R5cGUuaXRlcmF0ZSA9IGZ1bmN0aW9uIGl0ZXJhdGUoY2IsIHN0ZXApIHtcbiAgICAgICAgdmFyIHNpemUgPSAodGhpcy53aWR0aCAtIDEpICogc3RlcDtcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLndpZHRoIC0gMTsgeCArPSBzaXplKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0IC0gMTsgeSArPSBzaXplKSB7XG4gICAgICAgICAgICAgICAgY2IoeCwgeSwgeCArIHNpemUsIHkgKyBzaXplLCBzdGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwbGFjZW1lbnRNYXAucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gZ2VuZXJhdGUoc3RlcCkge1xuICAgICAgICB2YXIgZGlzdCA9ICh0aGlzLndpZHRoIC0gMSkgKiBzdGVwO1xuXG4gICAgICAgIC8vICB0aGlzLml0ZXJhdGUoIGZ1bmN0aW9uKCB4MSwgeTEsIHgyLCB5MiApIHtcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZyggeDEsIHkxLCB4MiwgeTIgKVxuICAgICAgICAvLyAgICAgIHRoaXMuc2V0KCB4MSwgeTEsIDEyNyApXG4gICAgICAgIC8vICB9LmJpbmQoIHRoaXMgKSwgc3RlcCApXG4gICAgICAgIHRoaXMuaXRlcmF0ZSh0aGlzLmdlbmVyYXRlU3F1YXJlLCBzdGVwKTtcblxuICAgICAgICBpZiAoZGlzdCA+IDIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGUoc3RlcCAvIDIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXG4gICAgICpcbiAgICAgKiAgSGVscGVyc1xuICAgICAqXG4gICAgICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBmcm9tIDJkIHRvIDFkXG4gICAgICovXG5cbiAgICBEaXNwbGFjZW1lbnRNYXAucHJvdG90eXBlLnRvMWQgPSBmdW5jdGlvbiB0bzFkKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHkgKiB0aGlzLndpZHRoICsgeDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogV3JhcHMgMC4uLjI1NSBpLmUuIDI1NyBiZWNvbWVzIDEgKGJlY2F1c2UgMCBpcyBpbXBvcnRhbnQpXG4gICAgICovXG5cbiAgICBEaXNwbGFjZW1lbnRNYXAucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbiB3cmFwKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmIDI1NTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2xhbXBzIHRvIDAuLi4yNTVcbiAgICAgKi9cblxuICAgIERpc3BsYWNlbWVudE1hcC5wcm90b3R5cGUuY2xhbXAgPSBmdW5jdGlvbiBjbGFtcCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDI1NSksIDApO1xuICAgIH07XG5cbiAgICByZXR1cm4gRGlzcGxhY2VtZW50TWFwO1xufSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gRGlzcGxhY2VtZW50TWFwO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107Il19