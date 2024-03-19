import * as React from "react";

import { Checkbox } from "@mui/material";

export default function AddUserRoleTable({ onChange }: any) {
    const permissionsData = [
        { name: 'Dashboard', key: 'DASHBOARD' },
        { name: 'Assets', key: 'ASSETS' },
        { name: 'Alerts', key: 'ALERTS' },
        { name: 'Topology', key: 'Topology' },
        { name: 'Explorer', key: 'EXPLORER' },
        { name: 'Reports', key: 'REPORTS' },
        { name: 'Diagnostics', key: 'DIAGNOSTICS' },
        { name: 'NCM', key: 'NCM' },
        { name: 'Audit', key: 'AUDIT' },
        { name: 'Settings', key: 'SETTINGS' }

      ];
  return (
    <div className="px-4 py-1 overflow-x-auto">
      <table className="min-w-full border-collapse table-fixed">
        <thead >
          <tr className="bg-textColor text-center dark:bg-tabel-header dark:text-textColor">
            <th className="px-6 py-3 text-center text-base font-semibold dark:bg-tabel-header  dark:text-textColor ">
              Module
            </th>
            <th className="px-6 py-3 text-right text-base  font-semibold dark:bg-tabel-header dark:text-textColor">
              Read
            </th>
            <th className="px-6 py-3 text-right text-base   font-semibold dark:bg-tabel-header dark:text-textColor">
              Write
            </th>
            <th className="px-6 py-3 text-right text-base  font-semibold dark:bg-tabel-header dark:text-textColor">
              Delete
            </th>
          </tr>
        </thead>
         <tbody>
      {permissionsData.map(permission => (
        <tr key={permission.key} className="text-center border-b-2 dark:bg-dark-container dark:text-textColor">
          <td className="bg-white dark:bg-dark-container text-sm dark:text-textColor dark:border-dark-border">
            {permission.name}
          </td>
          <td className="px-6 text-right">
            <Checkbox  className=" dark:text-textColor"  onChange={() => onChange(`read:${permission.key}`)} />
          </td>
          <td className="px-6 text-right">
            <Checkbox className=" dark:text-textColor"  onChange={() => onChange(`write:${permission.key}`)} />
          </td>
          <td className="px-6 text-right">
            <Checkbox  className=" dark:text-textColor" onChange={() => onChange(`delete:${permission.key}`)} />
          </td>
        </tr>
      ))}
    </tbody>
      </table>
    </div>
  );
}
