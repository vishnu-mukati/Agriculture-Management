import { Box, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/slices";
import { useState } from "react";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { PieDataItem } from "../../types/auth";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1'];

export const CostChart = () => {
  const [selectedFieldId, setSelectedFieldId] = useState<string>("");

  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );
  const workListData = useSelector(
    (state: RootState) => state.work.workList
  );

  // Filter by selected field
  const filteredWorkList = selectedFieldId
    ? workListData.filter((work) => work.fieldId === selectedFieldId)
    : workListData;

  const pieChartData = filteredWorkList.map((work) => ({
    name: work.fieldWork,
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
        <ResponsiveContainer width="100%" height={400}>
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
              {pieChartData.map((entry : PieDataItem, index) => (
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
