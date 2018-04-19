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

var _Book = require('./Book');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEROKU_RSD = 'rsd/table/';
var RSD_SEARCH_FIELDS = ['book author', 'book title', 'narrator', 'participants', 'about'];

var RsdMedia = function (_PodcastMedia) {
  (0, _inherits3.default)(RsdMedia, _PodcastMedia);

  function RsdMedia(options) {
    (0, _classCallCheck3.default)(this, RsdMedia);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RsdMedia.__proto__ || (0, _getPrototypeOf2.default)(RsdMedia)).call(this, options));

    _this.rsd_post = options.rsd_post;
    _this.resource = options.resource;

    if (options.author !== '' && options.title !== '') {
      _this.book = new _Book.Book(options);
    }
    return _this;
  }

  (0, _createClass3.default)(RsdMedia, null, [{
    key: 'jsonFactory',
    value: function jsonFactory(rsd_obj) {
      var podcast_options = _PodcastMedia2.PodcastMedia.podcastOptions(rsd_obj);
      podcast_options.rsd_post = rsd_obj['post link'];
      podcast_options.description = rsd_obj['podcast description'];
      if (rsd_obj['pdf link'] !== '') {
        podcast_options.resource = rsd_obj['pdf link'];
      } else {
        podcast_options.resource = rsd_obj['video link'];
      }
      var an_rsd = new RsdMedia(podcast_options);
      return an_rsd;
    }
  }, {
    key: 'fetchRsd',
    value: function fetchRsd(rsd_datasource, search_for, search_fields, exact_match) {
      var the_datasource = rsd_datasource;
      var jsonFactory = RsdMedia.jsonFactory;
      var start_data = _SharedMedia.RSD_PDF_SFF_START_DATA;
      var end_data = _SharedMedia.RSD_PDF_SFF_END_DATA;
      var empty_data = _SharedMedia.RSD_PDF_SFF_POST_EMPTY;
      var rsd_options = { the_datasource: the_datasource, search_for: search_for, jsonFactory: jsonFactory, search_fields: search_fields, start_data: start_data, end_data: end_data, empty_data: empty_data, exact_match: exact_match };
      return _SiteContent.SiteContent.fetchContent(rsd_options);
    }
  }]);
  return RsdMedia;
}(_PodcastMedia2.PodcastMedia);

module.exports = {
  HEROKU_RSD: HEROKU_RSD,
  RSD_SEARCH_FIELDS: RSD_SEARCH_FIELDS,
  RsdMedia: RsdMedia
};