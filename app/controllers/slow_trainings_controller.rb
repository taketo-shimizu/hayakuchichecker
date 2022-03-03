class SlowTrainingsController < ApplicationController
  def create
    @slow_training = SlowTraining.new(
      speaking_smoothry_score: params[:speaking_smoothry_score]
    )
    if @slow_training.save
      respond_to do |format|
        format.json { render json: { redirect: result_slow_training_url(@slow_training) } }
      end
    end
  end

  def result
    @slow_training = SlowTraining.find(params[:id])
  end
end
