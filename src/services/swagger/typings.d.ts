// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Order = {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  };

  type Category = {
    id?: number;
    name?: string;
  };

  type User = {
    id?: number;
    email?: string;
    name?: string;
    college?: string;
    createdAt?: Date;
    updatedAt?: Date;
    roles?: string[];
  };

  type Tag = {
    id?: number;
    name?: string;
  };

  type Pet = {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    /** pet status in the store */
    status?: 'available' | 'pending' | 'sold';
  };

  type ApiResponse = {
    code?: number;
    type?: string;
    message?: string;
  };
}
