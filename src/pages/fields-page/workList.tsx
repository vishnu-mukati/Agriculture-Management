import { DataGrid } from "@mui/x-data-grid";
import type { GridPaginationModel } from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import type { WorkListProps } from "../../types/auth";

export const WorkList = () => {
  const dispatch = useDispatch();
   
  const userData = useSelector((state: RootState) => state.work.workList);
  const rows = userData;

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const paginatedData = rows
    .slice(
      paginationModel.page * paginationModel.pageSize,
      (paginationModel.page + 1) * paginationModel.pageSize
    )
    .map((item, i) => ({
      ...item,
      serial: paginationModel.page * paginationModel.pageSize + i + 1,
    }));

  // const handleEditData = (id: string, work: string, date: string) => {
  //   console.log("Edit", id, work, date);
  // };

  // const handleDeleteData = (id: string) => {
  //   console.log("Delete", id);
  // };

  const rowsWithIndex = rows.map((row, index) => ({
    ...row,
    serial: index + 1,
  }));

  const columns = [
    {
      field: "serial",
      headerName: "S.No",
      width: 80,
    },
    { field: "fieldWork", headerName: "Field Work", width: 150 },
    { field: "workDate", headerName: "Work Date", width: 150 },
    { field: "cost", headerName: "Cost", width: 130 },
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   width: 100,
    //   sortable: false,
    //   renderCell: (params: any) => (
    //     <IconButton
    //       onClick={() =>
    //         handleEditData(params.row.id, params.row.fieldWork, params.row.workDate)
    //       }
    //     >
    //       <EditIcon sx={{ color: "orange" }} />
    //     </IconButton>
    //   ),
    // },
    //   {
    //     field: "delete",
    //     headerName: "Delete",
    //     width: 100,
    //     sortable: false,
    //     renderCell: (params: any) => (
    //       <IconButton onClick={() => handleDeleteData(params.row.id)}>
    //         <DeleteIcon sx={{ color: "red" }} />
    //       </IconButton>
    //     ),
    //   },
  ];

  const cost = rows.reduce((acc, curr) => acc + curr.cost, 0);
  const totalCurrentCost = paginatedData.reduce((acc, curr) => acc + curr.cost, 0);


  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={paginatedData}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        paginationMode="server"
        rowCount={rows.length}
      />
      <Box sx={{ mt: 2, textAlign: "right", fontWeight: "bold" }}>
        <Typography variant="h6" color="black" component="h6">
          Total Cost of Current Page: {totalCurrentCost}
        </Typography>
        <Typography variant="h6" color="black" component="h6">
          Total Cost {cost}
        </Typography>
      </Box>
    </Box>
  );
};

