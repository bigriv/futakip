# コーディングルール

## 技術スタック

- Nuxt 4 / Vue 3 / TypeScript
- Tailwind CSS（スタイリング）
- Pinia（状態管理）
- ESLint + Prettier（コード品質）

## Vue コンポーネント

- **Composition API + `<script setup lang="ts">`** を使用する
- コンポーネントファイルは **PascalCase** で命名する（例: `GameCard.vue`）
- テンプレート内のコンポーネント参照も PascalCase とする
- `<script setup>` → `<template>` → `<style>` の順で記述する

## TypeScript

- `any` の使用は避け、適切な型を定義する
- 型定義は `app/types/` ディレクトリに配置する
- インターフェース名は PascalCase、プレフィックス `I` は付けない

## スタイリング

- Tailwind CSS のユーティリティクラスを優先的に使用する
- コンポーネント固有のスタイルが必要な場合は `<style scoped>` を併用してよい
- デザイントークン（カラー等）は `tailwind.config.ts` の `theme.extend` で管理する

## 状態管理

- グローバル状態は Pinia ストアで管理する（`app/stores/` に配置）
- ストアは Setup Store 記法（`defineStore` + 関数）を使用する
- コンポーネントローカルの状態は `ref` / `reactive` で十分

## ディレクトリ構成

```
app/
  assets/css/     グローバルCSS
  components/     共通コンポーネント
  composables/    共通ロジック（use〇〇.ts）
  pages/          ページコンポーネント
  stores/         Pinia ストア
  types/          TypeScript 型定義
```

## 命名規則

- composable のファイル名は `use` プレフィックス + PascalCase（例: `useDeck.ts`）

## その他

- Nuxt の auto-import を活用し、明示的な import は最小限にする
- 仕様書 `spec-futari-talk-kippu.md` を実装の根拠とする
