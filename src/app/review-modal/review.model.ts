export interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    user: {
      id: number;
      firstName: string;
      lastName: string;
    };
    product: {
      id: number;
      name: string;
    };
  }