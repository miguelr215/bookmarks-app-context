import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import PropTypes from 'prop-types';
import './BookmarkItem.css';

function deleteBookmarkRequest(bookmarkId, callback){
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
      <li className='BookmarkItem'>
        <div className='BookmarkItem__row'>
          <h3 className='BookmarkItem__title'>
            <a
              href={props.url}
              target='_blank'
              rel='noopener noreferrer'>
              {props.title}
            </a>
          </h3>
          <Rating value={props.rating} />
        </div>
        <p className='BookmarkItem__description'>
          {props.description}
        </p>
        <div className='BookmarkItem__buttons'>
          <button
            className='BookmarkItem__description'
            onClick={() => {
              deleteBookmarkRequest(
                props.id,
                context.deleteBookmark,
              )
            }}
          >
            Delete
          </button>
        </div>
      </li>
      )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
  rating: 1,
  description: ''
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  // url: PropTypes.string.isRequired,
  url: (props, propName, componentName) => {
    // get the value of the prop
    const prop = props[propName];
    // do the is required check
    if(!prop){
      return new Error(`${propName} is required in ${componentName}. Validation failed.`);
    }
    // check the type
    if(typeof prop != 'string'){
      return new Error(`Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`);
    }
    // do the custom check here
    // use a simple regex (regular expression)
    if(prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))){
      return new Error(`Invalid prop, ${propName} must be minimum 5 characters and start with http(s)://`);
    }
  },
  rating: PropTypes.number,
  description: PropTypes.string
}
