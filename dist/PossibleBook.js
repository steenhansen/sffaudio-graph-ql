"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PossibleBook = function PossibleBook(options) {
  (0, _classCallCheck3.default)(this, PossibleBook);
  var author = options.author,
      title = options.title;

  this.author = author;
  this.title = title;
};

module.exports.PossibleBook = PossibleBook;