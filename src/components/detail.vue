<template>
  <div>
    <p>モンスター詳細</p>
    <table v-if="Object.keys(detailed_monster).length > 0" border="1">
      <thead>
        <tr>
          <th colspan="2">種族名</th>
          <th colspan="2">メイン</th>
          <th colspan="2">サブ</th>
          <th colspan="3">得意</th>
          <th>善悪</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">{{ detailed_monster.name }}</td>
          <td colspan="2">{{ detailed_monster.main }}</td>
          <td colspan="2">{{ detailed_monster.sub }}</td>
          <td colspan="3">{{ detailed_monster.skilled }}</td>
          <td>{{ detailed_monster.g_e }}</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>寿命</th>
          <th>成長</th>
          <th>移動</th>
          <th>G回復</th>
          <th>ライフ</th>
          <th>ちから</th>
          <th>かしこさ</th>
          <th>命中</th>
          <th>回避</th>
          <th>丈夫さ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ detailed_monster.lifespan }}</td>
          <td>{{ detailed_monster.grow_type }}</td>
          <td>{{ detailed_monster.move }}</td>
          <td>{{ detailed_monster.guts }}</td>
          <td>
            {{ detailed_monster.lif }}
            ({{ detailed_monster.lif_apt }})
          </td>
          <td>
            {{ detailed_monster.pow }}
            ({{ detailed_monster.pow_apt }})
          </td>
          <td>
            {{ detailed_monster.int }}
            ({{ detailed_monster.int_apt }})
          </td>
          <td>
            {{ detailed_monster.ski }}
            ({{ detailed_monster.ski_apt }})
          </td>
          <td>
            {{ detailed_monster.spd }}
            ({{ detailed_monster.spd_apt }})
          </td>
          <td>
            {{ detailed_monster.def }}
            ({{ detailed_monster.def_apt }})
          </td>
        </tr>
        <tr>
          <th colspan="10">適性順位</th>
        </tr>
        <tr>
          <td colspan="10">{{ outputCorretedParam() }}</td>
        </tr>
      </tbody>
    </table>
    ※0.3.0β現在、レアモン用の例外処理（純血種の適性を参照）は未実装です
  </div>
</template>

<script>
import monster_datas from '../../assets/monster_data.json';

export default {
  name: 'Detail',
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
      secret: false,
      skilled: {},
      detailed_monster: {},
      corrected_param: new Array(),
      sorted_param_name: new Array(),
      monster_datas: monster_datas,
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
      ],
      // 成長適性（計算の都合上逆順）
      pattern: ['E', 'D', 'C', 'B', 'A'],
      params: ['ライフ', 'ちから', 'かしこさ', '命中', '回避', '丈夫さ']
    };
  },
  mounted: function () {
    this.setDetail();
  },
  methods: {
    // プリセット反映用（親から呼ばれる）
    setDetail() {
      const monsterName = this.main.preset_monster;
      const monsterData = this.monster_datas.filter(function (item) {
        if (item.name === monsterName) return true;
      })[0];

      if (monsterData.skilled.length === 0) monsterData.skilled = '（なし）';

      this.detailed_monster = monsterData;
      const corrected_param = this.calcBirthParam(monsterData);
      const sorted_param = corrected_param.slice().sort(function (a, b) {
        return b - a;
      });
      this.corrected_param = corrected_param;

      this.sorted_param_index = new Array();
      let dupes = sorted_param.filter(
        (x, i, self) => self.indexOf(x) === i && i !== self.lastIndexOf(x)
      );
      for (let val of sorted_param) {
        if (dupes.indexOf(val) === -1) {
          this.sorted_param_index.push(corrected_param.indexOf(val));
        } else {
          this.sorted_param_index.push(this.judgeSameParam(sorted_param, val));
        }
      }
    },
    // 補正後パラメータが同一だった場合の判定（初期値＞並び降順）
    judgeSameParam(sorted_param, dupeVal) {
      const position = this.sorted_param_index.length; // 現在位置
      const dupe_origin = sorted_param.indexOf(dupeVal); // 重複の開始位置
      const dupe_position = position - dupe_origin; // 重複内での現在位置
      const paramArr = this.setParam(this.detailed_monster);

      let dupe_index_array = new Array();
      this.corrected_param.forEach((val, i) => {
        if (val === dupeVal) dupe_index_array.push(i);
      });

      let judge_array = new Array();
      for (let val of dupe_index_array) {
        judge_array.push(paramArr[val] * 10 + val);
      }

      const sorted_judge_array = judge_array.slice().sort(function (a, b) {
        return b - a;
      });

      const return_index =
        dupe_index_array[
          judge_array.indexOf(sorted_judge_array[dupe_position])
        ];

      return return_index;
    },
    // 適性順位の文字列出力
    outputCorretedParam() {
      const corrected_param = this.corrected_param;
      const sorted_param_index = this.sorted_param_index;
      if (corrected_param.length !== sorted_param_index.length) return 'えらー';

      let return_msg = '';
      for (let index of sorted_param_index)
        return_msg += this.params[index] + '(' + corrected_param[index] + ')＞';
      return return_msg.slice(0, -1);
    },
    // モンスターデータからパラメータ配列を作成
    setParam(data) {
      let retArr = new Array();
      retArr.push(data.lif);
      retArr.push(data.pow);
      retArr.push(data.int);
      retArr.push(data.ski);
      retArr.push(data.spd);
      retArr.push(data.def);
      return retArr;
    },
    // モンスターデータから適性配列を作成
    setApt(data) {
      let retArr = new Array();
      retArr.push(data.lif_apt);
      retArr.push(data.pow_apt);
      retArr.push(data.int_apt);
      retArr.push(data.ski_apt);
      retArr.push(data.spd_apt);
      retArr.push(data.def_apt);
      return retArr;
    },
    // 適性補正後のパラメータを計算する
    // TODO:set系使って書き直したい
    calcCorrectedParam(data) {
      let retArr = new Array();
      retArr.push(
        Math.trunc(data.lif * this.pattern.indexOf(data.lif_apt) * 0.5)
      );
      retArr.push(
        Math.trunc(data.pow * this.pattern.indexOf(data.pow_apt) * 0.5)
      );
      retArr.push(
        Math.trunc(data.int * this.pattern.indexOf(data.int_apt) * 0.5)
      );
      retArr.push(
        Math.trunc(data.ski * this.pattern.indexOf(data.ski_apt) * 0.5)
      );
      retArr.push(
        Math.trunc(data.spd * this.pattern.indexOf(data.spd_apt) * 0.5)
      );
      retArr.push(
        Math.trunc(data.def * this.pattern.indexOf(data.def_apt) * 0.5)
      );
      return retArr;
    },
    // 合体誕生時のパラメータを計算する（適性のほうが優位）
    // TODO:set系使って書き直したい
    calcBirthParam(data) {
      let retArr = new Array();
      retArr.push(this.pattern.indexOf(data.lif_apt));
      retArr.push(this.pattern.indexOf(data.pow_apt));
      retArr.push(this.pattern.indexOf(data.int_apt));
      retArr.push(this.pattern.indexOf(data.ski_apt));
      retArr.push(this.pattern.indexOf(data.spd_apt));
      retArr.push(this.pattern.indexOf(data.def_apt));
      return retArr;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
}
td {
  text-align: center;
}
</style>
