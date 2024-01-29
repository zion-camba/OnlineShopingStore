import React from "react";

interface Item {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

interface ItemsListProps {
  items: Item[];
}

const ItemsList: React.FC<ItemsListProps> = ({ items }) => {
  console.log("zzz", items);
  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id}, <strong>Title:</strong>
            {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
