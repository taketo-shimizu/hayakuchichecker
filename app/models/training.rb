class Training < ApplicationRecord
  include IdGenerator
  validates :speaking_smoothry_score, presence:true
end
