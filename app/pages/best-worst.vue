<script setup lang="ts">
const store = useBestWorstStore();

onMounted(() => {
  store.reset();
});

function handleAnswerSelect(index: number) {
  if (store.answerBest === index) {
    store.selectBest(index);
  } else if (store.answerWorst === index) {
    store.selectWorst(index);
  } else if (store.answerBest < 0) {
    store.selectBest(index);
  } else if (store.answerWorst < 0) {
    store.selectWorst(index);
  }
}

function handleGuessSelect(index: number) {
  if (store.guessBest === index) {
    store.guessBestOption(index);
  } else if (store.guessWorst === index) {
    store.guessWorstOption(index);
  } else if (store.guessBest < 0) {
    store.guessBestOption(index);
  } else if (store.guessWorst < 0) {
    store.guessWorstOption(index);
  }
}
</script>

<template>
  <GameLayout title="ベスト&ワースト予想">
    <!-- イントロ -->
    <div v-if="store.phase === 'intro'" class="space-y-4">
      <TicketCard header="あそびかた">
        <div class="space-y-3 text-sm text-ink">
          <p>お題の選択肢から、こたえる人が「1位」と「最下位」をこっそり選ぶよ。</p>
          <p>あてる人は、それを予想してみよう!</p>
          <div class="rounded-lg bg-paper-edge/50 p-3 text-xs">
            <p class="font-bold">スコア</p>
            <p>片方的中: 1点 / 両方的中: 3点</p>
            <p>全{{ store.totalQuestions }}問で合計点を競おう</p>
          </div>
        </div>
        <div class="mt-5">
          <AppButton block @click="store.start()">はじめる</AppButton>
        </div>
      </TicketCard>
    </div>

    <!-- こたえる人: 1位と最下位を選ぶ -->
    <div v-else-if="store.phase === 'answer'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 / ${store.totalQuestions}`">
        <template #header-action>
          <button
            class="text-muted hover:text-ink active:scale-90 transition-all"
            @click="store.changeQuestion()"
          >
            <IconReload />
          </button>
        </template>
        <Banner class="mb-3">プレイヤー{{ store.answerer }}さんだけ見てね</Banner>
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>
        <p class="mb-3 text-sm text-ink">👑 1位と 💀 最下位をえらんでね</p>
        <div class="space-y-2">
          <OptionButton
            v-for="(opt, i) in store.currentQuestion.options"
            :key="i"
            :label="`${store.answerBest === i ? '👑 ' : ''}${store.answerWorst === i ? '💀 ' : ''}${opt}`"
            :selected="store.answerBest === i || store.answerWorst === i"
            :selected-variant="store.answerBest === i ? 'best' : store.answerWorst === i ? 'worst' : 'default'"
            @select="handleAnswerSelect(i)"
          />
        </div>
        <div class="mt-3 flex items-center gap-2 text-sm">
          <span
            :class="[
              'rounded px-2 py-1 font-bold',
              store.answerBest >= 0 ? 'bg-orange/10 text-orange' : 'text-muted',
            ]"
          >
            👑 {{ store.answerBest >= 0 ? store.currentQuestion.options[store.answerBest] : '未選択' }}
          </span>
          <span
            :class="[
              'rounded px-2 py-1 font-bold',
              store.answerWorst >= 0 ? 'bg-blue/10 text-blue' : 'text-muted',
            ]"
          >
            💀 {{ store.answerWorst >= 0 ? store.currentQuestion.options[store.answerWorst] : '未選択' }}
          </span>
        </div>
        <div class="mt-4">
          <AppButton block :disabled="!store.answerReady" @click="store.confirmAnswer()">
            決定
          </AppButton>
        </div>
      </TicketCard>
    </div>

    <!-- 交代スクリーン -->
    <PassScreen
      v-else-if="store.phase === 'pass'"
      :player-label="`プレイヤー${store.answerer === 1 ? 2 : 1}`"
      @next="store.afterPass()"
    />

    <!-- あてる人: 1位と最下位を予想 -->
    <div v-else-if="store.phase === 'guess'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 / ${store.totalQuestions}`">
        <Banner class="mb-3">プレイヤー{{ store.answerer === 1 ? 2 : 1 }}さんが予想してね</Banner>
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>
        <p class="mb-3 text-sm text-ink">👑 1位と 💀 最下位を予想してね</p>
        <div class="space-y-2">
          <OptionButton
            v-for="(opt, i) in store.currentQuestion.options"
            :key="i"
            :label="`${store.guessBest === i ? '👑 ' : ''}${store.guessWorst === i ? '💀 ' : ''}${opt}`"
            :selected="store.guessBest === i || store.guessWorst === i"
            :selected-variant="store.guessBest === i ? 'best' : store.guessWorst === i ? 'worst' : 'default'"
            @select="handleGuessSelect(i)"
          />
        </div>
        <div class="mt-3 flex items-center gap-2 text-sm">
          <span
            :class="[
              'rounded px-2 py-1 font-bold',
              store.guessBest >= 0 ? 'bg-orange/10 text-orange' : 'text-muted',
            ]"
          >
            👑 {{ store.guessBest >= 0 ? store.currentQuestion.options[store.guessBest] : '未選択' }}
          </span>
          <span
            :class="[
              'rounded px-2 py-1 font-bold',
              store.guessWorst >= 0 ? 'bg-blue/10 text-blue' : 'text-muted',
            ]"
          >
            💀 {{ store.guessWorst >= 0 ? store.currentQuestion.options[store.guessWorst] : '未選択' }}
          </span>
        </div>
        <div class="mt-4">
          <AppButton block :disabled="!store.guessReady" @click="store.confirmGuess()">
            決定
          </AppButton>
        </div>
      </TicketCard>
    </div>

    <!-- 結果表示 -->
    <div v-else-if="store.phase === 'result'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 結果`">
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>

        <div class="mb-4 space-y-3">
          <div class="flex items-center gap-3 rounded-lg bg-orange/10 p-3">
            <div class="flex-1">
              <p class="mb-1 text-xs font-bold text-orange">👑 1位</p>
              <p class="font-bold text-ink">
                {{ store.currentQuestion.options[store.answerBest] }}
              </p>
            </div>
            <StampMark v-if="store.bestCorrect" text="的中" size="sm" />
            <span v-else class="text-sm font-bold text-muted">はずれ</span>
          </div>
          <div class="flex items-center gap-3 rounded-lg bg-blue/10 p-3">
            <div class="flex-1">
              <p class="mb-1 text-xs font-bold text-blue">💀 最下位</p>
              <p class="font-bold text-ink">
                {{ store.currentQuestion.options[store.answerWorst] }}
              </p>
            </div>
            <StampMark v-if="store.worstCorrect" text="的中" size="sm" />
            <span v-else class="text-sm font-bold text-muted">はずれ</span>
          </div>
        </div>

        <div class="mb-4 text-center">
          <p class="text-3xl font-bold text-ink">
            +{{ store.roundScore }} <span class="text-base text-muted">点</span>
          </p>
          <p v-if="store.roundScore === 3" class="mt-1 text-sm font-bold text-orange">
            ボーナス! 両方的中!
          </p>
        </div>

        <p class="mb-4 text-center text-sm text-muted">
          {{ store.currentConversationPrompt }}
        </p>

        <AppButton block @click="store.nextQuestion()">
          {{ store.questionIndex + 1 < store.totalQuestions ? 'つぎの問題へ' : '結果を見る' }}
        </AppButton>
      </TicketCard>
    </div>

    <!-- 最終結果 -->
    <div v-else-if="store.phase === 'final'" class="space-y-4">
      <TicketCard header="最終結果">
        <div class="mb-4 text-center">
          <StampMark :text="store.finalTitle.title" />
        </div>
        <p class="mb-4 text-center text-sm text-muted">
          {{ store.finalTitle.comment }}
        </p>
        <div class="mb-4 space-y-2">
          <div class="flex justify-between rounded-lg bg-orange/10 p-3">
            <span class="font-bold text-ink">プレイヤー1</span>
            <span class="font-bold text-orange">{{ store.scores[0] }} 点</span>
          </div>
          <div class="flex justify-between rounded-lg bg-green/10 p-3">
            <span class="font-bold text-ink">プレイヤー2</span>
            <span class="font-bold text-green">{{ store.scores[1] }} 点</span>
          </div>
        </div>
        <ScoreDisplay :score="store.totalScore" :max-score="18" label="合計スコア" />
        <div class="mt-5 space-y-2">
          <AppButton block @click="store.start()">もう1回あそぶ</AppButton>
          <AppButton variant="outline" block @click="navigateTo('/')">改札へもどる</AppButton>
        </div>
      </TicketCard>
    </div>
  </GameLayout>
</template>
