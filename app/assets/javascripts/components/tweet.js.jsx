var Tweet = React.createClass({
  renderTweetText(text) {
  markup =
    text.replace(/\s?\#(\S+)/g, " <b>#$1</b>")
        .replace(/^\#(\S+)/g, " <b>#$1</b>")
        .replace(/\s?\@([a-zA-Z0-9_]+)/g, " <a href='#$1'>@$1</a>")
        .replace(/^\@([a-zA-Z0-9_]+)/g, " <a href='#$1'>@$1</a>");
    return {__html: markup}; 
  },
  render: function() {
    return (
      <div className='tweet row'>
        <div className="col-sm-4">
          <UserInfo user={this.props.tweet.user} />
        </div>
        <div
          className="col-sm-8"
          dangerouslySetInnerHTML={ this.renderTweetText(this.props.tweet.text)  }>
        </div>
      </div>
    );
  }
});
