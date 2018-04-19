
import {PdfMedia, PDF_SEARCH_FIELDS, HEROKU_PDF } from '../src/PdfMedia';
import {buildTestFetch} from './testFetch';
import {SFFAUDIO_HEROKU} from '../src/constants';

const urls_to_text = {
  'https://sffaudio.herokuapp.com/pdf/table/' : "./tests/table_pdf.html"
}
const testFetch = buildTestFetch(urls_to_text)
global.fetch = testFetch


import {pdf_search_expected} from './pdf_search_expected';




var search_for= 'Grasshopper'
var exact_match = false
const pdf_datasource = new URL(HEROKU_PDF, SFFAUDIO_HEROKU);


it('works with promises', () => {
  expect.assertions(1);
  var pdf_data = PdfMedia.fetchPdf(pdf_datasource, search_for, PDF_SEARCH_FIELDS, exact_match);
  return pdf_data.then(data => expect(data).toEqual(pdf_search_expected));
});



















