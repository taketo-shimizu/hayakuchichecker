class Game < ApplicationRecord
  include IdGenerator
  validates :fast_talking_score, presence: true, numericality: true
  validates :talking_time, presence: true, numericality: true
  validates :word_count, presence: true
  mount_uploader :voice_data, VoiceUploader
end
