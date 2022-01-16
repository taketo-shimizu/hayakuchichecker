module ApplicationHelper
  def default_meta_tags
    {
      title:       "はやくちチェッカー - はやくちのはやくちによるはやくちのためのアプリ",
      description: "面接やプレゼン、大事な場面でついつい早口になってしまう方に音声認識機能でご自身が話している速度を知ってもらい適切な速度で話す練習をするアプリです",
      keywords:    "早口,はやくち",
      noindex: !Rails.env.production?, # production環境以外はnoindex
      canonical: request.original_url,  # 優先されるurl
      charset: "UTF-8",
      og: {
        title: :title,
        description: :description,
        type: "website",
        url: request.original_url,
        image: image_url("ogp.png"),
        site_name: "はやくちチェッカー",
        locale: "ja_JP"
      },
      twitter: {
        creator: '@THEEdadapaul',
        card: 'summary_large_image',
        image: image_url("ogp.png") # ツイッター専用にイメージを設定する場合
      },
    }
  end
end
