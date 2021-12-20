class AddGameIdToTrainings < ActiveRecord::Migration[6.0]
  def change
    add_reference :trainings, :game, foreign_key: true
  end
end
