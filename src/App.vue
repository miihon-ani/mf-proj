<template>
  <div>
    <myheader></myheader>
    寿命：<input v-model="lifespan" type="text" />
    成長タイプ：
    <select v-model="grow_type">
      <option
        v-for="data in grow_type_box"
        :key="data.text"
        :value="data.value"
      >
        {{ data.text }}
      </option>
    </select>
    <p>
      成長適正：ライフ
      <select v-model="lif_apt">
        <option
          v-for="data in grow_aptitude"
          :key="data.text"
          :value="data.value"
        >
          {{ data.text }}
        </option>
      </select>
      ちから
      <select v-model="pow_apt">
        <option
          v-for="data in grow_aptitude"
          :key="data.text"
          :value="data.value"
        >
          {{ data.text }}
        </option>
      </select>
      かしこさ
      <select v-model="int_apt">
        <option
          v-for="data in grow_aptitude"
          :key="data.text"
          :value="data.value"
        >
          {{ data.text }}
        </option>
      </select>
      命中
      <select v-model="ski_apt">
        <option
          v-for="data in grow_aptitude"
          :key="data.text"
          :value="data.value"
        >
          {{ data.text }}
        </option>
      </select>
      回避
      <select v-model="spd_apt">
        <option
          v-for="data in grow_aptitude"
          :key="data.text"
          :value="data.value"
        >
          {{ data.text }}
        </option>
      </select>
      丈夫さ
      <select v-model="def_apt">
        <option
          v-for="data in grow_aptitude"
          :key="data.text"
          :value="data.value"
        >
          {{ data.text }}
        </option>
      </select>
    </p>
    <p v-if="lifespan.length > 0">
      <span>成長タイプ: {{ grow_stages[grow_type].type }}</span>
      <br />
      <span>黄金モモ：{{ culcPeach(true) }}</span>
      <br />
      <span>白銀モモ：{{ culcPeach(false) }}</span>
      <br />
      <span>※成長タイプの端数処理は未実装です(取り急ぎ丸めただけです)</span>
    </p>
    <table v-if="lifespan.length > 0">
      <thead>
        <tr>
          <td>成長段階</td>
          <td>寿命カウント値</td>
          <td>段階滞在週</td>
          <td>軽トレ上昇期待値</td>
          <td>重トレ上昇期待値</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in grow_stages[grow_type].value" :key="index">
          <td>{{ grow_stage_names[index] }}</td>
          <td>{{ culcStage(index) }}</td>
          <td v-if="index < 10">{{ culcStageWeek(index) }}</td>
          <td v-else></td>
          <td v-if="index < 10">{{ culcTrainLightAverageAll(index) }}</td>
          <td v-else></td>
          <td v-if="index < 10">{{ culcTrainHeavyAverageAll(index) }}</td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
    <p v-else>(寿命が入力されていません))</p>
  </div>
</template>

<script>
import myheader from './components/myheader';
import grow_type from '../assets/grow_type.json';
import grow_aptitude from '../assets/grow_aptitude.json';
// import training_light from '../assets/training_light.json';

