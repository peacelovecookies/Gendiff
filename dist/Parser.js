"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _yaml = _interopRequireDefault(require("yaml"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = _interopRequireDefault(require("./utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Parser = /*#__PURE__*/function () {
  function Parser() {
    var _options$sort;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Parser);

    this.isSortNeeded = (_options$sort = options.sort) !== null && _options$sort !== void 0 ? _options$sort : true;
  }

  _createClass(Parser, [{
    key: "getMeta",
    value: function getMeta(key, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          obj1 = _ref2[0],
          obj2 = _ref2[1];

      var oldValue = obj1[key];
      var newValue = obj2[key];

      if (!_lodash["default"].has(obj2, key)) {
        return {
          key: key,
          type: 'deleted',
          oldValue: oldValue
        };
      }

      if (!_lodash["default"].has(obj1, key)) {
        return {
          key: key,
          type: 'added',
          newValue: newValue
        };
      }

      if ((0, _utils["default"])(oldValue) && (0, _utils["default"])(newValue)) {
        return {
          key: key,
          type: 'nested',
          children: this.getAST(oldValue, newValue)
        };
      }

      if (_lodash["default"].isEqual(oldValue, newValue)) {
        return {
          key: key,
          type: 'unchanged',
          value: oldValue
        };
      } // eslint-disable-next-line object-curly-newline


      return {
        key: key,
        type: 'changed',
        oldValue: oldValue,
        newValue: newValue
      };
    }
  }, {
    key: "getAST",
    value: function getAST(fileBefore, fileAfter) {
      var _this = this;

      var isSortNeeded = this.isSortNeeded;

      var iter = function iter() {
        for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
          objects[_key] = arguments[_key];
        }

        var clone = _lodash["default"].cloneDeep(objects);

        var merged = _lodash["default"].merge.apply(_lodash["default"], _toConsumableArray(clone));

        var keys = isSortNeeded ? Object.keys(merged).sort() : Object.keys(merged);
        return keys.map(function (key) {
          return _this.getMeta(key, objects);
        });
      };

      return iter(fileBefore, fileAfter);
    }
  }], [{
    key: "parse",
    value: function parse(filepath) {
      var currentDir = process.cwd();

      var fullpath = _path["default"].resolve(currentDir, filepath);

      var ext = _path["default"].extname(filepath);

      var parser = this.parsers[ext];

      if (!parser) {
        var exts = Object.keys(Parser.parsers).join(', ');
        var err = new Error();
        err.name = 'UNSUPPORTED_EXTENSION';
        err.message = "Currently we support only ".concat(exts);
        throw err;
      }

      var file = _fs["default"].readFileSync(fullpath, 'utf-8');

      return parser(file);
    }
  }]);

  return Parser;
}();

exports["default"] = Parser;

