require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage :fog
  config.fog_provider = 'fog/aws'
  config.fog_directory  = 'hayakuchichecker'
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: 'AKIASUNZBZSNNU6BZEN4',
    aws_secret_access_key: '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',
    region: 'ap-northeast-1',
    path_style: true
  }

end