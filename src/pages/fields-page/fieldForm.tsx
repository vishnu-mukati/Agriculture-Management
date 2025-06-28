import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import { dataApi, workListApi } from "../../store/apis/axiosInstance";
import { addToWorkList, addWorkToTop } from "../../store/slices/fieldWorkSlice";
import { WorkList } from "./workList";
import { removeFromList } from "../../store/slices/fieldsListSlice";

export const FieldForm = () => {
  const { id } = useParams()
  const [formShow, setFormShow] = useState(false);
  const [fieldWork, setFieldWork] = useState("");
  const [workDate, setWorkDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [cost, setCost] = useState("");
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

    const getData = async()=>{
      try{
         const response = await workListApi.firebaseListGet(safeUserEmail,id);
         if(response.data){

           const finalData= Object.keys(response.data).map((dataId)=>({
             ...response.data[dataId],
             id : dataId,
            }))
            console.log(finalData);
            dispatch(addToWorkList(finalData))
          }else{
            dispatch(removeFromList())
          }
          
      }catch(err){
        console.log(err);
        
      }
    }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = workDate?.valueOf();

    console.log(workDate?.format("DD-MM-YYYY"));

    const data = {
      fieldWork,
      //  workDate: workDate?.format("DD-MM-YYYY"),
      workDate: dayjs(date).format("DD-MM-YYYY"),
      cost : Number(cost),
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
        cost:Number(cost),
      };
      dispatch(addWorkToTop(newData));
      console.log(response.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormToggle = () => {
    setFormShow((prev) => !prev);
  };

  return (
    <>
      <Typography variant="h3" color="black" bgcolor="lightgray">
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
                <Button variant="contained" type="submit">
                  Add Field
                </Button>
                <Button variant="contained" onClick={handleFormToggle}>
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
              margin: "20px",
              "&:focus": { outline: "none" },
            }}
          >
            Add Field
          </Button>
        )}
      </Box>
      <Box>
        <WorkList />
      </Box>
    </>
  );
};
