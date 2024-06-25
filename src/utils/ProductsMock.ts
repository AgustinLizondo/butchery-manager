export interface Product {
  id: number;
  created_at: string;
  created_by: string;
  product_name: string;
  product_price: number;
}

export const ProductsMock = [
  {
    id: 0,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Vacío",
    product_price: 3000,
  },
  {
    id: 1,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Lomo de res",
    product_price: 4000,
  },
  {
    id: 2,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Costilla de res",
    product_price: 2500,
  },
  {
    id: 3,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Bistec de res",
    product_price: 3000,
  },
  {
    id: 4,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Entrecot",
    product_price: 3500,
  },
  {
    id: 5,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Filete de res",
    product_price: 3800,
  },
  {
    id: 6,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Falda de res",
    product_price: 2000,
  },
  {
    id: 7,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Solomillo de res",
    product_price: 4500,
  },
  {
    id: 8,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Colita de cuadril",
    product_price: 3200,
  },
  {
    id: 9,
    created_at: "2024-06-25T00:00:00Z",
    created_by: "admin",
    product_name: "Asado de tira",
    product_price: 2800,
  },
];
