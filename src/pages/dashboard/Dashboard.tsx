import { Box, Grid, Paper, Typography } from "@mui/material";
import { ProfitChart } from "../../components/chart/profitChart";
import { CostChart } from "../../components/chart/costChart";

export const Dashboard = () => {
  return (
    <Box sx={{ px: 4, py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: "#333" }}>
        Dashboard Overview
      </Typography>

      {/* Grid container wraps the Grid items */}
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
              Profit vs Cost
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
      </Grid>
    </Box>
  );
};
