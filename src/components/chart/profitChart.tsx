import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import type { PieDataItem } from "../../types/auth";

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
  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );

  const workListData = useSelector((state: RootState) => state.work.workList);

  //   const getTotalCostForField = (fieldId: string) => {
  //     return workListData
  //       .filter((work) => work.fieldId === fieldId)
  //       .reduce((acc, work) => acc + work.cost, 0);
  //   };

  const returnProfit = fieldListData.reduce(
    (acc, fields) => acc + Number(fields.returnProfit || 0),
    0
  );

  const totalWorkCost = workListData.reduce((acc, work) => acc + work.cost, 0);

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
      <ResponsiveContainer width="100%" height={400}>
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
            {data.map((entery: PieDataItem, index) => (
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
