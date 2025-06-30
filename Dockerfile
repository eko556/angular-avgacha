FROM litespeedtech/openlitespeed:1.7.16-lsphp74

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの設定
WORKDIR /var/www/vhosts/localhost

# 設定ファイルのコピー
COPY server/vhost.conf /usr/local/lsws/conf/vhosts/
COPY server/api.conf /usr/local/lsws/conf/vhosts/
COPY server/security.conf /usr/local/lsws/conf/

# Angularアプリケーションのビルドファイルをコピー
COPY dist/ /var/www/vhosts/localhost/html/

# ポートの公開
EXPOSE 8080 7080

# LiteSpeedサーバーの起動
CMD ["/usr/local/lsws/bin/lswsctrl", "start"]
