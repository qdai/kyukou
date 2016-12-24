import Add from '../containers/add';
import Alerts from '../containers/alerts';
import Delete from '../containers/delete';
import Edit from '../containers/edit';
import List from '../containers/list';
import React from 'react';
import Tab from 'react-bootstrap/es/Tab';
import Tabs from 'react-bootstrap/es/Tabs';

const App = () =>
  <div>
    <Alerts />
    <Tabs
      defaultActiveKey={1}
      id="tabs"
    >
      <Tab
        eventKey={1}
        title="List"
      >
        <List />
      </Tab>
      <Tab
        eventKey={2}
        title="Add"
      >
        <Add />
      </Tab>
      <Tab
        eventKey={3}
        title="Edit"
      >
        <Edit />
      </Tab>
      <Tab
        eventKey={4}
        title="Delete"
      >
        <Delete />
      </Tab>
    </Tabs>
  </div>;

export default App;
