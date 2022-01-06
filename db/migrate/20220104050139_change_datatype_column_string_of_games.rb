class ChangeDatatypeColumnStringOfGames < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :voice, :string
  end
end
