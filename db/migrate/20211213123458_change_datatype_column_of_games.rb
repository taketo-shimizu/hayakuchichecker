class ChangeDatatypeColumnOfGames < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :fast_talking_score, :float
    change_column :games, :talking_time, :float
  end
end
