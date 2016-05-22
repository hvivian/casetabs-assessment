var UserInfo = React.createClass({
  render: function() {
    return (
      <div className='user row'>
        <div className="col-md-4">
          <img src={this.props.user.profile_image_url} alt="user image" className="img-rounded" />
        </div>
        <div className="col-md-8">
          <h5>{ this.props.user.name }</h5>
          <h6>@{ this.props.user.screen_name }</h6>
        </div>
      </div>
    );
  }
});
