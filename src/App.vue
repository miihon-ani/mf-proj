<template>
  <div>
    <myheader></myheader>
    <hr />
    <p>
      種族：
      <select v-model="selector_kind" @change="setSelectorName()">
        <option
          v-for="(data, index) in monster_kinds"
          :key="index"
          :value="index"
        >
          {{ data }}
        </option>
      </select>
      モンスター名：
      <select v-model="selector_monster" @change="setPresetName()">
        <option v-for="data in selector_name.name" :key="data">
          {{ data }}
        </option>
      </select>
    </p>
    <p>
      プリセット呼び出し：
      <select v-model="main.preset_monster" @change="setPresetMessage()">
        <option
          v-for="monster in monster_presets"
          :key="monster.name"
          :value="monster.name"
        >
          No.{{ monster.no }}:{{ monster.name }}
        </option>
      </select>
      <button @click="setMonster()">反映する</button>
      <span>{{ preset_message }}</span>
    </p>
    <p>
      寿命：<input v-model="main.lifespan" type="number" />
      成長タイプ：
      <select v-model="main.grow_type">
        <option v-for="(data, index) in type" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
    </p>
    <p>
      成長適正：ライフ
      <select v-model="main.aptitude.lif">
        <option v-for="(data, index) in pattern" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      ちから
      <select v-model="main.aptitude.pow">
        <option v-for="(data, index) in pattern" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      かしこさ
      <select v-model="main.aptitude.int">
        <option v-for="(data, index) in pattern" :key="data" :value="index">
          {{ data }}
        </option>
      </select>
      命中
      <select v-model="main.aptitude.ski">
        <option v-for="(data, index) in pattern" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      回避
      <select v-model="main.aptitude.spd">
        <option v-for="(data, index) in pattern" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      丈夫さ
      <select v-model="main.aptitude.def">
        <option v-for="(data, index) in pattern" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
    </p>
    <training ref="training" :main="main"></training>
  </div>
</template>

<script>
import myheader from './components/myheader';
import training from './components/training';
import monster_names from '../assets/monster_kind.json';
import monster_datas from '../assets/monster_data.json';

export default {
  components: {
    myheader,
    training
  },
  data() {
    return {
      // 各種初期値
      selector_kind: 0,
      selector_name: {},
      selector_monster: 'ピクシー',
      monster_presets: {},
      preset_message: '',
      // (子に引き渡す用)
      main: {
        lifespan: '300',
        preset_monster: 'ピクシー',
        grow_type: 2,
        stair: 0,
        aptitude: {
          lif: 2,
          pow: 2,
          int: 2,
          ski: 2,
          spd: 2,
          def: 2
        }
      },
      // 成長適性
      pattern: ['A', 'B', 'C', 'D', 'E'],
      // 成長タイプ
      type: ['早熟', '持続', '普通', '晩成'],
      // 種族名
      monster_kinds: [
        'ピクシー',
        'ドラゴン',
        'ケンタウロス',
        'コロペンドラ',
        'ビークロン',
        'ヘンガー',
        'ラッキー',
        'ゴーレム',
        'ロードランナー',
        'デュラハン',
        'アローヘッド',
        'ライガー',
        'ホッパー',
        'ハム',
        'バクー',
        'ガリ',
        'アーケロ',
        'グジラ',
        'バジャール',
        'ニャー',
        'ヒノトリ',
        'ゴースト',
        'メタルナー',
        'スエゾー',
        'ジール',
        'モッチー',
        'ジョーカー',
        'ネンドロ',
        'ゲル',
        'ウンディーネ',
        'ナイトン',
        'モック',
        'ダックン',
        'プラント',
        'モノリス',
        'ラウー',
        'ワーム',
        'ナーガ',
        '（ノラモン）'
      ],
      monster_names: monster_names,
      monster_datas: monster_datas
    };
  },
  mounted: function () {
    this.setSelectorName();
  },
  methods: {
    setSelectorName() {
      this.selector_name = this.monster_names[this.selector_kind];
      this.selector_monster = this.selector_name.name[0];
      this.setPresetName();
    },
    setPresetMessage() {
      this.preset_message = '';
      const monsterName = this.main.preset_monster;
      const message = this.monster_datas.filter(function (item) {
        if (item.name === monsterName) return true;
      })[0].memo; // １つしか引っかからないはず
      if (message.length !== 0) this.preset_message = '※ ' + message;
    },
    setPresetName() {
      const monsterName = this.selector_monster;
      const monsterData = this.monster_datas.filter(function (item) {
        if (item.name.indexOf(monsterName) === 0) return true;
      });
      this.monster_presets = monsterData;
      this.main.preset_monster = monsterName;
      this.setPresetMessage();
    },
    setMonster() {
      const monsterName = this.main.preset_monster;
      const monsterData = this.monster_datas.filter(function (item) {
        if (item.name === monsterName) return true;
      })[0];
      this.main.lifespan = monsterData.lifespan;
      this.main.grow_type = this.type.indexOf(monsterData.grow_type);
      this.main.lifespan = monsterData.lifespan;
      this.main.aptitude.lif = this.pattern.indexOf(monsterData.lif_apt);
      this.main.aptitude.pow = this.pattern.indexOf(monsterData.pow_apt);
      this.main.aptitude.int = this.pattern.indexOf(monsterData.int_apt);
      this.main.aptitude.ski = this.pattern.indexOf(monsterData.ski_apt);
      this.main.aptitude.spd = this.pattern.indexOf(monsterData.spd_apt);
      this.main.aptitude.def = this.pattern.indexOf(monsterData.def_apt);
      this.$refs.training.setSkilled(monsterData.skilled);
    }
  }
};
</script>