_defineProperty(Parser, "parsers", {
  '.json': JSON.parse,
  '.yaml': _yaml["default"].parse,
  '.yml': _yaml["default"].parse
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QYXJzZXIuanMiXSwibmFtZXMiOlsiUGFyc2VyIiwib3B0aW9ucyIsImlzU29ydE5lZWRlZCIsInNvcnQiLCJrZXkiLCJvYmoxIiwib2JqMiIsIm9sZFZhbHVlIiwibmV3VmFsdWUiLCJfIiwiaGFzIiwidHlwZSIsImNoaWxkcmVuIiwiZ2V0QVNUIiwiaXNFcXVhbCIsInZhbHVlIiwiZmlsZUJlZm9yZSIsImZpbGVBZnRlciIsIml0ZXIiLCJvYmplY3RzIiwiY2xvbmUiLCJjbG9uZURlZXAiLCJtZXJnZWQiLCJtZXJnZSIsImtleXMiLCJPYmplY3QiLCJtYXAiLCJnZXRNZXRhIiwiZmlsZXBhdGgiLCJjdXJyZW50RGlyIiwicHJvY2VzcyIsImN3ZCIsImZ1bGxwYXRoIiwicGF0aCIsInJlc29sdmUiLCJleHQiLCJleHRuYW1lIiwicGFyc2VyIiwicGFyc2VycyIsImV4dHMiLCJqb2luIiwiZXJyIiwiRXJyb3IiLCJuYW1lIiwibWVzc2FnZSIsImZpbGUiLCJmcyIsInJlYWRGaWxlU3luYyIsIkpTT04iLCJwYXJzZSIsIllBTUwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE07QUFDbkIsb0JBQTBCO0FBQUE7O0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUN4QixTQUFLQyxZQUFMLG9CQUFvQkQsT0FBTyxDQUFDRSxJQUE1Qix5REFBb0MsSUFBcEM7QUFDRDs7Ozs0QkFFT0MsRyxRQUFtQjtBQUFBO0FBQUEsVUFBYkMsSUFBYTtBQUFBLFVBQVBDLElBQU87O0FBQ3pCLFVBQU1DLFFBQVEsR0FBR0YsSUFBSSxDQUFDRCxHQUFELENBQXJCO0FBQ0EsVUFBTUksUUFBUSxHQUFHRixJQUFJLENBQUNGLEdBQUQsQ0FBckI7O0FBQ0EsVUFBSSxDQUFDSyxtQkFBRUMsR0FBRixDQUFNSixJQUFOLEVBQVlGLEdBQVosQ0FB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LElBQTNDO0FBQ0EsY0FBTUUsR0FBTjtBQUNEOztBQUNELFVBQU1JLElBQUksR0FBR0MsZUFBR0MsWUFBSCxDQUFnQmYsUUFBaEIsRUFBMEIsT0FBMUIsQ0FBYjs7QUFFQSxhQUFPSyxNQUFNLENBQUNRLElBQUQsQ0FBYjtBQUNEOzs7Ozs7OztnQkEzRGtCN0MsTSxhQXFDRjtBQUNmLFdBQVNnRCxJQUFJLENBQUNDLEtBREM7QUFFZixXQUFTQyxpQkFBS0QsS0FGQztBQUdmLFVBQVFDLGlCQUFLRDtBQUhFLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgWUFNTCBmcm9tICd5YW1sJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyc2VyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5pc1NvcnROZWVkZWQgPSBvcHRpb25zLnNvcnQgPz8gdHJ1ZTtcbiAgfVxuXG4gIGdldE1ldGEoa2V5LCBbb2JqMSwgb2JqMl0pIHtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IG9iajFba2V5XTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IG9iajJba2V5XTtcbiAgICBpZiAoIV8uaGFzKG9iajIsIGtleSkpIHtcbiAgICAgIHJldHVybiB7IGtleSwgdHlwZTogJ2RlbGV0ZWQnLCBvbGRWYWx1ZSB9O1xuICAgIH1cbiAgICBpZiAoIV8uaGFzKG9iajEsIGtleSkpIHtcbiAgICAgIHJldHVybiB7IGtleSwgdHlwZTogJ2FkZGVkJywgbmV3VmFsdWUgfTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KG9sZFZhbHVlKSAmJiBpc09iamVjdChuZXdWYWx1ZSkpIHtcbiAgICAgIHJldHVybiB7IGtleSwgdHlwZTogJ25lc3RlZCcsIGNoaWxkcmVuOiB0aGlzLmdldEFTVChvbGRWYWx1ZSwgbmV3VmFsdWUpIH07XG4gICAgfVxuICAgIGlmIChfLmlzRXF1YWwob2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgcmV0dXJuIHsga2V5LCB0eXBlOiAndW5jaGFuZ2VkJywgdmFsdWU6IG9sZFZhbHVlIH07XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxuICAgIHJldHVybiB7IGtleSwgdHlwZTogJ2NoYW5nZWQnLCBvbGRWYWx1ZSwgbmV3VmFsdWUgfTtcbiAgfVxuXG4gIGdldEFTVChmaWxlQmVmb3JlLCBmaWxlQWZ0ZXIpIHtcbiAgICBjb25zdCB7IGlzU29ydE5lZWRlZCB9ID0gdGhpcztcbiAgICBjb25zdCBpdGVyID0gKC4uLm9iamVjdHMpID0+IHtcbiAgICAgIGNvbnN0IGNsb25lID0gXy5jbG9uZURlZXAob2JqZWN0cyk7XG4gICAgICBjb25zdCBtZXJnZWQgPSBfLm1lcmdlKC4uLmNsb25lKTtcbiAgICAgIGNvbnN0IGtleXMgPSBpc1NvcnROZWVkZWQgPyBPYmplY3Qua2V5cyhtZXJnZWQpLnNvcnQoKSA6IE9iamVjdC5rZXlzKG1lcmdlZCk7XG4gICAgICByZXR1cm4ga2V5c1xuICAgICAgICAubWFwKChrZXkpID0+IHRoaXMuZ2V0TWV0YShrZXksIG9iamVjdHMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGl0ZXIoZmlsZUJlZm9yZSwgZmlsZUFmdGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZXJzID0ge1xuICAgICcuanNvbic6IEpTT04ucGFyc2UsXG4gICAgJy55YW1sJzogWUFNTC5wYXJzZSxcbiAgICAnLnltbCc6IFlBTUwucGFyc2UsXG4gIH07XG5cbiAgc3RhdGljIHBhcnNlKGZpbGVwYXRoKSB7XG4gICAgY29uc3QgY3VycmVudERpciA9IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3QgZnVsbHBhdGggPSBwYXRoLnJlc29sdmUoY3VycmVudERpciwgZmlsZXBhdGgpO1xuICAgIGNvbnN0IGV4dCA9IHBhdGguZXh0bmFtZShmaWxlcGF0aCk7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5wYXJzZXJzW2V4dF07XG5cbiAgICBpZiAoIXBhcnNlcikge1xuICAgICAgY29uc3QgZXh0cyA9IE9iamVjdC5rZXlzKFBhcnNlci5wYXJzZXJzKS5qb2luKCcsICcpO1xuICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgICBlcnIubmFtZSA9ICdVTlNVUFBPUlRFRF9FWFRFTlNJT04nO1xuICAgICAgZXJyLm1lc3NhZ2UgPSBgQ3VycmVudGx5IHdlIHN1cHBvcnQgb25seSAke2V4dHN9YDtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZzLnJlYWRGaWxlU3luYyhmdWxscGF0aCwgJ3V0Zi04Jyk7XG5cbiAgICByZXR1cm4gcGFyc2VyKGZpbGUpO1xuICB9XG59XG4iXX0=