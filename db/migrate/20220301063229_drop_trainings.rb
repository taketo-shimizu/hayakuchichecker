class DropTrainings < ActiveRecord::Migration[6.0]
  def up
    drop_table :trainings
  end

  def down
    drop_table :trainings do |t|
      t.string :id, limit: 36
      t.integer :speaking_smoothry_score, null: false
    end
  end
end
