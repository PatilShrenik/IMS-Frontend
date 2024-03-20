import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_RowSelectionState,
  type MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";

import { useAppContext } from "../AppContext";
// import { replacePeriodsWithUnderscores } from "@/pages/Functions/genericFunction";

const GridWidgetTabel = (props: any) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [data, setData] = useState<any>();
  const [columns, setColumns] = useState<any>();
  const [id, setId] = useState<any>("");
  const { getTableApiState, togglegetTableApiState } = useAppContext();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  // let columns: any = [];
  function morphData(data: any) {
    const initialData = data?.result || [];
    if (initialData[0]) {
      const groupBy = data["group.by"]
      const totalGroupsKeys: any = {};
      let cols: any = [];
      cols.push({
        field: "device",
        headerName: "Device",
        minWidth: 150,
      });
      //   if (groupBy != "device") {
      //     initialData.forEach((item: any) => {
      //       if (!totalGroupsKeys[item?.event[groupBy]]) {
      //         totalGroupsKeys[item?.event[groupBy]] = true;
      //       }
      //     });
      //     cols.push({
      //       field: groupBy,
      //       headerName: groupBy,
      //       minWidth: 150,
      //     });
      //   }
      const firstData = initialData[0]?.event || 0;
      const allKeys = Object.keys(firstData);
      allKeys.filter((keys: any) => {
        if (keys != "device" && keys != groupBy) {
          cols.push({
            field: keys.replace(/\./g, "_"),
            headerName: keys.replace(/\./g, " "),
            minWidth: 150,
          });
        }
      });
      // console.log("index", indexes);
      const lines: any[] = [];
      initialData.forEach((data: any, i: any) => {
        let modifiedData: any = {};
        Object.keys(data.event).map((x: any, i: any) => {
          modifiedData[`${x.replace(/\./g, "_")}`] = data.event[x];
        });
        modifiedData.id = i + data.event.device + props.keys;
        lines.push(modifiedData);
      });
      setColumns(cols);
      // setData(lines);
      return lines;
    } else {
      return "No Data";
    }
  }

  useEffect(() => {
    let response = morphData(props.data);
    setData(response);
  }, [props.data]);

  return (
    <>
      {data &&
        (data == "No Data" ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-slate-300">No Data</h1>
          </div>
        ) : (
          <table className="w-full border-collapse overflow-x-scroll">
            <thead>
              <tr>
                {columns.map((key: any) => {
                  //   const formattedKey = key
                  //     .replace(/_/g, " ")
                  //     .replace(/\b\w/g, (char: any) => char.toUpperCase());

                  return (
                    <th
                      className="bg-textColor dark:bg-tabel-header dark:text-textColor py-2"
                      key={key}
                    >
                      {key.headerName}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((data: any, index: any) => {
                const isLastRow = index === data.length - 1;
                return (
                  <tr
                    className="bg-white dark:bg-dark-menu-color dark:text-textColor"
                    key={index}
                  >
                    {columns.map((key: any) => {
                      console.log("-----------", data[key.field]);
                      return (
                        <td
                          style={{
                            textAlign: "center",
                          }}
                          className={`bg-white dark:bg-dark-menu-color dark:text-textColor dark:border-dark-border py-1 ${
                            isLastRow ? "border-b" : "border-b"
                          }`}
                          key={key}
                        >
                          {data[key.field]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ))}
    </>
  );
};

export default GridWidgetTabel;
