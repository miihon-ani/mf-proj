<template>
  <div>
    <myheader></myheader>
    <p>
      プリセット呼び出し：
      <select v-model="main.monster_id">
        <option
          v-for="monster in monster_preset"
          :key="monster.no"
          :value="monster.no"
        >
          No.{{ monster.no }}:{{ monster.name }}
        </option>
      </select>
      <button @click="setMonster()">反映する</button>
      <span>※データ未作成</span>
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
    <training :main="main" ref="training"></training>
  </div>
</template>

<script>
import myheader from './components/myheader';
import training from './components/training';

export default {
  components: {
    myheader,
    training
  },
  data() {
    return {
      // 各種初期値(子に引き渡す用)
      main: {
        lifespan: '300',
        monster_id: 409,
        grow_type: 2,
        selection: 0,
        stair: 0,
        aptitude: {
          lif: 2,
          pow: 2,
          int: 2,
          ski: 2,
          spd: 2,
          def: 2
        },
        skilled: {}
      },
      // データ形式考えるための仮実装。実際にどう載せてどう使うかは今後考える
      monster_preset: [
        {
          name: 'シロゾー',
          no: 408,
          lifespan: '350',
          grow_type: 3,
          aptitude: {
            lif: 2,
            pow: 2,
            int: 0,
            ski: 0,
            spd: 2,
            def: 2
          },
          skilled: {
            swim: 1
          }
        },
        {
          name: 'シロモッチー',
          no: 409,
          lifespan: '340',
          grow_type: 3,
          aptitude: {
            lif: 2,
            pow: 2,
            int: 2,
            ski: 1,
            spd: 1,
            def: 1
          },
          skilled: {
            pull: 1
          }
        }
      ],
      // 成長適性
      pattern: ['A', 'B', 'C', 'D', 'E'],
      // 成長タイプ
      type: ['早熟', '持続', '普通', '晩成']
    };
  },
  methods: {
    setMonster() {
      const monsterId = this.main.monster_id;
      const monsterData = this.monster_preset.filter(function (item, index) {
        if (item.no === monsterId) return true;
      })[0];
      this.main.lifespan = monsterData.lifespan;
      this.main.grow_type = monsterData.grow_type;
      this.main.lifespan = monsterData.lifespan;
      this.main.aptitude = monsterData.aptitude;
      this.$refs.training.setSkilled(monsterData.skilled);
    }
  }
};
</script>
