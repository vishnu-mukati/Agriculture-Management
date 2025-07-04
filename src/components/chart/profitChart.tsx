import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import { useEffect } from "react";
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
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLOR = ["green", "red"];

export const ProfitChart = () => {
  const dispatch = useDispatch();


  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );
  console.log(fieldListData);

  const workListData = useSelector((state: RootState) => state.work.workList);
  console.log(workListData);

  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

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

  //   const getTotalCostForField = (fieldId: string) => {
  //     return workListData
  //       .filter((work) => work.fieldId === fieldId)
  //       .reduce((acc, work) => acc + work.cost, 0);
  //   };

  const returnProfit = fieldListData.reduce(
    (acc, fields) => acc + Number(fields.returnProfit || 0),
    0
  );
  console.log(returnProfit);

  const totalWorkCost = workListData.reduce((acc, work) => acc + work.cost, 0);
  console.log(totalWorkCost);

  const profit = returnProfit || 0;
  const cost = totalWorkCost || 0;

  const isDataValid = profit + cost > 0;

  const data = isDataValid
    ? [
        { name: "Profit", value: profit },
        { name: "Cost", value: cost },
      ]
    : [];

  if (!isDataValid) {
    return <Typography>No data to display</Typography>;
  }
  return (
    <Box>
    <ResponsiveContainer width={500} height={500}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={80}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLOR[index % COLOR.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </Box>
  );
};
