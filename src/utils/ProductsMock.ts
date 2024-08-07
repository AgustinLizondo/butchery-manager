export interface Product {
  id: number;
  createdAt: string;
  createdBy: string;
  productName: string;
  productPrice: number;
  weight: number;
}

export const ProductsMock = [
  {
    id: 0,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Vacío",
    productPrice: 3000,
  },
  {
    id: 1,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Lomo de res",
    productPrice: 4000,
  },
  {
    id: 2,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Costilla de res",
    productPrice: 2500,
  },
  {
    id: 3,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Bistec de res",
    productPrice: 3000,
  },
  {
    id: 4,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Entrecot",
    productPrice: 3500,
  },
  {
    id: 5,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Filete de res",
    productPrice: 3800,
  },
  {
    id: 6,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Falda de res",
    productPrice: 2000,
  },
  {
    id: 7,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Solomillo de res",
    productPrice: 4500,
  },
  {
    id: 8,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Colita de cuadril",
    productPrice: 3200,
  },
  {
    id: 9,
    createdAt: "2024-06-25T00:00:00Z",
    createdBy: "admin",
    productName: "Asado de tira",
    productPrice: 2800,
  },
];
