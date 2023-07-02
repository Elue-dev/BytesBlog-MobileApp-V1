import { createContext, useContext, useReducer, useState } from "react";
import { PostReducer } from "./PostReducer";

const PostContext = createContext();

export function usePosts() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const [pageStep, setPageStep] = useState(1);
  const [state, dispatch] = useReducer(PostReducer, {
    filteredPosts: [],
    currentPost: {},
  });

  function filterPostsByKeyword(posts, keyword) {
    dispatch({
      type: "FILTER_POSTS",
      payload: { posts, keyword },
    });
  }

  function setCurrentPost(postId, postSlug) {
    dispatch({
      type: "SET_CURRENT_POST",
      payload: { postId, postSlug },
    });
  }

  const values = {
    filteredPosts: state.filteredPosts,
    currentPost: state.currentPost,
    filterPostsByKeyword,
    setCurrentPost,
    pageStep,
    setPageStep,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}
