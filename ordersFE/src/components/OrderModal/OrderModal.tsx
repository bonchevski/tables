import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Radio } from "antd";
import { OrdersDataType } from "../../generalTypes/interface";
import { updateOrderById } from "../../api/api";

interface OrderModalProps {
  data: OrdersDataType;
  isOpen: boolean;
}

const OrderModal: React.FC<OrderModalProps> = (props: OrderModalProps) => {
  const { data, isOpen } = props;
  const [orderCancelled, setOrderCancelled] = useState<boolean>(data.cancelled);
  const [client, setClient] = useState<string>(data.clientName);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOrderCancelled(data.cancelled);
    setClient(data.clientName)
    setIsModalOpen(false);
  }

  const handleOk = () => {
    // Did not have enough time to setup proper serializers in the BE to limit the request body to only the fields that I need
    const payload = {
        client_name : client,
        is_cancelled: orderCancelled,
        order_number: data.orderNumber,
        order_created_date: data.createdDate,
        order_delivered_date: data.deliveryDate,
        order_amount: data.price,
        payment_method: data.paymentMethod,
        new_client: data.characteristics.isNewCustomer,
        is_paid: data.characteristics.isPaid,
    }
    updateOrderById(data.key.toString(), payload);
    setIsModalOpen(false);
  };


  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="Field A">
            <Input value={client} placeholder="order name" onChange={(e) => setClient(e.target.value)} />
          </Form.Item>
          <Form.Item label="Field B">
            <Checkbox defaultChecked={orderCancelled} onChange={(e) => setOrderCancelled(e.target.checked)}> Cancelled </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderModal;
