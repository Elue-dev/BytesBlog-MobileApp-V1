export function PostReducer(state, action) {
  const { keyword, posts } = action.payload;

  switch (action.type) {
    case "FILTER_POSTS":
      return {
        ...state,
        filteredPosts:
          keyword === "All"
            ? posts
            : posts.filter((post) => post.categories?.includes(keyword)),
      };
    default:
      return state;
  }
}
