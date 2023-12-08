import { Layout } from "antd"
import OrdersTable from "./components/OrdersTable/OrdersTable"
import { useEffect, useState } from "react"
import TableFilter from "./components/Filters/TableFilter/TableFilter";
import { OrdersDataType, TableFilters } from "./generalTypes/interface";
import axios from "axios";

const App:React.FC = () => {
  const [tableData, setTableData] = useState<OrdersDataType[]>([]); // Replace 'any[]' with your actual data type
  const [filteredData, setFilteredData] = useState<OrdersDataType[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const handleFilterChange = (filters: TableFilters) => {
    // Apply filtering logic here based on the provided filters
    console.log(filters);
    // For now, let's just set filteredData to the original tableData
    setFilteredData(tableData);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/orders/')
      .then(response => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch(error => console.log(error));
    // fetch('http://localhost:3000/api/orders')
    //   .then(response => response.json())
    //   .then(data => console.log(data))
  }, []);

  useEffect(() => {
  },[]);

  return (
    <>
      <Layout className='flex flex-col items-center'>
        <div className="flex flex-row">

        <TableFilter onFilterChange={handleFilterChange} />
        <OrdersTable data={[]} />
        </div>
        
      </Layout>
    </>
  )
}

export default App
