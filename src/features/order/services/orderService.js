import getApiEndpoint from "../../../utils/getApiEndpoint";


class OrderService {
  getOrderDetails = async () => {
    const response = await fetch(getApiEndpoint("orders"));
    return await response.json();
  }

  proceedToBuy = async (orderInfo) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    };
    const response = await fetch(getApiEndpoint("orders"), options);
    await response.json();
    return orderInfo;
  }
}


const orderService = new OrderService();

export default orderService;
