class TweetsController < ApplicationController

  def index
    username = params[:username] || "casetabs"
    @tweets = Rails.cache.fetch("tweets/#{username}", expires_in: 5.minutes) do
      twitter.user_timeline(username).take(20)
    end
    respond_to do |format|
      format.json { render json: @tweets }
    end
  end

  def user
    username = params[:username]
    @user = Rails.cache.fetch("user/#{username}", expires_in: 5.minutes) do
      twitter.user(username)
    end
    respond_to do |format|
      format.json { render json: @user }
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
