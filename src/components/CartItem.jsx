import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

export function CartItem({id, quantity}) {
  const {removeFromCart} = useShoppingCart()
  const item = storeItems.find(storeItem => storeItem.id === id)

  if (item === null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-item-cneter">
      <img src={item.imgUrl} 
      style={{width: "125px", height:"75px", objectFit: "cover"}}
      />
      <div className="me-auto">
        <div>
          {item.name} {quantity && <span className="text-muted">x{quantity}</span>}
        </div >
        <div className="text-muted" style={{fontSize: ".75rem"}}>
        {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button 
        variant="outline-danger" 
        size="sm" 
        onClick={() =>removeFromCart(item.id)}>
          X
      </Button>
    </Stack>
  )
}