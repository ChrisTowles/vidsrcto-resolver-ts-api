import request from "superagent";
import { CONSTANTS } from "./constants";
import { ofetch } from "ofetch";

const file_get = async (urlg: string) => {
  const url = new URL(
    `https://pdrz.v4507fb3559.site/_v2-mwxk/12a3c523fd105800ed8c394685aeeb0b962efc5c1be6e5e80c437baea93ece832257df1a4b6125fcfa38c35da05dee86aad28d46d73fc4e9d4e5a3385772f4d5338246f60549ed0a11c2b4bc6e4e7b5131358a7f56496989899fb80dcdf6789b7d14ae57116ca602/h/list;15a38634f803584ba8926411d7bee906856cab0654b5b6.m3u8`
  );
  const refererUrl = decodeURIComponent(url.searchParams.get("referer") || "");
  const targetUrl = decodeURIComponent(url.searchParams.get("url") || "");
  const originUrl = decodeURIComponent(url.searchParams.get("origin") || "");
  const proxyAll = decodeURIComponent(url.searchParams.get("all") || "");

  const response = await fetch(targetUrl, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Referer: refererUrl || "",
      Origin: originUrl || "",
    },
  });

  let modifiedM3u8;
  if (targetUrl.includes(".m3u8")) {
    modifiedM3u8 = await response.text();
    const targetUrlTrimmed = `${encodeURIComponent(
      targetUrl.replace(/([^/]+\.m3u8)$/, "").trim()
    )}`;

    const encodedUrl = encodeURIComponent(refererUrl);
    const encodedOrigin = encodeURIComponent(originUrl);

    modifiedM3u8 = modifiedM3u8
      .split("\n")
      .map((line) => {
        if (line.startsWith("#") || line.trim() == "") {
          return line;
        } else if (proxyAll == "yes" && line.startsWith("http")) {
          //https://yourproxy.com/?url=https://somevideo.m3u8&all=yes
          return `${url.origin}?url=${line}`;
        }
        return `?url=${targetUrlTrimmed}${line}${
          originUrl ? `&origin=${encodedOrigin}` : ""
        }${refererUrl ? `&referer=${encodedUrl}` : ""}`;
      })
      .join("\n");

    return {
      body: modifiedM3u8 || response.body,
      status: response.status,
      statusText: response.statusText,
      headers: {
        alloworigin: "*",
        contenttype:
          response.headers?.get("Content-Type") ||
          "application/vnd.apple.mpegurl",
      },
    };
  }
};

export const getdecodedurl = (url: string) => {
  const encoded: Buffer = getbase64(url);

  const decoded: Buffer = getdecoded(encoded, CONSTANTS.DEFAULT_KEY);

  const decoded_text = decoded.toString();

  return decodeURIComponent(decoded_text);
};

const getbase64 = (url: string) => {
  const standardized_input = url.replace("_", "/").replace("-", "+");

  const binaryData = Buffer.from(standardized_input, "base64");

  return Buffer.from(binaryData);
};

const getdecoded = (encoded: Buffer | string, key: string) => {
  const key_bytes = Buffer.from(key, "utf-8");

  const s = Buffer.from(
    Array(256)
      .fill(0)
      .map((_, i) => i)
  );

  let j: number = 0;

  for (let i = 0; i < 256; i++) {
    j = (j + s[i] + key_bytes[i % key_bytes.length]) & 0xff;
    [s[i], s[j]] = [s[j], s[i]]; // Destructuring assignment for swap
  }

  const decoded = Buffer.alloc(encoded.length);

  let i: number = 0;
  let k: number = 0;

  for (let index = 0; index < encoded.length; index++) {
    i = (i + 1) & 0xff;
    k = (k + s[i]) & 0xff;
    [s[i], s[k]] = [s[k], s[i]]; // Destructuring assignment for swap
    const t = (s[i] + s[k]) & 0xff;

    const currval: Number | String = encoded[index];

    if (typeof currval == "string") {
      decoded[index] = currval.charCodeAt(0) ^ s[t];
    } else {
      if (Number.isInteger(currval)) {
        decoded[index] = (currval as number) ^ s[t];
      } else {
        console.log(currval);
        // console.log(typeof ())
        // throw new Error("Unsupported data type in the input");
      }
    }
  }

  return decoded;
};

export const encodeid = (v_id: string, key1: string, key2: string) => {
  const decode_id = getdecoded(v_id, key1);
  const encoded_result = getdecoded(decode_id, key2).toString("latin1");
  const encoded_base64 = btoa(encoded_result);

  return encoded_base64.replace("/", "_");
};

export const getfutoken = async (url: string, key: string) => {
  const response = await request
    .get(`${CONSTANTS.PROVIDER_URL}/futoken`)
    .set({ Referer: url });

  const re = /var\s+k\s*=\s*'([^']+)/;

  const resstring: string = response.text;

  const fa_key = resstring.match(re);

  if (fa_key) {
    const fuKey = fa_key[1];

    const encryptedString = `${fuKey},${Array.from(
      { length: key.length },
      (_, i) =>
        (fuKey.charCodeAt(i % fuKey.length) + key.charCodeAt(i)).toString()
    ).join(",")}`;
    return encryptedString;
  }
};

export const createFakeIp = () => {
  return Math.floor(Math.random() * 255) + 1 +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255);
}



    export const getTmdbIDSerie = async (imdb_id: string   ): Promise<string>  => {
        
        const result = await ofetch("https://api.themoviedb.org/3/find/"+imdb_id+"?api_key=8d6d91941230817f7807d643736e8a49&language=en-US&external_source=imdb_id", { parseResponse: (txt) => txt })    
                
        let tmdb_id = JSON.parse(result).tv_results[0].id;
        console.log("tmbd_id= "+tmdb_id);
        return tmdb_id;
    }
