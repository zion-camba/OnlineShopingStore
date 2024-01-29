import React from "react";
import { usePesoFormatter } from "../hooks/pesoFormater-hook";
import Button from "./Button";

interface Item {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

interface CartItem {
  id: string;
  imageUrl: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface ItemsCardProps {
  item: Item;
  cart: CartItem[];
  handleAddtoCart: () => void;
}

const ItemCard = ({ item, cart, handleAddtoCart }: ItemsCardProps) => {
  const { formatedPeso } = usePesoFormatter();

  const isDisabled = cart.find((product) => product.id === item.id);

  return (
    <div
      style={{
        margin: 30,
        paddingLeft: 30,
        paddingRight: 30,
        border: "1px solid rgba(0, 0, 0, 0.15)",
        borderRadius: 25,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div>
        <img
          src={item.imageUrl}
          alt={item.productName}
          style={{ width: 100, height: 100, marginRight: 30 }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4>{item.productName}</h4>
        <p>{item.category}</p>
        <p style={{ width: 500 }}>{item.description}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4>{formatedPeso(item.unitPrice)}</h4>
        <Button
          label="Add to Cart"
          onClick={handleAddtoCart}
          isDisabled={isDisabled ? true : false}
        />
      </div>
    </div>
  );
};

export default ItemCard;
