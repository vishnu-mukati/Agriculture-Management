import {
  Box,
  Paper,
  Button,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FieldsList } from "./fieldsList";
import { dataApi } from "../../store/apis/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import {
  addToList,
  addFieldToTop,
  removeFromList,
} from "../../store/slices/fieldsListSlice";
import { editApi } from "../../store/apis/axiosInstance";
import { clearEditData } from "../../store/slices/fieldsListSlice";

export const Fields = () => {
  const [formShow, setFormShow] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldArea, setFieldArea] = useState("");
  const [returnProfit, setReturnProfit] = useState("");
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const editData = useSelector((state: RootState) => state.list.editDataList);

  // const userEmail = localStorage.getItem('email');

  const safeUserEmail: string | null = userEmail ?? null;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editData) {
      setFieldName(editData.fieldName);
      setFieldArea(editData.fieldArea.toString());
      setReturnProfit((editData.returnProfit ?? 0).toString());
      setFormShow(true);
    }
  }, [editData]);

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
      const response = await dataApi.firebaseListGet(safeUserEmail);
      if (response.data) {
        const fieldGetData = Object.keys(response.data).map((id) => ({
          ...response.data[id],
          id,
        }));

        dispatch(addToList(fieldGetData));
      } else {
        dispatch(removeFromList());
      }
    } catch (err: any) {
      console.error("failed to fielddata", err.response?.data?.error?.message);
      setError(
        err.response?.data?.error?.message || "Failed to fetch field data"
      );
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      fieldName,
      fieldArea: Number(fieldArea),
      returnProfit: Number(returnProfit) || 0,
    };

    try {
      if (editData?.id) {
        await editApi.firebaseEditData(safeUserEmail, editData.id, data);
        await getData(); // for update the latest data to redux
        dispatch(clearEditData());
      } else {
        const response = await dataApi.firebaseListStore(data, safeUserEmail);
        const newField = {
          id: response.data.name,
          fieldName,
          fieldArea: Number(fieldArea),
          returnProfit: Number(returnProfit),
        };
        dispatch(addFieldToTop(newField));
      }
    } catch (err: any) {
      console.error(err.response?.data?.error?.message);
      setError(err.response?.data?.error?.message || "Failed to submit field");
    }

    setFieldName("");
    setFieldArea("");
    setReturnProfit("");
    setFormShow(false);
  };

  const handleFormToggle = () => {
    setFormShow((prev) => !prev);
    setFieldName("");
    setFieldArea("");
    setReturnProfit("");
    dispatch(clearEditData());
  };

  return (
    <>
      <Box>
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
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mt: 2,
          bgcolor: "#f9f9f9",
          px: 2,
          py: 2,
          borderRadius: 2,
        }}
      >
        {formShow ? (
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              maxWidth: "600px",
              bgcolor: "#ffffff",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "#0d47a1",
                fontWeight: "bold",
                mb: 3,
              }}
            >
              {editData?.id ? "Edit Field" : "Add Field"}
            </Typography>

            <Box component="form" onSubmit={handleFormSubmit}>
              <Stack alignItems="center" spacing={2} direction="row">
                <TextField
                  label="Field Name"
                  fullWidth
                  variant="outlined"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  required
                  sx={{ bgcolor: "#ffffff" }}
                />
                <TextField
                  label="Field Area"
                  fullWidth
                  variant="outlined"
                  value={fieldArea}
                  onChange={(e) => setFieldArea(e.target.value)}
                  type="number"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Bi</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: 0, step: "any" }}
                  sx={{ bgcolor: "#ffffff" }}
                />
                {editData?.id && (
                  <TextField
                    label="Profit-Return"
                    fullWidth
                    variant="outlined"
                    value={returnProfit}
                    onChange={(e) => setReturnProfit(e.target.value)}
                    type="number"
                    sx={{ bgcolor: "#ffffff" }}
                  />
                )}
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    bgcolor: "#1976d2",
                    px: 3,
                    "&:hover": { bgcolor: "#1565c0" },
                  }}
                >
                  {editData?.id ? "Update" : "Add"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleFormToggle}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 3,
                  }}
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
            disableRipple
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#1976d2",
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            Add Field
          </Button>
        )}
      </Box>

      <Box mt={3}>
        <FieldsList />
      </Box>
    </>
  );
};
