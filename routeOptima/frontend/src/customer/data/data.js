import * as reqSend from './reqSender';
import React, { useState, useEffect } from "react";



export const storeData =[
  ["STOR_1", "Colombo"],
  ["STOR_2", "Negombo"],
  ["STOR_3", "Galle"],
  ["STOR_4", "Matara"],
  ["STOR_5", "Jaffna"],
  ["STOR_6", "Trinco"]
]


const quantity_list = [
  {
    model_id: 1,
    quantity: 10,
    size: 5,
  },
  {
    model_id: 1,
    quantity: 10,
    size: 5.5,
  },
  {
    model_id: 1,
    quantity: 10,
    size: 7,
  },
  {
    model_id: 1,
    quantity: 10,
    size: 8,
  },

  {
    model_id: 0,
    quantity: 10,
    size: 5,
  },
  {
    model_id: 0,
    quantity: 10,
    size: 5.5,
  },
  {
    model_id: 0,
    quantity: 10,
    size: 7,
  },
  {
    model_id: 0,
    quantity: 10,
    size: 8,
  },

  {
    model_id: 2,
    quantity: 10,
    size: 5,
  },
  {
    model_id: 2,
    quantity: 10,
    size: 5.5,
  },
  {
    model_id: 2,
    quantity: 10,
    size: 7,
  },
  {
    model_id: 2,
    quantity: 10,
    size: 8,
  },

  {
    model_id: 3,
    quantity: 10,
    size: 5,
  },
  {
    model_id: 3,
    quantity: 10,
    size: 5.5,
  },
  {
    model_id: 3,
    quantity: 10,
    size: 7,
  },
  {
    model_id: 3,
    quantity: 10,
    size: 8,
  },

  {
    model_id: 4,
    quantity: 10,
    size: 5,
  },
  {
    model_id: 4,
    quantity: 10,
    size: 5.5,
  },
  {
    model_id: 4,
    quantity: 10,
    size: 7,
  },
  {
    model_id: 4,
    quantity: 10,
    size: 8,
  },

  {
    model_id: 5,
    quantity: 10,
    size: 5,
  },
  {
    model_id: 5,
    quantity: 10,
    size: 5.5,
  },
  {
    model_id: 5,
    quantity: 10,
    size: 7,
  },
  {
    model_id: 5,
    quantity: 10,
    size: 8,
  },
];



const model_list = [
  {
    title: "SWIFT RUN 22 SHOES",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/ff05916714994acda510ad6500abf565_9366/GZ3496_01_standard.jpg",
    price: 22600,
    gender: "men",
    color: "black",
    brand: "adidas",
    id: 1,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "ADVANTAGE SHOES",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/259c2dcc848a4196ba5ead1800d3a2e3_9366/GZ5301_01_standard.jpg",
    price: 18700,
    gender: "men",
    color: "black",
    brand: "adidas",
    id: 2,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "SWIFT RUN 20 SHOES",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/1128fe7c67d94cfb9da3ad6a012e4a5a_9366/GY3047_01_standard.jpg",
    price: 14500,
    gender: "men",
    color: "white",
    brand: "adidas",
    id: 0,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "SAMBA SHOES",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/52c951e30dcb4ff1bfdfd053405a6f75_9366/IG1243_01_standard.jpg",
    price: 54100,
    gender: "men",
    color: "brown",
    brand: "adidas",
    id: 3,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "LITE RACER 3.0 SHOES",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/45fbcb89d3cb46998305af3501362a7d_9366/HP6102_01_standard.jpg",
    price: 34000,
    gender: "women",
    color: "purple",
    brand: "adidas",
    id: 4,
  },
  {
    title: "ADIDAS BY STELLA MCCARTNEY",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/917eb09337704ba6ad9c5a2037093f3d_9366/IE4863_01_standard.jpg",
    price: 84500,
    gender: "women",
    color: "pink",
    brand: "adidas",
    id: 5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "STAN SMITH SHOES",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/e01dea68cf93434bae5aac0900af99e8_9366/FX5500_01_standard.jpg",
    price: 40700,
    gender: "women",
    color: "white",
    brand: "adidas",
    id: 6,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "OZELIA SHOES",
    img: "https://assets.adidas.com/images/w_1880,f_auto,q_auto/c789549c7aa046d29c22ad2f00dc7e2d_9366/H04251_01_standard.jpg",
    price: 40700,
    gender: "women",
    color: "white",
    brand: "adidas",
    id: 8,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const brands = ["adidas", "nike", "puma", "vans"];
const colors = ["black", "white", "pink", "blue", "red", "purple"];

export { model_list, quantity_list, brands, colors };
