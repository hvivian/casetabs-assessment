var Tweet = React.createClass({

  componentDidMount: function() {
    $(".user-hover").mouseover(function() {
      var self = this;
      $(this).tooltip({
        html: true,
        title: function() {
          var markup = ""
          $.ajax({
            async: false,
            url: "user?username=" + $(self).attr('href').slice(1),
            dataType: 'json',
            success: function(user) {
              markup += "<div>" + user.name + "</div>"
              markup += "<div>Followers: " + user.followers_count + "</div>"
              markup += "<div>Tweets: " + user.statuses_count + "</div>"
            },
            error: function(xhr, status, err) {
              console.error(status, err);
            }
          });
          return markup;
        }
      }).tooltip('show');
    });
  },
  renderTweetText(text) {
    var markup =
      text.replace(/\s?\#(\S+)/g, " <b>#$1</b>")
          .replace(/^\#(\S+)/g, " <b>#$1</b>")
          .replace(/\s?\@([a-zA-Z0-9_]+)/g, " <a class='user-hover' href='#$1'>@$1</a>")
          .replace(/^\@([a-zA-Z0-9_]+)/g, " <a class='user-hover' href='#$1'>@$1</a>");

    return {__html: markup}; 
  },
  render: function() {
    return (
      <div className='tweet row'>
        <div className="col-xs-4">
          <UserInfo user={this.props.tweet.user} />
        </div>
        <div
          className="col-xs-8"
          dangerouslySetInnerHTML={ this.renderTweetText(this.props.tweet.text)  }>
        </div>
      </div>
    );
  }
});
