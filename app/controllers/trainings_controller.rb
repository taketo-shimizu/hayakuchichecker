class TrainingsController < ApplicationController
  def youichi_mode
   
  end

  def woman_mode
  end

  def create
    @training=Training.new(
      speaking_smoothry_score:params[:speaking_smoothry_score]
    )
    if @training.save
      respond_to do |format|
        format.json { render json: { redirect: result_training_url(@training) } }
      end
    end
  end

  def result
    @training= Training.find(params[:id])
  end
end
