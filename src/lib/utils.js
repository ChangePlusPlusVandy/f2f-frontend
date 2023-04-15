import { COLORS_ARR } from "./constants";

/**
 * @return a random color from the array
 */
export const getRandomColor = () => {
  return COLORS_ARR[Math.floor(Math.random() * COLORS_ARR.length)];
};

/**
 * @param {String} string the string to be assessed
 * @return {Object} a json object containing the website links and text descriptions
 */
export const separateWebsiteLink = (string) => {
  const parts = string.split("|");

  // Regular expression to match website links
  const regex = /((?:https?:\/\/)(?:www\.)?[^\s]+)/gi;
  let links = [];

  // Loop through each string in the array
  const otherStrings = parts.filter((str) => {
    // Find the website links in the string
    const linkMatches = str.match(regex);

    if (linkMatches) {
      // Extract the links from the matched strings
      const extractedLinks = linkMatches.map((match) => match.trim());

      // Add the links to the array of links
      links.push(...extractedLinks);

      // Return false to exclude the string from otherStrings
      return false;
    } else {
      // No links found in the string, include in otherStrings
      return true;
    }
  });
  const result = {
    links: links,
    otherStrings: otherStrings,
  };

  return result;
};

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

/**
 * Get all cookies in an object
 * @returns all cookies in an object
 */
export const getAllCookies = () => {
  const res = {};
  const arr = document.cookie.split(";");
  arr.forEach((pair) => {
    const [key, val] = pair.split("=");
    res[key?.trim()] = val?.trim();
  });
  return res;
};

/**
 * Get the age of a person given birthday
 * @returns the age of a person
 */
export const getAgeGivenBirthday = (birthday) => {
  const now = new Date();
  const birthDate = new Date(birthday.substr(0, 8));
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  let ageTag;
  switch (true) {
    case age > 18:
      ageTag = "Adult";
      break;
    case age > 14 && age <= 18:
      ageTag = "High School";
      break;
    case age > 10 && age <= 14:
      ageTag = "Middle/Jr. High";
      break;
    case age > 5 && age <= 10:
      ageTag = "Elementary";
      break;
    case age > 3 && age <= 5:
      ageTag = "age 3-5 (PreK)";
      break;
    case age >= 0 && age <= 3:
      ageTag = "age 0-3";
      break;
    default:
      ageTag = "";
      break;
  }
  return ageTag;
};
