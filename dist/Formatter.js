"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Pretty = _interopRequireDefault(require("./formats/Pretty.js"));

var _Plain = _interopRequireDefault(require("./formats/Plain.js"));

var _Json = _interopRequireDefault(require("./formats/Json.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Formatter = /*#__PURE__*/function () {
  function Formatter(options) {
    _classCallCheck(this, Formatter);

    var _options$format = options.format,
        format = _options$format === void 0 ? 'pretty' : _options$format,
        spacesCount = options.spacesCount,
        _options$spacesSign = options.spacesSign,
        spacesSign = _options$spacesSign === void 0 ? ' ' : _options$spacesSign;
    var formatters = {
      json: _Json["default"],
      pretty: _Pretty["default"],
      plain: _Plain["default"]
    };
    this.formatters = Object.keys(formatters);
    this.FormatterClass = formatters[format];
    this.options = {
      spacesSign: spacesSign,
      spacesCount: spacesCount
    };
  }

  _createClass(Formatter, [{
    key: "stringify",
    value: function stringify(ast) {
      var formatters = this.formatters,
          FormatterClass = this.FormatterClass,
          options = this.options;

      if (!FormatterClass) {
        var err = new Error();
        err.name = 'INVALID_FORMAT';
        err.message = "Use one of the following formats: ".concat(formatters.join(', '));
        throw err;
      }

      var formatter = new FormatterClass(options);
      return formatter.format(ast);
    }
  }]);

  return Formatter;
}();

exports["default"] = Formatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Gb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiRm9ybWF0dGVyIiwib3B0aW9ucyIsImZvcm1hdCIsInNwYWNlc0NvdW50Iiwic3BhY2VzU2lnbiIsImZvcm1hdHRlcnMiLCJqc29uIiwiSnNvbiIsInByZXR0eSIsIlByZXR0eSIsInBsYWluIiwiUGxhaW4iLCJPYmplY3QiLCJrZXlzIiwiRm9ybWF0dGVyQ2xhc3MiLCJhc3QiLCJlcnIiLCJFcnJvciIsIm5hbWUiLCJtZXNzYWdlIiwiam9pbiIsImZvcm1hdHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTO0FBQ25CLHFCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQUEsMEJBQzBDQSxPQUQxQyxDQUNYQyxNQURXO0FBQUEsUUFDWEEsTUFEVyxnQ0FDRixRQURFO0FBQUEsUUFDUUMsV0FEUixHQUMwQ0YsT0FEMUMsQ0FDUUUsV0FEUjtBQUFBLDhCQUMwQ0YsT0FEMUMsQ0FDcUJHLFVBRHJCO0FBQUEsUUFDcUJBLFVBRHJCLG9DQUNrQyxHQURsQztBQUVuQixRQUFNQyxVQUFVLEdBQUc7QUFDakJDLE1BQUFBLElBQUksRUFBRUMsZ0JBRFc7QUFFakJDLE1BQUFBLE1BQU0sRUFBRUMsa0JBRlM7QUFHakJDLE1BQUFBLEtBQUssRUFBRUM7QUFIVSxLQUFuQjtBQU1BLFNBQUtOLFVBQUwsR0FBa0JPLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUixVQUFaLENBQWxCO0FBQ0EsU0FBS1MsY0FBTCxHQUFzQlQsVUFBVSxDQUFDSCxNQUFELENBQWhDO0FBQ0EsU0FBS0QsT0FBTCxHQUFlO0FBQUVHLE1BQUFBLFVBQVUsRUFBVkEsVUFBRjtBQUFjRCxNQUFBQSxXQUFXLEVBQVhBO0FBQWQsS0FBZjtBQUNEOzs7OzhCQUVTWSxHLEVBQUs7QUFBQSxVQUNMVixVQURLLEdBQ21DLElBRG5DLENBQ0xBLFVBREs7QUFBQSxVQUNPUyxjQURQLEdBQ21DLElBRG5DLENBQ09BLGNBRFA7QUFBQSxVQUN1QmIsT0FEdkIsR0FDbUMsSUFEbkMsQ0FDdUJBLE9BRHZCOztBQUViLFVBQUksQ0FBQ2EsY0FBTCxFQUFxQjtBQUNuQixZQUFNRSxHQUFHLEdBQUcsSUFBSUMsS0FBSixFQUFaO0FBQ0FELFFBQUFBLEdBQUcsQ0FBQ0UsSUFBSixHQUFXLGdCQUFYO0FBQ0FGLFFBQUFBLEdBQUcsQ0FBQ0csT0FBSiwrQ0FBbURkLFVBQVUsQ0FBQ2UsSUFBWCxDQUFnQixJQUFoQixDQUFuRDtBQUNBLGNBQU1KLEdBQU47QUFDRDs7QUFDRCxVQUFNSyxTQUFTLEdBQUcsSUFBSVAsY0FBSixDQUFtQmIsT0FBbkIsQ0FBbEI7QUFFQSxhQUFPb0IsU0FBUyxDQUFDbkIsTUFBVixDQUFpQmEsR0FBakIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByZXR0eSBmcm9tICcuL2Zvcm1hdHMvUHJldHR5LmpzJztcbmltcG9ydCBQbGFpbiBmcm9tICcuL2Zvcm1hdHMvUGxhaW4uanMnO1xuaW1wb3J0IEpzb24gZnJvbSAnLi9mb3JtYXRzL0pzb24uanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXR0ZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgY29uc3QgeyBmb3JtYXQgPSAncHJldHR5Jywgc3BhY2VzQ291bnQsIHNwYWNlc1NpZ24gPSAnICcgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgZm9ybWF0dGVycyA9IHtcbiAgICAgIGpzb246IEpzb24sXG4gICAgICBwcmV0dHk6IFByZXR0eSxcbiAgICAgIHBsYWluOiBQbGFpbixcbiAgICB9O1xuXG4gICAgdGhpcy5mb3JtYXR0ZXJzID0gT2JqZWN0LmtleXMoZm9ybWF0dGVycyk7XG4gICAgdGhpcy5Gb3JtYXR0ZXJDbGFzcyA9IGZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IHNwYWNlc1NpZ24sIHNwYWNlc0NvdW50IH07XG4gIH1cblxuICBzdHJpbmdpZnkoYXN0KSB7XG4gICAgY29uc3QgeyBmb3JtYXR0ZXJzLCBGb3JtYXR0ZXJDbGFzcywgb3B0aW9ucyB9ID0gdGhpcztcbiAgICBpZiAoIUZvcm1hdHRlckNsYXNzKSB7XG4gICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICAgIGVyci5uYW1lID0gJ0lOVkFMSURfRk9STUFUJztcbiAgICAgIGVyci5tZXNzYWdlID0gYFVzZSBvbmUgb2YgdGhlIGZvbGxvd2luZyBmb3JtYXRzOiAke2Zvcm1hdHRlcnMuam9pbignLCAnKX1gO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgRm9ybWF0dGVyQ2xhc3Mob3B0aW9ucyk7XG5cbiAgICByZXR1cm4gZm9ybWF0dGVyLmZvcm1hdChhc3QpO1xuICB9XG59XG4iXX0=