class Game < ApplicationRecord
  validates :fast_talking_score, presence: true, numericality: true
  validates :talking_time, presence: true, numericality: true
  validates :word_count, presence: true
  has_many :trainings
  mount_uploader :voice, VoiceUploader
end
