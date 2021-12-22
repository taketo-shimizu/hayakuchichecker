class GamesController < ApplicationController
  def index; end
  
  def new; end

  def create
    @game=Game.new(
      fast_talking_score:params[:fast_talking_score],
      talking_time:params[:talking_time],
      word_count:params[:word_count]
    )
    if @game.save
      respond_to do |format|
        format.json { render json: { redirect: result_game_url(@game) } }
      end
    end
  end

  def result
    @game= Game.find(params[:id])
  end
end
