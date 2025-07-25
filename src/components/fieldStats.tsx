import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../store/slices";
import { useFirebaseData } from "../hooks/useFirebaseData";


export const FieldStates = () => {

   const { error, setError } = useFirebaseData();
 
  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );

  const workListData = useSelector((state: RootState) => state.work.workList);
  
  const getTotalCostForField = (fieldId: string) => {
    return workListData
      .filter((work) => work.fieldId === fieldId)
      .reduce((acc, work) => acc + work.cost, 0);
  };

  return (
    <Box width={{ xs: '100%', sm: '90%', md: '700px' }}>
      <Box bgcolor="floralwhite">
        <Typography variant="h4" color="black">
          Cost of the fields
        </Typography>
      </Box>
      <Box boxShadow={2}>
        <TableContainer sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead >
              <TableRow sx={{ backgroundColor: "#f0f4f8"}}>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                  S.No
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                  Fields
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                  Field Total Cost
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldListData.length > 0 ? (
                fieldListData.map((field, id) => (
                  <TableRow
                    key={field.id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#fafafa",
                      },
                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                      },
                    }}
                  >
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell align="center">{field.fieldName}</TableCell>
                    <TableCell align="center">{getTotalCostForField(field.id)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6" align="center" sx={{ color: "#7f8c8d" }}>No Data Available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
        <Snackbar
              open={!!error}
              autoHideDuration={5000}
              onClose={() => setError(null)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
                {error}
              </Alert>
            </Snackbar>
    </Box>
  );
};
