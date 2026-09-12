import { Button } from "@mui/material";
import { useVersion } from "../Programs/VersionContext";

const VersionToggle = () => {
  const { version, toggleVersion } = useVersion();

  return (
    <Button
      variant="contained"
      onClick={toggleVersion}
      sx={{
        border: version === "v2" ? "2px solid blue" : "none",
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      {version.toUpperCase()}
    </Button>
  );
};

export default VersionToggle;