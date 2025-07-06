import { DataGrid } from "@mui/x-data-grid";
import type { GridPaginationModel } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/slices";

export const WorkList = () => {
   
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
    <Box   sx={{
    height: 300,
    // width: "100%",
    bgcolor: "#f9fafc",
    // p: 2,
    borderRadius: 2,
    boxShadow: 3,
  }}>
      <DataGrid
        rows={paginatedData}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        paginationMode="server"
        rowCount={rows.length}
         sx={{
      bgcolor: "white",
      borderRadius: 2,
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#e3f2fd", // Light blue
        color: "#0d47a1", // Darker blue text
        fontWeight: "bold",
      },
      "& .MuiDataGrid-row:hover": {
        backgroundColor: "#f1f8ff",
      },
      "& .MuiDataGrid-cell": {
        color: "#37474f", // Blue-gray text
      },
    }}
      />
      <Box  sx={{ mt: 2, textAlign: "right", fontWeight: "bold" }}>
        <Typography variant="h6" color="#2e7d32" component="h6">
          Total Cost of Current Page: {totalCurrentCost}
        </Typography>
        <Typography variant="h6" color="#1b5e20" component="h6">
          Total Cost {cost}
        </Typography>
      </Box>
    </Box>
  );
};

