"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Json = /*#__PURE__*/function () {
  function Json(options) {
    _classCallCheck(this, Json);

    var spacesSign = options.spacesSign,
        spacesCount = options.spacesCount;
    this.spacesSign = spacesSign;
    this.spacesCount = spacesCount !== null && spacesCount !== void 0 ? spacesCount : 0;
  }

  _createClass(Json, [{
    key: "format",
    value: function format(ast) {
      var spacesSign = this.spacesSign,
          spacesCount = this.spacesCount;
      var space = spacesSign.repeat(spacesCount);
      var replacer = null; // may be modified in the future, may be not

      return JSON.stringify(ast, replacer, space);
    }
  }]);

  return Json;
}();

exports["default"] = Json;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXRzL0pzb24uanMiXSwibmFtZXMiOlsiSnNvbiIsIm9wdGlvbnMiLCJzcGFjZXNTaWduIiwic3BhY2VzQ291bnQiLCJhc3QiLCJzcGFjZSIsInJlcGVhdCIsInJlcGxhY2VyIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFxQkEsSTtBQUNuQixnQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBLFFBQ1hDLFVBRFcsR0FDaUJELE9BRGpCLENBQ1hDLFVBRFc7QUFBQSxRQUNDQyxXQURELEdBQ2lCRixPQURqQixDQUNDRSxXQUREO0FBRW5CLFNBQUtELFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkEsV0FBbkIsYUFBbUJBLFdBQW5CLGNBQW1CQSxXQUFuQixHQUFrQyxDQUFsQztBQUNEOzs7OzJCQUVNQyxHLEVBQUs7QUFBQSxVQUNGRixVQURFLEdBQzBCLElBRDFCLENBQ0ZBLFVBREU7QUFBQSxVQUNVQyxXQURWLEdBQzBCLElBRDFCLENBQ1VBLFdBRFY7QUFFVixVQUFNRSxLQUFLLEdBQUdILFVBQVUsQ0FBQ0ksTUFBWCxDQUFrQkgsV0FBbEIsQ0FBZDtBQUNBLFVBQU1JLFFBQVEsR0FBRyxJQUFqQixDQUhVLENBR2E7O0FBRXZCLGFBQU9DLElBQUksQ0FBQ0MsU0FBTCxDQUFlTCxHQUFmLEVBQW9CRyxRQUFwQixFQUE4QkYsS0FBOUIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnNvbiB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHNwYWNlc1NpZ24sIHNwYWNlc0NvdW50IH0gPSBvcHRpb25zO1xuICAgIHRoaXMuc3BhY2VzU2lnbiA9IHNwYWNlc1NpZ247XG4gICAgdGhpcy5zcGFjZXNDb3VudCA9IHNwYWNlc0NvdW50ID8/IDA7XG4gIH1cblxuICBmb3JtYXQoYXN0KSB7XG4gICAgY29uc3QgeyBzcGFjZXNTaWduLCBzcGFjZXNDb3VudCB9ID0gdGhpcztcbiAgICBjb25zdCBzcGFjZSA9IHNwYWNlc1NpZ24ucmVwZWF0KHNwYWNlc0NvdW50KTtcbiAgICBjb25zdCByZXBsYWNlciA9IG51bGw7IC8vIG1heSBiZSBtb2RpZmllZCBpbiB0aGUgZnV0dXJlLCBtYXkgYmUgbm90XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXN0LCByZXBsYWNlciwgc3BhY2UpO1xuICB9XG59XG4iXX0=