import CartCard from "../components/CartCard";
import { usePesoFormatter } from "../hooks/pesoFormater-hook";

interface CartItem {
  id: string;
  imageUrl: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface CartProps {
  data: CartItem[];
  handleQuantity: (arg0: CartItem, type: string) => void;
  handleRemovetoCart: (arg0: CartItem) => void;
  handleClearCart: () => void;
}

const Cart = ({
  data,
  handleQuantity,
  handleRemovetoCart,
  handleClearCart,
}: CartProps) => {
  const { formatedPeso } = usePesoFormatter();

  let num = 0;
  const total = data.map((item) => {
    num = num + item.unitPrice * item.quantity;
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <h4>My Cart</h4>
      {data.map((item) => (
        <CartCard
          item={item}
          handleQuantity={handleQuantity}
          handleRemovetoCart={handleRemovetoCart}
        />
      ))}
      <div>
        <span>Total</span>
        <span>{formatedPeso(num)}</span>
      </div>
      <div onClick={handleClearCart}>
        <span>Clear Cart</span>
      </div>
    </div>
  );
};

export default Cart;

const styles = {
  catContainer: {
    height: "100vh",
    background: "gray",
  },
};
