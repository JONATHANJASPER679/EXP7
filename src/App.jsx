import React, { useState } from "react";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    // Validation
    if (
      loanAmount <= 0 ||
      annualRate <= 0 ||
      loanTenure <= 0 ||
      isNaN(loanAmount) ||
      isNaN(annualRate) ||
      isNaN(loanTenure)
    ) {
      alert("Please enter valid positive numbers in all fields.");
      return;
    }

    const P = parseFloat(loanAmount);
    const R = parseFloat(annualRate) / 12 / 100;
    const N = parseFloat(loanTenure);

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emiValue * N;
    const totalInterestValue = totalPayment - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center", fontFamily: "Arial" }}>
      <h2>EMI Calculator</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Loan Amount: </label><br />
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Annual Interest Rate (%): </label><br />
        <input
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(e.target.value)}
          placeholder="Enter annual interest rate"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Loan Tenure (in months): </label><br />
        <input
          type="number"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          placeholder="Enter loan tenure"
        />
      </div>

      <button onClick={calculateEMI} style={{ padding: "8px 16px", cursor: "pointer" }}>
        Calculate EMI
      </button>

      {emi && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Results:</h3>
          <p><strong>Loan Amount:</strong> ₹{parseFloat(loanAmount).toFixed(2)}</p>
          <p><strong>EMI:</strong> ₹{emi}</p>
          <p><strong>Total Interest to be Paid:</strong> ₹{totalInterest}</p>
        </div>
      )}
    </div>
  );
}

export default App;
