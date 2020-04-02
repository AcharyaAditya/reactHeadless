import React from "react";
import occTest2 from "../../api/occTest2";

class EchoMessage extends React.Component {
  state = {
    responseMessage: 'Something went wrong!!!'
  };

  async componentDidMount() {
    this.callEchoSse();
  }

  async callEchoSse() {
    const request = JSON.stringify({
      first: "Hello1",
      second: "Hello2"
    });

    const response = await occTest2.post(
      `/ccstorex/custom/v1/maskCard`,
      request
    );
    if (response.status === 200) {
      this.setState({ responseMessage: JSON.stringify(response) });
    }
  }

  render() {
    return <div>{this.state.responseMessage}</div>;
  }
}
export default EchoMessage;
