
import Flatpickr from "react-flatpickr";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: new Date()
    };
  }

  render() {
    const { date } = this.state;
    return (
      <Flatpickr
        value={date}
        onChange={([date]) => {
          this.setState({ date });
        }}
      />
    );
  }
}