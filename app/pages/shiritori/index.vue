<script setup lang="ts">
import type { ShiritoriDifficulty } from '~/types/game';

const store = useShiritoriStore();
const router = useRouter();

const difficulties: {
  key: ShiritoriDifficulty;
  label: string;
  description: string;
}[] = [
  { key: 'local', label: '🚃 各駅停車', description: '文字数制限なし(2文字以上)' },
  { key: 'express', label: '🚄 急行', description: '3文字ちょうどの言葉のみ' },
  { key: 'limited', label: '🚅 特急', description: '4文字ちょうどの言葉のみ' },
  { key: 'shinkansen', label: '🚄 新幹線', description: '5文字ちょうどの言葉のみ' },
];

function selectDifficulty(diff: ShiritoriDifficulty) {
  store.startGame(diff);
  router.push('/shiritori/play');
}
</script>

<template>
  <GameLayout title="トンネルしりとり">
    <div class="space-y-4">
      <TicketCard header="あそびかた">
        <div class="space-y-3 text-sm text-ink">
          <p>相手に見えるのは「次の頭文字」だけ! 使った言葉が見えないしりとりだよ。</p>
          <p>すでに出た言葉を言っちゃったら負け。「ん」で終わっても負け。</p>
          <div class="rounded-lg bg-paper-edge/50 p-3 text-xs">
            <p class="font-bold">ルール</p>
            <p>・ひらがな・カタカナで入力</p>
            <p>・「ゃ・ゅ・ょ・っ・ー」も1文字として数えるよ</p>
            <p>・実在する言葉かどうかは2人の話し合いで決めてね</p>
            <p>・にごり(が⇔か)、半にごり(ぱ⇔は)は両方OK</p>
          </div>
        </div>
      </TicketCard>

      <TicketCard header="難易度をえらんでね">
        <div class="space-y-3">
          <button
            v-for="diff in difficulties"
            :key="diff.key"
            class="w-full rounded-lg border-2 border-paper-edge bg-white p-4 text-left transition-all active:scale-[0.98] hover:border-orange/50"
            @click="selectDifficulty(diff.key)"
          >
            <p class="text-lg font-bold text-ink">{{ diff.label }}</p>
            <p class="text-sm text-muted">{{ diff.description }}</p>
          </button>
        </div>
      </TicketCard>
    </div>
  </GameLayout>
</template>
