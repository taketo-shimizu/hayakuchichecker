class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :fast_talking_score

      t.timestamps
    end
  end
end
