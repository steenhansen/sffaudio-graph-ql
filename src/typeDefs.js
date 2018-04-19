

const typeDefs = `        

  type Book { 
    author: String!
    title: String!
  }     
  
  type Possiblebook { 
    author: String
    title: String
  }     


  type Podcast { 
    description: String!     
    mp3: String!     
    length: String!       
    episode: Int! 
  }      

  interface SearchInterface {
    ID: String!  
  }
  
  type Issue { 
    url: String                  
    pages: Int        
    publisher: String
  }

  enum Kind { 
    AUDIOBOOK
    AUIDOBOOKREADALONG
    NEWRELEASESRECENTARRIVALS
    READALONG
    TALKTO
    TOPIC
  }
  
  type SffAudioMedia implements SearchInterface {  
    ID: String!
    possiblebook: Possiblebook              
    podcast: Podcast!                     
    sffaudio_post: String!  
    about: String
    narrator: String
  }

  type RsdMedia implements SearchInterface {   
    ID: String!
    book: Book!
    podcast: Podcast!
    rsd_post: String!  
    resource: String!
  }
    
  type PdfMedia implements SearchInterface{  
    ID: String!
    book: Book!
    issues: [Issue] 
  }
 
  type ArticlePage implements SearchInterface { 
    ID: String!
    headline: String!
    article_post: String!
  }     

  type MentionPage implements SearchInterface{ 
    ID: String!
    headline: String!
    mention_post: String!  
  }     

  type Query { 
    search_site_content(search_text: String!): [SearchInterface]
    rsd_media_content(get_rsd: String):[RsdMedia] 
    pdf_media_content(get_pdf:String): [PdfMedia]
    sffaudio_media_content(get_sffaudio:String): [SffAudioMedia]
    page_content(get_page:String):[ArticlePage]
  }




  schema {
    query: Query
  }
`;


module.exports.typeDefs = typeDefs;