export const get_all_books_action = () => dispatch => {
    dispatch({
      type: 'GET_ALL_BOOKS',
      payload: ''
    })
  }

export const get_fav_books_action = () => dispatch => {
    dispatch({
      type: 'GET_FAV_BOOKS',
      payload: ''
    })
  }