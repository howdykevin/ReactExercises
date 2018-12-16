import React from "react";

const checkboxes = [
  {
    name: "diet",
    key: "diet",
    label: "a)Dietary Restrictions",
    value: "a"
  },
  {
    name: "physical",
    key: "physical",
    label: "b)Physical Disabilities",
    value: "b"
  },
  {
    name: "medical",
    key: "medical",
    label: "c)Medical Needs",
    value: "c"
  }
];

function RemoveButton(props) {
  //   remember to add onCLick event to remove list
  return (
    <button class="btn btn-danger" onClick={() => props.handleClick()}>
      <i class="far fa-trash-alt" />
    </button>
  );
}
//data in each column
function PostText(props) {
  return <h4>{props.text}</h4>;
}

//creating the list
function PostList(props) {
  return (
    <tr>
      <td>
        <RemoveButton handleClick={props.remove} />
      </td>
      <td>
        <PostText text={props.first} />
      </td>
      <td>
        <PostText text={props.last} />
      </td>
      <td>
        <PostText text={props.act} />
      </td>
      <td>
        <PostText text={props.rest} />
      </td>
    </tr>
  );
}

//creating the Table
function PostTable(props) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Remove</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Activity</th>
          <th>Restrictions</th>
        </tr>
      </thead>
      <tbody>
        {props.postList.map((item, index) => (
          <PostList
            key={index}
            first={item.firstname}
            last={item.lastname}
            act={item.activity}
            rest={item.targets}
            remove={() => props.removeItem(index)}
          />
        ))}
      </tbody>
    </table>
  );
}

//creating the form
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      checkedItems: new Map()
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
  }

  //handle checkboxes
  handleChange(event) {
    const item = event.target.value;
    const isChecked = event.target.checked;
    this.setState(
      prevState => ({
        checkedItems: prevState.checkedItems.set(item, isChecked)
      }),
      () => console.log(this.state.checkedItems)
    );
  }

  createCheckboxes() {
    return checkboxes.map(item => (
      <div className="form-check" key={item.key}>
        <input
          className="form-check-input"
          type="checkbox"
          value={item.value}
          id={item.name}
          name={item.name}
          onChange={this.handleChange}
        />
        <label className="form-check-label" htmlFor={item.name}>
          {item.label}
        </label>
      </div>
    ));
  }

  //remove item
  removeItem(index) {
    var itemsCopy = this.state.items.slice();
    itemsCopy.splice(index, 1);

    this.setState({
      items: itemsCopy
    });
  }

  //handle submission along with checkboxes
  handleSubmit = e => {
    e.preventDefault();
    let restrictions = "";
    if (this.state.checkedItems.size > 0) {
      for (var key of this.state.checkedItems.keys()) {
        restrictions += key;
      }
    }
    let itemsCopy = this.state.items.slice();
    console.log("your name is" + this.firstName.value + this.lastName.value);
    console.log("You like to" + this.activities.value);
    console.log(this.state.checkedItems.keys());
    console.log("you have selected " + restrictions);

    itemsCopy.push({
      firstname: this.firstName.value,
      lastname: this.lastName.value,
      activity: this.activities.value,
      targets: restrictions
    });
    this.setState(prevState => ({
      items: itemsCopy
    }));
    //resetting form
    this.form.reset();
  };

  render() {
    return (
      <div>
        <form
          className="pl-3"
          onSubmit={this.handleSubmit}
          ref={form => (this.form = form)}
        >
          <div className="form-group">
            <label htmlFor="first">First Name</label>
            <input
              id="first"
              type="text"
              className="form-control col-6"
              ref={input => (this.firstName = input)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last">Last Name</label>
            <input
              id="last"
              type="text"
              className="form-control col-6"
              ref={last => (this.lastName = last)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="activity">Select activity</label>
            <select
              className="form-control col-6"
              id="activity"
              ref={select => (this.activities = select)}
            >
              <option value="Science Lab">Science Lab</option>
              <option value="Swimming">Swimming</option>
              <option value="Painting">Painting</option>
              <option value="Cooking">Cooking</option>
            </select>
          </div>

          <p className="mb-0">Check all that apply:</p>
          {this.createCheckboxes()}
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary mt-2"
          />
        </form>
        <br />
        <PostTable
          postList={this.state.items}
          removeItem={this.removeItem.bind(this)}
        />
      </div>
    );
  }
}

export default App;
