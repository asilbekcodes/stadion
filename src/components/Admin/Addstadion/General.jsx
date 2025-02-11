import React from "react";
import Add from "./Add";
import Layout from "../Layout";


function General() {

  return (
    <Layout>
      <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <h1 className="md:text-2xl text-xl mb-5 dark:text-gray-100">
          Stadion qo'shish
        </h1>
        <Add />
      </div>
    </Layout>
  );
}

export default General;
