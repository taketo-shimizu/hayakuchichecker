class ChangeIdColumnOfTrainings < ActiveRecord::Migration[6.0]
  def change
    change_column :trainings, :id, :string, limit: 36
  end
end
