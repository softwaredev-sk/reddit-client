import { createContext, useState } from 'react';
import { intialTrialSubs } from '../utils/utils';

export const SubredditContext = createContext();

function getFromLocalStorage(itemName, defaultValue = '[]') {
  intialTrialSubs();
  const items = localStorage.getItem(itemName) || defaultValue;
  return JSON.parse(items);
}

export default function SubredditContextProvider({ children }) {
  const [subredditList, setSubredditList] = useState(() =>
    getFromLocalStorage('subreddit')
  );

  const [favoritePosts, setFavoritePosts] = useState(() =>
    getFromLocalStorage('favoritePosts', '{}')
  );

  function addSubreddit(subname) {
    if (!subredditList.includes(subname)) {
      setSubredditList((prevSubredditList) => {
        return [subname, ...prevSubredditList];
      });
    }
  }

  function removeSubreddit(subname) {
    setSubredditList((prevSubredditList) =>
      prevSubredditList.filter((subList) => subList !== subname)
    );
  }

  function updateSubredditName(oldName, newName, index) {
    setSubredditList((prevSubredditList) =>
      prevSubredditList.map((sub, ind) =>
        ind === index && sub.toLowerCase() === oldName.toLowerCase()
          ? newName.slice(0, 22)
          : sub
      )
    );
  }

  function toggleFavoritePost(favPost) {
    let isFav = false;
    let favPosts = JSON.parse(localStorage.getItem('favoritePosts') || '{}');

    const postUrl = Object.keys(favPost)[0];

    if (favPosts[postUrl]) {
      delete favPosts[postUrl];

      removeFavoritePost(postUrl);
      isFav = false;
    } else {
      favPosts = { ...favPost, ...favPosts };
      addFavoritePost(favPost);
      isFav = true;
    }

    localStorage.setItem('favoritePosts', JSON.stringify(favPosts));

    return isFav;
  }

  function addFavoritePost(favPost) {
    setFavoritePosts((prevFavoritePosts) => {
      return { ...favPost, ...prevFavoritePosts };
    });
  }

  function removeFavoritePost(postUrl) {
    setFavoritePosts((prevFavoritePosts) => {
      delete prevFavoritePosts[postUrl];
      return prevFavoritePosts;
    });
  }

  const context = {
    subredditList,
    favoritePosts,
    addSubreddit,
    removeSubreddit,
    toggleFavoritePost,
    updateSubredditName,
  };

  return (
    <SubredditContext.Provider value={context}>
      {children}
    </SubredditContext.Provider>
  );
}
