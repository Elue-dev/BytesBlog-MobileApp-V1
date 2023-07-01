import { createContext, useContext, useReducer } from "react";
import { PostReducer } from "./PostReducer";

const PostContext = createContext();

export function usePosts() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(PostReducer, {
    filteredPosts: null,
  });

  function filterPostsByKeyword(posts, keyword) {
    dispatch({
      type: "FILTER_POSTS",
      payload: { posts, keyword },
    });
  }

  const values = {
    filteredPosts: state.filteredPosts,
    filterPostsByKeyword,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}
