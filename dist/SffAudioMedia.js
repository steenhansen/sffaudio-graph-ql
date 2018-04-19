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

var _SharedMedia = require('./SharedMedia');

var _PodcastMedia2 = require('./PodcastMedia');

var _SiteContent = require('./SiteContent');

var _PossibleBook = require('./PossibleBook');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEROKU_PODCASTS = 'podcast/table/';
var SFF_AUDIO_SEARCH_FIELDS = ['book author', 'book title', 'narrator', 'participants', 'about'];

var SffAudioMedia = function (_PodcastMedia) {
  (0, _inherits3.default)(SffAudioMedia, _PodcastMedia);

  function SffAudioMedia(options) {
    (0, _classCallCheck3.default)(this, SffAudioMedia);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SffAudioMedia.__proto__ || (0, _getPrototypeOf2.default)(SffAudioMedia)).call(this, options));

    _this.sffaudio_post = options.sffaudio_post;
    if (options.narrator) {
      _this.narrator = options.narrator;
    }
    if (options.about) {
      _this.about = options.about;
    }
    if (options.author !== '' && options.title !== '') {
      _this.possiblebook = new _PossibleBook.PossibleBook(options);
    }
    return _this;
  }

  (0, _createClass3.default)(SffAudioMedia, null, [{
    key: 'jsonFactory',
    value: function jsonFactory(rsd_obj) {
      var podcast_options = _PodcastMedia2.PodcastMedia.podcastOptions(rsd_obj);
      podcast_options.sffaudio_post = rsd_obj['post_link'];
      podcast_options.description = rsd_obj['kind'];
      podcast_options.narrator = rsd_obj['narrator'];
      podcast_options.about = rsd_obj['about'];
      var an_rsd = new SffAudioMedia(podcast_options);
      return an_rsd;
    }
  }, {
    key: 'fetchSffAudio',
    value: function fetchSffAudio(sffaudio_datasource, search_for, search_fields, exact_match) {
      var the_datasource = sffaudio_datasource;

      var jsonFactory = SffAudioMedia.jsonFactory;
      var start_data = _SharedMedia.RSD_PDF_SFF_START_DATA;
      var end_data = _SharedMedia.RSD_PDF_SFF_END_DATA;
      var empty_data = _SharedMedia.RSD_PDF_SFF_POST_EMPTY;
      var sff_options = { the_datasource: the_datasource, search_for: search_for, jsonFactory: jsonFactory, search_fields: search_fields, start_data: start_data, end_data: end_data, empty_data: empty_data, exact_match: exact_match };
      return _SiteContent.SiteContent.fetchContent(sff_options);
    }
  }]);
  return SffAudioMedia;
}(_PodcastMedia2.PodcastMedia);

module.exports = {
  HEROKU_PODCASTS: HEROKU_PODCASTS,
  SFF_AUDIO_SEARCH_FIELDS: SFF_AUDIO_SEARCH_FIELDS,
  SffAudioMedia: SffAudioMedia
};