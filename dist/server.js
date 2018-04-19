'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require('./schema');

var Schema = _interopRequireWildcard(_schema);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 3000;
var server = (0, _express2.default)();

var schemaFunction = Schema.schemaFunction || function () {
  return Schema.schema;
};
var schema = void 0;
var rootFunction = Schema.rootFunction || function () {
  return schema.rootValue;
};
var contextFunction = Schema.context || function (headers, secrets) {
  return (0, _assign2.default)({
    headers: headers
  }, secrets);
};

server.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request) {
    var context, rootValue;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!schema) {
              schema = schemaFunction(process.env);
            }
            _context.next = 3;
            return contextFunction(request.headers, process.env);

          case 3:
            context = _context.sent;
            _context.next = 6;
            return rootFunction(request.headers, process.env);

          case 6:
            rootValue = _context.sent;
            _context.next = 9;
            return schema;

          case 9:
            _context.t0 = _context.sent;
            _context.t1 = rootValue;
            _context.t2 = context;
            return _context.abrupt('return', {
              schema: _context.t0,
              rootValue: _context.t1,
              context: _context.t2,
              tracing: true
            });

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()));

server.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
  endpointURL: '/graphql',
  query: ''
}));

server.listen(process.env.PORT || 3000, function () {
  console.log('GraphQL Server is now running on http://localhost:' + PORT + '/graphql');
  console.log('View GraphiQL at http://localhost:' + PORT + '/graphiql');
});