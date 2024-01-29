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
        height: 500,
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
        <span>{formatedPeso(item.unitPrice * item.quantity)}</span>
      </div>
      <div>
        <div>
          <span onClick={() => handleQuantity(item, "subtract")}>-</span>
          <span style={{ marginLeft: 20, marginRight: 20 }}>
            {item.quantity}
          </span>
          <span onClick={() => handleQuantity(item, "add")}>+</span>
        </div>
        <Button label="Remove" onClick={() => handleRemovetoCart(item)} />
      </div>
    </div>
  );
};

export default CartCard;
