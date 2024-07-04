import request from "superagent";
import { ofetch } from "ofetch";
import * as cheerio from "cheerio";
import { Provider, ProviderResult, ProviderType } from "providers";
import { getdecodedurl, encodeid, getfutoken, createFakeIp } from "./index";
import { getVidplaySubtitles } from "./getVidplaySubtitles";
import { CONSTANTS } from "./constants";
import { b, g } from "vitest/dist/suite-IbNSsUWN";


export const main_func = async (endpnt: string) => {
  try {
    const url = `${CONSTANTS.BASE_URL}${endpnt}`;
    const res = await ofetch( url,  { parseResponse: (txt) => txt });

    const $ = cheerio.load(res);
    const data_id: string | undefined = $("a[data-id]").first().attr("data-id");

    if (data_id === undefined) {
      throw new Error("No data_id found");
    }
    const sourcesResult = await ofetch<ProviderResult>(
      `${CONSTANTS.BASE_URL}ajax/embed/episode/${data_id}/sources`
    );



    const succesful = false;
    if (sourcesResult.status === 200 && !succesful) {


      let finalResult: PorcessSourceResult | null = null;
      for await (const source of sourcesResult.result) {

        if (finalResult === null) {

          switch (source.title) { 
            case ProviderType.F2Cloud:
              finalResult = await process_vidsrc(source);
              break;
            case ProviderType.VidSrc:
              finalResult = await process_vidsrc(source);
              break;
            case ProviderType.Filemoon:
              finalResult = await process_vidsrc(source);
              break;
            default:
              throw new Error(`Provider ${source.title} not supported`);
              
            } 
        }

       
      }
      return finalResult;
    }
    else { 
      return {
        status: 404,
        error: `search for $${encodeid} not successful`,
      };

    }
  } catch (e) {
    return {
      status: 404,
      error: (e as Error).message,
    };
  }
};

interface PorcessSourceResult {
  source: string,
  subtitles: JSON,
  status: 200,
};

const process_vidsrc = async (source: Provider): Promise<PorcessSourceResult> => {
  const geturl = await request.get(
    CONSTANTS.BASE_URL + `ajax/embed/source/${source.id}`
  );
  const url = await JSON.parse(geturl.text).result.url;

  const decoded_url = getdecodedurl(url);

  const cloud_keys = await request.get(
    "https://raw.githubusercontent.com/Ciarands/vidsrc-keys/main/keys.json"
  );

  const [key1, key2] = await JSON.parse(cloud_keys.text);

  const url_data = decoded_url.split("?");

  const key = encodeid(url_data[0].split("/e/")[1], key1, key2);

  const futoken = await getfutoken(decoded_url, key);
  const subtitles: JSON = await getVidplaySubtitles(decoded_url);
  const ip = createFakeIp();

  const fetchlinks = await request
    .get(
      `${CONSTANTS.PROVIDER_URL}/mediainfo/${futoken}?${url_data[1]}&autostart=true`
    )
    .set({ referer: decoded_url })
    .set({ origin: ip })
    .set({ host: "vidplay.online" });

  const finaljson: any | undefined = JSON.parse(fetchlinks.text);

  // console.log(JSON.parse(fetchlinks.text));
  if (finaljson) {
    return {
      source: finaljson.result.sources[0].file,
      subtitles: subtitles,
      status: 200,
    };
  }
}