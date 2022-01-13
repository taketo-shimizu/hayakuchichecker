class RemoveGameIdToTrainings < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :trainings, :games
    remove_reference :trainings, :game, index: true
  end
end
