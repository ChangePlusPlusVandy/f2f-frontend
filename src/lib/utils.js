/**
 * Parse csv file into JSON object
 * @param {Array} data csv file
 * @returns {Object} JSON version of the file
 */
export const importCSVToJSON = (data) => {
  try {
    if (data?.length === 0) return {};
    let keys = {};
    for (let i = 0; i < data[0].length; ++i) {
      keys[i.toString()] = data[0][i];
    }
    let res = [];
    for (let r = 1; r < data.length; ++r) {
      let obj = {};
      for (let c = 0; c < data[r].length; ++c) {
        var content = data[r][c];
        // convert the string to array with spliterator "/"
        if (content.includes("/")) {
          content = content.split("/");
        }
        obj[keys[c.toString()]] = content;
      }
      res.push(obj);
    }
    return res;
  } catch (err) {
    return "error";
  }
};

/**
 * Construct the url for GET request
 * @param {string} url original url
 * @param {Object} params params to be appended to url
 * @returns {String} url appended with params
 */
export const formGetRequest = (url, params = {}) => {
  let res = url + "?";
  const keys = Object.keys(params);
  for (const key of keys) {
    if (params.hasOwnProperty(key)) {
      res += key + "=" + params[key] + "&";
    }
  }
  return res.substring(0, res.length - 1);
};
