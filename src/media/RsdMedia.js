
var {RSD_PDF_SFF_POST_EMPTY, RSD_PDF_SFF_START_DATA, RSD_PDF_SFF_END_DATA} = require('./SharedMedia');


var {PodcastMedia} = require('./PodcastMedia');


var {SiteContent} = require('../SiteContent');


var {Book} = require('./Book');


const HEROKU_RSD = 'rsd/table/'
const RSD_SEARCH_FIELDS = ['book author', 'book title', 'narrator', 'participants', 'about']

class RsdMedia extends PodcastMedia{
  constructor(options) {
    super(options)
    this.rsd_post = options.rsd_post;
    this.resource = options.resource;

    if (options.author !=='' && options.title!=='') {
      this.book = new Book(options)
    }
  }

  static jsonFactory(rsd_obj){
    let podcast_options = PodcastMedia.podcastOptions(rsd_obj)
    podcast_options.rsd_post = rsd_obj['post link']
    podcast_options.description = rsd_obj['podcast description']
    if (rsd_obj['pdf link']!==''){
      podcast_options.resource = rsd_obj['pdf link']
    }else{
      podcast_options.resource = rsd_obj['video link']
    }
    let an_rsd = new RsdMedia(podcast_options)
    return an_rsd
  }


  static fetchRsd(rsd_datasource, search_for, search_fields, exact_match){
    let the_datasource = rsd_datasource
    let jsonFactory = RsdMedia.jsonFactory
    let start_data=RSD_PDF_SFF_START_DATA
    let end_data = RSD_PDF_SFF_END_DATA
    let empty_data = RSD_PDF_SFF_POST_EMPTY
    let rsd_options = {the_datasource, search_for,jsonFactory, search_fields, start_data, end_data, empty_data, exact_match};
    return SiteContent.fetchContent(rsd_options)
  }

}
module.exports={
  HEROKU_RSD,
  RSD_SEARCH_FIELDS,
  RsdMedia
};

