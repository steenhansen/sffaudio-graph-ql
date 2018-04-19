'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;
exports.context = context;

var _graphqlTools = require('graphql-tools');

var _typeDefs = require('./typeDefs');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _the_resolvers = (0, _resolvers2.default)(_nodeFetch2.default),
    resolveContent = _the_resolvers.resolveContent,
    searchResolve = _the_resolvers.searchResolve,
    rsdResolve = _the_resolvers.rsdResolve,
    pdfResolve = _the_resolvers.pdfResolve,
    sffAudioResolve = _the_resolvers.sffAudioResolve,
    pageResolve = _the_resolvers.pageResolve;

var resolvers = {
  Query: {
    search_site_content: searchResolve,
    rsd_media_content: rsdResolve,
    pdf_media_content: pdfResolve,
    sffaudio_media_content: sffAudioResolve,
    page_content: pageResolve
  }

};

var schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _typeDefs.typeDefs,
  resolvers: resolvers
});

var resolverMap = {
  SearchInterface: {
    __resolveType: function __resolveType(obj, context, info) {
      return resolveContent(obj);
    }
  }
};

(0, _graphqlTools.addResolveFunctionsToSchema)(schema, resolverMap);

function context(headers, secrets) {
  return {
    headers: headers,
    secrets: secrets
  };
};