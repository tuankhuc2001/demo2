export const Url = "http://localhost:8080"

export const objectApi = {
    product: Url + `/product/`,
    cart: Url + `cart/`,
    cartItem: Url + `cartItem/`,
    order: Url + `order/`,
    orderDetail: Url + `orderDetail/`,
    customer: Url + `customer/`,
}

export const apiProduct = {
    getProductSale: objectApi.product + `getProductSale/`,
    getProductWarehouse: objectApi.product + `getProductWarehouse/`,
    updateProductQuantity: objectApi.product + `/updateQuantity/`,
    addProduct: objectApi.product + `addProduct`,
    updatePrice: objectApi.product + `updatePrice/`
}

export const apiCart = {
    getCart: objectApi.cart + `getCart/`,
    updateCart: objectApi.cart + `updateCart/`
}

export const apiCartItem = {
    addCartItem: objectApi.cartItem + `addCartItem`,
    deleteCartItem: objectApi.cartItem + `deleteCartItem/`,
    deleteAllCartItem: objectApi.cartItem + `deleteAllCartItem/`,
    updateQuantity: objectApi.cartItem + `updateQuantity/`,
    updateRate: objectApi.cartItem + `updateRate/`,
    updateIsPlus: objectApi.cartItem + `updateIsPlus/`
}

export const apiCustomer = {
    getCustomer: objectApi.customer + `getCustomer`,
    addCustomer: objectApi.customer + `addCustomer`
}

export const apiOrder = {
    getOrder: objectApi.order + `getOrder/`,
    getOrderAll: objectApi.order + `getOrderAll/`,
    addOrder: objectApi.order + `addOrder/`
}

export const apiOrderDetail = {
    getOrderDetail: objectApi.orderDetail + `getOrderDetail/`,
}