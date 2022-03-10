class GamesController < ApplicationController
  require 'aws-sdk-polly' 
  
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

  def read
    polly = Aws::Polly::Client.new(region: 'ap-northeast-1', access_key_id: ENV['AWS_ACCESS_KEY_ID'], secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'])
    resp = polly.synthesize_speech({
            output_format: "mp3",
            text: params[:text],
            voice_id: "Mizuki",
           })
    IO.copy_stream(resp.audio_stream, "#{params[:text]}.mp3") 
    send_file "#{params[:text]}.mp3"
  end
end