class AddColumnToGames < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :word_count, :integer, null: false
    add_column :games, :talking_time, :integer, null: false
  end
end
