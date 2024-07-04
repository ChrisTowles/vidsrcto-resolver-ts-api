export enum ProviderType {
    F2Cloud = 'F2Cloud',
    Filemoon = 'Filemoon',
    VidSrc = 'VidSrc'
};

export interface ProviderTypeSettings {
  type: ProviderType;
  baseUrl: string;
  providerUrl: string;
  
}

const ProviderLostSettings: ProviderTypeSettings[] = [
  {
     type: ProviderType.F2Cloud,
     baseUrl: 'https://f2cloud.com/',
      providerUrl: 'https://f2cloud.com/api/v3/'
  },
  {
     type: ProviderType.VidSrc,
     baseUrl: 'https://f2cloud.com/',
      providerUrl: 'https://f2cloud.com/api/v3/'
  },
];


export interface Provider {
  title: ProviderType;
  id: string;
}

// example: '{"status":200,"result":[{"id":"oP9gOM1mVg==","title":"F2Cloud"},{"id":"oP9gOM1lUA==","title":"Filemoon"}]}'
export interface ProviderResult { 
    status: number;
    result: Provider[];
}


export interface PorcessSourceResult {
  source: string,
  subtitles: object,
  status: number,
};


export interface GetFileResult {
  result: object
  status: number,
};