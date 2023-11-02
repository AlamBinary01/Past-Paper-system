import { createContext, useContext, useState, useEffect } from 'react';

const UniversityContext = createContext();

export const UniversityProvider = ({ children }) => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    async function fetchUniversities() {
      try {
        const response = await fetch("http://localhost:5000/api/getuniversity", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setUniversities(data.universities);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUniversities();
  }, []);

  return (
    <UniversityContext.Provider value={universities}>
      {children}
    </UniversityContext.Provider>
  );
};

export const useUniversityContext = () => {
  return useContext(UniversityContext);
};
