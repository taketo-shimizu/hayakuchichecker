class AddVoiceDataToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :voice_data, :string
  end
end
