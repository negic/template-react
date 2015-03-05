if RUBY_VERSION =~ /1.9/
  Encoding.default_external = Encoding::UTF_8
end

http_path       = "/"
sass_dir        = "assets/_sass/"
css_dir         = "assets/css/"
images_dir      = "assets/img/"
javascripts_dir = "assets/js/"


# cssの主力形式
output_style = :expanded

color_output = false

# クエストにクエリ文字列付けてキャッシュ防ぐ
asset_cache_buster :none

# CSSファイルにSassファイルの何行目に記述されたものかを出力する
line_comments = false

# .sass-cacheを出力するか
cache = true

# trueで相対パス、falseで絶対パス
relative_assets = true


# スプライト画像をユニークな名前じゃないやつで複製
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# スプライト画像のCSSパスをユニークな名前じゃないやつに書き換え
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end
