require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage :fog
  config.fog_provider = 'fog/aws'
  config.fog_directory  = 'hayakuchi-checker'
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: 'AKIASUNZBZSNNAZCZBMP',
    aws_secret_access_key: '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',
    region: 'ap-northeast-1',
    path_style: true
  }

end