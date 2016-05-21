class TweetsController < ApplicationController

  def index
    user = params[:username] || "casetabs"
    @tweets = twitter.user_timeline(user).take(20)
    respond_to do |format|
      format.html
      format.json { render json: @tweets }
    end
  end

  private

  def twitter
    @twitter_client || twitter_client
  end

  def twitter_client
    Twitter::REST::Client.new do |config|
      config.consumer_key        = "qd9pWkCF7UUnt7jE1Vyylacyk"
      config.consumer_secret     = "4aKb4gxImsM6gUvkmgGqxDYWGvBdMBeVmlhuHex1PGJeWBPTQB"
      config.access_token        = "734128121620746240-aRIqrpmbaFnI1pRTbQu0a34urHTjIjD"
      config.access_token_secret = "zuUz6nStoAIsR0YgtUdfRiqm6mMRRL33DVYHMzztNZiqo"
    end
  end

end
