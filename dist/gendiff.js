"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Parser = _interopRequireDefault(require("./Parser.js"));

var _Formatter = _interopRequireDefault(require("./Formatter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(filepath1, filepath2) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var fileBefore = _Parser["default"].parse(filepath1);

  var fileAfter = _Parser["default"].parse(filepath2);

  var parser = new _Parser["default"](options);
  var ast = parser.getAST(fileBefore, fileAfter);
  var formatter = new _Formatter["default"](options);
  return formatter.stringify(ast);
};

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZW5kaWZmLmpzIl0sIm5hbWVzIjpbImZpbGVwYXRoMSIsImZpbGVwYXRoMiIsIm9wdGlvbnMiLCJmaWxlQmVmb3JlIiwiUGFyc2VyIiwicGFyc2UiLCJmaWxlQWZ0ZXIiLCJwYXJzZXIiLCJhc3QiLCJnZXRBU1QiLCJmb3JtYXR0ZXIiLCJGb3JtYXR0ZXIiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztlQUVlLGtCQUFDQSxTQUFELEVBQVlDLFNBQVosRUFBd0M7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFDckQsTUFBTUMsVUFBVSxHQUFHQyxtQkFBT0MsS0FBUCxDQUFhTCxTQUFiLENBQW5COztBQUNBLE1BQU1NLFNBQVMsR0FBR0YsbUJBQU9DLEtBQVAsQ0FBYUosU0FBYixDQUFsQjs7QUFFQSxNQUFNTSxNQUFNLEdBQUcsSUFBSUgsa0JBQUosQ0FBV0YsT0FBWCxDQUFmO0FBQ0EsTUFBTU0sR0FBRyxHQUFHRCxNQUFNLENBQUNFLE1BQVAsQ0FBY04sVUFBZCxFQUEwQkcsU0FBMUIsQ0FBWjtBQUVBLE1BQU1JLFNBQVMsR0FBRyxJQUFJQyxxQkFBSixDQUFjVCxPQUFkLENBQWxCO0FBRUEsU0FBT1EsU0FBUyxDQUFDRSxTQUFWLENBQW9CSixHQUFwQixDQUFQO0FBQ0QsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZXIgZnJvbSAnLi9QYXJzZXIuanMnO1xuaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuL0Zvcm1hdHRlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IChmaWxlcGF0aDEsIGZpbGVwYXRoMiwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IGZpbGVCZWZvcmUgPSBQYXJzZXIucGFyc2UoZmlsZXBhdGgxKTtcbiAgY29uc3QgZmlsZUFmdGVyID0gUGFyc2VyLnBhcnNlKGZpbGVwYXRoMik7XG5cbiAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcihvcHRpb25zKTtcbiAgY29uc3QgYXN0ID0gcGFyc2VyLmdldEFTVChmaWxlQmVmb3JlLCBmaWxlQWZ0ZXIpO1xuXG4gIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBGb3JtYXR0ZXIob3B0aW9ucyk7XG5cbiAgcmV0dXJuIGZvcm1hdHRlci5zdHJpbmdpZnkoYXN0KTtcbn07XG4iXX0=