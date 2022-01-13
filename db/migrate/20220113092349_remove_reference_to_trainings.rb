class RemoveReferenceToTrainings < ActiveRecord::Migration[6.0]
  def change
    remove_reference :trainings, :game, index: true
  end
end
