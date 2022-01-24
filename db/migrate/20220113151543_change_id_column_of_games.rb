class ChangeIdColumnOfGames < ActiveRecord::Migration[6.0]
  def change
    change_column :games, :id, :string, limit: 36
  end
end
