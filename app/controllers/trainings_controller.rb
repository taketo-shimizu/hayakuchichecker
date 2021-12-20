class TrainingsController < ApplicationController
  def new
    @game= Game.find_by(id:params[:format])
    gon.fast_talking_score= @game.fast_talking_score
  end

   def create
   end
end
