import CartCard from "../components/CartCard";
import { usePesoFormatter } from "../hooks/pesoFormater-hook";
import Button from "../components/Button";
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
  handleCheckOut: () => void;
}

const Cart = ({
  data,
  handleQuantity,
  handleRemovetoCart,
  handleClearCart,
  handleCheckOut,
}: CartProps) => {
  const { formatedPeso } = usePesoFormatter();

  let isDisabled = data.length !== 0 ? false : true;
  let totalPrice = 0;
  let totalItems = data.reduce((total, item) => total + item.quantity, 0);

  data.forEach((item) => {
    return (totalPrice = totalPrice + item.unitPrice * item.quantity);
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h4>My Cart</h4>
      <div style={{ maxHeight: "100vh", overflow: "auto" }}>
        {data.map((item) => (
          <CartCard
            item={item}
            handleQuantity={handleQuantity}
            handleRemovetoCart={handleRemovetoCart}
          />
        ))}
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Total:</span>
          <h4 style={{ marginBottom: 0, marginTop: 0 }}>
            {formatedPeso(totalPrice)}
          </h4>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <span>Total Items:</span>
          <h4 style={{ marginBottom: 0, marginTop: 0 }}>{totalItems}</h4>
        </div>

        <Button
          onClick={handleCheckOut}
          label="Check out"
          isDisabled={isDisabled}
        />
        <Button
          onClick={handleClearCart}
          label="Clear Cart"
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default Cart;