export default {
  components: {
    myheader
  },
  data() {
    return {
      // 各種初期値定義
      lifespan: '300',
      grow_type: '2',
      lif_apt: '2',
      pow_apt: '2',
      int_apt: '2',
      ski_apt: '2',
      spd_apt: '2',
      def_apt: '2',
      // 成長タイプ。selectboxの中身。
      grow_type_box: grow_type,
      // 成長適性。selectboxの中身。
      grow_aptitude: grow_aptitude,
      // 成長パターン
      training_heavy_main: [
        { type: 'A', value: [9, 14, 18, 22, 23, 23] },
        { type: 'B', value: [8, 11, 15, 18, 22, 21] },
        { type: 'C', value: [6, 9, 12, 14, 17, 16] },
        { type: 'D', value: [5, 7, 9, 11, 14, 13] },
        { type: 'E', value: [4, 5, 7, 8, 10, 9] }
      ],
      training_heavy_sub: [
        { type: 'A', value: [4, 5, 7, 8, 10, 10] },
        { type: 'B', value: [3, 5, 6, 7, 9, 8] },
        { type: 'C', value: [3, 4, 5, 6, 7, 6] },
        { type: 'D', value: [2, 3, 4, 4, 5, 5] },
        { type: 'E', value: [2, 2, 3, 3, 4, 4] }
      ],
      trainning_light: [
        { type: 'A', value: [6, 9, 12, 14, 17, 16] },
        { type: 'B', value: [5, 7, 10, 11, 14, 13] },
        { type: 'C', value: [4, 6, 8, 9, 11, 10] },
        { type: 'D', value: [3, 5, 6, 7, 9, 8] },
        { type: 'E', value: [3, 4, 5, 5, 7, 6] }
      ],
      // 成長段階
      grow_stages: [
        { type: '早熟', value: [0, 5, 10, 20, 30, 35, 40, 55, 70, 80, 100] },
        { type: '持続', value: [0, 5, 10, 20, 30, 40, 45, 60, 75, 85, 100] },
        { type: '普通', value: [0, 10, 20, 35, 50, 60, 65, 75, 80, 85, 100] },
        { type: '晩成', value: [0, 15, 30, 45, 60, 70, 80, 85, 90, 95, 100] }
      ],
      // 成長段階の名前
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
        '第8段階',
        '（寿命）'
      ]
    };
  },
  methods: {
    // 延命アイテム計算
    culcPeach(isGold) {
      let extend = 25; // 白銀モモ
      if (isGold) extend = 50; // 黄金モモ

      const peak1 = this.culcStageWeek(4); // ピーク
      const peak2 = this.culcStageWeek(5); // 準ピーク

      if (peak1 > extend) return [extend, 0, 0];
      extend -= peak1;
      if (peak2 > extend) return [peak1, extend, 0];
      extend -= peak2;
      return [peak1, peak2, extend];
    },
    // 段階に滞在する週
    culcStageWeek(stage) {
      if (stage > 9) return 'えらー';
      if (stage < 0) return 'えらー';
      return this.culcStage(stage + 1) - this.culcStage(stage);
    },
    // 段階に達する寿命カウント値
    culcStage(stage) {
      if (stage > 10) return 'えらー';
      if (stage < 0) return 'えらー';
      return Math.floor(
        this.grow_stages[this.grow_type].value[stage] * (this.lifespan / 100)
      );
    },
    // 重トレ用（コンビネーションセット）
    culcTrainHeavyCombi(stage, aptitude_main, aptitude_sub) {
      if (stage > 9) return 'えらー';
      if (stage < 0) return 'えらー';
      if (stage >= 6) stage = 9 - stage;

      const heavyMain = function (val) {
        return Math.min(Math.max(val, 3), 20);
      };
      const heavySub = function (val) {
        return Math.max(val, 2);
      };

      // パターン1
      const combi1 = [
        heavyMain(this.training_heavy_main[aptitude_main].value[stage]),
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage] - 3),
        -3
      ];
      // パターン2：
      const combi2 = [
        heavyMain(this.training_heavy_main[aptitude_main].value[stage] - 1),
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage]),
        -2
      ];
      // パターン3：
      const combi3 = [
        heavyMain(this.training_heavy_main[aptitude_main].value[stage] - 2),
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage] - 1),
        -3
      ];
      // パターン4：
      const combi4 = [
        heavyMain(this.training_heavy_main[aptitude_main].value[stage] - 3),
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage] - 2),
        -2
      ];

      return [combi1, combi2, combi3, combi4];
    },
    // 重トレ用
    culcTrainHeavy(stage, aptitude_main, aptitude_sub) {
      if (stage > 9) return 'えらー';
      if (stage < 0) return 'えらー';
      if (stage >= 6) stage = 9 - stage;

      const heavyMain = function (val) {
        return Math.min(Math.max(val, 3), 20);
      };
      const heavySub = function (val) {
        return Math.max(val, 2);
      };

      // メイン
      const main = [
        heavyMain(this.training_heavy_main[aptitude_main].value[stage]),
        heavyMain(this.training_heavy_main[aptitude_main].value[stage] - 1),
        heavyMain(this.training_heavy_main[aptitude_main].value[stage] - 2),
        heavyMain(this.training_heavy_main[aptitude_main].value[stage] - 3)
      ];
      // パターン2：
      const sub = [
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage] - 3),
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage]),
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage] - 1),
        heavySub(this.training_heavy_sub[aptitude_sub].value[stage] - 2)
      ];
      // パターン3：
      const minus = [-3, -2, -3, -2];

      return [main, sub, minus];
    },
    // 重トレ平均値（全部）
    culcTrainHeavyAverageAll(stage) {
      return [
        this.culcTrainHeavyAverage(stage, this.pow_apt, this.lif_apt), // 重り引き
        this.culcTrainHeavyAverage(stage, this.spd_apt, this.int_apt), // 移動ゆか
        this.culcTrainHeavyAverage(stage, this.int_apt, this.ski_apt), // めいそう
        this.culcTrainHeavyAverage(stage, this.def_apt, this.lif_apt) // プール
      ];
    },
    // 重トレ平均値（単体）
    culcTrainHeavyAverage(stage, aptitude_main, aptitude_sub) {
      const values = this.culcTrainHeavy(stage, aptitude_main, aptitude_sub);
      return [
        this.culcArrayAverage(values[0]),
        this.culcArrayAverage(values[1]),
        this.culcArrayAverage(values[2])
      ];
    },
    // 軽トレ用
    culcTrainLight(stage, aptitude) {
      if (stage > 9) return 'えらー';
      if (stage < 0) return 'えらー';
      if (stage >= 6) stage = 9 - stage;

      const light = function (val) {
        return Math.min(Math.max(val, 1), 15);
      };

      const value1 = light(this.trainning_light[aptitude].value[stage]);
      const value2 = light(this.trainning_light[aptitude].value[stage] - 1);
      const value3 = light(this.trainning_light[aptitude].value[stage] - 2);
      const value4 = light(this.trainning_light[aptitude].value[stage] - 3);

      return [value1, value2, value3, value4];
    },
    // 軽トレ平均値
    culcTrainLightAverageAll(stage) {
      return [
        this.culcArrayAverage(this.culcTrainLight(stage, this.lif_apt)),
        this.culcArrayAverage(this.culcTrainLight(stage, this.pow_apt)),
        this.culcArrayAverage(this.culcTrainLight(stage, this.int_apt)),
        this.culcArrayAverage(this.culcTrainLight(stage, this.ski_apt)),
        this.culcArrayAverage(this.culcTrainLight(stage, this.spd_apt)),
        this.culcArrayAverage(this.culcTrainLight(stage, this.def_apt))
      ];
    },
    // 配列の平均値を返す
    culcArrayAverage(array) {
      const sum = function (arr) {
        let sum = 0;
        arr.forEach(function (elm) {
          sum += elm;
        });
        return sum;
      };
      const average = function (arr) {
        return sum(arr) / arr.length;
      };
      return average(array);
    }
  }
};
</script>
