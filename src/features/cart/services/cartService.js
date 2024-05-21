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
      cartItems.push({
        productInfo: {
          id: itemInfo.id,
          title: itemInfo.title,
          price: itemInfo.price,
          image: itemInfo.image,
        },
        totalQty: 1,
      }); // todo Pass only which is required in productInfo ✓
      prevCartDetails.totalCartItems += 1;
    }
    prevCartDetails.totalPrice += Number(itemInfo.price);

    return prevCartDetails;
  };

  decreaseCartItem = (cartDetails, itemInfo) => {
    const prevCartDetails = JSON.parse(JSON.stringify(cartDetails));
    const { id } = itemInfo;
    const { cartItems = [] } = prevCartDetails;
    const itemIdx = cartItems.findIndex((item) => item.productInfo.id === id);
    if (itemIdx >= 0) {
      cartItems[itemIdx].totalQty -= 1;
    }
    if (cartItems[itemIdx].totalQty === 0) {
      cartItems.splice(itemIdx, 1);
      prevCartDetails.totalCartItems -= 1;
    }
    prevCartDetails.totalPrice -= Number(itemInfo.price);
    return prevCartDetails;
  };

  removeCartItem = (cartDetails, index) => {
    const prevCartDetails = JSON.parse(JSON.stringify(cartDetails));
    const { cartItems = [] } = prevCartDetails;

    const item = cartItems[index];
    if (item) {
      cartItems.splice(index, 1);
      prevCartDetails.totalCartItems -= 1;

      prevCartDetails.totalPrice -= Number(
        item.productInfo.price * item.totalQty
      );
    }

    return prevCartDetails;
  };
}

const cartService = new CartService();

export default cartService;
