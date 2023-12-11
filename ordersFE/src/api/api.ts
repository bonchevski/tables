import axios from "axios";
import { OrdersDataType } from "../generalTypes/interface";

export const updateOrderById = async (orderId: string, payload: any) => {
    await axios({
        method: 'put',
        url: `http://localhost:8000/api/orders/${orderId}/`,
        data: payload
    });
};

export const deleteOrderById = async (orderId: string) => {
    await axios.delete(`http://localhost:8000/api/orders/${orderId}/`);
}

export const getOrderById = async (orderId: string) => {
    const response = await axios.get(`http://localhost:8000/api/orders/${orderId}/`);
    return response.data;
}