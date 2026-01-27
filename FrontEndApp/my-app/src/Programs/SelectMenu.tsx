import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BulkUpload from "./BulkUpload";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const platforms = ["ADF", "ADB"];
const schedulers = ["ADF", "ADB"];

const ManualAddJobs: React.FC = () => {
  const navigate = useNavigate();

  const [platform, setPlatform] = useState("ADB");
  const [scheduler, setScheduler] = useState("ADB");
  const [workspaceName, setWorkspaceName] = useState("");
  const [jobName, setJobName] = useState("");

  return (
    <Box sx={{ background: "#003366", p: 3, borderRadius: 2 }}>
      <BulkUpload />

      {/* Select Platform + Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography color="#fff" mb={0.5}>
            Select Platform
          </Typography>
          <Select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            size="small"
            sx={{ bgcolor: "#fff", minWidth: 200 }}
          >
            {platforms.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* ✅ Right aligned buttons */}
        <Button variant="contained">CLEAR</Button>
        <Button variant="contained" disabled={!platform}>
          RUN QUERY
        </Button>
      </Box>

      {/* Field / Value Header */}
      <Box sx={{ display: "flex", mb: 1 }}>
        <Box sx={{ width: "30%" }}>
          <Typography color="#8fd3ff">Field</Typography>
        </Box>
        <Box sx={{ width: "70%" }}>
          <Typography color="#8fd3ff">Value</Typography>
        </Box>
      </Box>

      {/* Scheduler */}
      <Box sx={{ display: "flex", mb: 2 }}>
        <Box sx={{ width: "30%" }}>
          <Typography color="#fff">Scheduler</Typography>
        </Box>
        <Box sx={{ width: "70%" }}>
          <Select
            value={scheduler}
            onChange={(e) => setScheduler(e.target.value)}
            size="small"
            sx={{ bgcolor: "#fff", minWidth: 200 }}
          >
            {schedulers.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Workspace */}
      <Box sx={{ display: "flex", mb: 2 }}>
        <Box sx={{ width: "30%" }}>
          <Typography color="#fff">Workspace Name</Typography>
        </Box>
        <Box sx={{ width: "70%" }}>
          <TextField
            size="small"
            placeholder="Enter workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            sx={{ bgcolor: "#fff", width: 300 }}
          />
        </Box>
      </Box>

      {/* Job */}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "30%" }}>
          <Typography color="#fff">Job Name</Typography>
        </Box>
        <Box sx={{ width: "70%" }}>
          <TextField
            size="small"
            placeholder="Enter job name"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            sx={{ bgcolor: "#fff", width: 300 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ManualAddJobs;
