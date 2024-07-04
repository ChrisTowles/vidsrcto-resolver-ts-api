export enum ProviderType {
    F2Cloud,
    Filemoon,
    VidSrc
};



export interface Provider {
  title: ProviderType;
  id: string;
}

// example: '{"status":200,"result":[{"id":"oP9gOM1mVg==","title":"F2Cloud"},{"id":"oP9gOM1lUA==","title":"Filemoon"}]}'
export interface ProviderResult { 
    status: number;
    result: Provider[];
}


