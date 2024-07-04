import request from "superagent";
import urlParser from "urlparser";
import { CONSTANTS } from "./constants";



export const getVidplaySubtitles = async (url_data: string) => {
  var u = urlParser.parse(url_data);

  var out = u.query.parts[0].split("=");

  const conn = urlParser.parse(decodeURIComponent(out[1]));

  if (conn) {
    const resp = await request.get(`${CONSTANTS.BASE_URL}${conn.path.base}`);

    try {
      const parse = JSON.parse(resp.text);
      return parse;
    } catch (e) {
      return [];
    }
  } else {
    return [];
  }
};
