var UserSelector = React.createClass({
  getInitialState: function() {
    return { username: "casetabs" };
  },
  update: function() {
    window.location.hash = "#" + this.state.username;
    this.props.update(this.state.username);
  },
  changeUserName: function(e) {
    this.setState({ username: e.target.value });
  },
  onKeyPress: function(e) {
    if (e.key == 'Enter') {
      this.update();
    }
  },
  render: function() {
    return (
      <div>
      <div className="userSelector row">
        <div className="col-xs-8 col-md-12">
          <input
            className="form-control"
            placeholder="Twitter Handle"
            type="text"
            id="username"
            onKeyPress={this.onKeyPress}
            onChange={this.changeUserName}/>
        </div>
        <div className="col-xs-4 col-md-12">
          <button
            className="form-control btn btn-default"
            onClick={this.update}>
            Change User
          </button>
        </div>
      </div>
      <hr />
      </div>
    )
  }
});
