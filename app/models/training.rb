class Training < ApplicationRecord
  validates :speaking_smoothry_score, presence:true
  belongs_to :game, optional: true 
end
