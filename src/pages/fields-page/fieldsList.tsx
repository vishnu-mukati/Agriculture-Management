import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import {
  deleteDataList,
  edidtFromList,
} from "../../store/slices/fieldsListSlice";
import { deleteApi } from "../../store/apis/axiosInstance";
import { useNavigate } from "react-router-dom";
export const FieldsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listData = useSelector((state: RootState) => state.list.fieldsListData);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const rows = listData;
  const handleTableData = ( id: string) => {
    navigate(`/fieldForm/${id}`);
  };

  const handleDeleteData = async (id: string) => {
    await deleteApi.firebaseDeleteData(userEmail ?? null, id);
    dispatch(deleteDataList(id));
  };

  const handleEditData = (id: string, fieldName: string, fieldArea: number, returnProfit : number) => {
    const data = {
      id,
      fieldName,
      fieldArea,
      returnProfit,
    };
    dispatch(edidtFromList(data));

  };

  return (


    <TableContainer component={Paper} sx={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", borderRadius: 2 }}>
      <Table sx={{ minWidth: 680 }} aria-label="fields table">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f0f4f8" }}>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>S.No</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Field Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Field Area</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Edit</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Delete</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((field, id) => (
              <TableRow
                key={field.id}
                hover
                sx={{
                  transition: "background 0.3s",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <TableCell align="center" onClick={() => handleTableData(field.id)}>
                  {id + 1}
                </TableCell>
                <TableCell align="center" onClick={() => handleTableData( field.id)}>
                  {field.fieldName}
                </TableCell>
                <TableCell align="center" onClick={() => handleTableData( field.id)}>
                  {field.fieldArea}
                </TableCell>
                <TableCell align="center">
                  <IconButton disableRipple sx={{ "&:focus": { outline: "none" } }}>
                    <EditIcon
                      onClick={() => handleEditData(field.id, field.fieldName, field.fieldArea, field.returnProfit)}
                      sx={{ color: "#ff9800" }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton disableRipple sx={{ "&:focus": { outline: "none" } }}>
                    <DeleteIcon onClick={() => handleDeleteData(field.id)} sx={{ color: "#f44336" }} />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton disableRipple sx={{ "&:focus": { outline: "none" } }}>
                    <InfoIcon
                      onClick={() => handleTableData( field.id)}
                      sx={{ color: "#1976d2" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="h6" color="textSecondary">
                  No Data Available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>



    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 450 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow sx={{ bgcolor: "lightgrey" }}>
    //         <TableCell align="center">S.No</TableCell>
    //         <TableCell align="center">Field Name</TableCell>
    //         <TableCell align="center">Field Area</TableCell>
    //         <TableCell align="right">Edit</TableCell>
    //         <TableCell align="right">Delete</TableCell>
    //         <TableCell align="right">Info</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.length > 0 ? (
    //         rows.map((field, id) => (
    //           <TableRow
    //             key={field.id}
    //             sx={{
    //               "&:last-child td, &:last-child th": { border: 0 },
    //               px: 2,
    //               py: 1.5,
    //               borderRadius: 2,
    //               transition: "background 0.2s",
    //               "&:hover": {
    //                 backgroundColor: "#e0e0e0",
    //               },
    //               my: 0.5,
    //             }}
    //             //  onClick={() => handleTableData(field.fieldName,field.id)}
    //           >
    //             <TableCell align="center"  onClick={() => handleTableData(field.fieldName,field.id)}>{id + 1}</TableCell>
    //             <TableCell component="th" scope="row" align="center"  onClick={() => handleTableData(field.fieldName,field.id)}>
    //               {field.fieldName}
    //             </TableCell>
    //             <TableCell align="center"  onClick={() => handleTableData(field.fieldName,field.id)}>{field.fieldArea}</TableCell>
    //             <TableCell align="right">
    //               <IconButton
    //                 disableRipple
    //                 sx={{
    //                   "&:focus": { outline: "none" },
    //                 }}
    //               >
    //                 <EditIcon
    //                   sx={{ color: "warning.main" }}
    //                   onClick={() =>
    //                     handleEditData(
    //                       field.id,
    //                       field.fieldName,
    //                       field.fieldArea
    //                     )
    //                   }
    //                 />
    //               </IconButton>
    //             </TableCell>
    //             <TableCell align="right">
    //               <IconButton
    //                 disableRipple
    //                 sx={{
    //                   color: "#f44336",
    //                   "&:focus": { outline: "none" },
    //                 }}
    //               >
    //                 <DeleteIcon onClick={() => handleDeleteData(field.id)} />
    //               </IconButton>
    //             </TableCell>
    //             <TableCell align="right">
    //               <IconButton
    //                 disableRipple
    //                 sx={{
    //                   "&:focus": { outline: "none" },
    //                 }}
    //               >
    //                 <InfoIcon
    //                   onClick={() => handleTableData(field.fieldName,field.id)}
    //                   sx={{ color: "primary.main" }}
    //                 />
    //               </IconButton>
    //             </TableCell>
    //           </TableRow>
    //         ))
    //       ) : (
    //         <TableRow>
    //           <TableCell colSpan={6} align="center">
    //             <Typography variant="h6">No Data Available</Typography>
    //           </TableCell>
    //         </TableRow>
    //       )}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};
