// src/ProgramList/ProgramList.tsx
import React, { useEffect, useState } from "react";
import { getPrograms } from "../service/service";
import { useNavigate } from "react-router-dom";

export type Program = {
  programId: string;
  programName: string;
  // any other fields your API returns
  [key: string]: any;
};

const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPrograms();
        if (!mounted) return;
        setPrograms(data);
      } catch (err: any) {
        console.error("Failed to load programs:", err);
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch programs from server";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const handleTileClick = (p: Program) => {
    // navigate to program details page if you have one, e.g. /programs/:id
    navigate(`${p.programId}/project`);
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>Programs</h1>
      </header>

      {loading && <p>Loading programs…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && programs.length === 0 && (
        <p>No programs found.</p>
      )}

      <div style={styles.grid}>
        {programs.map((p) => (
          <div
            key={p.programId ?? p.programName}
            style={styles.tile}
            onClick={() => handleTileClick(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTileClick(p);
            }}
          >
            <h3 style={styles.tileTitle}>{p.programName ?? p.title}</h3>
            {/* optionally show more fields */}
            {p.description && (
              <p style={styles.tileDescription}>{p.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  page: {
    padding: 20,
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    marginBottom: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  },
  tile: {
    background: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    cursor: "pointer",
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
  },
  tileTitle: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.2,
  },
  tileDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
};

export default ProgramList;

//added comment lines