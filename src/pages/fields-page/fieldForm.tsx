import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
export const FieldForm = () => {
    const {id} = useParams();
    console.log(id);
  const [formShow, setFormShow] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {};

  const handleFormToggle = () => {
    setFormShow((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mt: 0,
      }}
    >
      {formShow ? (
        <Paper
          elevation={6}
          sx={{
            width: "500px",
            bgcolor: "offwhite",
            minHeight: "150px",
            padding: "32px",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Fields
          </Typography>

          <form onSubmit={handleFormSubmit}>
            <Stack alignItems="center" spacing={2} direction="row">
              <Grid container my={4} columnSpacing={2} rowSpacing={2}>
                <Grid size={{xs:6}}>
                <TextField
                  label="Crop-name"
                  //   value={fieldName}
                  //   onChange={(e) => setFieldName(e.target.value)}
                  required
                />
                </Grid>
                <Grid size={{xs:6}}>
                <TextField
                  label="Crop-fertilizer"
                  //   value={fieldArea}
                  //   onChange={(e) => setFieldArea(e.target.value)}

                  required
                />
                </Grid>
                <Grid size={{xs:6}}>
                <TextField
                  label="Crop-pesticide"
                  //   value={fieldName}
                  //   onChange={(e) => setFieldName(e.target.value)}
                  required
                />
                </Grid>
                <Grid size={{xs:6}}>
                <TextField
                  label="Crop-irrigation"
                  //   value={fieldName}
                  //   onChange={(e) => setFieldName(e.target.value)}
                  required
                />
                </Grid>
              </Grid>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained" type="submit">
                Add Field
              </Button>
              <Button variant="contained" onClick={handleFormToggle}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Paper>
      ) : (
        <Button
          variant="contained"
          onClick={handleFormToggle}
          disableRipple
          sx={{
            margin: "20px",
            "&:focus": { outline: "none" },
          }}
        >
          Add Field
        </Button>
      )}
    </Box>
  );
};
