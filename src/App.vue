<template>
  <div>
    <myheader></myheader>
    寿命：<input type="text" v-model="life">
    <button @click="clear()">clear</button>
    成長タイプ：
    <select v-model="selected">
      <option v-for="data in grow_type" v-bind:value="data.value" :key="data.text">{{ data.text }}</option>
    </select>
    <p style="display:none">
      成長適正：すべてＣ（未実装）、能力値：すべて１２０（未実装）
    </p>
    <p v-if="life.length > 0">
        <span>成長タイプ: {{ grow_stages[selected].type }}</span>
        <table>
          <tbody>
            <tr v-for="(value,index) in grow_stages[selected].value" v-bind:key="index">
              <td>{{ grow_stage_names[index] }}</td>
              <td>{{ culcStage(index) }}</td>
            </tr>
          </tbody>
        </table>
        <span>黄金モモ：{{ culcPeach(true) }}</span><br>
        <span>白銀モモ：{{ culcPeach(false) }}</span><br>
        <span>テスト：{{ culcStage(9) }}</span><br>
        <span>※成長タイプの端数処理は未実装です(取り急ぎ丸めただけです)</span>
    </p>
    <p v-else>
      (寿命が入力されていません))
    </p>
  </div>
</template>

<script>
import myheader from './components/myheader'
import grow_type from '../assets/grow_type.json'

export default {
  components: {
    myheader
  },
  data () {
    return {
      life: '300',
      selected: '2',
      // 成長タイプ。selectboxの中身。
      grow_type: grow_type ,
      // 成長段階。後でローカルjsonにする
      grow_stages: [
        { type:"早熟", value : [0,5,10,20,30,35,40,55,70,80,100] },
        { type:"持続", value : [0,5,10,20,30,40,45,60,75,85,100] },
        { type:"普通", value : [0,10,20,35,50,60,65,75,80,85,100] },
        { type:"晩成", value : [0,15,30,45,60,70,80,85,90,95,100] }
      ],
      // 成長段階の名前。ローカル（略
      grow_stage_names: ["第1段階","第2段階","第3段階","第4段階","ピーク","準ピーク","第5段階","第6段階","第7段階","第8段階","（寿命）"]
    }
  },
  methods: {
    clear () {
      this.life = ''
    },
    // 延命アイテム計算用。どうせ黄金モモか白銀モモしかないので手抜き
    culcPeach (isGold) {
      var life=25;
      if(isGold) life=50;

      var peak1=this.culcStageWeek(4);
      if(peak1 > life) return "ピーク："+life;
      else var return_msg="ピーク："+peak1;
      life-=peak1;
      var peak2=this.culcStageWeek(5);
      if(peak2 > life) return "、準ピーク："+life;
      else return_msg+="、準ピーク："+peak2;
      life-=peak2;
      return_msg+="、第4段階："+life;

      return return_msg;
    },
    // 適当すぎる計算をまとめようとした
    culcStageWeek (stage) {
      if(stage>9) return "えらー";
      if(stage<0) return "えらー";
      return this.culcStage(stage+1)-this.culcStage(stage);
    },
    // 適当すぎる計算をまとめようとした2
    culcStage (stage) {
      if(stage>10) return "えらー";
      if(stage<0) return "えらー";
      return Math.floor(this.grow_stages[this.selected].value[stage]*this.life/100);
    },
  }
}
</script>