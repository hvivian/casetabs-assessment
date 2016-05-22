var Tweet = React.createClass({
  renderTweetText(text) {
    markup = text.replace( /\s\@(\S+)/g, " <a href='#$1'>@$1</a>").replace( /\s\#(\S+)/g, " <b>#$1</b>");
    return {__html: markup}; 
  },
  render: function() {
    return (
      <div className='tweet row'>
        <div className="col-sm-3">
          <UserInfo user={this.props.tweet.user} />
        </div>
        <div
          className="col-sm-9"
          dangerouslySetInnerHTML={ this.renderTweetText(this.props.tweet.text)  }>
        </div>
      </div>
    );
  }
});
