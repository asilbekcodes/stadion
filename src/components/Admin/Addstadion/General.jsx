import { Tabs } from "antd";
import React, { useState } from "react";
import Add from "./Add";
import Images from "./Images";
import Layout from "../Layout";

const { TabPane } = Tabs;

function General() {
  const [activeTab, setActiveTab] = useState("1");

  const onChange = (key) => {
    setActiveTab(key);
  };
  return (
    <Layout>
      <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <h1 className="md:text-2xl text-xl dark:text-gray-100">
          Stadion qo'shish
        </h1>
        <Tabs
          activeKey={activeTab}
          onChange={onChange}
          tabBarStyle={{
            marginBottom: 24,
          }}
        >
          <TabPane
            tab={<span className="dark:text-gray-100">Stadion qo'shish</span>}
            key="1"
          >
            <Add />
          </TabPane>
          <TabPane
            tab={<span className="dark:text-gray-100">Rasm qo'shish</span>}
            key="2"
          >
            <Images />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
}

export default General;
