class GamesController < ApplicationController
  def new
    @game= Game.new(
      fast_talking_score: params[:fast_talking_score]
      word_count: params[:word_count]
      talking_time: params[:talking_time]
    )
    if @game.save
      redirect_to root_paeh
    end
  end

  def result; end
end
