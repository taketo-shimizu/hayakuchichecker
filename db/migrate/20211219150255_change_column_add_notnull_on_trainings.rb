class ChangeColumnAddNotnullOnTrainings < ActiveRecord::Migration[6.0]
  def change
    change_column_null :trainings, :speaking_smoothry_score, false
  end
end
