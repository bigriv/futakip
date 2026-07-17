<script setup lang="ts">
const store = useBestWorstStore();

onMounted(() => {
  store.reset();
});
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

    <!-- こたえる人: 1位を選ぶ -->
    <div v-else-if="store.phase === 'answer-best'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 / ${store.totalQuestions}`">
        <p class="mb-1 text-xs text-muted">
          プレイヤー{{ store.answerer }}さんだけ見てね
        </p>
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>
        <p class="mb-3 text-sm font-bold text-orange">👑 1位をえらんでね</p>
        <div class="space-y-2">
          <OptionButton
            v-for="(opt, i) in store.currentQuestion.options"
            :key="i"
            :label="opt"
            :selected="store.answerBest === i"
            @select="store.selectBest(i)"
          />
        </div>
      </TicketCard>
    </div>

    <!-- こたえる人: 最下位を選ぶ -->
    <div v-else-if="store.phase === 'answer-worst'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 / ${store.totalQuestions}`">
        <p class="mb-1 text-xs text-muted">
          プレイヤー{{ store.answerer }}さんだけ見てね
        </p>
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>
        <p class="mb-3 text-sm font-bold text-stamp">💀 最下位をえらんでね</p>
        <div class="space-y-2">
          <OptionButton
            v-for="(opt, i) in store.currentQuestion.options"
            :key="i"
            :label="opt"
            :selected="store.answerWorst === i"
            :disabled="store.answerBest === i"
            @select="store.selectWorst(i)"
          />
        </div>
      </TicketCard>
    </div>

    <!-- 交代スクリーン -->
    <PassScreen
      v-else-if="store.phase === 'pass'"
      :player-label="`プレイヤー${store.answerer === 1 ? 2 : 1}`"
      @next="store.afterPass()"
    />

    <!-- あてる人: 1位を予想 -->
    <div v-else-if="store.phase === 'guess-best'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 / ${store.totalQuestions}`">
        <p class="mb-1 text-xs text-muted">
          プレイヤー{{ store.answerer === 1 ? 2 : 1 }}さんが予想してね
        </p>
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>
        <p class="mb-3 text-sm font-bold text-orange">👑 1位はどれだと思う?</p>
        <div class="space-y-2">
          <OptionButton
            v-for="(opt, i) in store.currentQuestion.options"
            :key="i"
            :label="opt"
            :selected="store.guessBest === i"
            @select="store.guessBestOption(i)"
          />
        </div>
      </TicketCard>
    </div>

    <!-- あてる人: 最下位を予想 -->
    <div v-else-if="store.phase === 'guess-worst'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 / ${store.totalQuestions}`">
        <p class="mb-1 text-xs text-muted">
          プレイヤー{{ store.answerer === 1 ? 2 : 1 }}さんが予想してね
        </p>
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>
        <p class="mb-3 text-sm font-bold text-stamp">💀 最下位はどれだと思う?</p>
        <div class="space-y-2">
          <OptionButton
            v-for="(opt, i) in store.currentQuestion.options"
            :key="i"
            :label="opt"
            :selected="store.guessWorst === i"
            :disabled="store.guessBest === i"
            @select="store.guessWorstOption(i)"
          />
        </div>
      </TicketCard>
    </div>

    <!-- 結果表示 -->
    <div v-else-if="store.phase === 'result'" class="space-y-4">
      <TicketCard :header="`第${store.questionIndex + 1}問 結果`">
        <p class="mb-4 text-lg font-bold text-ink">{{ store.currentQuestion.theme }}</p>

        <div class="mb-4 space-y-2">
          <div class="rounded-lg bg-orange/10 p-3">
            <p class="mb-1 text-xs font-bold text-orange">👑 1位</p>
            <p class="font-bold text-ink">
              {{ store.currentQuestion.options[store.answerBest] }}
            </p>
            <p
              :class="[
                'mt-1 text-xs font-bold',
                store.bestCorrect ? 'text-green' : 'text-stamp',
              ]"
            >
              {{ store.bestCorrect ? '✓ 的中!' : '✗ はずれ' }}
            </p>
          </div>
          <div class="rounded-lg bg-stamp/10 p-3">
            <p class="mb-1 text-xs font-bold text-stamp">💀 最下位</p>
            <p class="font-bold text-ink">
              {{ store.currentQuestion.options[store.answerWorst] }}
            </p>
            <p
              :class="[
                'mt-1 text-xs font-bold',
                store.worstCorrect ? 'text-green' : 'text-stamp',
              ]"
            >
              {{ store.worstCorrect ? '✓ 的中!' : '✗ はずれ' }}
            </p>
          </div>
        </div>

        <div class="mb-4 flex items-center justify-center">
          <StampMark
            v-if="store.roundScore > 0"
            :text="store.roundScore === 3 ? '完全\n的中!' : '的中'"
          />
          <p v-else class="text-lg text-muted">おしい…!</p>
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
            <span class="font-bold text-orange">{{ store.scores[0] }}点</span>
          </div>
          <div class="flex justify-between rounded-lg bg-green/10 p-3">
            <span class="font-bold text-ink">プレイヤー2</span>
            <span class="font-bold text-green">{{ store.scores[1] }}点</span>
          </div>
        </div>
        <ScoreDisplay :score="store.totalScore" :max-score="18" label="合計スコア" />
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
