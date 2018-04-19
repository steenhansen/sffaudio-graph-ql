
import {SiteContent} from './SiteContent';

const RSD_PDF_SFF_POST_EMPTY= /\s*{\s*"data_list"\s*:\s*\[\s*\]\s*}\s*/

const RSD_PDF_SFF_START_DATA = /{\s*"data_list"\s*:\s*\[/
const RSD_PDF_SFF_END_DATA = /}\s*\]\s*,/

class SharedMedia extends SiteContent{
  constructor(options) {
    super(options)
    this.ID = this.uniqueId(options.episode)
  }

  static mediaOptions(podcast_obj){
    let author, title, podcast_options
    if (podcast_obj['book author']==='' && podcast_obj['book title']==='' ) {
      podcast_options = {}
    }else{
      author = podcast_obj['book author']
      title = podcast_obj['book title']
      podcast_options = {author, title};
    }
    return podcast_options
  }

}

module.exports= {
  RSD_PDF_SFF_POST_EMPTY,
  RSD_PDF_SFF_START_DATA,
  RSD_PDF_SFF_END_DATA,
  SharedMedia
}