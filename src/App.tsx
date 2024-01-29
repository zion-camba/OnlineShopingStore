import React, { useEffect, useState } from "react";
import ITEMS from "./items.json";

import Categories from "./sections/Categories";
import ItemsList from "./sections/ItemsList";
import Cart from "./sections/Cart";
import Modal from "./components/Modal";

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

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [baseData, setbaseData] = useState<Item[]>([]);
  const [data, setData] = useState<Item[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const categories = ITEMS.reduce((acc, item) => {
      if (acc.indexOf(item.category) === -1) {
        acc.push(item.category);
      }
      return acc;
    }, [] as string[]);
    setUniqueCategories(categories);

    const storedDataString = localStorage.getItem("cart");

    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);
      setCart(storedData);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setData(ITEMS);
      return;
    }
    const filteredData = ITEMS.filter(
      (item) => item.category === selectedCategory
    );
    setData(filteredData);
    setbaseData(filteredData);
  }, [selectedCategory]);

  const handleSearch = (val: string) => {
    const filteredData = baseData.filter((item) =>
      item.productName.toLowerCase().includes(val.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (type: string) => {
    let sortedData;

    if (type === "lowtohigh") {
      sortedData = data.slice().sort((a, b) => a.unitPrice - b.unitPrice);
      setData(sortedData);
    } else if (type === "hightolow") {
      sortedData = data.slice().sort((a, b) => b.unitPrice - a.unitPrice);
      setData(sortedData);
    }
  };

  const handleAddtoCart = (item: Item) => {
    const selectedItem = {
      id: item.id,
      imageUrl: item.imageUrl,
      productName: item.productName,
      unitPrice: item.unitPrice,
      quantity: 1,
    };
    const newArr = [selectedItem, ...cart];
    localStorage.setItem("cart", JSON.stringify(newArr));
    setCart(newArr);
  };

  const handleQuantity = (item: CartItem, type: string) => {
    const itemToModify = cart.find((product) => product.id === item.id);

    if (itemToModify) {
      const newArray = [...cart];
      const index = cart.indexOf(itemToModify);

      if (type === "add") {
        newArray[index] = {
          ...itemToModify,
          quantity: item.quantity + 1,
        };
        localStorage.setItem("cart", JSON.stringify(newArray));
        setCart(newArray);
      }

      if (item.quantity === 1) return;

      if (type === "subtract") {
        newArray[index] = {
          ...itemToModify,
          quantity: item.quantity - 1,
        };
        localStorage.setItem("cart", JSON.stringify(newArray));
        setCart(newArray);
      }
    }
  };

  const handleRemovetoCart = (item: CartItem) => {
    const indexToRemove = cart.findIndex((product) => product.id === item.id);
    if (indexToRemove !== -1) {
      const newArray = cart.filter((_, index) => index !== indexToRemove);
      localStorage.setItem("cart", JSON.stringify(newArray));
      setCart(newArray);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleCheckOut = () => {
    handleClearCart();
    setIsOpen(true);
  };

  return (
    <div style={styles.flexContainer}>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
      <Categories
        data={uniqueCategories}
        selectedCategory={selectedCategory}
        handelSelectCategory={(item) => setSelectedCategory(item)}
      />
      <ItemsList
        data={data}
        cart={cart}
        handleSearch={handleSearch}
        handleSort={handleSort}
        handleAddtoCart={handleAddtoCart}
      />
      <Cart
        data={cart}
        handleQuantity={handleQuantity}
        handleRemovetoCart={handleRemovetoCart}
        handleClearCart={handleClearCart}
        handleCheckOut={handleCheckOut}
      />
    </div>
  );
};

export default App;

const styles = {
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    with: "100vh",
    marginLeft: "10%",
    marginRight: "10%",
  },
};
