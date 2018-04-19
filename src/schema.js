
import { makeExecutableSchema, addResolveFunctionsToSchema } from 'graphql-tools';

import {typeDefs} from './typeDefs';

import fetch from 'node-fetch';
import the_resolvers from './resolvers';
var {resolveContent, searchResolve, rsdResolve, pdfResolve, sffAudioResolve, pageResolve}  = the_resolvers(fetch);



const resolvers = {
  Query: {
    search_site_content:searchResolve,
    rsd_media_content: rsdResolve,
    pdf_media_content: pdfResolve,
    sffaudio_media_content:sffAudioResolve,
    page_content:pageResolve
  }

};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


const resolverMap = {
  SearchInterface: {
    __resolveType(obj, context, info){
      return resolveContent(obj)
    },
  },
};

addResolveFunctionsToSchema(schema, resolverMap);

export function context(headers, secrets) {
  return {
    headers,
    secrets,
  };
};
