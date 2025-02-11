import React from "react";
import Add from "./Add";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function General() {
  return (
    <Layout>
      <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <div className="flex gap-2 mb-5">
          <Link to={"/stadionAdd"} className="text-2xl text-blue-500">Stadionlar</Link>
          <IoIosArrowForward className="text-xl mt-2"/>
          <h1 className="md:text-2xl text-xl mt-0.5 dark:text-gray-100">
            Stadion qo'shish
          </h1>
        </div>
        <Add />
      </div>
    </Layout>
  );
}

export default General;
