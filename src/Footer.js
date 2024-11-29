import React from "react";

export default function Footer(){
    const DateYear=new Date().getFullYear();
    return(<>
    <footer>
    <p className="text-center text-gray-500 p-2 m-1 font-bold  mt-16"> &copy;{DateYear} Thosyn.All Right reserved</p>
    </footer>
    </>)
}