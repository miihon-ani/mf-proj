<template>
  <div>
    <myheader></myheader>
    <p v-if="life.length > 0">
        <span>寿命：{{ life }}</span><br>
        <span>成長タイプ: {{ grow_stages[selected].type }}</span>
        <table>
          <tbody>
            <tr v-for="(value,index) in grow_stages[selected].value" v-bind:key="index">
              <td>{{ grow_stage_names[index] }}</td>
              <td>{{ life*value/100 }}</td>
            </tr>
          </tbody>
        </table>
        
        <span>※成長タイプの端数処理は未実装です</span>
    </p>
    <p v-else>
      (寿命が入力されていません))
    </p>
    <input type="text" v-model="life">
    <button @click="clear()">clear</button>
    <p>
      <select v-model="selected">
        <option v-for="data in options" v-bind:value="data.value" :key="data.text">{{ data.text }}</option>
      </select>
    </p>
  </div>
</template>

<script>
import myheader from './components/myheader'

export default {
  components: {
    myheader
  },
  data () {
    return {
      life: '300',
      selected: '2',
      // selectboxの中身。ローカルストレージにjsonで入れたい気がしている。
      options: [
        { text: '早熟', value: '0' },
        { text: '持続', value: '1' },
        { text: '普通', value: '2' },
        { text: '晩成', value: '3' },
      ],
      // 成長段階。ローカル（略
      grow_stages: [
        { type:"早熟", value: [0,5,10,20,30,35,40,55,70,80] },
        { type:"持続", value : [0,5,10,20,30,40,45,60,75,85] },
        { type:"普通", value : [0,10,20,35,50,60,65,75,80,85] },
        { type:"晩成", value : [0,15,30,45,60,70,80,85,90,95] }
      ],
      // 成長段階の名前。ローカル（略
      grow_stage_names: ["第1段階","第2段階","第3段階","第4段階","ピーク","準ピーク","第5段階","第6段階","第7段階","第8段階"]
    }
  },
  methods: {
    clear () {
      this.life = ''
    },
  }
}
</script>