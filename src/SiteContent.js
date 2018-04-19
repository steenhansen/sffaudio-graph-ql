
const DATA_SPLIT = /}\s*,/
const DATA_FIX_END = '},'

class SiteContent {
  uniqueId(the_id) {
    const unique_id = this.constructor.name + '_'+ the_id
    return unique_id
  }

  static contentToJson(content_objects){
    var content_jsons =[]
    content_objects.forEach(function(content_object) {
      const content_json = content_object.propertiesToJson()
      content_jsons.push(content_json)
    })
    return content_jsons

  }

  propertiesToJson(){
    var no_types =JSON.stringify(this)
    var json_obj = JSON.parse(no_types)
    return json_obj
  }

  static splitContent(body, start_data,end_data){
    var header_and_data_end = body.split(start_data)
    var data_and_end=header_and_data_end[1]
    var data_only = data_and_end.split(end_data)
    var data_list = data_only[0] + DATA_FIX_END
    var data_arr = data_list.split(DATA_SPLIT)
    data_arr.pop()
    return data_arr
  }
  static jsonContent(an_rsd){
    var fixed_rsd = an_rsd +'}'
    var rsd_obj = JSON.parse(fixed_rsd)
    return rsd_obj
  }

  static filterContent(media_obj, search_in, search_for, jsonFactory, exact_match){
    let content_object
    search_for = search_for.toLowerCase()
    if (search_for==='') {
      content_object = jsonFactory(media_obj)
    }else if ( exact_match && (search_for ==search_in) ){
      content_object = jsonFactory(media_obj)
    }else if ( !exact_match && search_in.includes(search_for)){
      content_object = jsonFactory(media_obj)
    }else {
      content_object = false
    }
    return content_object
  }

  static parseContent(body, options){
    let {search_for,jsonFactory, search_fields, start_data, end_data, empty_data, exact_match} = options
    if (body.match(empty_data)){
      return []
    }
      var data_arr = SiteContent.splitContent(body, start_data, end_data)
      var rsd_list = []
      data_arr.forEach(function(an_rsd) {
        var rsd_obj = SiteContent.jsonContent(an_rsd)
        var search_in = ''
        for (const value of search_fields) {
          search_in += rsd_obj[value]
        }
        search_in = search_in.toLowerCase()
        var content_object = SiteContent.filterContent(rsd_obj, search_in, search_for, jsonFactory, exact_match)
        if (content_object) {
          rsd_list.push(content_object)
        }
      })
    return rsd_list
  }

  static fetchContent(options){
    let media_datasource = options.the_datasource

    var the_url = media_datasource.href
    var data_from_url = fetch(the_url)                 // N.B. under test this call goes to testFetch() instead
          .then(res => res.text())
          .then(res_text => SiteContent.parseContent(res_text, options))
      return data_from_url
  }
 

}

module.exports.SiteContent = SiteContent;