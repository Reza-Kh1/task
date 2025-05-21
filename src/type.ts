type DimensionsType = {
  width: string;
  height: string;
  depth: string;
};

type MetaType = {
  createdAt: Date;
  updatedAt: Date;
  barcode: number;
  qrCode: string;
};

type ReviewsType = {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
};

type ProductType = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: DimensionsType;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: MetaType;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: ReviewsType[];
  shippingInformation: string;
  sku: string;
  stock: string;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

type GetAllProduct = {
  limit: number;
  products: ProductType[];
  skip: number;
  total: number;
};

export type { GetAllProduct, ProductType, DimensionsType, MetaType, ReviewsType };
