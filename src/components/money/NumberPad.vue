<template>
  <div>
    <div class="numberPad">
      <div class="output">{{output}}</div>
      <div class="buttons">
        <button @click="inputContent('1')">1</button>
        <button @click="inputContent('2')">2</button>
        <button @click="inputContent('3')">3</button>
        <button @click="remove">删除</button>
        <button @click="inputContent('4')">4</button>
        <button @click="inputContent('5')">5</button>
        <button @click="inputContent('6')">6</button>
        <button @click="clear">清空</button>
        <button @click="inputContent('7')">7</button>
        <button @click="inputContent('8')">8</button>
        <button @click="inputContent('9')">9</button>
        <button @click="ok" class="ok">ok</button>
        <button class="zero" @click="inputContent('0')">0</button>
        <button @click="inputContent('.')">.</button>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class NumberPad extends Vue{
  @Prop(Number) readonly value!:number;
  output = this.value.toString()
  inputContent(input:string){
    if(this.output.length===16){return;}
    if(this.output ==='0'){
     if('0123456789'.indexOf(input)>=0){
        this.output = input;
        return;
      }
    }else if(this.output.indexOf('.')>=0){
     if(input ==='.'){
       return
     }
    }
      this.output += input;
  }
  remove(){
    if(this.output.length===1){
      this.output = '0';
      return;
    }
    this.output =this.output.substring(0,this.output.length-1)
  }
  clear(){
     this.output = '0';
    }
  ok(){
     const number =parseFloat(this.output)
    this.$emit('update:value',number)
    this.$emit('submit',number)
    this.clear();
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.numberPad{
.output{
  @extend %innerShadow;
  font-size: 36px;
  font-family: Consolas,monospace;
  padding: 9px 16px;
  text-align: right;
  min-height: 72px;
}
.buttons{
&::after{
   centent:'';
   display: block;
   clear: both;
 }
> button{
  border: none;
  float: left;
  width: 25%;
  height: 7.9vh;
&.ok{
   float: right;
   height: 15.8vh;
 }
&.zero{
   width: 25*2%;
 }
$bg:#f2f2f2;
&:nth-child(1){
   background: $bg;
 }
&:nth-child(2), &:nth-child(5){
                   background: darken($bg,4%);
                 }
&:nth-child(3), &:nth-child(6), &:nth-child(9){
                                   background: darken($bg,8%);
                                 }
&:nth-child(4), &:nth-child(7), &:nth-child(10){
                                   background: darken($bg,12%);
                                 }
&:nth-child(8), &:nth-child(11), &:nth-child(13){
                                    background: darken($bg,16%);
                                  }
&:nth-child(12){
   background: darken($bg,24%);
 }
&:nth-child(14){
   background: darken($bg,20%);
 }
}
}
}

</style>