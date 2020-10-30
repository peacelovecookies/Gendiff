"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = _interopRequireDefault(require("../utils.js"));

var _Parser = _interopRequireDefault(require("../Parser.js"));

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

var Pretty = /*#__PURE__*/function () {
  function Pretty(options) {
    _classCallCheck(this, Pretty);

    var spacesSign = options.spacesSign,
        spacesCount = options.spacesCount,
        sort = options.sort;
    this.spacesSign = spacesSign;
    this.spacesCount = spacesCount !== null && spacesCount !== void 0 ? spacesCount : 4;
    this.sort = sort;
  }

  _createClass(Pretty, [{
    key: "getValue",
    value: function getValue(value, depth) {
      if ((0, _utils["default"])(value)) {
        var sort = this.sort;
        var ast = new _Parser["default"]({
          sort: sort
        }).getAST(value, value);
        return this.format(ast, depth);
      }

      return _lodash["default"].isArray(value) ? "[".concat(value.join(', '), "]") : value;
    }
  }, {
    key: "makeLine",
    value: function makeLine(node, depth) {
      var _this = this;

      var spacesSign = this.spacesSign,
          spacesCount = this.spacesCount;
      var getValue = this.getValue.bind(this);
      var key = node.key,
          type = node.type,
          children = node.children;
      var value = node.value,
          oldValue = node.oldValue,
          newValue = node.newValue;
      var nextDepth = depth + 1;
      var identSize = depth * spacesCount;
      var deepIdentSize = identSize + spacesCount / 2;
      var deepIdent = spacesSign.repeat(deepIdentSize);
      var filler = spacesSign.repeat(2);
      var lines = {
        nested: function nested() {
          return "".concat(deepIdent).concat(filler).concat(key, ": ").concat(_this.format(children, nextDepth));
        },
        deleted: function deleted() {
          return "".concat(deepIdent, "- ").concat(key, ": ").concat(getValue(oldValue, nextDepth));
        },
        added: function added() {
          return "".concat(deepIdent, "+ ").concat(key, ": ").concat(getValue(newValue, nextDepth));
        },
        changed: function changed() {
          return [this.deleted(), this.added()].join('\n');
        },
        unchanged: function unchanged() {
          return "".concat(deepIdent).concat(filler).concat(key, ": ").concat(getValue(value, nextDepth));
        }
      };
      return lines[type]();
    }
  }, {
    key: "format",
    value: function format(nodes) {
      var _this2 = this;

      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var spacesSign = this.spacesSign,
          spacesCount = this.spacesCount;
      var identSize = depth * spacesCount;
      var currentIdent = spacesSign.repeat(identSize);
      var lines = nodes.map(function (child) {
        return _this2.makeLine(child, depth);
      });
      return ['{'].concat(_toConsumableArray(lines), ["".concat(currentIdent, "}")]).join('\n');
    }
  }]);

  return Pretty;
}();

