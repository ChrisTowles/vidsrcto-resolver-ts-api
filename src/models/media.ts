
export enum MediaType {
  tv = "tv",
  movie = "movie",
}


export interface MediaRequest {
  mediaType: MediaType
  id: string
  ifTV?: { season: number, episode: number }
}

export  const getUrlPartForMedia = (entry: MediaRequest): string => {
  if (entry.mediaType === MediaType.tv) {
    if (entry.ifTV !== undefined) {
      return `tv/${entry.id}/${entry.ifTV.season ?? 1}/episode-${entry.ifTV!.episode}`;
    }
    return `tv/${entry.id}`;
  }
  else if (entry.mediaType  === MediaType.movie) {
    return `movie/${entry.id}`;
  }
  else {
    throw new Error(`Invalid media type ${entry.mediaType}`);
  }
}