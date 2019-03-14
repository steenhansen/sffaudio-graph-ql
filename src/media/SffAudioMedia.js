
var {RSD_PDF_SFF_POST_EMPTY, RSD_PDF_SFF_START_DATA, RSD_PDF_SFF_END_DATA} = require('./SharedMedia');


var {PodcastMedia} = require('./PodcastMedia');


var {SiteContent} = require('../SiteContent');


var {PossibleBook} = require('./PossibleBook');



const HEROKU_PODCASTS = 'podcast/table/'   
const SFF_AUDIO_SEARCH_FIELDS = ['book author', 'book title', 'narrator', 'participants', 'about']

class SffAudioMedia extends PodcastMedia{
  constructor(options) {
    super(options)
    this.sffaudio_post = options.sffaudio_post;
    if (options.narrator){
      this.narrator = options.narrator;
    }
    if (options.about){
      this.about = options.about;
    }
    if (options.author !=='' && options.title!=='') {
      this.possiblebook = new PossibleBook(options)
    }
  }

  static jsonFactory(rsd_obj){
    let podcast_options = PodcastMedia.podcastOptions(rsd_obj)
    podcast_options.sffaudio_post = rsd_obj['post_link']
    podcast_options.description = rsd_obj['kind']
    podcast_options.narrator = rsd_obj['narrator']
    podcast_options.about = rsd_obj['about']
    let an_rsd = new SffAudioMedia(podcast_options)
    return an_rsd
  }



  static fetchSffAudio(sffaudio_datasource, search_for, search_fields,exact_match){
    let the_datasource = sffaudio_datasource

    let jsonFactory = SffAudioMedia.jsonFactory
    let start_data=RSD_PDF_SFF_START_DATA
    let end_data = RSD_PDF_SFF_END_DATA
    let empty_data = RSD_PDF_SFF_POST_EMPTY
    let sff_options = {the_datasource, search_for,jsonFactory, search_fields, start_data, end_data, empty_data, exact_match};
    return SiteContent.fetchContent(sff_options)
  }

}


module.exports= {
  HEROKU_PODCASTS,
  SFF_AUDIO_SEARCH_FIELDS,
  SffAudioMedia
}

