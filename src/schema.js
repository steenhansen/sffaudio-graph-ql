
var { makeExecutableSchema, addResolveFunctionsToSchema } = require('graphql-tools');


var { typeDefs } = require('./typeDefs');



var fetch = require('node-fetch');


var the_resolvers = require('./resolvers');



//var { resolveContent, searchResolve, rsdResolve, pdfResolve, sffAudioResolve, pageResolve } = the_resolvers(fetch);
var { resolveContent, searchResolve, rsdResolve, sffAudioResolve, pageResolve } = the_resolvers(fetch);



const resolvers = {
  Query: {
    search_site_content: searchResolve,
    rsd_media_content: rsdResolve,
    //pdf_media_content: pdfResolve,
    sffaudio_media_content: sffAudioResolve,
    page_content: pageResolve
  },

};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});


const resolverMap = {
  SearchInterface: {
    __resolveType(obj, context, info) {
      return resolveContent(obj);
    },
  },
};

addResolveFunctionsToSchema(schema, resolverMap);

function context(headers, secrets) {
  return {
    headers,
    secrets,
  };
};

module.exports = {
  schema,
  context
};
