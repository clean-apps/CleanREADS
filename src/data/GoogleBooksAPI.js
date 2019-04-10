import fetch from "cross-fetch";

class GoogleBooksAPI {
  async search_books(text, callback) {
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + text;
    fetch(url)
      .then(response => response.json())
      .then(body => {
        if (body.items) {
          let formatted_items = this.format_api(body.items, null, false);
          callback(formatted_items);
        } else {
          callback([]);
        }
      })
      .catch(err => {
        console.error(err);
        callback([]);
      });
  }

  async search_book_by_volid(vol_id, callback) {
    var url = "https://www.googleapis.com/books/v1/volumes/" + vol_id;
    fetch(url)
      .then(response => response.json())
      .then(body => {
        if (body) {
          let formatted_item = this.format_item(body, null, false);
          callback(formatted_item);
        } else {
          callback([]);
        }
      })
      .catch(err => {
        console.error(err);
        callback([]);
      });
  }

  format_item(each_book, list_name, is_fav) {
    return {
      vol_id: each_book.id,
      title: each_book.volumeInfo.title,
      authors: each_book.volumeInfo.authors
        ? each_book.volumeInfo.authors.join()
        : "",
      short_desc: each_book.searchInfo ? each_book.searchInfo.textSnippet : "",
      desc: each_book.volumeInfo.description,
      thumbnail: each_book.volumeInfo.imageLinks
        ? each_book.volumeInfo.imageLinks.smallThumbnail
        : "",
      rating: each_book.volumeInfo.averageRating,
      category: each_book.volumeInfo.categories
        ? each_book.volumeInfo.categories.join()
        : "",
      gbooks_url: each_book.volumeInfo.previewLink,
      list_name: list_name,
      is_fav: is_fav
    };
  }

  format_api(items, list_name, is_fav) {
    return items.map(each_book => {
      return this.format_item(each_book, list_name, is_fav);
    });
  }
}

export default GoogleBooksAPI;
