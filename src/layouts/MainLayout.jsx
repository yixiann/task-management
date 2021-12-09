import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

const MainLayout = ({ children, ...props }) => {

  const { Header, Content } = Layout;
  
  return (
    <Layout className="main-layout">
      <Content className="main-content">
          {children}
      </Content>
    </Layout>
  )
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);