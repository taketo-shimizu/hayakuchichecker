class FastTraining < ApplicationRecord
  before_create :set_uuid
  validates :speaking_smoothry_score, presence: true

  private
  def set_uuid
    while self.id.blank? || FastTraining.find_by(id: self.id).present? do
      self.id = SecureRandom.uuid
    end
  end
end
