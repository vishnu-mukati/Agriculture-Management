// import { Box, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState } from "../../store/slices";
// import { useEffect } from "react";
// import { dataApi, workListApi } from "../../store/apis/axiosInstance";
// import { addToList } from "../../store/slices/fieldsListSlice";
// import type { WorkItem } from "../../types/auth";
// import {
//     addToWorkList,
//     removeWorkList,
// } from "../../store/slices/fieldWorkSlice";

// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1'];

// export const CostChart = () => {

//     const dispatch = useDispatch();

//     const fieldListData = useSelector(
//         (state: RootState) => state.list.fieldsListData
//     );
//     console.log(fieldListData);

//     const workListData = useSelector((state: RootState) => state.work.workList);
//     console.log(workListData);

//     const userEmail = useSelector((state: RootState) => state.auth.user?.email);

//     const safeUserEmail: string | null = userEmail ?? null;

//     useEffect(() => {
//         if (!userEmail) return;
//         getFields();
//         const interval = setInterval(() => {
//             getFields();
//         }, 10000);
//         return () => clearInterval(interval);
//     }, [userEmail]);

//     useEffect(() => {
//         if (userEmail && fieldListData.length > 0) {
//             getWork();

//             const interval = setInterval(() => {
//                 getWork();
//             }, 10000);

//             return () => clearInterval(interval);
//         }
//     }, [userEmail, fieldListData]);

//     const getFields = async () => {
//         try {
//             const response1 = await dataApi.firebaseListGet(safeUserEmail);
//             if (response1.data) {
//                 const fieldGetData = Object.keys(response1.data).map((id) => ({
//                     ...response1.data[id],
//                     id,
//                 }));
//                 dispatch(addToList(fieldGetData));
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const getWork = async () => {
//         if (!safeUserEmail || fieldListData.length === 0) return;

//         let allFieldWorkItems: WorkItem[] = [];

//         for (const field of fieldListData) {
//             try {
//                 const response2 = await workListApi.firebaseListGet(
//                     safeUserEmail,
//                     field.id
//                 );
//                 if (response2.data) {
//                     const fieldWorkItems = Object.keys(response2.data).map((workId) => ({
//                         ...response2.data[workId],
//                         id: workId,
//                         fieldId: field.id,
//                     }));
//                     allFieldWorkItems.push(...fieldWorkItems);
//                 }
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//         if (allFieldWorkItems.length > 0) {
//             dispatch(addToWorkList(allFieldWorkItems));
//         } else {
//             dispatch(removeWorkList());
//         }
//     };
//     const pieChartData = workListData.map((work) => ({
//         name: work.fieldWork,
//         value: work.cost || 0,
//     }));

//     const isDataAvailable = pieChartData.length > 0;

//     return (
//         <Box>
//             <Typography variant="h6" sx={{ mb: 2 }}>Work-wise Cost Distribution</Typography>

//             {isDataAvailable ? (
//                 <ResponsiveContainer width={500} height={400}>
//                     <PieChart>
//                         <Pie
//                             data={pieChartData}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             outerRadius={120}
//                             fill="#8884d8"
//                             dataKey="value"
//                             label={({ name, percent }) => {
//                                 const percentage = percent !== undefined ? (percent * 100).toFixed(0) : "0";
//                                 return `${name} ${percentage}%`;
//                             }}
//                         >
//                             {pieChartData.map((entry, index) => (
//                                 <Cell
//                                     key={`cell-${index}`}
//                                     fill={COLORS[index % COLORS.length]}
//                                 />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//             ) : (
//                 <Typography color="text.secondary">No work data available.</Typography>
//             )}
//         </Box>
//     );
// };

import { Box, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import { useEffect, useState } from "react";
import { dataApi, workListApi } from "../../store/apis/axiosInstance";
import { addToList } from "../../store/slices/fieldsListSlice";
import type { WorkItem } from "../../types/auth";
import {
  addToWorkList,
  removeWorkList,
} from "../../store/slices/fieldWorkSlice";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1'];

export const CostChart = () => {
  const dispatch = useDispatch();
  const [selectedFieldId, setSelectedFieldId] = useState<string>("");

  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );
  const workListData = useSelector(
    (state: RootState) => state.work.workList
  );
  const userEmail = useSelector(
    (state: RootState) => state.auth.user?.email
  );
  const safeUserEmail: string | null = userEmail ?? null;

  useEffect(() => {
    if (!userEmail) return;
    getFields();
    const interval = setInterval(() => {
      getFields();
    }, 10000);
    return () => clearInterval(interval);
  }, [userEmail]);

  useEffect(() => {
    if (userEmail && fieldListData.length > 0) {
      getWork();
      const interval = setInterval(() => {
        getWork();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [userEmail, fieldListData]);

  const getFields = async () => {
    try {
      const response1 = await dataApi.firebaseListGet(safeUserEmail);
      if (response1.data) {
        const fieldGetData = Object.keys(response1.data).map((id) => ({
          ...response1.data[id],
          id,
        }));
        dispatch(addToList(fieldGetData));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getWork = async () => {
    if (!safeUserEmail || fieldListData.length === 0) return;

    let allFieldWorkItems: WorkItem[] = [];

    for (const field of fieldListData) {
      try {
        const response2 = await workListApi.firebaseListGet(
          safeUserEmail,
          field.id
        );
        if (response2.data) {
          const fieldWorkItems = Object.keys(response2.data).map((workId) => ({
            ...response2.data[workId],
            id: workId,
            fieldId: field.id,
          }));
          allFieldWorkItems.push(...fieldWorkItems);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (allFieldWorkItems.length > 0) {
      dispatch(addToWorkList(allFieldWorkItems));
    } else {
      dispatch(removeWorkList());
    }
  };

  // Filter by selected field
  const filteredWorkList = selectedFieldId
    ? workListData.filter((work) => work.fieldId === selectedFieldId)
    : workListData;

  const pieChartData = filteredWorkList.map((work) => ({
    name: work.fieldWork || "Unnamed Work",
    value: work.cost || 0,
  }));

  const isDataAvailable = pieChartData.length > 0;

  return (
    <Box>
      <FormControl sx={{ mb: 3, minWidth: 300 }}>
        <InputLabel>Select Field</InputLabel>
        <Select
          value={selectedFieldId}
          label="Select Field"
          onChange={(e) => setSelectedFieldId(e.target.value)}
        >
          <MenuItem value="">All Fields</MenuItem>
          {fieldListData.map((field) => (
            <MenuItem key={field.id} value={field.id}>
              {field.fieldName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isDataAvailable ? (
        <ResponsiveContainer width={500} height={400}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => {
                const percentage = percent !== undefined ? (percent * 100).toFixed(0) : "0";
                return `${name} ${percentage}%`;
              }}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Typography color="text.secondary">No work data available.</Typography>
      )}
    </Box>
  );
};
