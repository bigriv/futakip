<script setup lang="ts">
const store = useShiritoriStore();
const router = useRouter();

const inputWord = ref('');
const errorMessage = ref('');

const difficultyLabel: Record<string, string> = {
  express: '急行(3文字)',
  limited: '特急(4文字)',
  shinkansen: '新幹線(5文字)',
};

onMounted(() => {
  if (!store.currentChar) {
    router.replace('/shiritori');
  }
});

function handleSubmit() {
  errorMessage.value = '';
  const result = store.submitWord(inputWord.value);
  if (!result.valid) {
    errorMessage.value = result.error || '';
    return;
  }
  inputWord.value = '';
}

function replayDifficulty() {
  store.startGame(store.difficulty);
  inputWord.value = '';
  errorMessage.value = '';
}

function changeDifficulty() {
  router.push('/shiritori');
}

const duplicateWord = computed(() => {
  if (!store.loseReason.includes('もう出てた')) return '';
  const last = store.history[store.history.length - 1];
  return last?.word || '';
});
</script>

<template>
  <GameLayout title="トンネルしりとり">
    <!-- プレイ中 -->
    <div v-if="store.phase === 'play'" class="space-y-4">
      <TicketCard :header="`${difficultyLabel[store.difficulty]} / ${store.turn}手目`">
        <Banner icon="🙈" class="mb-3">プレイヤー{{ store.currentPlayer }}さんの番だよ(こっそり入力してね)</Banner>

        <div class="my-6 text-center">
          <p class="mb-2 text-sm text-muted">次は…</p>
          <p class="text-6xl font-bold text-orange">「{{ store.currentChar }}」</p>
          <p class="mt-2 text-sm text-muted">から始まる言葉</p>
          <p class="mt-1 text-xs text-muted">
            にごり・半にごりの入れかえもOK
          </p>
        </div>

        <div class="space-y-3">
          <input
            v-model="inputWord"
            type="text"
            class="w-full rounded-lg border-2 border-paper-edge bg-white px-4 py-3 text-lg font-bold text-ink outline-none focus:border-orange"
            placeholder="ことばを入力…"
            autocomplete="off"
            @keydown.enter="handleSubmit"
          />
          <p v-if="errorMessage" class="text-sm font-bold text-stamp">
            {{ errorMessage }}
          </p>
          <AppButton block :disabled="!inputWord.trim()" @click="handleSubmit">
            決定
          </AppButton>
        </div>
      </TicketCard>
    </div>

    <!-- 交代スクリーン -->
    <PassScreen
      v-else-if="store.phase === 'pass'"
      :player-label="`プレイヤー${store.currentPlayer}`"
      @next="store.afterPass()"
    />

    <!-- ゲームオーバー -->
    <div v-else-if="store.phase === 'gameover'" class="space-y-4">
      <TicketCard header="しゅうりょう!">
        <div class="mb-4 text-center">
          <p class="mb-2 text-lg font-bold text-stamp">
            プレイヤー{{ store.loser }}の負け!
          </p>
          <p class="text-sm text-ink">{{ store.loseReason }}</p>
        </div>

        <div class="mb-4 rounded-lg bg-paper-edge/50 p-3 text-center">
          <p class="text-sm text-muted">トンネルを</p>
          <p class="text-3xl font-bold text-ink">
            {{ store.history.length - 1 }}
            <span class="text-base text-muted">駅ぶん</span>
          </p>
          <p class="text-sm text-muted">進んだよ!</p>
        </div>

        <StampMark
          v-if="store.history.length > 10"
          text="長距離\n走破!"
        />
      </TicketCard>

      <TicketCard header="全履歴(ネタバラシ)">
        <ShiritoriHistory
          :history="store.history"
          :duplicate-word="duplicateWord"
        />
      </TicketCard>

      <div class="space-y-2 px-4">
        <AppButton block @click="replayDifficulty()">
          {{ difficultyLabel[store.difficulty] }}でもう1本
        </AppButton>
        <AppButton variant="secondary" block @click="changeDifficulty()">
          難易度を変える
        </AppButton>
        <AppButton variant="outline" block @click="navigateTo('/')">改札へもどる</AppButton>
      </div>
    </div>
  </GameLayout>
</template>
