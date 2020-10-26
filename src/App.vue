<template>
  <div>
    <myheader></myheader>
    寿命：<input v-model="main.lifespan" type="number" />
    成長タイプ：
    <select v-model="main.grow_type">
      <option v-for="(data, index) in grow_stages" :key="index" :value="index">
        {{ data }}
      </option>
    </select>
    <p>
      成長適正：ライフ
      <select v-model="main.lif_apt">
        <option v-for="(data, index) in apititude" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      ちから
      <select v-model="main.pow_apt">
        <option v-for="(data, index) in apititude" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      かしこさ
      <select v-model="main.int_apt">
        <option v-for="(data, index) in apititude" :key="data" :value="index">
          {{ data }}
        </option>
      </select>
      命中
      <select v-model="main.ski_apt">
        <option v-for="(data, index) in apititude" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      回避
      <select v-model="main.spd_apt">
        <option v-for="(data, index) in apititude" :key="index" :value="index">
          {{ data }}
        </option>
      </select>
      丈夫さ
      <select v-model="main.def_apt">
        <option v-for="(data, index) in apititude" :key="index" :value="index">
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
      // 各種初期値定義
      main: {
        lifespan: '300',
        grow_type: 2,
        selection: 0,
        stair: 0,
        lif_apt: 2,
        pow_apt: 2,
        int_apt: 2,
        ski_apt: 2,
        spd_apt: 2,
        def_apt: 2
      },
      // 成長パターン
      apititude: ['A', 'B', 'C', 'D', 'E'],
      // 成長段階
      grow_stages: ['早熟', '持続', '普通', '晩成']
    };
  },
  methods: {}
};
</script>
