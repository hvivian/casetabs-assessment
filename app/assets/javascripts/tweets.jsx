$(function() {
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

  var Tweet = React.createClass({
    render: function() {
      return (
        <div className='tweet row'>
          <div className="col-sm-3">
            <UserInfo user={this.props.tweet.user} />
          </div>
          <div className="col-sm-9">{ this.props.tweet.text }</div>
        </div>
      );
    }
  });

  var UserSelector = React.createClass({
    getInitialState: function() {
      return { username: "casetabs" };
    },
    update: function() {
      this.props.update(this.state.username);
    },
    changeUserName: function(e) {
      this.setState({ username: e.target.value });
    },
    render: function() {
      return (
        <div>
        <div className="userSelector row">
          <div className="col-xs-8 col-md-12">
            <input className="form-control" placeholder="Twitter Handle" type="text" id="username" onChange={this.changeUserName}/>
          </div>
          <div className="col-xs-4 col-md-12">
            <button className="form-control btn btn-default" onClick={this.update}>Change User</button>
          </div>
        </div>
        <hr />
        </div>
      )
    }
  });

  var TweetList = React.createClass({
    getInitialState: function() {
      return { tweets: [] };
    },
    componentDidMount: function() {
      this.loadTweets(this.props.url);
    },
    update: function(url) {
      this.loadTweets("tweets?username=" + url);
    },
    loadTweets: function(url) {
      var self = this;
      $.ajax({
        url: url,
        dataType: 'json',
        success: function(tweets) {
          self.setState({tweets: tweets});
        },
        error: function(xhr, status, err) {
          console.error(self.props.url, status, err);
        }
      });
    },
    render: function() {
      var tweets = this.state.tweets.map(function(tweet) {
        return (
          <Tweet key={tweet.id} tweet={tweet} />
        );
      });
      return (
        <div className="row">
          <div className="sidebar col-lg-3 col-md-3">
            <UserSelector update={ this.update } />
          </div>
          <div className="tweetsList col-lg-9 col-md-9">
            <div className="container-fluid">
            { tweets }
            </div>
          </div>
        </div>
      );
    }
  });

  React.render(<TweetList url="tweets" />, document.getElementById('app'));

});
