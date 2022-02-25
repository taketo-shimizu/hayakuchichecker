class GamesController < ApplicationController
  def new
    @theme = Theme.all.sample
  end
  
  def create
    @game = Game.new(
      fast_talking_score: params[:fast_talking_score],
      talking_time: params[:talking_time],
      word_count: params[:word_count],
      voice_data: params[:voice_data]
    )

    if @game.save
      respond_to do |format|
        format.json { render json: { url: result_game_url(@game) } }
      end
    end
  end

  def result
    @game = Game.find(params[:id])
    gon.fast_talking_score = @game.fast_talking_score
  end
end
