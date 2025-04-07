export interface Rent {
2  price: number;
  title: string;
  location: string;
  property_type?:string;
  description?:string;
  status?:string;
  area?:number;
  latitude?: number,
  longitude?: number,
  created_at?: string;
  url: string[]; // updated from `image: string`
  rooms: {
    bed?: number;
    bath?: number;
    parking?: number;
  };
  tag: "buy" | "sell" | "rent";
}


export interface Customer {
  name: string;
  image: string;
  position: string;
  message: string;
}
