import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectList } from "../service/service";


type Project = {
  projectId: string;
  projectName: string;
  description?: string;
  // any other fields from backend
  [key: string]: any;
};

const ProjectList: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // matches route /programs/:id
  const programId = id ?? "";
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjectList(programId);
        if (!mounted) return;
        setProjects(data);
      } catch (err: any) {
        console.error("Failed to load projects:", err);
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch projects from server";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (programId) load();
    else {
      setError("Invalid program id");
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [programId]);

  const handleProjectClick = (p: Project) => {
    // navigate to project details if you have one
    navigate(`/programs/${programId}/project/${p.projectId}/jobs`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          ← Back
        </button>
        <h1 style={{ margin: 0 }}>Projects for Program</h1>
      </div>

      {loading && <p>Loading projects…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && projects.length === 0 && <p>No projects found.</p>}

      <div style={styles.grid}>
        {projects.map((p) => (
          <div
            key={p.projectId ?? p.projectName}
            style={styles.tile}
            onClick={() => handleProjectClick(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleProjectClick(p);
            }}
          >
            <h3 style={styles.tileTitle}>{p.projectName ?? p.name}</h3>
            {p.description && <p style={styles.tileDescription}>{p.description}</p>}
            {/* You can add more fields here (status, owners, dates) */}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  page: { padding: 20, maxWidth: 1100, margin: "0 auto" },
  header: { marginBottom: 16, display: "flex", alignItems: "center", gap: 12 },
  backButton: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    background: "#eee",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  tile: {
    background: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    cursor: "pointer",
    minHeight: 110,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  tileTitle: { margin: 0, fontSize: 18, lineHeight: 1.2 },
  tileDescription: { marginTop: 8, fontSize: 14, color: "#555" },
};

export default ProjectList;
