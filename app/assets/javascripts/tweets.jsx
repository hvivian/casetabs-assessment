
$(function() {
  var Tweet = React.createClass({
    render: function() {
      return (
        <div className='tweet'>
          { this.props.tweet.text }
        </div>
      );
    }
  });

  var TweetList = React.createClass({
    getInitialState: function() {
      return { tweets: [] };
    },
    componentDidMount: function() {
      this.loadTweets();
    },
    loadTweets: function() {
      var self = this;
      $.ajax({
        url: this.props.url,
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
        console.log(tweet);
        return (
          <Tweet key={tweet.id} tweet={tweet} />
        );
      });
      return (
        <div className="tweetsList">
          { tweets }
        </div>
      );
    }
  });

  React.render(<TweetList url="tweets" />, document.getElementById('app'));

});