exports["default"] = Pretty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXRzL1ByZXR0eS5qcyJdLCJuYW1lcyI6WyJQcmV0dHkiLCJvcHRpb25zIiwic3BhY2VzU2lnbiIsInNwYWNlc0NvdW50Iiwic29ydCIsInZhbHVlIiwiZGVwdGgiLCJhc3QiLCJQYXJzZXIiLCJnZXRBU1QiLCJmb3JtYXQiLCJfIiwiaXNBcnJheSIsImpvaW4iLCJub2RlIiwiZ2V0VmFsdWUiLCJiaW5kIiwia2V5IiwidHlwZSIsImNoaWxkcmVuIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsIm5leHREZXB0aCIsImlkZW50U2l6ZSIsImRlZXBJZGVudFNpemUiLCJkZWVwSWRlbnQiLCJyZXBlYXQiLCJmaWxsZXIiLCJsaW5lcyIsIm5lc3RlZCIsImRlbGV0ZWQiLCJhZGRlZCIsImNoYW5nZWQiLCJ1bmNoYW5nZWQiLCJub2RlcyIsImN1cnJlbnRJZGVudCIsIm1hcCIsImNoaWxkIiwibWFrZUxpbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTtBQUNuQixrQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBLFFBQ1hDLFVBRFcsR0FDdUJELE9BRHZCLENBQ1hDLFVBRFc7QUFBQSxRQUNDQyxXQURELEdBQ3VCRixPQUR2QixDQUNDRSxXQUREO0FBQUEsUUFDY0MsSUFEZCxHQUN1QkgsT0FEdkIsQ0FDY0csSUFEZDtBQUVuQixTQUFLRixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CLGFBQW1CQSxXQUFuQixjQUFtQkEsV0FBbkIsR0FBa0MsQ0FBbEM7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDRDs7Ozs2QkFFUUMsSyxFQUFPQyxLLEVBQU87QUFDckIsVUFBSSx1QkFBU0QsS0FBVCxDQUFKLEVBQXFCO0FBQUEsWUFDWEQsSUFEVyxHQUNGLElBREUsQ0FDWEEsSUFEVztBQUVuQixZQUFNRyxHQUFHLEdBQUcsSUFB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QUFDQyxLQUFEO0FBQUEsZUFBVyxNQUFJLENBQUNDLFFBQUwsQ0FBY0QsS0FBZCxFQUFxQi9CLEtBQXJCLENBQVg7QUFBQSxPQURPLENBQWQ7QUFHQSxhQUFPLENBQ0wsR0FESyw0QkFFRnNCLEtBRkUsY0FHRk8sWUFIRSxTQUlMdEIsSUFKSyxDQUlBLElBSkEsQ0FBUDtBQUtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgUGFyc2VyIGZyb20gJy4uL1BhcnNlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXR0eSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHNwYWNlc1NpZ24sIHNwYWNlc0NvdW50LCBzb3J0IH0gPSBvcHRpb25zO1xuICAgIHRoaXMuc3BhY2VzU2lnbiA9IHNwYWNlc1NpZ247XG4gICAgdGhpcy5zcGFjZXNDb3VudCA9IHNwYWNlc0NvdW50ID8/IDQ7XG4gICAgdGhpcy5zb3J0ID0gc29ydDtcbiAgfVxuXG4gIGdldFZhbHVlKHZhbHVlLCBkZXB0aCkge1xuICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIGNvbnN0IHsgc29ydCB9ID0gdGhpcztcbiAgICAgIGNvbnN0IGFzdCA9IG5ldyBQYXJzZXIoeyBzb3J0IH0pLmdldEFTVCh2YWx1ZSwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KGFzdCwgZGVwdGgpO1xuICAgIH1cbiAgICByZXR1cm4gXy5pc0FycmF5KHZhbHVlKSA/IGBbJHt2YWx1ZS5qb2luKCcsICcpfV1gIDogdmFsdWU7XG4gIH1cblxuICBtYWtlTGluZShub2RlLCBkZXB0aCkge1xuICAgIGNvbnN0IHsgc3BhY2VzU2lnbiwgc3BhY2VzQ291bnQgfSA9IHRoaXM7XG4gICAgY29uc3QgZ2V0VmFsdWUgPSB0aGlzLmdldFZhbHVlLmJpbmQodGhpcyk7XG5cbiAgICBjb25zdCB7IGtleSwgdHlwZSwgY2hpbGRyZW4gfSA9IG5vZGU7XG4gICAgY29uc3QgeyB2YWx1ZSwgb2xkVmFsdWUsIG5ld1ZhbHVlIH0gPSBub2RlO1xuXG4gICAgY29uc3QgbmV4dERlcHRoID0gZGVwdGggKyAxO1xuICAgIGNvbnN0IGlkZW50U2l6ZSA9IGRlcHRoICogc3BhY2VzQ291bnQ7XG4gICAgY29uc3QgZGVlcElkZW50U2l6ZSA9IGlkZW50U2l6ZSArIHNwYWNlc0NvdW50IC8gMjtcbiAgICBjb25zdCBkZWVwSWRlbnQgPSBzcGFjZXNTaWduLnJlcGVhdChkZWVwSWRlbnRTaXplKTtcbiAgICBjb25zdCBmaWxsZXIgPSBzcGFjZXNTaWduLnJlcGVhdCgyKTtcblxuICAgIGNvbnN0IGxpbmVzID0ge1xuICAgICAgbmVzdGVkOiAoKSA9PiBgJHtkZWVwSWRlbnR9JHtmaWxsZXJ9JHtrZXl9OiAke3RoaXMuZm9ybWF0KGNoaWxkcmVuLCBuZXh0RGVwdGgpfWAsXG4gICAgICBkZWxldGVkOiAoKSA9PiBgJHtkZWVwSWRlbnR9LSAke2tleX06ICR7Z2V0VmFsdWUob2xkVmFsdWUsIG5leHREZXB0aCl9YCxcbiAgICAgIGFkZGVkOiAoKSA9PiBgJHtkZWVwSWRlbnR9KyAke2tleX06ICR7Z2V0VmFsdWUobmV3VmFsdWUsIG5leHREZXB0aCl9YCxcbiAgICAgIGNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5kZWxldGVkKCksIHRoaXMuYWRkZWQoKV0uam9pbignXFxuJyk7XG4gICAgICB9LFxuICAgICAgdW5jaGFuZ2VkOiAoKSA9PiBgJHtkZWVwSWRlbnR9JHtmaWxsZXJ9JHtrZXl9OiAke2dldFZhbHVlKHZhbHVlLCBuZXh0RGVwdGgpfWAsXG4gICAgfTtcbiAgICByZXR1cm4gbGluZXNbdHlwZV0oKTtcbiAgfVxuXG4gIGZvcm1hdChub2RlcywgZGVwdGggPSAwKSB7XG4gICAgY29uc3QgeyBzcGFjZXNTaWduLCBzcGFjZXNDb3VudCB9ID0gdGhpcztcbiAgICBjb25zdCBpZGVudFNpemUgPSBkZXB0aCAqIHNwYWNlc0NvdW50O1xuICAgIGNvbnN0IGN1cnJlbnRJZGVudCA9IHNwYWNlc1NpZ24ucmVwZWF0KGlkZW50U2l6ZSk7XG4gICAgY29uc3QgbGluZXMgPSBub2Rlc1xuICAgICAgLm1hcCgoY2hpbGQpID0+IHRoaXMubWFrZUxpbmUoY2hpbGQsIGRlcHRoKSk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgJ3snLFxuICAgICAgLi4ubGluZXMsXG4gICAgICBgJHtjdXJyZW50SWRlbnR9fWAsXG4gICAgXS5qb2luKCdcXG4nKTtcbiAgfVxufVxuIl19