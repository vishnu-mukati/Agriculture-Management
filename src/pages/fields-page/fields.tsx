import {
  Box,
  Paper,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FieldsList } from "./fieldsList";
import { dataApi } from "../../store/apis/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import { addToList, removeFromList } from "../../store/slices/fielsListSlice";

export const Fields = () => {
  const [formShow, setFormShow] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldArea, setFieldArea] = useState("");
  const dispatch = useDispatch();
  // const userEmail = useSelector((state:RootState)=>state.auth.user?.email);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    if (!userEmail) return;


    getData(); // when component mount for the first time
    const interval = setInterval(() => {
      getData();
    }, 10000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  const getData = async () => {
    try {
      const response = await dataApi.firebaseListGet(userEmail)
      if (response.data) {
       console.log(response.data);
        const fieldGetData = Object.keys(response.data).map((dataId) => ({
          ...response.data[dataId],
          id: dataId,
        }));
        console.log(fieldGetData);
        dispatch(addToList(fieldGetData));
      }else{
        dispatch(removeFromList());
      }
    } catch (err: any) {
      console.error("failed to fielddata", err.response?.data?.error?.message);
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      fieldName,
      fieldArea: Number(fieldArea)
    }

    try {
      const response = await dataApi.firebaseListStore(data, userEmail)
      console.log(response.data);
    } catch (err: any) {
      console.error(err.response?.data?.error?.message);
    }

    console.log(`the field is added,${data}`);
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

      <Box><FieldsList /></Box>
    </>
  );
};
