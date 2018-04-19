

import {SiteContent} from './SiteContent';
import {SharedMedia,RSD_PDF_SFF_POST_EMPTY, RSD_PDF_SFF_START_DATA, RSD_PDF_SFF_END_DATA} from './SharedMedia';
import {Issue} from './Issue';

const HEROKU_PDF = 'pdf/table/'
const PDF_SEARCH_FIELDS = ['book author', 'book title']

import {Book} from './Book';

class PdfMedia extends SharedMedia{
  constructor(options) {
    super(options)
    this.issues = options.issues
    if (options.author !=='' && options.title!=='') {
      this.book = new Book(options)
    }
    
  }

  static jsonFactory(pdf_obj){
    const issue_1 = Issue.jsonFactory(pdf_obj, 1);
    const issue_2 = Issue.jsonFactory(pdf_obj, 2);
    const issue_3 = Issue.jsonFactory(pdf_obj, 3);
    const issue_4 = Issue.jsonFactory(pdf_obj, 4);
    const issues = Issue.fixIssues(issue_1, issue_2, issue_3, issue_4)
    let media_options = SharedMedia.mediaOptions(pdf_obj)
    media_options.episode = pdf_obj['episode number']
    media_options.issues = issues
    let a_pdf = new PdfMedia(media_options)
    return a_pdf
  }

  static fetchPdf(pdf_datasource, search_for, search_fields,exact_match){
    let the_datasource = pdf_datasource
    let jsonFactory = PdfMedia.jsonFactory
    let start_data=RSD_PDF_SFF_START_DATA
    let end_data = RSD_PDF_SFF_END_DATA
    let empty_data = RSD_PDF_SFF_POST_EMPTY
    let pdf_options = {the_datasource, search_for,jsonFactory, search_fields, start_data, end_data, empty_data, exact_match};
    return SiteContent.fetchContent(pdf_options)
  }


}

module.exports={
  HEROKU_PDF,
  PDF_SEARCH_FIELDS,
  PdfMedia
};

