'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Issue = function () {
  function Issue(options) {
    (0, _classCallCheck3.default)(this, Issue);
    var url = options.url,
        pages = options.pages,
        publisher = options.publisher;

    this.url = url;
    this.pages = pages;
    this.publisher = publisher;
  }

  (0, _createClass3.default)(Issue, null, [{
    key: 'jsonFactory',
    value: function jsonFactory(pdf_obj, version) {
      var url = void 0,
          pages = void 0,
          country = void 0,
          info = void 0;

      url = pdf_obj['pdf link ' + version];
      if (typeof url === 'undefined') {
        return {};
      }
      pages = pdf_obj['pdf page count ' + version];
      if (typeof pages === 'undefined') {
        pages = '';
      }
      country = pdf_obj['pdf country ' + version];
      if (typeof country === 'undefined') {
        country = '';
      }
      info = pdf_obj['pdf info ' + version];
      if (typeof info === 'undefined') {
        info = '';
      }
      var publisher = info + ' ' + country;
      var options = { url: url, pages: pages, publisher: publisher };
      var an_issue = new Issue(options);
      return an_issue;
    }
  }, {
    key: 'fixIssues',
    value: function fixIssues(issue_1, issue_2, issue_3, issue_4) {
      if (issue_2.url == null) {
        return [issue_1];
      } else if (issue_3.url == null) {
        return [issue_1, issue_2];
      } else if (issue_4.url == null) {
        return [issue_1, issue_2, issue_3];
      } else {
        return [issue_1, issue_2, issue_3, issue_4];
      }
    }
  }]);
  return Issue;
}();

module.exports.Issue = Issue;