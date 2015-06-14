"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DisplacementMap = (function () {
    function DisplacementMap(opts) {
        var _this = this;

        _classCallCheck(this, DisplacementMap);

        this.generateSquare = function (x, y, size) {
            var mid = size / 2;
            var avg = _this.getAvgCorner(x, y, x + size, y + size);
            _this.set(x + mid, y + mid, avg + _this.getMidpointDisplacement(size));
        };

        this.generateDiamond = function (x, y, size) {
            var mid = size / 2;

            var setCell = (function (xx, yy) {
                var avg = this.getAvgPoint(xx, yy, mid);
                //console.log( 'setting diamond point', xx, yy, avg, 'for', x, y, size )
                this.set(xx, yy, avg + this.getMidpointDisplacement(size));
            }).bind(_this);

            setCell(x + mid, y);
            setCell(x + mid, y + size);
            setCell(x, y + mid);
            setCell(x + size, y + mid);
        };

        var options = opts || {};

        // Assign defaults or use opts
        // @TODO check power of 2 + 1 values
        this.width = options.width || 65;
        this.height = options.height || 65;

        this.smoothness = 2.75;

        this.buffer = new ArrayBuffer(this.width * this.height);
        this.array = new Uint8Array(this.buffer);

        // Seed corners
        this.array[this.to1d(0, 0)] = 127;
        this.array[this.to1d(0, this.height - 1)] = 127;
        this.array[this.to1d(this.width - 1, 0)] = 127;
        this.array[this.to1d(this.width - 1, this.height - 1)] = 127;

        this.generate(1);

        console.log(this.array);
    }

    DisplacementMap.prototype.get = function get(x, y) {
        return this.array[this.to1d(this.wrap(x), this.wrap(y))];
    };

    DisplacementMap.prototype.set = function set(x, y, value) {
        this.array[this.to1d(this.wrap(x), this.wrap(y))] = this.clamp255(value);
    };

    /*-----------------------------------------------------------*
     *
     *  Generation methods
     *
     *-----------------------------------------------------------*/

    /**
     * Returns +-127
     */

    DisplacementMap.prototype.variance = function variance() {
        return -127 + Math.random() * 255;
    };

    /**
     * Total variance * smoothness * step
     * Step decreases with each fold to produce a better result
     */

    DisplacementMap.prototype.getMidpointDisplacement = function getMidpointDisplacement(size) {
        return this.variance() * this.smoothness * (size / (this.width - 1));
    };

    /**
     * Averages (mean) all values passed as args
     */

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
     * Get average from a central point
     */

    DisplacementMap.prototype.getAvgPoint = function getAvgPoint(x, y, size) {
        return this.getAvg(this.get(x, y - size), this.get(x + size, y), this.get(x - size, y), this.get(x, y + size));
    };

    /**
     * @param cb <function> iterator to call
     * @param step <float> 0...1
     */

    DisplacementMap.prototype.iterate = function iterate(cb, step) {
        var size = (this.width - 1) * step;
        for (var x = 0; x < this.width - 1; x += size) {
            for (var y = 0; y < this.height - 1; y += size) {
                cb(x, y, size);
            }
        }
    };

    DisplacementMap.prototype.generate = function generate(step) {
        var dist = (this.width - 1) * step;

        this.iterate(this.generateSquare, step);
        this.iterate(this.generateDiamond, step);

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

    DisplacementMap.prototype.wrap255 = function wrap255(value) {
        return value & 255;
    };

    /**
     * Wraps 0...this.width - 1
     */
    // wrap( value ) {
    //     return value & ( this.width - 1 )
    // }

    DisplacementMap.prototype.wrap = function wrap(num) {
        var min = 0;
        var max = this.width - 1;

        if (num > max) {
            return num % max;
        }

        if (num < min) {
            return max - (min - num) % (max - min);
        }

        return num;
    };

    /**
     * Clamps to 0...255
     */

    DisplacementMap.prototype.clamp255 = function clamp255(value) {
        return Math.max(Math.min(value, 255), 0);
    };

    /**
     * Clamps 0....this.width - 1
     */

    DisplacementMap.prototype.clamp = function clamp(value) {
        return Math.max(Math.min(value, this.width - 1), 0);
    };

    return DisplacementMap;
})();

exports["default"] = DisplacementMap;
module.exports = exports["default"];