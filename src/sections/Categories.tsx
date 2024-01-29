import React from "react";

interface CategoriesProps {
  data: string[];
  selectedCategory: string;
  handelSelectCategory: (arg0: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  data,
  handelSelectCategory,
  selectedCategory,
}) => {
  return (
    <div style={styles.catContainer}>
      <h4>Categories</h4>
      <div
        style={selectedCategory === "all" ? styles.selected : {}}
        onClick={() => handelSelectCategory("all")}
      >
        all
      </div>
      {data.map((item) => (
        <div
          key={item}
          style={selectedCategory === item ? styles.selected : {}}
          onClick={() => handelSelectCategory(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Categories;

const styles = {
  catContainer: {
    height: "100vh",
    background: "gray",
  },
  selected: {
    background: "green",
  },
};
