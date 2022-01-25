import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { mockData } from '../mockData';

import '../css/Datasheet.css'

const columns = [
  {field: "id", headerName: "ID"},
  {field: "name", headerName: "Name"},
  {field: "total", headerName: "Total", editable: true, type: 'number'},
  {field: "xlevel", headerName: "X-level", editable: true, type: 'number'},
  {field: "ylevel", headerName: "Y-level", editable: true, type: 'number'},
  {field: "zlevel", headerName: "Z-level", editable: true, type: 'number'},
  {field: "test1", headerName: "Test-1", editable: true},
  {field: "test2", headerName: "Test-2", editable: true},
  {field: "test3", headerName: "Test-3", editable: true},
]

const rows = mockData

const getSelectedRowId = (ids) => {
  console.log(ids)
}

export default function Datasheet() {
  return (
    <div className="Datasheet">
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={item => {getSelectedRowId(item)}}
      />
    </div>
  );
}
