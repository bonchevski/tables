import { Layout } from "antd"
import OrdersTable from "./components/OrdersTable/OrdersTable"
import { useEffect, useState } from "react"
import { OrderCharacteristics, OrdersDataType } from "./generalTypes/interface";
import axios from "axios";
import { formatOrdersData } from "./utils";
import { ColumnsType } from "antd/es/table";
import { LuUserPlus } from "react-icons/lu";
import { LuFilePlus2 } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";

const App:React.FC = () => {

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

  const [tableData, setTableData] = useState<OrdersDataType[]>([]); // Replace 'any[]' with your actual data type


  useEffect(() => {
    axios.get('http://localhost:8000/api/orders/')
      .then(response => {
        const data = formatOrdersData(response.data);
        setTableData(data);
      })
      .catch(error => console.log(error));
    // fetch('http://localhost:3000/api/orders')
    //   .then(response => response.json())
    //   .then(data => console.log(data))
  }, []);


  return (
    <>
      <Layout className='flex flex-col items-center'>
        <div className="flex flex-row">
        <OrdersTable columns={columns} data={tableData} pagination={{pageSize: 3}} />
        
        </div>
        
      </Layout>
    </>
  )
}

export default App
