import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LuUserPlus } from "react-icons/lu";
import { LuFilePlus2 } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";
import { OrderCharacteristics, OrdersDataType, TableFilters } from "../../generalTypes/interface";
import Filters from "../Filters/Filters";
import dayjs from "dayjs";
import { formatDate } from "../../utils";



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

interface OrdersTableProps {
  data: OrdersDataType[];
}

const OrdersTable: React.FC<OrdersTableProps> = (props: OrdersTableProps) => {
  const { data } = props;
  const [tableData, setTableData] = useState<OrdersDataType[]>(data); // Replace 'any[]' with your actual data type
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [filters, setFilters] = React.useState<TableFilters>();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredData = data.filter((order) => {
      const { orderNumber, clientName } = order;
      return orderNumber.includes(value) || clientName.includes(value);
    });
    setTableData(filteredData);
  }
  const handleCreatedDateChange = (
    dates: any,
    dateStrings: [string, string]
  ) => {
    const [startDate, endDate] = dateStrings;
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    if(start === 'Invalid Date' || end === 'Invalid Date') {
      setTableData(data);
      setFilters({ ...filters, createdDate: null });

    } else {
      setFilters({ ...filters, createdDate: { start, end } });
    }
  };

  const hanldeDeliveryDateChange = (
    dates: any,
    dateStrings: [string, string]
  ) => {
    const [startDate, endDate] = dateStrings;
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    setFilters({ ...filters, deliveryDate: { start, end } });
    if(start === 'Invalid Date' || end === 'Invalid Date') {
      setTableData(data);
    } else {
      setFilters({ ...filters, createdDate: { start, end } });
    }
  };

  const handlePaidChange = (checked: boolean) => {
    setFilters({ ...filters, isPaid: checked });
  };

  const handleNewCustomerChange = (checked: boolean) => {
    setFilters({ ...filters, isNewCustomer: checked });
  };

  const handleCardChange = (checked: boolean) => {
    setFilters({ ...filters, isCard: checked });
  }
  const handleCashChange = (checked: boolean) => { 
    setFilters({ ...filters, isCash: checked });
  }
  const handleInvoiceChange = (checked: boolean) => {
    setFilters({ ...filters, isInvoice: checked });
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    // filter the tableData based on the filters
    let filteredData = data;
    if (filters) {
      if (filters.createdDate) {
        const { start, end } = filters.createdDate;
        if(start === '' || end === '') {
          setTableData(data);
        }
        filteredData = filteredData.filter((order) => {
          const orderDate = dayjs(order.createdDate);
          return orderDate.isBetween(start, end);
        });
        setTableData(filteredData);
      } 
      if (filters.deliveryDate) {
        const { start, end } = filters.deliveryDate;
        filteredData = filteredData.filter((order) => {
          const orderDate = dayjs(order.deliveryDate);
          return orderDate.isBetween(start, end);
        });
        setTableData(filteredData);
      }
      if (filters.isPaid) {
        filteredData = filteredData.filter((order) => order.characteristics.isPaid);
        setTableData(filteredData);
      }
      if (filters.isNewCustomer) {
        filteredData = filteredData.filter((order) => order.characteristics.isNewCustomer);
        setTableData(filteredData);
      }
      if(filters.isCard) {
        filteredData = filteredData.filter((order) => order.characteristics.isCreditCard);
        setTableData(filteredData);
      }
      if(filters.isCash) {
        filteredData = filteredData.filter((order) => order.characteristics.isCash);
        setTableData(filteredData);
      }
      if(filters.isInvoice) {
        filteredData = filteredData.filter((order) => order.characteristics.hasInvoice);
        setTableData(filteredData);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);



  return (
    <div className="flex flex-col">
      <div>
        <Input.Search onChange={handleSearch} placeholder="search client names or ordernumbers" />
      </div>
      <div className="flex flex-row">

      <Filters
        onCreatedDateChange={handleCreatedDateChange}
        onDeliveryDateChange={hanldeDeliveryDateChange}
        onNewCustomerChange={handleNewCustomerChange}
        onCardChange={handleCardChange}
        onCashChange={handleCashChange}
        onInvoiceChange={handleInvoiceChange}
        onPaidChange={handlePaidChange}
        onResetFilters={() => setTableData(data)}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
      </div>
    </div>
  );
};

export default OrdersTable;
