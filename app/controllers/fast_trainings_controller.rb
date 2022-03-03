class FastTrainingsController < ApplicationController
  def create
    @fast_training = FastTraining.new(
      speaking_smoothry_score: params[:speaking_smoothry_score]
    )
    if @fast_training.save
      respond_to do |format|
        format.json { render json: { redirect: result_fast_training_url(@fast_training) } }
      end
    end
  end

  def result
    @fast_training = FastTraining.find(params[:id])
  end
end
