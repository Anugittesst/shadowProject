import React, { createContext, useContext, useState } from "react";

type VersionType = "v1" | "v2";

interface VersionContextType {
  version: VersionType;
  toggleVersion: () => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const VersionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [version, setVersion] = useState<VersionType>("v1");

  const toggleVersion = () => {
    setVersion((prev) => (prev === "v1" ? "v2" : "v1"));
  };

  return (
    <VersionContext.Provider value={{ version, toggleVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => {
  const context = useContext(VersionContext);
  if (!context) throw new Error("useVersion must be used within VersionProvider");
  return context;
};