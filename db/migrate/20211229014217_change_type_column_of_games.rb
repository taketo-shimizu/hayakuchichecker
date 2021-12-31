class ChangeTypeColumnOfGames < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :voice, :text
  end
end
