class Game < ApplicationRecord
  before_create :set_uuid
  validates :fast_talking_score, presence: true, numericality: true
  validates :talking_time, presence: true, numericality: true
  validates :word_count, presence: true
  mount_uploader :voice_data, VoiceUploader

  private
  def set_uuid
    while self.id.blank? || Game.find_by(id: self.id).present? do
      self.id = SecureRandom.uuid
    end
  end
end
