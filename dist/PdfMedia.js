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

var _SiteContent = require('./SiteContent');

var _SharedMedia2 = require('./SharedMedia');

var _Issue = require('./Issue');

var _Book = require('./Book');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEROKU_PDF = 'pdf/table/';
var PDF_SEARCH_FIELDS = ['book author', 'book title'];

var PdfMedia = function (_SharedMedia) {
  (0, _inherits3.default)(PdfMedia, _SharedMedia);

  function PdfMedia(options) {
    (0, _classCallCheck3.default)(this, PdfMedia);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PdfMedia.__proto__ || (0, _getPrototypeOf2.default)(PdfMedia)).call(this, options));

    _this.issues = options.issues;

    if (options.author !== '' && options.title !== '') {
      _this.book = new _Book.Book(options);
    }

    return _this;
  }

  (0, _createClass3.default)(PdfMedia, null, [{
    key: 'jsonFactory',
    value: function jsonFactory(pdf_obj) {
      var issue_1 = _Issue.Issue.jsonFactory(pdf_obj, 1);
      var issue_2 = _Issue.Issue.jsonFactory(pdf_obj, 2);
      var issue_3 = _Issue.Issue.jsonFactory(pdf_obj, 3);
      var issue_4 = _Issue.Issue.jsonFactory(pdf_obj, 4);
      var issues = _Issue.Issue.fixIssues(issue_1, issue_2, issue_3, issue_4);
      var media_options = _SharedMedia2.SharedMedia.mediaOptions(pdf_obj);
      media_options.episode = pdf_obj['episode number'];
      media_options.issues = issues;
      var a_pdf = new PdfMedia(media_options);
      return a_pdf;
    }
  }, {
    key: 'fetchPdf',
    value: function fetchPdf(pdf_datasource, search_for, search_fields, exact_match) {
      var the_datasource = pdf_datasource;
      var jsonFactory = PdfMedia.jsonFactory;
      var start_data = _SharedMedia2.RSD_PDF_SFF_START_DATA;
      var end_data = _SharedMedia2.RSD_PDF_SFF_END_DATA;
      var empty_data = _SharedMedia2.RSD_PDF_SFF_POST_EMPTY;
      var pdf_options = { the_datasource: the_datasource, search_for: search_for, jsonFactory: jsonFactory, search_fields: search_fields, start_data: start_data, end_data: end_data, empty_data: empty_data, exact_match: exact_match };
      return _SiteContent.SiteContent.fetchContent(pdf_options);
    }
  }]);
  return PdfMedia;
}(_SharedMedia2.SharedMedia);

module.exports = {
  HEROKU_PDF: HEROKU_PDF,
  PDF_SEARCH_FIELDS: PDF_SEARCH_FIELDS,
  PdfMedia: PdfMedia
};