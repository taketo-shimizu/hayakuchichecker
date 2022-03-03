class DropGames < ActiveRecord::Migration[6.0]
  def up
    drop_table :games
  end

  def down
    drop_table :games do |t|
      t.string :id, limit: 36
      t.float :fast_talking_score, null: false
      t.integer :word_count, null: false
      t.float :talking_time, null: false
      t.string :voice_data
    end
  end
end
