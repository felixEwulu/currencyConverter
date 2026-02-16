import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [currencyValue, setCurrencyValue] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(
    function () {
      async function fetchCurrencies() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${currencyValue}&from=${convertFrom}&to=${convertTo}`
          );
          const data = await res.json();
          setConvertedAmount(data.rates[convertTo]);
        } catch (error) {}
      }
      fetchCurrencies();
    },
    [convertFrom, convertTo, currencyValue]
  );

  return (
    <div className="App">
      <input
        type="text"
        value={currencyValue}
        onChange={(e) => setCurrencyValue(e.target.value)}
      />
      <select
        value={convertFrom}
        onChange={(e) => setConvertFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={convertTo} onChange={(e) => setConvertTo(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedAmount ? convertedAmount?.toFixed(2) : "OUTPUT"}</p>
    </div>
  );
}
