import React, { useState } from "react";
import ItemCard from "../components/ItemCard";

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

interface ItemsListProps {
  data: Item[];
  cart: CartItem[];
  handleSearch: (arg0: string) => void;
  handleSort: (arg0: string) => void;
  handleAddtoCart: (arg0: Item) => void;
}

const ItemsList = ({
  data,
  cart,
  handleSearch,
  handleSort,
  handleAddtoCart,
}: ItemsListProps) => {
  const [toggleSort, setToggleSort] = useState(false);

  const handleSwitchSort = (val: string) => {
    setToggleSort(!toggleSort);
    handleSort(val);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h4>Items</h4>
      <input
        type="text"
        placeholder="Search product name"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: "400px", height: 40, borderRadius: 25 }}
      />

      {toggleSort ? (
        <span
          onClick={() => handleSwitchSort("hightolow")}
          style={{ cursor: "default" }}
        >
          Sort Highest to Lowest
        </span>
      ) : (
        <span
          onClick={() => handleSwitchSort("lowtohigh")}
          style={{ cursor: "default" }}
        >
          Sort Lowest to Highest
        </span>
      )}

      <div style={{ maxHeight: "80vh", overflow: "auto" }}>
        {data.map((item) => (
          <ItemCard
            item={item}
            cart={cart}
            key={item.id}
            handleAddtoCart={() => handleAddtoCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
