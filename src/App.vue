<template>
  <div>
    <myheader></myheader>
    寿命：<input v-model="main.lifespan" type="number" />
    成長タイプ：
    <select v-model="main.grow_type">
      <option v-for="(data, index) in type" :key="index" :value="index">
        {{ data }}
      </option>
    </select>
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
    <training :main="main"></training>
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
        }
      },
      // 成長適性
      pattern: ['A', 'B', 'C', 'D', 'E'],
      // 成長タイプ
      type: ['早熟', '持続', '普通', '晩成']
    };
  },
  methods: {}
};
</script>
