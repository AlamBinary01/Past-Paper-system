import { createContext, useContext, useState, useEffect } from 'react';

const PastPaperContext = createContext();

export const PastPaperProvider = ({ children }) => {

    const [pastPaper, setPastPaper] = useState([]);
    
    useEffect(() => {
        async function fetchPastPaser() {
        try {
            const response = await fetch("http://localhost:5000/api/getpastpapers", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setPastPaper(data.pastpapers);
        } catch (error) {
            console.log(error);
        }
        }
    
        fetchPastPaser();
    }, []);
    
    return (
        <PastPaperContext.Provider value={pastPaper}>
        {children}
        </PastPaperContext.Provider>
    );
    };

export const usePastPaperContext = () => {
    return useContext(PastPaperContext);
}