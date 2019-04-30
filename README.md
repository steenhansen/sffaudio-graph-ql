# sffaudio-graph-ql

This is an in-browser [GraphiQl search for 'Clarke'](https://sffaudio-graph-ql.herokuapp.com/graphiql?operationName=serch_ql&query=query%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%20%20%20%20%20%20...%20on%20ArticlePage%7B%20ID%20headline%20article_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20MentionPage%7B%20ID%20headline%20mention_post%20%20%20%7D%2C%0A%20%20%20%20...%20on%20RsdMedia%20%7B%20ID%20rsd_post%20resource%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20book%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D%2C%0A%20%20%20%20...%20on%20SffAudioMedia%20%7B%20ID%20sffaudio_post%20narrator%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20possiblebook%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%20%20%7D%2C%0A%20%20%20%20...%20on%20PdfMedia%20%7B%20ID%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20book%7B%20author%20title%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20issues%20%7B%20url%20publisher%20pages%20%7D%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=%7B%0A%20%20%22search_parameter%22%3A%20%22Clarke%22%0A%7D) 
combining three MongoDb databases as well as the standard WordPress MySQL database into one datasource.

The same material as seen in WordPress, under the graph widget, in list form on https://www.sffaudio.com/search/?search_term=clarke. 

The page URL will change to https://www.sffaudio.com/search/?author=arthur-c-clarke because that happens to be the first author matching 'clarke'.

The returned json from [GraphiQl for a search for 'Clarke'](https://sffaudio-graph-ql.herokuapp.com/graphql?operationName=serch_ql&query=%0Aquery%20serch_ql(%24search_parameter%3A%20String!)%20%7B%0A%20search_site_content(search_text%3A%20%24search_parameter)%20%7B%0A%20...%20on%20ArticlePage%7B%20ID%20headline%20article_post%20%7D%2C%0A%20...%20on%20MentionPage%7B%20ID%20headline%20mention_post%20%7D%2C%0A%20...%20on%20RsdMedia%20%7B%20ID%20rsd_post%20resource%0A%20book%20%7B%20author%20title%20%7D%0A%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%7D%2C%0A%20...%20on%20SffAudioMedia%20%7B%20ID%20sffaudio_post%20narrator%20about%0A%20possiblebook%7B%20author%20title%20%7D%0A%20podcast%20%7B%20description%20mp3%20length%20episode%20%7D%20%7D%2C%0A%20...%20on%20PdfMedia%20%7B%20ID%0A%20book%20%7B%20author%20title%20%7D%0A%20issues%20%7B%20url%20publisher%20pages%20%7D%20%7D%0A%20%7D%0A%7D%20&variables=%7B%20%22search_parameter%22%3A%20%22clarke%22%7D).

### Quick start guide

	npm install

	npm start  // start node with watchers

	npm test  // run Jest tests

### Deploy

	npm run build

	npm run serve
	
	http://localhost:3000/media-radio-lists

