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
          <td>
            ドミノ倒し
            <input id="domino" v-model="skilled.domino" type="checkbox" />
            <label for="domino">得意</label>
          </td>
          <td>
            しゃてき
            <input id="shoot" v-model="skilled.shoot" type="checkbox" />
            <label for="shoot">得意</label>
          </td>
        </tr>
        <tr>
          <td>{{ trainingDomino(stair) }}</td>
          <td>{{ trainingShoot(stair) }}</td>
        </tr>
        <tr>
          <td>
            猛勉強
            <input v-model="skilled.study" type="checkbox" />
            <label for="study">得意</label>
          </td>
          <td>
            巨石よけ
            <input id="dodge" v-model="skilled.dodge" type="checkbox" />
            <label for="dodge">得意</label>
          </td>
        </tr>
        <tr>
          <td>{{ trainingStudy(stair) }}</td>
          <td>{{ trainingDodge(stair) }}</td>
        </tr>
        <tr>
          <td>
            走り込み
            <input id="run" v-model="skilled.run" type="checkbox" />
            <label for="run">得意</label>
          </td>
          <td>
            丸太うけ
            <input id="endure" v-model="skilled.endure" type="checkbox" />
            <label for="endure">得意</label>
          </td>
        </tr>
        <tr>
          <td>{{ trainingRun(stair) }}</td>
          <td>{{ trainingEndure(stair) }}</td>
        </tr>
        <tr>
          <td>
            重り引き
            <input id="pull" v-model="skilled.pull" type="checkbox" />
            <label for="pull">得意</label>
          </td>
          <td>
            変動ゆか
            <input id="leap" v-model="skilled.leap" type="checkbox" />
            <label for="leap">得意</label>
          </td>
        </tr>
        <tr>
          <td>{{ trainingPull(stair) }}</td>
          <td>{{ trainingLeap(stair) }}</td>
        </tr>
        <tr>
          <td>
            めいそう
            <input id="meditate" v-model="skilled.meditate" type="checkbox" />
            <label for="meditate">得意</label>
          </td>
          <td>
            プール
            <input id="swim" v-model="skilled.swim" type="checkbox" />
            <label for="swim">得意</label>
          </td>
        </tr>
        <tr>
          <td>{{ trainingMeditate(stair) }}</td>
          <td>{{ trainingSwim(stair) }}</td>
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
  props: {
    main: {
      type: Object,
      required: false,
      default: new Object()
    }
  },
  data() {
    return {
      // 初期設定
      stair: 4,
      trainingData: trainingData,
      skilled: {},
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
        (this.grow_stages[this.main.grow_type].value[stage] *
          this.main.lifespan) /
          100
      );
    },
    // 重り引き
    trainingPull(stage) {
      return this.culcTrainHeavy(
        stage,
        this.main.aptitude.pow,
        this.main.aptitude.lif,
        this.skilled.pull
      );
    },
    // 変動ゆか
    trainingLeap(stage) {
      return this.culcTrainHeavy(
        stage,
        this.main.aptitude.spd,
        this.main.aptitude.int,
        this.skilled.leap
      );
    },
    // めいそう
    trainingMeditate(stage) {
      return this.culcTrainHeavy(
        stage,
        this.main.aptitude.int,
        this.main.aptitude.ski,
        this.skilled.meditate
      );
    },
    // プール
    trainingSwim(stage) {
      return this.culcTrainHeavy(
        stage,
        this.main.aptitude.def,
        this.main.aptitude.lif,
        this.skilled.swim
      );
    },
    // 重トレ用
    culcTrainHeavy(stage, aptitude_main, aptitude_sub, skilled) {
      if (stage > 9) return 'えらー';
      if (stage < 0) return 'えらー';
      if (stage >= 6) stage = 9 - stage;

      const heavyMain = function (val) {
        return Math.min(Math.max(val, 3), 20);
      };
      const training_heavy_main = Object.values(
        trainingData.training_heavy_main
      );
      let main_maxup = training_heavy_main[aptitude_main][stage];

      const heavySub = function (val) {
        return Math.max(val, 2);
      };
      const training_heavy_sub = Object.values(trainingData.training_heavy_sub);
      let sub_maxup = training_heavy_sub[aptitude_sub][stage];

      if (skilled) {
        main_maxup += 1;
        sub_maxup += 1;
      }

      const combi1 = [heavyMain(main_maxup), heavySub(sub_maxup - 3), -3];
      const combi2 = [heavyMain(main_maxup - 1), heavySub(sub_maxup), -2];
      const combi3 = [heavyMain(main_maxup - 2), heavySub(sub_maxup - 1), -3];
      const combi4 = [heavyMain(main_maxup - 3), heavySub(sub_maxup - 2), -2];

      let return_array = [combi1, combi2, combi3, combi4];
      return return_array;
    },
    // ドミノ倒し
    trainingDomino(stage) {
      return this.culcTrainLight(
        stage,
        this.main.aptitude.pow,
        this.skilled.domino
      );
    },
    // しゃてき
    trainingShoot(stage) {
      return this.culcTrainLight(
        stage,
        this.main.aptitude.ski,
        this.skilled.shoot
      );
    },
    // 猛勉強
    trainingStudy(stage) {
      return this.culcTrainLight(
        stage,
        this.main.aptitude.int,
        this.skilled.study
      );
    },
    // 巨石よけ
    trainingDodge(stage) {
      return this.culcTrainLight(
        stage,
        this.main.aptitude.spd,
        this.skilled.dodge
      );
    },
    // 走り込み
    trainingRun(stage) {
      return this.culcTrainLight(
        stage,
        this.main.aptitude.lif,
        this.skilled.run
      );
    },
    // 丸太うけ
    trainingEndure(stage) {
      return this.culcTrainLight(
        stage,
        this.main.aptitude.def,
        this.skilled.endure
      );
    },
    // 軽トレ用
    culcTrainLight(stage, aptitude, skilled) {
      if (stage > 9) return 'えらー';
      if (stage < 0) return 'えらー';
      if (stage >= 6) stage = 9 - stage;

      const light = function (val) {
        return Math.min(Math.max(val, 1), 15);
      };
      const trainning_light = Object.values(trainingData.trainning_light);
      let maxup = trainning_light[aptitude][stage];
      if (skilled) maxup += 1;

      const value1 = light(maxup);
      const value2 = light(maxup - 1);
      const value3 = light(maxup - 2);
      const value4 = light(maxup - 3);

      let return_array = [value1, value2, value3, value4];
      return return_array;
    },
    // プリセット反映用（親から呼ばれる）
    setSkilled(strSkilled) {
      let skilledList = {};

      // 実際は文字長0でも空白文字列キーの謎プロパティができるだけなのだが一応処理
      if (strSkilled.length !== 0) {
        for (const name of strSkilled.split(',')) {
          skilledList[name] = 1;
        }
      }
      this.skilled = skilledList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
