### node脚本自动打包并修正打包后的文件

### 项目说明
site-PC项目依赖site-component-pc
site-component-pc依赖temporary-component

site-component-pc和temporary-component打包后的文件出现如下：
import Ya, { nextTick as Ja, defineComponent as Qa, computed as er, reactive as Za, ref as Bt, onMounted as za, openBlock as ft, createElementBlock as Pt, createBlock as Kt, mergeProps as tr, unref as Tt, createCommentVNode as Dt, renderSlot as Xt, createElementVNode as At, createVNode as yr, withCtx as jt, toDisplayString as Tr, Fragment as rr, createTextVNode as es, renderList as ts, pushScopeId as rs, popScopeId as ns } from "vue"; 

在运行时会报错，需要对打包后的文件进行修正。将其修改为：
import * as Ya from "vue";
import { nextTick as Ja, defineComponent as Qa, computed as er, reactive as Za, ref as Bt, onMounted as za, openBlock as ft, createElementBlock as Pt, createBlock as Kt, mergeProps as tr, unref as Tt, createCommentVNode as Dt, renderSlot as Xt, createElementVNode as At, createVNode as yr, withCtx as jt, toDisplayString as Tr, Fragment as rr, createTextVNode as es, renderList as ts, pushScopeId as rs, popScopeId as ns } from "vue";

使用正则匹配修改内容

### 项目创建
mkdir site-auto-build
cd site-auto-build
npm init -y

### package.json
  "type": "module",   // 使用import导入模块
  "scripts": 
    "dev": "node index.js"

