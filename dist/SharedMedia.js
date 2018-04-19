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

var _SiteContent2 = require('./SiteContent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {Book} from './Book';


var RSD_PDF_SFF_POST_EMPTY = /\s*{\s*"data_list"\s*:\s*\[\s*\]\s*}\s*/;

var RSD_PDF_SFF_START_DATA = /{\s*"data_list"\s*:\s*\[/;
var RSD_PDF_SFF_END_DATA = /}\s*\]\s*,/;

var SharedMedia = function (_SiteContent) {
  (0, _inherits3.default)(SharedMedia, _SiteContent);

  function SharedMedia(options) {
    (0, _classCallCheck3.default)(this, SharedMedia);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SharedMedia.__proto__ || (0, _getPrototypeOf2.default)(SharedMedia)).call(this, options));

    _this.ID = _this.uniqueId(options.episode);
    //  if (options.author !=='' && options.title!=='') {
    //    this.book = new Book(options)
    // }
    return _this;
  }

  (0, _createClass3.default)(SharedMedia, null, [{
    key: 'mediaOptions',
    value: function mediaOptions(podcast_obj) {
      var author = void 0,
          title = void 0,
          podcast_options = void 0;
      if (podcast_obj['book author'] === '' && podcast_obj['book title'] === '') {
        podcast_options = {};
      } else {
        author = podcast_obj['book author'];
        title = podcast_obj['book title'];
        podcast_options = { author: author, title: title };
      }
      return podcast_options;
    }
  }]);
  return SharedMedia;
}(_SiteContent2.SiteContent);

module.exports = {
  RSD_PDF_SFF_POST_EMPTY: RSD_PDF_SFF_POST_EMPTY,
  RSD_PDF_SFF_START_DATA: RSD_PDF_SFF_START_DATA,
  RSD_PDF_SFF_END_DATA: RSD_PDF_SFF_END_DATA,
  SharedMedia: SharedMedia
};