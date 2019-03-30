import fetch from "cross-fetch";

class GoogleBooksAPI {
  async search_books(text, callback) {
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + text;
    fetch(url)
      .then(response => response.json())
      .then(body => {
        if (body.items) {
          callback(body.items);
        } else {
          callback([]);
        }
      })
      .catch(err => {
        console.error(err);
        callback([]);
      });
  }
}

export default GoogleBooksAPI;
