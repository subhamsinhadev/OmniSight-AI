import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const BuyPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const plan = state?.plan;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "upi",
  });

  const [success, setSuccess] = useState(false);

  if (!plan) {
    return <div className="text-white p-10">No plan selected ❌</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    setSuccess(true);

    setTimeout(() => {
      navigate("/client/dashboard");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex justify-center items-center p-6">
      <AnimatePresence>
        {!success ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">
              Complete Your Purchase
            </h2>

            {/* PLAN CARD */}
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-transparent border border-emerald-400">
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <p className="text-gray-300 mt-1">Weekly: {plan.weekly}</p>
              {plan.monthly && (
                <p className="text-gray-400 text-sm">Monthly: {plan.monthly}</p>
              )}
            </div>

            {/* FORM */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/50 border border-gray-700 focus:border-emerald-500 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/50 border border-gray-700 focus:border-emerald-500 outline-none"
              />

              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/50 border border-gray-700 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* PAYMENT METHOD */}
            <div className="mb-6">
              <p className="mb-2 text-gray-400 text-sm">Payment Method</p>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/50 border border-gray-700"
              >
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="cod">Cash</option>
              </select>
            </div>

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePayment}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-3 rounded-xl font-bold transition shadow-lg"
            >
              Pay {plan.weekly}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-emerald-400 mb-4"
            >
              <CheckCircle size={80} />
            </motion.div>

            <h2 className="text-3xl font-bold text-emerald-400 mb-2">
              Payment Successful 🎉
            </h2>

            <p className="text-gray-400">
              Redirecting to dashboard...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyPage;
