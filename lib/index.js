"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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