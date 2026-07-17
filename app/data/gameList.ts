import type { GameInfo } from '~/types/game';

export const gameList: readonly GameInfo[] = [
  {
    id: 'best-worst',
    title: 'ベスト&ワースト予想',
    subtitle: '相手の1位と最下位を当てよう',
    description: 'お題の選択肢から、相手がこっそり選んだ「1位」と「最下位」を予想するゲーム',
    genre: '推理',
    path: '/best-worst',
  },
  {
    id: 'pittari',
    title: 'ピッタリ度メーター',
    subtitle: 'たとえで数字を伝えよう',
    description: '秘密の数字を「たとえ」で伝えて、相手にピッタリ当ててもらう協力ゲーム',
    genre: '協力',
    path: '/pittari',
  },
  {
    id: 'shiritori',
    title: 'トンネルしりとり',
    subtitle: '見えないしりとりで記憶バトル',
    description: '相手に見えるのは「次の頭文字」だけ。使った言葉が見えないしりとり',
    genre: '心理戦',
    path: '/shiritori',
  },
];
