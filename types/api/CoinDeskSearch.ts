export type CoinDeskSearchAsset = {
  ID?: string;
  SYMBOL?: string;
  ASSET_SYMBOL?: string;
  NAME?: string;
  ASSET_NAME?: string;
  LOGO_URL?: string;
  IMAGE_URL?: string;
  IMAGEURL?: string;
};

export type CoinDeskSearchResponse = {
  Data?: {
    LIST?: CoinDeskSearchAsset[];
  };
  Err?: Record<string, unknown>;
};
