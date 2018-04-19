

import {SiteContent} from './SiteContent';


const POST_EMPTY= /\s*{\s*"posts"\s*:\s*\[\s*\]\s*}\s*/


const POST_START_DATA = /{\s*"posts"\s*:\s*\[/
const POST_END_DATA = /}\s*\]/


class WebPage extends SiteContent {
  constructor(options) {
    super(options)
    this.headline = options.headline;
    this.ID = 'POST_' + options.ID
  }

  static jsonFactory(rsd_obj){
    let  ID, headline, options,article_post,mention_post
    ID = rsd_obj['ID']
    headline = rsd_obj['headline']
    if(rsd_obj['postUrl']){
      article_post = rsd_obj['postUrl']
      options = {ID, headline, article_post};
      let article_page = new ArticlePage(options)
      return article_page
    }else{
      mention_post = rsd_obj['tagUrl']
      options = {ID, headline, mention_post};
      let mention_page = new MentionPage(options)
      return mention_page
    }
  }

  static fetchWebPages(page_datasource, search_for, search_fields,exact_match){
    let the_datasource = page_datasource
    let jsonFactory = WebPage.jsonFactory
    let start_data=POST_START_DATA
    let end_data = POST_END_DATA
    let empty_data = POST_EMPTY
    let podcast_options = {the_datasource, search_for,jsonFactory, search_fields, start_data, end_data, empty_data, exact_match};
    return SiteContent.fetchContent(podcast_options)
  }
}

class MentionPage extends WebPage {
  constructor (options) {
    super(options)
    this.mention_post = options.mention_post;
  }
}

class ArticlePage extends WebPage{
  constructor(options) {
    super(options)
    this.article_post = options.article_post;
  }
}

module.exports.WebPage = WebPage;

