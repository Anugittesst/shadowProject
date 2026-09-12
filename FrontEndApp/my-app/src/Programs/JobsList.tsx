import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Modal > Box > text > Typography > Button

type Job = {
  id: string;
  platform: string;
  jobName: string;
  totalExec: number;
  startTime: string;
  endTime: string;
  status: "SUCCESS" | "FAILED" | "IN_PROGRESS";
};

const JobsList: React.FC = () => {
  const navigate = useNavigate();
  const { programId, projectId } = useParams<{
    programId: string;
    projectId: string;
  }>();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Replace this with real API call later
    const mockJobs: Job[] = [
      {
        id: "1",
        platform: "ADF",
        jobName: "Ingest_Sales_Data",
        totalExec: 15,
        startTime: "2025-01-10 08:30",
        endTime: "2025-01-10 08:45",
        status: "SUCCESS",
      },
      {
        id: "2",
        platform: "Databricks",
        jobName: "Transform_Customer_Data",
        totalExec: 8,
        startTime: "2025-01-10 09:00",
        endTime: "2025-01-10 09:20",
        status: "FAILED",
      },
      {
        id: "3",
        platform: "ADF",
        jobName: "Load_Finance_Data",
        totalExec: 5,
        startTime: "2025-01-10 10:00",
        endTime: "-",
        status: "IN_PROGRESS",
      },
    ];

    setJobs(mockJobs);
    setLoading(false);
  }, [programId, projectId]);

  const handleAddJob = () => {
    // navigate to add-job page or open modal
    navigate(
      `/programs/${programId}/project/${projectId}/jobs/add`
    );
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          ← Back
        </button>

        <h2 style={{ margin: 0 }}>Jobs</h2>

        <button onClick={handleAddJob} style={styles.addButton}>
          + Add Job
        </button>
      </div>

      {loading && <p>Loading jobs…</p>}

      {!loading && jobs.length === 0 && <p>No jobs found.</p>}

      {!loading && jobs.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Job</th>
              <th>Total Exec</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.platform}</td>
                <td>{job.jobName}</td>
                <td>{job.totalExec}</td>
                <td>{job.startTime}</td>
                <td>{job.endTime}</td>
                <td>
                  <span
                    style={{
                      ...styles.status,
                      ...statusStyles[job.status],
                    }}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: 20,
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    background: "#eee",
    cursor: "pointer",
  },
  addButton: {
    marginLeft: "auto",
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    background: "#1976d2",
    color: "#fff",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  },
  status: {
    padding: "4px 8px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  },
};

const statusStyles: Record<string, React.CSSProperties> = {
  SUCCESS: { background: "#e6f4ea", color: "#1e7e34" },
  FAILED: { background: "#fdecea", color: "#c62828" },
  IN_PROGRESS: { background: "#e3f2fd", color: "#1565c0" },
};

export default JobsList;
