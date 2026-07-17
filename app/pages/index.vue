<script setup lang="ts">
import { gameList } from '~/data/gameList';
</script>

<template>
  <div class="flex min-h-dvh flex-col px-4 py-8">
    <header class="mb-8 text-center">
      <p class="mb-2 text-sm tracking-widest text-muted">🚃 ふたり専用パーティーゲーム</p>
      <h1 class="text-3xl font-bold text-paper">ふたりトークきっぷ</h1>
      <p class="mt-2 text-sm text-muted">遊びたいゲームをえらんでね</p>
    </header>

    <div class="flex-1 space-y-4">
      <HomeGameCard v-for="game in gameList" :key="game.id" :game="game" />
    </div>

    <footer class="mt-8 text-center text-xs text-muted/50">
      1台のスマホを渡し合って遊ぼう
    </footer>
  </div>
</template>
