# Logseq プラグイン: Single Journal

> [!WARNING]
> このプラグインは Logseq DB モデルをサポートしていません。 (バグ回避のためブロック)

<div align="right">

[English](https://github.com/YU000jp/logseq-plugin-single-journal) / [日本語](https://github.com/YU000jp/logseq-plugin-single-journal/blob/main/readme.ja.md) [![最新リリースバージョン](https://img.shields.io/github/v/release/YU000jp/logseq-plugin-single-journal)](https://github.com/YU000jp/logseq-plugin-single-journal/releases)
[![ダウンロード数](https://img.shields.io/github/downloads/YU000jp/logseq-plugin-single-journal/total.svg)](https://github.com/YU000jp/logseq-plugin-single-journal/releases)
2024/01/03に公開 <a href="https://www.buymeacoffee.com/yu000japan"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=yu000japan&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" /></a>
</div>

## オプション

1. 日誌で複数の日記ではなく、今日の日記のみを表示します。 **デフォルト: 有効**
   > 一時的にキャンセルするには、コンテンツの下のボタンから行えます。

   ![singleJournalJa](https://github.com/YU000jp/logseq-plugin-single-journal/assets/111847207/28cbb862-c749-4a12-8457-e4b3cd707882)

1. 日誌を開く際に今日の日記にリダイレクトします。 **デフォルト: 無効**
   > シングルページで開きます。ただし、リダイレクトには時間の遅れがあります。

1. ジャーナル移動のための ツールバーアイコンとショートカット 🆕
   > 必要な項目のみに絞ることができます。それぞれのショートカットを使用して割り当てるには、キーマップでコマンドを見つけます。

   ![singleJournalプラグイン ツールバー](https://github.com/YU000jp/logseq-plugin-single-journal/assets/111847207/98636867-858d-4fda-a31a-9e2615dfd1a9)

---

## はじめに

### Logseq マーケットプレイスからインストール

- 上部の右ツールバーで [`---`] を押して [`Plugins`] を開きます。マーケットプレイスを選択します。検索フィールドに `Single` と入力し、検索結果から選択してインストールします。

### 使用法

- いずれかの設定を有効にして日誌を開きます。
  > このプラグインは日誌を開いたときのみ動作します。

---

## ショーケース / 質問 / アイディア / ヘルプ

> [ディスカッション](https://github.com/YU000jp/logseq-plugin-single-journal/discussions) タブに移動して、質問やこれらの内容を見つけてください。

1. ボタンを削除する方法: custom.cssにCSSコードを追加する ![image](https://github.com/YU000jp/logseq-plugin-single-journal/assets/111847207/f4cce013-c947-4e6a-9067-b4895da7d2e7) 🆕

   ```CSS
   #cancel-exclude {display:none} /* Single journal plugin remove the button */
   ```
1. このプラグインは Logseq の DOM 構造に依存しています。DOM 構造が Logseq バージョンのアップデートによって変更されると、スタイルが適用されないことがあります。それに気づいた場合は、問題を報告してください。

## 先行技術とクレジット

- アイコン > [icooon-mono.com](https://icooon-mono.com/00252-%e3%83%8f%e3%82%b5%e3%83%9f%e3%81%ae%e3%83%95%e3%83%aa%e3%83%bc%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3/)
- 作者 > [@YU000jp](https://github.com/YU000jp)
