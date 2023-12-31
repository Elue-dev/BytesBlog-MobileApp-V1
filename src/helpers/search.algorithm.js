export function getRelevantPosts(postsArray, query) {
  const relevantPosts = postsArray?.filter(
    (post) =>
      post.title?.toLowerCase()?.includes(query.toLowerCase()) ||
      post.author?.firstName.toLowerCase()?.includes(query.toLowerCase()) ||
      post.author?.lastName.toLowerCase()?.includes(query.toLowerCase()) ||
      (post.author?.firstName + " " + post.author?.lastName)
        .toLowerCase()
        ?.includes(query.toLowerCase()) ||
      (post.author?.lastName + " " + post.author?.firstName)
        .toLowerCase()
        ?.includes(query.toLowerCase()) ||
      post?.title
        ?.toLowerCase()
        ?.includes(query.split(" ")[0]?.toLowerCase()) ||
      post?.title
        ?.toLowerCase()
        ?.includes(query.split(" ")[1]?.toLowerCase()) ||
      post?.categories?.includes(query) ||
      query.split(" ").includes(post?.title) ||
      (post.author?.firstName + " " + post.author?.lastName)
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      (post.author?.lastName + " " + post.author?.firstName)
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      post.categories
        ?.map((category) => category.toLowerCase())
        .includes(query.toLowerCase())
  );

  return relevantPosts;
}
