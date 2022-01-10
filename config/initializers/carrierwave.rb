require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'hayakuchichecker'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: 'AKIASUNZBZSNKMXDW3B4',
      aws_secret_access_key: '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',
      region: 'ap-northeast-1',
      path_style: true
    }
  else
    config.storage :file
  end
end