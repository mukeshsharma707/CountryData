import { useState, useEffect } from "react";
import axios from "axios";

interface Country {
  abbr: string;
  flag: string;
  name: string;
}

export default function App() {
  const [data, setData] = useState<Country[]>([]);
  const [Error,setError] = useState(null);

  const fetchData = async () => {
    const response = await axios.get<Country[]>(
      "https://xcountries-backend.labs.crio.do/all"
    );
    setData(response.data);
    setError('failed to fetch Countries data');
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
      }}
    >
      {Error && <div style={{color:'red'}}>{Error}</div> }
      {data.map((country) => (
        <div
          key={country.abbr}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid black",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            padding: "10px",
            borderRadius: "10px",
            width: "200px",
            background: "#fff",
          }}
        >
          <img
            src={country.flag}
            alt={country.name}
            style={{ width: "150px", height: "100px", borderRadius: "10px" }}
          />
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            {country.name}
          </div>
        </div>
      ))}
    </div>
  );
}
