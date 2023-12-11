import { Layout } from "antd"
import OrdersTable from "./components/OrdersTable/OrdersTable"
import { useEffect, useState } from "react"
import { OrdersDataType, TableFilters } from "./generalTypes/interface";
import axios from "axios";
import { formatOrdersData } from "./utils";

const App:React.FC = () => {

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

        <OrdersTable data={tableData} />
        </div>
        
      </Layout>
    </>
  )
}

export default App
