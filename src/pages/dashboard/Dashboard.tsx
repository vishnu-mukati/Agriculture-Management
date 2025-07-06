import { Box, Grid, Paper, Typography } from "@mui/material";
import { ProfitChart } from "../../components/chart/profitChart";
import { CostChart } from "../../components/chart/costChart";
import { FieldProfitChart } from "../../components/chart/fieldProfitChart";
import { useSelector, useDispatch } from "react-redux";
import type{ RootState } from "../../store/slices";
import { useEffect } from "react";
import { dataApi, workListApi } from "../../store/apis/axiosInstance";
import { addToList } from "../../store/slices/fieldsListSlice";
import { addToWorkList,removeWorkList } from "../../store/slices/fieldWorkSlice";
import type { WorkItem } from "../../types/auth";
import { useFirebaseData } from "../../hooks/useFirebaseData";
export const Dashboard = () => {
    //     const dispatch = useDispatch();

    //     const fieldListData = useSelector((state:RootState)=>state.list.fieldsListData);

    //   const userEmail = useSelector(
    //     (state: RootState) => state.auth.user?.email
    //   );
    //   const safeUserEmail: string | null = userEmail ?? null;
    
    //   useEffect(() => {
    //     if (!userEmail) return;
    //     getFields();
    //     const interval = setInterval(() => {
    //       getFields();
    //     }, 35000);
    //     return () => clearInterval(interval);
    //   }, [userEmail]);
    
    //   useEffect(() => {
    //     if (userEmail && fieldListData.length > 0) {
    //       getWork();
    //       const interval = setInterval(() => {
    //         getWork();
    //       }, 21000);
    //       return () => clearInterval(interval);
    //     }
    //   }, [userEmail, fieldListData]);
    
    //   const getFields = async () => {
    //     try {
    //       const response1 = await dataApi.firebaseListGet(safeUserEmail);
    //       if (response1.data) {
    //         const fieldGetData = Object.keys(response1.data).map((id) => ({
    //           ...response1.data[id],
    //           id,
    //         }));
    //         dispatch(addToList(fieldGetData));
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    
    //   const getWork = async () => {
    //     if (!safeUserEmail || fieldListData.length === 0) return;
    
    //     let allFieldWorkItems: WorkItem[] = [];
    
    //     for (const field of fieldListData) {
    //       try {
    //         const response2 = await workListApi.firebaseListGet(
    //           safeUserEmail,
    //           field.id
    //         );
    //         if (response2.data) {
    //           const fieldWorkItems = Object.keys(response2.data).map((workId) => ({
    //             ...response2.data[workId],
    //             id: workId,
    //             fieldId: field.id,
    //           }));
    //           allFieldWorkItems.push(...fieldWorkItems);
    //         }
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    
    //     if (allFieldWorkItems.length > 0) {
    //       dispatch(addToWorkList(allFieldWorkItems));
    //     } else {
    //       dispatch(removeWorkList());
    //     }
    //   };

    useFirebaseData();

  return (
    <Box sx={{ px: 4, py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: "#333" }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={4}>
        {/* Profit Chart */}
        <Grid size={{xs:12,md:6}}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0px 3px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Profit and Cost
            </Typography>
            <ProfitChart />
          </Paper>
        </Grid>

        {/* Cost Chart */}
        <Grid  size={{xs:12,md:6}}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0px 3px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Work-wise Cost Distribution
            </Typography>
            <CostChart />
          </Paper>
        </Grid>
        
        {/* Profit per field */}

         <Grid  size={{xs:12}}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0px 3px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Per Field Cost
            </Typography>
            <FieldProfitChart/>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};
