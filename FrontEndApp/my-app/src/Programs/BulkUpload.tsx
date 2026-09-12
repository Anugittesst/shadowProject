import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBulkUploadData } from "../service/service";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type UploadRow = {
  platform: string;
  scheduler: string;
  job: string;
  workspaceName: string;
};

type ColumnKey = keyof UploadRow;

const columns: { key: ColumnKey; label: string }[] = [
  { key: "job", label: "Jobs" },
  { key: "platform", label: "Platform" },
  { key: "scheduler", label: "Scheduler" },
  { key: "workspaceName", label: "Workspace" },
];


const RecordsTable = ({ rows }: { rows: UploadRow[] }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 600 }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={col.key}>{row[col.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BulkUpload: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);
  const [rows, setRows] = useState<UploadRow[]>([]);

  const handleOpen = () => {
    setStep(1);
    setFile(null);
    setRows([]);
    setErrorMsg("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setFile(null);
    setRows([]);
    setErrorMsg("");
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Please select a file");
      return;
    }
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);
    try {
      let resData = await getBulkUploadData(formData);
          setRows(resData.data ?? resData);

      //console.log("Uploading file:", resData);
      setErrorMsg("");
      setStep(2);
    } catch (err: any) {
      console.log("catch block");
      const errMsg = err?.response?.data?.message || "";
      setErrorMsg(errMsg);
    }
    //handleClose();
  };

  return (
    <>
      {/* Page Buttons */}
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>

      <Button variant="contained" onClick={handleOpen} sx={{ ml: 1 }}>
        Bulk Upload
      </Button>

      {/* ✅ SMALL POPUP */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {/* Header */}
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Bulk Upload
          {/* <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton> */}
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Typography color={step === 1 ? "#00e5ff" : "#aaa"}>
              1 Upload File
            </Typography>
            <Typography color={step === 2 ? "#00e5ff" : "#aaa"}>
              2 Confirm & Add
            </Typography>
          </Box>
        </DialogTitle>

        {/* Body */}
        <DialogContent dividers>
          {step === 1 && (
            <>
              <Typography gutterBottom>
                Upload jobs using CSV or Excel file.
              </Typography>

              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <Typography variant="body2" sx={{ mt: 1 }}>
                Supported formats: <b>.csv</b>, <b>.xlsx</b>
              </Typography>
              {errorMsg && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {" "}
                  {errorMsg}
                </Typography>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <RecordsTable rows={rows}></RecordsTable>
              {errorMsg && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {" "}
                  {errorMsg}
                </Typography>
              )}
            </>
          )}
        </DialogContent>

        {/* Footer */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {step === 1 && (
            <>
              <Button variant="contained" onClick={handleUpload}>
                Upload
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button variant="contained" color="primary">
                Add Jobs to Project
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkUpload;
