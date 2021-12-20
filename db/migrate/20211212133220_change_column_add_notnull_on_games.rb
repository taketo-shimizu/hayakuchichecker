class ChangeColumnAddNotnullOnGames < ActiveRecord::Migration[6.0]
  def change
    change_column_null :games, :fast_talking_score, false
  end
end
