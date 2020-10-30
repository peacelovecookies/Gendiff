"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = _interopRequireDefault(require("../utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Plain = /*#__PURE__*/function () {
  function Plain(options) {
    _classCallCheck(this, Plain);

    var spacesSign = options.spacesSign,
        spacesCount = options.spacesCount;
    this.spacesSign = spacesSign;
    this.spacesCount = spacesCount;
  }

  _createClass(Plain, [{
    key: "makeLine",
    value: function makeLine(node, path) {
      var _this = this;

      var getValue = Plain.getValue;
      var key = node.key,
          type = node.type,
          children = node.children;
      var oldValue = node.oldValue,
          newValue = node.newValue;
      var currentPath = [].concat(_toConsumableArray(path), [key]);
      var property = "Property '".concat(currentPath.join('.'), "'");
      var lines = {
        nested: function nested() {
          return _this.format(children, currentPath);
        },
        deleted: function deleted() {
          return "".concat(property, " was removed");
        },
        changed: function changed() {
          return "".concat(property, " was updated. From ").concat(getValue(oldValue), " to ").concat(getValue(newValue));
        },
        // eslint-disable-next-line object-shorthand
        added: function added() {
          return "".concat(property, " was added with value: ").concat(getValue(newValue));
        },
        unchanged: function unchanged() {
          return [];
        }
      };
      return lines[type]();
    }
  }, {
    key: "format",
    value: function format(nodes) {
      var _this2 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return nodes.flatMap(function (node) {
        return _this2.makeLine(node, path);
      }).join('\n');
    }
  }], [{
    key: "getValue",
    value: function getValue(value) {
      if ((0, _utils["default"])(value)) {
        return '[complex value]';
      }

      if (_lodash["default"].isArray(value)) {
        return "[".concat(value.join(', '), "]");
      }

      return typeof value === 'string' ? "'".concat(value, "'") : value;
    }
  }]);

  return Plain;
}();

