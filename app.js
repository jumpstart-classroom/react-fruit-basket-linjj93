function Fruit(props) {
  return (
    <li>
      {props.type} {props.emoji}
    </li>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.url =
      "https://my-json-server.typicode.com/thoughtworks-jumpstart/api/fruits";
    this.state = {
      input: "",
      fruits: []
    };
  }

  //using promises - non-blocking
  // componentDidMount() {
  //   fetch(this.url)
  //     .then(res => {
  //       if (res.status >= 400) {
  //         throw new Error("Failed to fetch"); //abort immediately, because even error reponse is also considered valid response //!response.ok
  //         // return res.json();
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       // do something with the data
  //       console.log(data);
  //       this.setState({
  //         fruits: data
  //       });
  //     })
  //     .catch(err => console.log(err.message));
  // }

  //async await-blocking
  async componentDidMount() {
    try {
      const res = await fetch(this.url);
      if (!res.ok) {
        throw new Error("Something happened");
      }
      const data = await res.json();
      this.setState({
        fruits: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = () => {
    let userInput = document.querySelector(".search-box");
    return this.setState({
      input: userInput.value
    });
  };

  render() {
    const filteredFruitList = this.state.fruits
      .filter(elem => {
        let fruit = elem["type"];
        return fruit.indexOf(this.state.input) !== -1;
      })
      .map(fruit => {
        return <Fruit key={fruit.id} type={fruit.type} emoji={fruit.emoji} />;
      });

    return (
      <React.Fragment>
        <input className="search-box" onChange={this.handleChange} />
        {filteredFruitList}
      </React.Fragment>
    );
  }
}

const element = <Form />;
const container = document.querySelector("#app");
ReactDOM.render(element, container);
