export const parseText = (html) => {
  const htmlTagsRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
  const extractedText = html.replace(htmlTagsRegex, "");
  return extractedText;
};
