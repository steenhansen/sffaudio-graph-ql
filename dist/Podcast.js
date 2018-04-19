"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Podcast = function Podcast(options) {
  (0, _classCallCheck3.default)(this, Podcast);
  var description = options.description,
      mp3 = options.mp3,
      length = options.length,
      episode = options.episode;

  this.description = description;
  this.mp3 = mp3;
  this.length = length;
  this.episode = episode;
};

module.exports.Podcast = Podcast;