import React, { useEffect, useState } from "react";

const PayoutHistory = () => {
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const res = await fetch("http://127.0.0.1:8000/client/payout-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        

        console.log("Payout Data:", data);

        setPayouts(data);
      } catch (err) {
        console.error("Error fetching payouts:", err);
      }
    };

    fetchPayouts();
  }, []);
  return (
    <div className="min-h-screen bg-omni-dark text-white p-8">

      <h1 className="text-3xl font-bold mb-8">
        💸 Payout History
      </h1>

      <div className="overflow-x-auto rounded-2xl border border-gray-800">

        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-gray-900 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Amount</th>
              <th className="p-4">Disruption</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Payout %</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {payouts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No payouts yet
                </td>
              </tr>
            ) : (
              payouts.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-800 hover:bg-gray-900 transition"
                >
                  <td className="p-4 font-semibold text-emerald-400">
                    ₹{p.amount}
                  </td>

                  <td className="p-4">{p.disruption_type}</td>

                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${p.severity_level === "Severe"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                      {p.severity_level}
                    </span>
                  </td>

                  <td className="p-4">
                    {p.payout_percentage}%
                  </td>

                  <td className="p-4 text-gray-400">
                    {new Date(p.timestamp).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${p.status === "Released"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : p.status === "Failed"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                      {p.status}
                    </span>
                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutHistory;
