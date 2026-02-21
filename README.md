# discord-command-builder

Discord botのスラッシュコマンド構築用ツールです。

Discord APIとの通信は `discord.js (v14)` を使用しています。 

## Requirement

- [Proto](https://moonrepo.dev/proto)

もしくは自前で導入
- node `v24`
- pnpm `v10`

## Setup

各種ツールチェーン・パッケージのインストール

```shell
proto install
pnpm install
```

`config.yaml` へコマンドの登録

```yaml
# config.yamlをデフォルトで読み込みます

# 対象とするbotのclient idとguild id
clientId: ""
guildId: ""

# 登録したいコマンド
commands:
  - name: "ping"
    description: "Pong!"
    
    # サブコマンド
    # 注意: サブコマンド以下にサブコマンドを定義することは対応していません
    subcommands:
      - name: "pong"
        description: "Pong!"
```

## Usage

`config.yaml` を基にスラッシュコマンドの登録

```shell
pnpm start
```

(Advanced) 特定のyamlファイルを使いたい場合は、手動で指定してください

```shell
pnpm tsc
node --env-file-if-exists=.env dist/main.js --config foobar.yaml
```