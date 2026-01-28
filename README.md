# Food Court

## 目次
- [概要](#概要)
  - [目的](#目的)
  - [メリット](#メリット)
  - [具体的な機能](#具体的な機能)
  - [使用技術](#使用技術)
- [セットアップ](#セットアップ)
  - [Node.jsとJavaのインストール](#nodejsとjavaのインストール)
  - [Firebaseにログイン&プロジェクトの作成](#firebaseにログインプロジェクトの作成)
  - [Sentryプロジェクトの作成](#sentryプロジェクトの作成)
  - [プロジェクトのクローン](#プロジェクトのクローン)
  - [ライブラリのインストール](#ライブラリのインストール)
  - [セットアップコマンドの実行](#セットアップコマンドの実行)
- [ビルド&デプロイ](#ビルドデプロイ)
  - [アイコンの設定](#アイコンの設定)
  - [ビルド(非推奨)](#ビルド非推奨)
  - [リリース(推奨)](#リリース推奨)


## 概要
- ### 目的
  - このプロジェクトは高校の食堂に手元にスマートフォンがなくてもキャッシュレス決済を導入するためのプロジェクトです

- ### メリット
  - 混雑回避
  - キャッシュレス決済の導入
  - スマートフォンレス

- ### 具体的な機能
  - スマホのPayPayアプリを介してユーザーは「チャージ」が可能
  - サービスを継続的に使ってもらうためにQRコード、またはログインで簡単にチャージが可能
  - 予約・注文上限を設定し、混雑が回避
  - Firebaseのセキュリティルールで安全
  - TypeScript Sentryでエラーが起きにくく、万が一起きてもログやエラーから早期に直すことが可能

- ### 使用技術
  - 基本
    - TypeScript
  - ツール
    - VSCode
    - Git / GitHub
    -  Firebase Emulator
  - フロントエンド
    - HTML
    - CSS
    - JavaScript
    - React
    - Vite
  - バックエンド
    - Firebase Functions
    - Node.js
  - デザイン
    - Tailwind CSS
    - Motion
  - クラウドサービス
    - Firebase Auth
    - Firebase Firestore
    - Firebase Storage
    - Sentry


## セットアップ
- ### Node.jsとJavaのインストール
  - Node.jsに加えてFirebase emulatorを使用するならJavaもインストールしてください

- ### Firebase CLIのインストール
  - `npm install -g firebase-tools`でFirebase CLIをインストールしてください

- ### Firebaseにログイン&プロジェクトの作成
  - `firebase login`でFirebase CLIにログインしてください
  - そのあとログインしたアカウントでFirebaseのプロジェクトを作成し、Hosting Functions Storage Auth Firestoreをすべて有効にしてください

- ### Sentryプロジェクトの作成
  - Sentryプロジェクトを作成してAPIキーなどをメモしておいてください。(後のセットアップコマンドで使います)

- ### プロジェクトのクローン
  - git cloneコマンドなどでプロジェクトをコピーしてください

- ### ライブラリのインストール
  - プロジェクト直下で`npm install`をし、ライブラリをインストールしてください
  - 忘れずに/functionsのほうも`npm install`してください

- ### セットアップコマンドの実行
  - `npm run setup`を実行し、あとは書いてある通りに設定してください

## 起動
- ### エミュレーターの使用
  - Firebase emulatorを使用する場合は`npm run emulator`を実行してください

- ### 実行
  - `npm run dev`で開発モードで起動します。エミュレーターを使用している場合は`npm run dev:emulator`を使用してください

## ビルド&デプロイ
- ### アイコンの設定
  - アイコンは`/public/files/icons`内にあるアイコンを置き換えてください
  - x48なら48x48のサイズの画像を用意するようにその名前に対応したサイズの画像を用意してください

- ### ビルド(非推奨)
  - `npm run build`を実行してください。functionsもビルドする場合は/functionsディレクトリ内で`npm run build`をしてください
  - しかし後述の`npm run release`を使用することをおすすめします。(リリースまですべてしてくれるため)

- ### リリース(推奨)
  - `npm run release`をすれば基本的にすべてうまくいきます
