class CreateSlowTrainings < ActiveRecord::Migration[6.0]
  def up
    create_table :slow_trainings, id: :string do |t|
      t.integer :speaking_smoothry_score, null: false
      t.timestamps
    end
  end

  def down
    drop_table :slow_trainings
  end
end
