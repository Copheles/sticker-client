export interface PublicCategory {
  name: string;
  slug: string;
  description: string | null;
  stickerCount: number;
  previewImageUrls: string[];
}

export interface PublicProduct {
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface PublicCategoryDetail {
  name: string;
  slug: string;
  description: string | null;
  stickerCount: number;
}
