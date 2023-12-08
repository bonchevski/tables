import React, { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LuUserPlus } from "react-icons/lu";
import { LuFilePlus2 } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";

interface OrderCharacteristics {
  isPaid: boolean;
  hasInvoice: boolean;
  isNewCustomer: boolean;
}

interface OrdersDataType {
  key: React.Key;
  orderNumber: string;
  createdDate: string;
  deliveryDate: string;
  clientName: string;
  price: number;
  characteristics: OrderCharacteristics;
}

const columns: ColumnsType<OrdersDataType> = [
  {
    title: "Order Number",
    dataIndex: "orderNumber",
  },
  {
    title: "Name",
    dataIndex: "clientName",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "characteristics",
    dataIndex: "characteristics",
    render: (characteristics: OrderCharacteristics) => (
      <div className="flex flex-row px-1">
        {characteristics.isPaid && <LuDollarSign />}
        {characteristics.hasInvoice && <LuFilePlus2 />}
        {characteristics.isNewCustomer && <LuUserPlus />}
      </div>
    ),
  },
];

const data: OrdersDataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    orderNumber: `Order ${i}`,
    clientName: `Edward King ${i}`,
    createdDate: "2024-02-01",
    deliveryDate: "2024-03-01",
    price: 32 + i,
    characteristics: {
      isPaid: true,
      hasInvoice: false,
      isNewCustomer: true,
    },
  });
}


const OrdersTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default OrdersTable;
