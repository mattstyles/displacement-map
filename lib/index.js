'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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