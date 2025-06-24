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
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const editData = useSelector((state: RootState) => state.list.editDataList);
  console.log(editData);

  // const userEmail = localStorage.getItem('email');
  console.log(userEmail);
  const safeUserEmail: string |null =userEmail??null;

  useEffect(() => {
    if (editData) {
      setFieldName(editData.fieldName);
      setFieldArea(editData.fieldArea.toString()); // assuming fieldArea is a number
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
      console.log(err);

      console.error("failed to fielddata", err.response?.data?.error?.message);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      fieldName,
      fieldArea: Number(fieldArea),
    };

    try {
      if (editData?.id) {
        await editApi.firebaseEditData(safeUserEmail,editData.id, data);
        await getData();
        dispatch(clearEditData());
      } else {
        const response = await dataApi.firebaseListStore(data, safeUserEmail);
        const newField = {
          id: response.data.name,
          fieldName,
          fieldArea: Number(fieldArea),
        };
        dispatch(addFieldToTop(newField));
      }
    } catch (err: any) {
      console.error(err.response?.data?.error?.message);
    }

    setFieldName("");
    setFieldArea("");
    setFormShow(false);
  };

  const handleFormToggle = () => {
     setFormShow((prev) => !prev);
  setFieldName("");
  setFieldArea("");
  dispatch(clearEditData());
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
                  inputProps={{ min: 0 ,step:"any"}}
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
      <Box>
        <FieldsList />
      </Box>
    </>
  );
};
