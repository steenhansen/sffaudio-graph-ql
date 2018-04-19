

var fs = require('fs');

function buildTestFetch(urls_to_text){
  const test_fetch= function test_fetch(actual_url) {
    const urls_match_fn = () => {
      const local_test_file = urls_to_text[actual_url]
      const test_text =fs.readFileSync(local_test_file, 'utf8');
      return test_text
    }
    const urls_mismatch_err = actual_url + ' not in urls_to_text : ' + urls_to_text
    const urls_do_not_match_fn = () => {throw urls_mismatch_err}

    return new Promise((resolve, reject) => {
	    if (actual_url in urls_to_text){
        process.nextTick(resolve({text: urls_match_fn}))
	    }else{
		     process.nextTick(resolve({text: urls_do_not_match_fn}))
	    }
    })
  }
  return test_fetch
}

module.exports.buildTestFetch = buildTestFetch;