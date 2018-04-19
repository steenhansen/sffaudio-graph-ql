

var fs = require('fs');

function buildSingleFetch(local_test_file){
  const test_fetch= function test_fetch() {
    const return_text_fn = () => {
      const test_text =fs.readFileSync(local_test_file, 'utf8');
      return test_text
    }

    return new Promise((resolve, reject) => {
        process.nextTick(resolve({text: return_text_fn}))
    })
  }
  return test_fetch
}

module.exports.buildSingleFetch = buildSingleFetch;