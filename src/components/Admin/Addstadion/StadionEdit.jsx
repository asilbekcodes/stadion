import { Tabs } from "antd";
import React, { useState } from "react";
import Layout from "../Layout";
import Edit from "./Edit";
import Images from "./Images";

const { TabPane } = Tabs;

function StadionEdit() {
  const [activeTab, setActiveTab] = useState("1");

  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <h1 className="md:text-2xl text-xl dark:text-gray-100">Stadionni tahrirlash</h1>
        <Tabs
          activeKey={activeTab}
          onChange={onChange}
          tabBarStyle={{
            marginBottom: 24,
          }}
        >
          <TabPane
            tab={<span className="dark:text-gray-100">Ma'lumotlarni tahrirlash</span>}
            key="1"
          >
            <Edit />
          </TabPane>
          <TabPane
            tab={<span className="dark:text-gray-100">Rasmlarni tahrirlash</span>}
            key="3"
          >
            <Images />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
}

export default StadionEdit;
