var TweetList = React.createClass({
  getInitialState: function() {
    return { tweets: [] };
  },
  componentDidMount: function() {
    this.loadTweets(this.props.username);
  },
  update: function(username) {
    this.loadTweets(username);
  },
  loadTweets: function(username) {
    var self = this;
    $.ajax({
      url: "tweets?username=" + username,
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
