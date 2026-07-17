<script setup lang="ts">
const store = usePittariStore();

onMounted(() => {
  store.reset();
});
</script>

<template>
  <GameLayout title="ピッタリ度メーター">
    <!-- イントロ -->
    <div v-if="store.phase === 'intro'" class="space-y-4">
      <TicketCard header="あそびかた">
        <div class="space-y-3 text-sm text-ink">
          <p>こたえる人だけが知る「ひみつの数字(1〜100)」を、口で「たとえ」て伝えよう。</p>
          <p>あてる人はスライダーで数字を予想! 誤差が小さいほど高得点。</p>
          <div class="rounded-lg bg-paper-edge/50 p-3 text-xs">
            <p class="font-bold">スコア</p>
            <p>誤差0〜5: 以心伝心!(3点)</p>
            <p>誤差6〜15: いいかんじ(2点)</p>
            <p>誤差16〜30: おしい(1点)</p>
            <p>誤差31以上: すれちがい…(0点)</p>
          </div>
          <p class="text-xs text-muted">全{{ store.totalRounds }}ラウンド、ふたりの協力プレイ!</p>
        </div>
        <div class="mt-5">
          <AppButton block @click="store.start()">はじめる</AppButton>
        </div>
      </TicketCard>
    </div>

    <!-- こたえる人: 秘密の数字を見る -->
    <div v-else-if="store.phase === 'answer'" class="space-y-4">
      <TicketCard :header="`ラウンド${store.roundIndex + 1} / ${store.totalRounds}`">
        <p class="mb-1 text-xs text-muted">
          プレイヤー{{ store.answerer }}さんだけ見てね
        </p>
        <div class="mb-4 rounded-lg bg-paper-edge/50 p-4 text-center">
          <p class="mb-1 text-sm text-muted">お題スケール</p>
          <p class="text-lg font-bold text-ink">{{ store.currentTheme.theme }}</p>
          <div class="mt-2 flex items-center justify-between text-xs text-muted">
            <span>1: {{ store.currentTheme.low }}</span>
            <span>100: {{ store.currentTheme.high }}</span>
          </div>
        </div>
        <div class="mb-4 text-center">
          <p class="mb-1 text-sm text-muted">ひみつの数字</p>
          <p class="text-5xl font-bold text-orange">{{ store.secretNumber }}</p>
        </div>
        <div class="mb-4 rounded-lg bg-green/10 p-3 text-xs text-green">
          💡 数字は言わずに、その数字っぽい「たとえ」を口で伝えよう
        </div>
        <AppButton block @click="store.confirmAnswer()">
          たとえを伝えたら渡す
        </AppButton>
      </TicketCard>
    </div>

    <!-- 交代スクリーン -->
    <PassScreen
      v-else-if="store.phase === 'pass'"
      :player-label="`プレイヤー${store.answerer === 1 ? 2 : 1}`"
      @next="store.afterPass()"
    />

    <!-- あてる人: スライダーで予想 -->
    <div v-else-if="store.phase === 'guess'" class="space-y-4">
      <TicketCard :header="`ラウンド${store.roundIndex + 1} / ${store.totalRounds}`">
        <p class="mb-1 text-xs text-muted">
          プレイヤー{{ store.answerer === 1 ? 2 : 1 }}さんが予想してね
        </p>
        <div class="mb-4 rounded-lg bg-paper-edge/50 p-4 text-center">
          <p class="mb-1 text-sm text-muted">お題スケール</p>
          <p class="text-lg font-bold text-ink">{{ store.currentTheme.theme }}</p>
          <div class="mt-2 flex items-center justify-between text-xs text-muted">
            <span>1: {{ store.currentTheme.low }}</span>
            <span>100: {{ store.currentTheme.high }}</span>
          </div>
        </div>
        <div class="mb-4 text-center">
          <p class="mb-2 text-sm text-muted">予想する数字</p>
          <p class="text-5xl font-bold text-orange">{{ store.guessValue }}</p>
        </div>
        <div class="mb-6 px-2">
          <input
            v-model.number="store.guessValue"
            type="range"
            min="1"
            max="100"
            class="w-full"
          />
          <div class="mt-1 flex justify-between text-xs text-muted">
            <span>1</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        <AppButton block @click="store.submitGuess()">この数字で決定!</AppButton>
      </TicketCard>
    </div>

    <!-- 結果表示 -->
    <div v-else-if="store.phase === 'result'" class="space-y-4">
      <TicketCard :header="`ラウンド${store.roundIndex + 1} 結果`">
        <p class="mb-4 text-center text-lg font-bold text-ink">
          {{ store.currentTheme.theme }}
        </p>

        <div class="mb-6">
          <MeterBar
            :secret="store.secretNumber"
            :guess="store.guessValue"
            :low="store.currentTheme.low"
            :high="store.currentTheme.high"
          />
        </div>

        <div class="mb-4 text-center">
          <p class="text-sm text-muted">
            誤差: <span class="font-bold text-ink">{{ store.currentDiff }}</span>
          </p>
        </div>

        <div class="mb-4 flex items-center justify-center">
          <StampMark :text="store.currentJudgment.label" />
        </div>

        <p class="mb-4 text-center text-sm text-muted">
          +{{ store.currentJudgment.score }}点
        </p>

        <AppButton block @click="store.nextRound()">
          {{ store.roundIndex + 1 < store.totalRounds ? 'つぎのラウンドへ' : '結果を見る' }}
        </AppButton>
      </TicketCard>
    </div>

    <!-- 最終結果 -->
    <div v-else-if="store.phase === 'final'" class="space-y-4">
      <TicketCard header="ふたりの通じ合い度">
        <div class="mb-4 text-center">
          <StampMark :text="store.finalTitle.title" />
        </div>
        <p class="mb-4 text-center text-sm text-muted">
          {{ store.finalTitle.comment }}
        </p>
        <ScoreDisplay :score="store.totalScore" :max-score="15" label="合計スコア" />
        <div class="mt-4 space-y-1">
          <div
            v-for="(score, i) in store.roundScores"
            :key="i"
            class="flex justify-between rounded px-3 py-1 text-sm text-ink"
          >
            <span>ラウンド{{ i + 1 }}</span>
            <span class="font-bold">+{{ score }}点</span>
          </div>
        </div>
        <div class="mt-5 space-y-2">
          <AppButton block @click="store.start()">もう1回あそぶ</AppButton>
          <NuxtLink to="/">
            <AppButton variant="ghost" block>改札へもどる</AppButton>
          </NuxtLink>
        </div>
      </TicketCard>
    </div>
  </GameLayout>
</template>
