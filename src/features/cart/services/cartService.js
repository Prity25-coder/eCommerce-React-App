import getApiEndpoint from "../../../utils/getApiEndpoint";

class CartService {
  getCartInfo = async () => {
    const response = await fetch(getApiEndpoint("cart"));
    return await response.json();
  };

  addToCart = async (cartInfo) => {
    console.log(cartInfo);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartInfo),
    };
    const response = await fetch(getApiEndpoint("cart"), options);
    return await response.json();
  };

  getUpdatedCart = (cartDetails, itemInfo) => {
    const prevCartDetails = JSON.parse(JSON.stringify(cartDetails));
    const { id } = itemInfo;
    const { cartItems = [] } = prevCartDetails;
    const item = cartItems.find((item) => item.productInfo.id === id);
    if (item) {
      item.totalQty += 1;
    } else {
      cartItems.push({ productInfo: itemInfo, totalQty: 1 }); // todo
      prevCartDetails.totalCartItems += 1;
    }
    prevCartDetails.totalPrice += Number(itemInfo.price);

    return prevCartDetails;
  };

  removeCartItem = (cartDetails, itemInfo) => {
    const prevCartDetails = JSON.parse(JSON.stringify(cartDetails));
    const { id } = itemInfo;
    const { cartItems = [] } = prevCartDetails;
    const item = cartItems.find((item) => item.productInfo.id === id);
    if (item) {
      item.totalQty -= 1;
    } else {
      cartItems.splice({ productInfo: itemInfo, totalQty: 1 });
      // prevCartDetails.totalCartItems -= 1;
      prevCartDetails.totalCartItems -= 1

    }
    prevCartDetails.totalPrice -= Number(itemInfo.price);

    return prevCartDetails;
  };
}

const cartService = new CartService();

export default cartService;
