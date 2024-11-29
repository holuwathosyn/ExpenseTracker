import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Application() {
 const ArrImage = [
    {
      id: 1,
      Message:
        "Welcome to the Finance Tracker App, a sleek and intuitive solution designed to help you stay on top of your finances.",
      imagex:
        "3d-rendering-business-still-life-background_23-2151128479-removebg-preview.png",
    },
    {
      id: 2,
      Message:
        "Are you ready to take control of your finances with ease and style? Meet ThoFin, the financial companion you’ve been waiting for.",
      imagex: "Expenses__1_-removebg-preview.png",
    },
    {
      id: 3,
      Message:
        "View Your Net Balance at a Glance: Always know where you stand with real-time balance calculations.",
      imagex: "Expense_Tracking-removebg-preview.png",
    },
  ];
const Navigae=useNavigate();
  const [ArrayItemx, setArrayItemx] = useState(0);
  const [loading,setloading]=useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setArrayItemx((prev) => (prev + 1) % ArrImage.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function Handleclick(){
    setloading(true)
    setTimeout(()=>{
      setloading(false)
      Navigae("SignIn")
        
    },2000)
  }
  
  return (
    <div className="bg-gradient-to-b from-orange-500 to-gray-50 min-h-screen flex items-center justify-center p-4">
      <motion.div className="text-center max-w-lg mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.img
          key={ArrImage[ArrayItemx].id}
          className="rounded-lg p-2 mb-4 mx-auto"
          src={ArrImage[ArrayItemx].imagex}
          alt="Finance Illustration"
          width={450}
          height={150}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        />
        <motion.h3 className="text-xl font-medium text-orange-900 mb-6">{ArrImage[ArrayItemx].Message}</motion.h3>

        <motion.button
          onClick={Handleclick}
          className="bg-orange-500 mt-10 text-white py-2  m-2 w-full ml-3 px-6 rounded-lg hover:bg-orange-600 flex items-center justify-center"
        >
           
     {loading ?(
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
     ):(
            <>
              Get Started <FaArrowRight className="ml-2" />
              
            </>
       )}
        </motion.button>
        
      </motion.div>
    </div>
  );
}
