import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_RowSelectionState,
  type MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";

import { useAppContext } from "@/pages/Components/AppContext";
import { useWebSocketContext } from "@/pages/Components/WebSocketContext";
import { GetWidgetsData } from "@/pages/api/api/DashboardWidgetsAPI";
// import { replacePeriodsWithUnderscores } from "@/pages/Functions/genericFunction";

const DashboardGaugeWidget = (props: any) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [title, setTitle] = useState<any>();
  const [id, setId] = useState<any>("");
  const { getTableApiState, togglegetTableApiState } = useAppContext();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const eventType = "ws.visualization";
  const { Subscribe, emit, unsubscribe, connection } = useWebSocketContext();
  // console.log("props.keys", props);
  function renderer(payload: any) {
    if (props.keys.endsWith(`${payload._id}`)) {
      // console.log("payload lambda - " + props.keys, payload);
      morphData(payload);
    }
  }

  async function getWidgetData() {
    // console.log("props - ",props.id, props.keys);
    return await GetWidgetsData(props.id);
  }
  useEffect(() => {
    if (!connection) return;
    Subscribe(props.keys, eventType, renderer);
    // console.log("har kuch",props.keys, eventType);

    return () => {
      unsubscribe(props.keys, eventType);
    };
  }, [Subscribe, emit, props.id, props.keys, unsubscribe, connection]);
  useEffect(() => {
    if (!connection) return;
    getWidgetData().then((res: any) => {
      // console.log("line chart res",res, props.keys)
      setTimeout(() => {
        emit(eventType, res.result);
      }, 2000);
    });
  }, [connection]);

  // let columns: any = [];
  function morphData(data: any) {
    setTitle(data?.name);
    const initialData = data?.result || [];
    let cols: any = [];
    cols.push(
      {
        accessorKey: "indicators",
        header: "Indicators",
        size: 150,
      },
      {
        accessorKey: "aggregation",
        header: "Aggregation",
        size: 150,
      },
      {
        accessorKey: "data",
        header: "Data",
        size: 150,
      }
    );
    const firstData = initialData[0]?.event || [];
    const aggregations = data?.indicators;
    const allKeys = Object.keys(firstData);

    const lines: any[] = [];
    allKeys.forEach((data: any, i: any) => {
      lines.push({
        indicators: data,
        aggregation: aggregations[i].aggregation,
        data: firstData[data],
      });
    });
    setColumns(cols);
    setData(lines);
  }

  // useEffect(() => {
  //   let response = morphData(props.data);
  //   setData(response);
  // }, [props.data]);

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };
  useEffect(() => {
    // console.info({ rowSelection });
    // props.setBulkActionDelete(rowSelection);
  }, [props, rowSelection]);

  const handleClick = (value: string) => {
    setDialogOpen(true);
    setId(value);

    // Add your logic here
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  // console.log("DATA JHADU","keys",props.keys, columns, data);
  return (
    <>
      {data && (
        <>
        <h6>{title}</h6>
          <MaterialReactTable
            columns={columns}
            data={data}
            // enableRowSelection={true}
            getRowId={(row: any) => row.id} // Give each row a more useful id
            // onRowSelectionChange={setRowSelection} // Connect internal row selection state to your own
            // state={{ rowSelection }}
          />
        </>
      )}
      {/* <DeviceDetilsModal
    handleDialogClose={handleDialogClose}
    open={dialogOpen}
    id={id}
  /> */}
    </>
  );
};

export default DashboardGaugeWidget;
