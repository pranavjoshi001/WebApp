const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(id) {
    console.log('hi');
    console.log(id);
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=r5oV4OPffoSbhrmou9GEGA`)
        .then((response) => {
          console.log(response);
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
              console.log(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
          console.log(error);
        });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();