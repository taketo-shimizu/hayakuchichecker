class AddVoiceToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :voice, :binary, null: false
  end
end
