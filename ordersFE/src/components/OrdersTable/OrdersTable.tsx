import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

import {
  OrdersDataType,
  TableFilters,
} from "../../generalTypes/interface";
import Filters from "../Filters/Filters";
import { filterTableData, formatDate } from "../../utils";
import './ordersTable.scss';
import { deleteOrderById } from "../../api/api";
import OrderModal from "../OrderModal/OrderModal";


interface OrdersTableProps {
  data: OrdersDataType[];
  columns: ColumnsType<OrdersDataType>;
  pagination?: false | TablePaginationConfig;
}

const OrdersTable: React.FC<OrdersTableProps> = (props: OrdersTableProps) => {
  const { data, columns, pagination } = props;
  const [tableData, setTableData] = useState<OrdersDataType[]>(data); // Replace 'any[]' with your actual data type
  const [singleOrder, setSingleOrder] = useState<OrdersDataType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filters, setFilters] = React.useState<TableFilters>({
    createdDate: null,
    deliveryDate: null,
    isCard: false,
    isCash: false,
    isInvoice: false,
    isPaid: false,
    isNewCustomer: false,
    cancelled: false,
  });
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredData = data.filter((order) => {
      const { orderNumber, clientName } = order;
      return orderNumber.includes(value) || clientName.includes(value);
    });
    setTableData(filteredData);
  };
  const handleCreatedDateChange = (
    dates: unknown,
    dateStrings: [string, string]
  ) => {
    const [startDate, endDate] = dateStrings;
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    if (start === "Invalid Date" || end === "Invalid Date") {
      setFilters({ ...filters, createdDate: null });
    } else {
      setFilters({ ...filters, createdDate: { start, end } });
    }
  };

  const hanldeDeliveryDateChange = (
    dates: unknown,
    dateStrings: [string, string]
  ) => {
    const [startDate, endDate] = dateStrings;
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    setFilters({ ...filters, deliveryDate: { start, end } });
    if (start === "Invalid Date" || end === "Invalid Date") {
      setFilters({ ...filters, deliveryDate: null });
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
  };
  const handleCashChange = (checked: boolean) => {
    setFilters({ ...filters, isCash: checked });
  };
  const handleInvoiceChange = (checked: boolean) => {
    setFilters({ ...filters, isInvoice: checked });
  };

  const handleFilterChange = (data: OrdersDataType[], filters: TableFilters) => {
    const filteredTableData = filterTableData(data, filters);
    setTableData(filteredTableData);
  }
 const getRowClassName = (record: OrdersDataType) => {
    // Check the value of the 'status' property and return a class name accordingly
    return record.characteristics.isCancelled  ? 'cancelled-order' : '';
  };

  const handleDelete = (singleOrder: OrdersDataType) => {
    const id = singleOrder.key.toString();
    deleteOrderById(id);
  }

  const handleEdit = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    handleFilterChange(data, filters)
  }, [data, filters]);

  const rowSelection = {
    onSelect: (record: OrdersDataType, selected: boolean, selectedRows: OrdersDataType[], nativeEvent: Event) => {
      setSingleOrder(record);
    }
  };

  return (
    <div className="orders-table-root">
      <div>
        <Input.Search
          onChange={handleSearch}
          placeholder="search client names or ordernumbers"
        />
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
        <div>
          {singleOrder && (
            <>
            <Button type="default" onClick={() => handleEdit()}>Edit record</Button>
            <Button type="default" className="bg-red-800 text-white" onClick={() => handleDelete(singleOrder)}>Delete Record</Button>
            </>
          )}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          rowClassName={getRowClassName}
          pagination={pagination}
        />
        </div>
      </div>
      {singleOrder && isModalOpen && (
        <OrderModal data={singleOrder} isOpen={isModalOpen} />
      )}
    </div>
  );
};

export default OrdersTable;
