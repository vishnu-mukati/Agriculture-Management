import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import { workListApi } from "../../store/apis/axiosInstance";
import {
  addToWorkList,
  addWorkToTop,
  removeWorkList,
} from "../../store/slices/fieldWorkSlice";
import { WorkList } from "./workList";
import { dataApi } from "../../store/apis/axiosInstance";
import { addToList, removeFromList } from "../../store/slices/fieldsListSlice";

export const FieldForm = () => {
  const { id } = useParams();
  const [formShow, setFormShow] = useState(false);
  const [fieldWork, setFieldWork] = useState("");
  const [workDate, setWorkDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [cost, setCost] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const safeUserEmail: string | null = userEmail ?? null;
  const fieldList = useSelector(
    (state: RootState) => state.list.fieldsListData
  );

  const fieldData = fieldList
    .filter((item) => item.id === id)
    .map((item) => item.fieldName);

  useEffect(() => {
    if (!userEmail) return;

    getData(); // when component mount for the first time
    const interval = setInterval(() => {
      getData();
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, [userEmail]);

  const getData = async () => {
    try {
      const result = await dataApi.firebaseListGet(safeUserEmail);
      if (result.data) {
        const fieldGetData = Object.keys(result.data).map((id) => ({
          ...result.data[id],
          id,
        }));

        dispatch(addToList(fieldGetData));
      } else {
        dispatch(removeFromList());
      }
      const response = await workListApi.firebaseListGet(safeUserEmail, id);
      if (response.data) {
        const finalData = Object.keys(response.data).map((dataId) => ({
          ...response.data[dataId],
          id: dataId,
          fieldId: id,
        }));

        dispatch(addToWorkList(finalData));
      } else {
        dispatch(removeWorkList());
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error?.message || "Failed to fetch data");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = workDate?.valueOf();

    const data = {
      fieldWork,
      //  workDate: workDate?.format("DD-MM-YYYY"),
      workDate: dayjs(date).format("DD-MM-YYYY"),
      cost: Number(cost),
    };

    try {
      const response = await workListApi.firebaseWorkData(
        safeUserEmail,
        id,
        data
      );
      const newData = {
        id: response.data.name,
        fieldWork,
        workDate: dayjs(date).format("DD-MM-YYYY"),
        cost: Number(cost),
        fieldId: id,
      };
      dispatch(addWorkToTop(newData));
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error?.message || "Failed to submit form");
    }

    setFieldWork("");
    setCost("");
    setWorkDate(dayjs());
    setFormShow(false);
  };

  const handleFormToggle = () => {
    setFormShow((prev) => !prev);
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          bgcolor: "#e3f2fd",
          color: "#0d47a1",
          px: 2,
          py: 1,
          borderRadius: 1,
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Welcome To {fieldData}
      </Typography>
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
              width: "88%",
              maxWidth: "600px",
              bgcolor: "#fdfefe",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Fields
            </Typography>

            <Box component="form" onSubmit={handleFormSubmit} sx={{ p: 2 }}>
              <Stack alignItems="center" spacing={2} direction="row">
                <TextField
                  id="work"
                  label="Work"
                  name="work"
                  select
                  fullWidth
                  value={fieldWork}
                  size="medium"
                  variant="outlined"
                  sx={{ bgcolor: "#ffffff" }}
                  helperText="Please Select Your Field Work"
                  onChange={(e) => setFieldWork(e.target.value)}
                  required
                >
                  <MenuItem value="Irrigation">Irrigation</MenuItem>
                  <MenuItem value="Pesticide">Pesticide</MenuItem>
                  <MenuItem value="Fertilizer">Fertilizer</MenuItem>
                  <MenuItem value="Plow">Plow</MenuItem>
                  <MenuItem value="Cultivator">Cultivator</MenuItem>
                  <MenuItem value="Showing">Showing</MenuItem>
                  <MenuItem value="Rotavator">Rotavator</MenuItem>
                  <MenuItem value="Harvesting">Harvesting</MenuItem>
                </TextField>
              </Stack>
              <Box padding={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    value={workDate}
                    onChange={(newValue) => setWorkDate(newValue)}
                    format="DD-MM-YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        sx: { bgcolor: "#ffffff" },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <TextField
                  label="cost"
                  id="work"
                  type="number"
                  fullWidth
                  value={cost}
                  helperText="Please Enter Your Work Cost"
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
              </Box>
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
                >
                  Add Field
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleFormToggle}
                  sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Paper>
        ) : (
          <Button
            variant="contained"
            onClick={handleFormToggle}
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#1976d2",
              margin: "12px",
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            Add Field
          </Button>
        )}
      </Box>
      <Box>
        <WorkList />
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
