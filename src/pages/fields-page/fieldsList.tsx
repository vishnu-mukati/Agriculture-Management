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
export const FieldsList = () => {
  const dispatch = useDispatch();
  const listData = useSelector((state: RootState) => state.list.fieldsListData);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const rows = listData;
  const handleTableData = (fieldName: string) => {
    console.log("this row is clicked", fieldName);
  };

  const handleDeleteData = async (id: string) => {
    await deleteApi.firebaseDeleteData(userEmail ?? null, id);
    dispatch(deleteDataList(id));
    console.log(id);
  };

  const handleEditData = (id: string, fieldName: string, fieldArea: number) => {
    const data = {
      id,
      fieldName,
      fieldArea,
    };
    dispatch(edidtFromList(data));

    console.log("data edit successfully", id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: "lightgrey" }}>
            <TableCell align="center">S.No</TableCell>
            <TableCell align="center">Field Name</TableCell>
            <TableCell align="center">Field Area</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((field, id) => (
              <TableRow
                key={field.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  transition: "background 0.2s",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  my: 0.5,
                }}
              >
                <TableCell align="center">{id + 1}</TableCell>
                <TableCell component="th" scope="row" align="center">
                  {field.fieldName}
                </TableCell>
                <TableCell align="center">{field.fieldArea}</TableCell>
                <TableCell align="right">
                  <IconButton
                    disableRipple
                    sx={{
                      "&:focus": { outline: "none" },
                    }}
                  >
                    <EditIcon
                      sx={{ color: "warning.main" }}
                      onClick={() =>
                        handleEditData(
                          field.id,
                          field.fieldName,
                          field.fieldArea
                        )
                      }
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    disableRipple
                    sx={{
                      color: "#f44336",
                      "&:focus": { outline: "none" },
                    }}
                  >
                    <DeleteIcon onClick={() => handleDeleteData(field.id)} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    disableRipple
                    sx={{
                      "&:focus": { outline: "none" },
                    }}
                  >
                    <InfoIcon
                      onClick={() => handleTableData(field.fieldName)}
                      sx={{ color: "primary.main" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="h6">No Data Available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
