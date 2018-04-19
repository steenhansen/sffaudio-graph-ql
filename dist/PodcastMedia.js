'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _SharedMedia2 = require('./SharedMedia');

var _Podcast = require('./Podcast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PodcastMedia = function (_SharedMedia) {
  (0, _inherits3.default)(PodcastMedia, _SharedMedia);

  function PodcastMedia(options) {
    (0, _classCallCheck3.default)(this, PodcastMedia);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PodcastMedia.__proto__ || (0, _getPrototypeOf2.default)(PodcastMedia)).call(this, options));

    _this.podcast = new _Podcast.Podcast(options);
    return _this;
  }

  (0, _createClass3.default)(PodcastMedia, null, [{
    key: 'podcastOptions',
    value: function podcastOptions(podcast_obj) {
      var media_options = _SharedMedia2.SharedMedia.mediaOptions(podcast_obj);
      media_options.mp3 = podcast_obj['mp3_url'];
      media_options.length = podcast_obj['hh_mm'];
      media_options.episode = podcast_obj['episode_number'];
      return media_options;
    }
  }]);
  return PodcastMedia;
}(_SharedMedia2.SharedMedia);

module.exports.PodcastMedia = PodcastMedia;