import React from 'react';
import User from './User';
import ProductList from './ProductList';
import CreditCardActions from './creditCard/creditCardActions';
import EchoMessage from './messageEcho/messageEcho';
import occ from '../api/occ';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

class App extends React.Component {
  state = { 
    user: []
  }

  async componentDidMount() {
   const userResponse = await occ.get('/ccstoreui/v1/profiles/current');
   if(userResponse.status === 200){
     this.setState({ user: userResponse.data });
   }
  }

  render() {
    return (
      <div className="ui container">
        <div >
          <Tabs defaultTab="aboutMe" onChange={(tabId) => { console.log(tabId) }}>
            <TabList className="ui top fixed menu">
              <Tab className="item" tabFor="aboutMe">ABOUT ME</Tab>
              <Tab className="item" tabFor="productList">PRODUCT LIST</Tab>
              <Tab className="item" tabFor="myCreditCards">MY CREDIT CARDS</Tab>
              <Tab className="item" tabFor="messageEcho">Echo Message</Tab>
            </TabList>
            <br/><br/><br/>
            <TabPanel tabId="aboutMe">
              <User data = {this.state.user} />
            </TabPanel>
            <TabPanel tabId="productList">
              <ProductList />
            </TabPanel>
            <TabPanel tabId="myCreditCards">
              <CreditCardActions/>
            </TabPanel>
            <TabPanel tabId="messageEcho">
              <EchoMessage/>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
