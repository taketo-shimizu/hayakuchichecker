class CreateCreateGames < ActiveRecord::Migration[6.0]
  def up
    create_table :games, id: :string do |t|
      t.float :fast_talking_score, null: false
      t.integer :word_count, null: false
      t.float :talking_time, null: false
      t.string :voice_data, null: false
      t.timestamps
    end
  end

  def down
    drop_table :games
  end
end
