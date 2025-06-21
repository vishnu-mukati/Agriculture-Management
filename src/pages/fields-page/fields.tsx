import {
  Box,
  Paper,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { FieldsList } from "./fieldsList";

export const Fields = () => {
  const [formShow, setFormShow] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldArea, setFieldArea] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("the field is added");
  };

  const handleFormToggle = () => {
    setFormShow((prev) => !prev);
  };

  return (
    <>
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
                <TextField
                  label="field-name"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  required
                />
                <TextField
                  label="field-area"
                  value={fieldArea}
                  onChange={(e) => setFieldArea(e.target.value)}
                  type="number"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">ha</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 0 }}
                />
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
          <Button onClick={handleFormToggle}>Add Field</Button>
        )}
      </Box>

      <Box><FieldsList/></Box>
    </>
  );
};
