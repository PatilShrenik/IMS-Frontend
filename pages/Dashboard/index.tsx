// import DataTable from "react-data-table-component";
// import { useAppContext } from "../Components/AppContext";

// const customStyles = {
//   rows: {
//     style: {
//       minHeight: "72px", // override the row height
//     },
//   },
//   headCells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for head cells
//       paddingRight: "8px",
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: "8px", // override the cell padding for data cells
//       paddingRight: "8px",
//     },
//   },
// };

// const columns = [
//   {
//     name: "Title",
//     selector: (row: any) => row.title,
//     sortable: true,
//   },
//   {
//     name: "Year",
//     selector: (row: any) => row.year,
//     sortable: true,
//   },
// ];

// const data = [
//   {
//     id: 1,
//     title: "Beetlejuice",
//     year: "1988",
//   },
//   {
//     id: 2,
//     title: "Ghostbusters",
//     year: "1984",
//   },
// ];

// export default function MyComponent() {
//   const { themeSwitch } = useAppContext();
//   return (
//     <DataTable
//       columns={columns}
//       data={data}
//       selectableRows
//       className="bg-red-500 dark:bg-green-300"
//       // customStyles={customStyles}
//     />
//   );
// }
import React from 'react'

const index = () => {
  return (
    <div className='dark:text-textColor'>Dashboard</div>
  )
}

export default index