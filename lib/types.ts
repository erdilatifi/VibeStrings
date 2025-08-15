export interface Brand {
  id: string;
  name?: string;
  origin?: string;
  image?: string;
  categories?: string[];
  models?: Model[]; // used only in some queries
}

export interface Model {
  id: string;
  name?: string;
  type?: string;
  image?: string;
  description?: string;
  price?: number;
  specs?: Specs; // make this optional since some queries don’t return it
  musicians?: Musician[];
  brand?: Brand; // Add brand relationship
}

export interface Specs {
  bodyWood?: string;
  neckWood?: string;
  fingerboardWood?: string;
  pickups?: string;
  tuners?: string;
  scaleLength?: string;
  bridge?: string;
}

export interface Musician {
  name?: string;
  musicianImage?: string;
  bands?: string[];
}

export interface SortBy {
  field: "name" | "type" | "price";
  order: "ASC" | "DESC";
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}
