export interface Asset {
  _id: string;
  enriched: {
    isCrownJewel: boolean;
  };
  assetName: string;
  owner: {
    name?: string | null;
    owner?: {
      name?: string | null;
    };
  };
}
