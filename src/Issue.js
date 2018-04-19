
class Issue {
  constructor(options) {
    let {url, pages, publisher} = options
    this.url = url;
    this.pages = pages;
    this.publisher = publisher;
  }

  static jsonFactory(pdf_obj, version){
    let url, pages, country, info

    url = pdf_obj['pdf link ' + version];
    if (typeof url === 'undefined'){
      return {};
    }
    pages = pdf_obj['pdf page count ' + version];
    if (typeof pages === 'undefined'){
      pages = ''
    }
    country = pdf_obj['pdf country ' + version];
    if (typeof country === 'undefined'){
      country = ''
    }
    info = pdf_obj['pdf info '+version];
    if (typeof info === 'undefined'){
      info = ''
    }
    var publisher = info + ' ' + country
    let options = {url, pages, publisher};
    let an_issue = new Issue(options)
    return an_issue;
  }

  static fixIssues(issue_1, issue_2, issue_3, issue_4){
    if (issue_2.url ==null){
      return [issue_1]
    }else if (issue_3.url ==null){
      return [issue_1, issue_2]
    }else if (issue_4.url ==null){
      return [issue_1, issue_2, issue_3]
    }else{
      return [issue_1, issue_2, issue_3, issue_4]
    }
  }

}

module.exports.Issue = Issue;