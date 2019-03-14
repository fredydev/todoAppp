import React from "react"
export default class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      }
    }
    // add handleChange() and submitMessage() methods here
   handleChange = ()=>{}
    render() {
      return (
        <div>
          <h2>Type in a new Message:</h2>
          { /* render an input, button, and ul here */ }
          <input />
          <button>button</button>
          <ul>polo</ul>
          { /* change code above this line */ }
        </div>
      );
    }
  };