exports["default"] = Plain;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXRzL1BsYWluLmpzIl0sIm5hbWVzIjpbIlBsYWluIiwib3B0aW9ucyIsInNwYWNlc1NpZ24iLCJzcGFjZXNDb3VudCIsIm5vZGUiLCJwYXRoIiwiZ2V0VmFsdWUiLCJrZXkiLCJ0eXBlIiwiY2hpbGRyZW4iLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiY3VycmVudFBhdGgiLCJwcm9wZXJ0eSIsImpvaW4iLCJsaW5lcyIsIm5lc3RlZCIsImZvcm1hdCIsImRlbGV0ZWQiLCJjaGFuZ2VkIiwiYWRkZWQiLCJ1bmNoYW5nZWQiLCJub2RlcyIsImZsYXRNYXAiLCJtYWtlTGluZSIsInZhbHVlIiwiXyIsImlzQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsSztBQUNuQixpQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBLFFBQ1hDLFVBRFcsR0FDaUJELE9BRGpCLENBQ1hDLFVBRFc7QUFBQSxRQUNDQyxXQURELEdBQ2lCRixPQURqQixDQUNDRSxXQUREO0FBRW5CLFNBQUtELFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDRDs7Ozs2QkFZUUMsSSxFQUFNQyxJLEVBQU07QUFBQTs7QUFBQSxVQUNYQyxRQURXLEdBQ0VOLEtBREYsQ0FDWE0sUUFEVztBQUFBLFVBR1hDLEdBSFcsR0FHYUgsSUFIYixDQUdYRyxHQUhXO0FBQUEsVUFHTkMsSUFITSxHQUdhSixJQUhiLENBR05JLElBSE07QUFBQSxVQUdBQyxRQUhBLEdBR2FMLElBSGIsQ0FHQUssUUFIQTtBQUFBLFVBSVhDLFFBSlcsR0FJWU4sSUFKWixDQUlYTSxRQUpXO0FBQUEsVUFJREMsUUFKQyxHQUlZUCxJQUpaLENBSURPLFFBSkM7QUFNbkIsVUFBTUMsV0FBVyxnQ0FBT1AsSUFBUCxJQUFhRSxHQUFiLEVBQWpCO0FBQ0EsVUFBTU0sUUFBUSx1QkFBZ0JELFdBQVcsQ0FBQ0UsSUFBWixDQUFpQixHQUFqQixDQUFoQixNQUFkO0FBRUEsVUFBTUMsS0FBSyxHQUFHO0FBQ1pDLFFBQUFBLE1BQU0sRUFBRTtBQUFBLGlCQUFNLEtBQUksQ0FBQ0MsTUFBTCxDQUFZUixRQUFaLEVBQXNCRyxXQUF0QixDQUFOO0FBQUEsU0FESTtBQUVaTSxRQUFBQSxPQUFPLEVBQUU7QUFBQSwyQkFBU0wsUUFBVDtBQUFBLFNBRkc7QUFHWk0sUUFBQUEsT0FBTyxFQUFFO0FBQUEsMkJBQVNOLFFBQVQsZ0NBQXVDUCxRQUFRLENBQUNJLFFBQUQsQ0FBL0MsaUJBQWdFSixRQUFRLENBQUNLLFFBQUQsQ0FBeEU7QUFBQSxTQUhHO0FBSVo7QUFDQVMsUUFBQUEsS0FBSyxFQUFFO0FBQUEsMkJBQVNQLFFBQVQsb0NBQTJDUCxRQUFRLENBQUNLLFFBQUQsQ0FBbkQ7QUFBQSxTQUxLO0FBTVpVLFFBQUFBLFNBQVMsRUFBRTtBQUFBLGlCQUFNLEVBQU47QUFBQTtBQU5DLE9BQWQ7QUFRQSxhQUFPTixLQUFLLENBQUNQLElBQUQsQ0FBTCxFQUFQO0FBQ0Q7OzsyQkFFTWMsSyxFQUFrQjtBQUFBOztBQUFBLFVBQVhqQixJQUFXLHVFQUFKLEVBQUk7QUFDdkIsYUFBT2lCLEtBQUssQ0FDVEMsT0FESSxDQUNJLFVBQUNuQixJQUFEO0FBQUEsZUFBVSxNQUFJLENBQUNvQixRQUFMLENBQWNwQixJQUFkLEVBQW9CQyxJQUFwQixDQUFWO0FBQUEsT0FESixFQUVKUyxJQUZJLENBRUMsSUFGRCxDQUFQO0FBR0Q7Ozs2QkFsQ2VXLEssRUFBTztBQUNyQixVQUFJLHVCQUFTQSxLQUFULENBQUosRUFBcUI7QUFDbkIsZUFBTyxpQkFBUDtBQUNEOztBQUNELFVBQUlDLG1CQUFFQyxPQUFGLENBQVVGLEtBQVYsQ0FBSixFQUFzQjtBQUNwQiwwQkFBV0EsS0FBSyxDQUFDWCxJQUFOLENBQVcsSUFBWCxDQUFYO0FBQ0Q7O0FBQ0QsYUFBTyxPQUFPVyxLQUFQLEtBQWlCLFFBQWpCLGNBQWdDQSxLQUFoQyxTQUEyQ0EsS0FBbEQ7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGFpbiB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHNwYWNlc1NpZ24sIHNwYWNlc0NvdW50IH0gPSBvcHRpb25zO1xuICAgIHRoaXMuc3BhY2VzU2lnbiA9IHNwYWNlc1NpZ247XG4gICAgdGhpcy5zcGFjZXNDb3VudCA9IHNwYWNlc0NvdW50O1xuICB9XG5cbiAgc3RhdGljIGdldFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuICdbY29tcGxleCB2YWx1ZV0nO1xuICAgIH1cbiAgICBpZiAoXy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGBbJHt2YWx1ZS5qb2luKCcsICcpfV1gO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IGAnJHt2YWx1ZX0nYCA6IHZhbHVlO1xuICB9XG5cbiAgbWFrZUxpbmUobm9kZSwgcGF0aCkge1xuICAgIGNvbnN0IHsgZ2V0VmFsdWUgfSA9IFBsYWluO1xuXG4gICAgY29uc3QgeyBrZXksIHR5cGUsIGNoaWxkcmVuIH0gPSBub2RlO1xuICAgIGNvbnN0IHsgb2xkVmFsdWUsIG5ld1ZhbHVlIH0gPSBub2RlO1xuXG4gICAgY29uc3QgY3VycmVudFBhdGggPSBbLi4ucGF0aCwga2V5XTtcbiAgICBjb25zdCBwcm9wZXJ0eSA9IGBQcm9wZXJ0eSAnJHtjdXJyZW50UGF0aC5qb2luKCcuJyl9J2A7XG5cbiAgICBjb25zdCBsaW5lcyA9IHtcbiAgICAgIG5lc3RlZDogKCkgPT4gdGhpcy5mb3JtYXQoY2hpbGRyZW4sIGN1cnJlbnRQYXRoKSxcbiAgICAgIGRlbGV0ZWQ6ICgpID0+IGAke3Byb3BlcnR5fSB3YXMgcmVtb3ZlZGAsXG4gICAgICBjaGFuZ2VkOiAoKSA9PiBgJHtwcm9wZXJ0eX0gd2FzIHVwZGF0ZWQuIEZyb20gJHtnZXRWYWx1ZShvbGRWYWx1ZSl9IHRvICR7Z2V0VmFsdWUobmV3VmFsdWUpfWAsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JqZWN0LXNob3J0aGFuZFxuICAgICAgYWRkZWQ6ICgpID0+IGAke3Byb3BlcnR5fSB3YXMgYWRkZWQgd2l0aCB2YWx1ZTogJHtnZXRWYWx1ZShuZXdWYWx1ZSl9YCxcbiAgICAgIHVuY2hhbmdlZDogKCkgPT4gW10sXG4gICAgfTtcbiAgICByZXR1cm4gbGluZXNbdHlwZV0oKTtcbiAgfVxuXG4gIGZvcm1hdChub2RlcywgcGF0aCA9IFtdKSB7XG4gICAgcmV0dXJuIG5vZGVzXG4gICAgICAuZmxhdE1hcCgobm9kZSkgPT4gdGhpcy5tYWtlTGluZShub2RlLCBwYXRoKSlcbiAgICAgIC5qb2luKCdcXG4nKTtcbiAgfVxufVxuIl19