const request = require('request-promise');

module.exports = {
  GetUserDetails: (acessToken) => {
    return new Promise((resolve, reject) => {

      request({
        url: "https://google.com",
        method: "GET",
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        resolve(JSON.parse(response));
      })
      .catch((response) => {
        reject('Meetup API Error: ', error);
      });
    })
  }
}
