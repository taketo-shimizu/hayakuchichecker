class CreateTrainings < ActiveRecord::Migration[6.0]
  def change
    create_table :trainings do |t|
      t.integer :speaking_smoothry_score

      t.timestamps
    end
  end
end
