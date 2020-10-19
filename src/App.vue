<template>
  <div>
    <myheader></myheader>
    寿命：<input v-model="life" type="text" />
    <button @click="clear()">clear</button>
    成長タイプ：
    <select v-model="selected">
      <option v-for="data in options" :key="data.text" :value="data.value">
        {{ data.text }}
      </option>
    </select>
    <p style="display: none">
      成長適正：すべてＣ（未実装）、能力値：すべて１２０（未実装）
    </p>
    <div v-if="life.length > 0">
      <span>寿命：{{ life }}</span
      ><br />
      <span>成長タイプ: {{ grow_stages[selected].type }}</span>
      <table>
        <tbody>
          <tr
            v-for="(value, index) in grow_stages[selected].value"
            :key="index"
          >
            <td>{{ grow_stage_names[index] }}</td>
            <td>{{ Math.floor((life * value) / 100) }}</td>
          </tr>
        </tbody>
      </table>
      <span>黄金モモ：{{ culcpeach(true) }}</span
      ><br />
      <span>白銀モモ：{{ culcpeach(false) }}</span
      ><br />
      <span>※成長タイプの端数処理は未実装です(取り急ぎ丸めただけです)</span>
    </div>
    <div v-else>(寿命が入力されていません))</div>
  </div>
</template>

<script>
import myheader from './components/myheader';

export default {
  components: {
    myheader
  },
  data() {
    return {
      life: '300',
      selected: '2',
      // selectboxの中身。ローカルストレージにjsonで入れたい気がしている。
      options: [
        { text: '早熟', value: '0' },
        { text: '持続', value: '1' },
        { text: '普通', value: '2' },
        { text: '晩成', value: '3' }
      ],
      // 成長段階。ローカル（略
      grow_stages: [
        { type: '早熟', value: [0, 5, 10, 20, 30, 35, 40, 55, 70, 80] },
        { type: '持続', value: [0, 5, 10, 20, 30, 40, 45, 60, 75, 85] },
        { type: '普通', value: [0, 10, 20, 35, 50, 60, 65, 75, 80, 85] },
        { type: '晩成', value: [0, 15, 30, 45, 60, 70, 80, 85, 90, 95] }
      ],
      // 成長段階の名前。ローカル（略
      grow_stage_names: [
        '第1段階',
        '第2段階',
        '第3段階',
        '第4段階',
        'ピーク',
        '準ピーク',
        '第5段階',
        '第6段階',
        '第7段階',
        '第8段階'
      ]
    };
  },
  methods: {
    clear() {
      this.life = '';
    },
    // 延命アイテム計算用。どうせ黄金モモか白銀モモしかないので手抜き
    culcpeach(isGold) {
      let life = 25;
      let return_msg = '';

      if (isGold) {
        life = 50;
      }

      let peak1 =
        (this.grow_stages[this.selected].value[5] * this.life) / 100 -
        (this.grow_stages[this.selected].value[4] * this.life) / 100;

      if (peak1 > life) {
        return 'ピーク：' + life;
      } else {
        return_msg = 'ピーク：' + peak1;
      }

      life -= peak1;

      let peak2 =
        (this.grow_stages[this.selected].value[6] * this.life) / 100 -
        (this.grow_stages[this.selected].value[5] * this.life) / 100;

      if (peak2 > life) {
        return '、準ピーク：' + life;
      } else {
        return_msg += '、準ピーク：' + peak2;
      }

      life -= peak2;

      return_msg += '、第4段階：' + life;

      return return_msg;
    }
  }
};
</script>
