import { usePesoFormatter } from "../hooks/pesoFormater-hook";
import Button from "./Button";

interface CartItem {
  id: string;
  imageUrl: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface CartCardProps {
  item: CartItem;
  handleQuantity: (arg0: CartItem, type: string) => void;
  handleRemovetoCart: (arg0: CartItem) => void;
}

const CartCard = ({
  item,
  handleQuantity,
  handleRemovetoCart,
}: CartCardProps) => {
  const { formatedPeso } = usePesoFormatter();

  return (
    <div
      style={{
        margin: 30,
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.15)",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 25,
      }}
    >
      <div>
        <img
          src={item.imageUrl}
          alt={item.productName}
          style={{ width: 50, height: 50, marginRight: 30 }}
        />
      </div>
      <div>
        <span>{item.productName}</span>
        <h4>{formatedPeso(item.unitPrice * item.quantity)}</h4>
      </div>
      <div>
        <div style={{ marginBottom: 10 }}>
          <div
            style={{
              background: "green",
              padding: 2,
              borderRadius: 15,
              textAlign: "center",
            }}
            onClick={() => handleQuantity(item, "add")}
          >
            <span>+</span>
          </div>
          <span style={{ paddingLeft: 25 }}>{item.quantity}</span>
          <div
            style={{
              background: "red",
              padding: 2,
              borderRadius: 15,
              textAlign: "center",
            }}
            onClick={() => handleQuantity(item, "subtract")}
          >
            <span>-</span>
          </div>
        </div>
        <Button label="Remove" onClick={() => handleRemovetoCart(item)} />
      </div>
    </div>
  );
};

export default CartCard;

const styles = {
  button: {
    padding: 2,
    borderRadius: 15,
    textAlign: "center",
  },
};
