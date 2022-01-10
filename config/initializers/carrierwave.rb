require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'hayakuchi-checker'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: 'AKIASUNZBZSND245IUVF',
      aws_secret_access_key: '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',
      region: 'ap-northeast-1',
      path_style: true
    }
  else
    config.storage :file
  end
end