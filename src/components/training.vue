<template>
  <div class="training">
    <table v-if="main.lifespan.length > 0">
      <thead>
        <tr>
          <td>成長段階</td>
          <td>寿命カウント値</td>
          <td>段階滞在週</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in grow_stage_names" :key="index">
          <td @click="changeStair(index)">{{ data }}</td>
          <td>{{ culcStage(index) }}</td>
          <td>{{ culcStageWeek(index) }}</td>
        </tr>
      </tbody>
    </table>
    <table v-if="main.lifespan.length > 0">
      <thead>
        <tr>
          <td>トレーニング</td>
          <td colspan="3">
            <select v-model="stair">
              <option
                v-for="(item, index) in grow_stage_names"
                :key="index"
                :value="index"
              >
                {{ item }}
              </option>
            </select>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ドミノ倒し</td>
          <td>しゃてき</td>
        </tr>
        <tr>
          <td>{{ culcTrainLight(stair, main.aptitude.pow) }}</td>
          <td>{{ culcTrainLight(stair, main.aptitude.ski) }}</td>
        </tr>
        <tr>
          <td>猛勉強</td>
          <td>巨石よけ</td>
        </tr>
        <tr>
          <td>{{ culcTrainLight(stair, main.aptitude.int) }}</td>
          <td>{{ culcTrainLight(stair, main.aptitude.spd) }}</td>
        </tr>
        <tr>
          <td>走り込み</td>
          <td>丸太受け</td>
        </tr>
        <tr>
          <td>{{ culcTrainLight(stair, main.aptitude.lif) }}</td>
          <td>{{ culcTrainLight(stair, main.aptitude.def) }}</td>
        </tr>
        <tr>
          <td>重り引き</td>
          <td>変動ゆか</td>
        </tr>
        <tr>
          <td>
            {{
              culcTrainHeavyCombi(stair, main.aptitude.pow, main.aptitude.lif)
            }}
          </td>
          <td>
            {{
              culcTrainHeavyCombi(stair, main.aptitude.spd, main.aptitude.int)
            }}
          </td>
        </tr>
        <tr>
          <td>めいそう</td>
          <td>プール</td>
        </tr>
        <tr>
          <td>
            {{
              culcTrainHeavyCombi(stair, main.aptitude.int, main.aptitude.ski)
            }}
          </td>
          <td>
            {{
              culcTrainHeavyCombi(stair, main.aptitude.def, main.aptitude.lif)
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>(寿命が入力されていません))</p>
  </div>
</template>

<script>
import trainingData from '../../assets/training.json';

export default {
  name: 'Training',
  props: ['main'],
  data() {
    return {
      // 初期設定
      stair: 0,
      trainingData: trainingData,
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
        '第8段階'
      ]
    };
  },
  methods: {
    // 段階変更
    changeStair(stage) {
      if (stage > 10) return 'えらー';
      if (stage < 0) return 'えらー';
      this.stair = stage;
      return true;
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
        (this.grow_stages[this.main.grow_type].value[stage] / 100) *
          this.main.lifespan
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
      const training_heavy_main = Object.values(
        trainingData.training_heavy_main
      );
      const main_maxup = training_heavy_main[aptitude_main][stage];

      const heavySub = function (val) {
        return Math.max(val, 2);
      };
      const training_heavy_sub = Object.values(trainingData.training_heavy_sub);
      const sub_maxup = training_heavy_sub[aptitude_sub][stage];

      // パターン1：
      const combi1 = [heavyMain(main_maxup - 1), heavySub(sub_maxup), -2];
      // パターン2
      const combi2 = [heavyMain(main_maxup), heavySub(sub_maxup - 3), -3];
      // パターン3：
      const combi3 = [heavyMain(main_maxup - 2), heavySub(sub_maxup - 1), -3];
      // パターン4：
      const combi4 = [heavyMain(main_maxup - 3), heavySub(sub_maxup - 2), -2];

      let ret_array = [combi2, combi1, combi3, combi4];
      return ret_array;
    },
    // 軽トレ用
    culcTrainLight(stage, aptitude) {
      if (stage > 9) return 'えらー';
      if (stage < 0) return 'えらー';
      if (stage >= 6) stage = 9 - stage;

      const light = function (val) {
        return Math.min(Math.max(val, 1), 15);
      };
      const trainning_light = Object.values(trainingData.trainning_light);
      const maxup = trainning_light[aptitude][stage];

      const value1 = light(maxup);
      const value2 = light(maxup - 1);
      const value3 = light(maxup - 2);
      const value4 = light(maxup - 3);

      let ret_array = [value1, value2, value3, value4];
      return ret_array;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
