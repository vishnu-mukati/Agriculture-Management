
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";

function createData(fieldName: String, fieldArea: number) {
  return { fieldName, fieldArea };
}

export const FieldsList = () => {
  const rows = [
    createData("roadtouch", 11),
    createData("mavdiwala", 11),
    createData("jamanwala", 11),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ border: "2px solid", bgcolor: "lightgrey" }}>
            <TableCell>Field Name</TableCell>
            <TableCell align="center">Field Area</TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                 px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  my: 0.5,
              }}
            >
              <TableCell component="th" scope="row">
                {row.fieldName}
              </TableCell>
              <TableCell align="center">{row.fieldArea}</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
