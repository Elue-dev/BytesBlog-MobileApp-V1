export const parseText = (html) => {
  const htmlTagsRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
  const extractedText = html.replace(htmlTagsRegex, "");
  return extractedText;
};

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

export const SERVER_URL =
  "https://bytesblog-server-production.up.railway.app/api/v1";

export const CLOUD_NAME = "dwdsjbetu";
export const UPLOAD_PRESET = "oj28w9l5";

export const DEFAULT_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuoNupr5Y7ATlXqQbipRPidHyWTmqGv4dhNw&usqp=CAU";
