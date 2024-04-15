"use strict";(self.webpackChunkfrontboard=self.webpackChunkfrontboard||[]).push([[780],{2780:n=>{n.exports='# Fields\n\n`c-field`\n\nFields CSS clases make it easy to composed mixed inputs with labeling and actions all together.\n\n**_Work in progress_**\n\n```html\n<template>\n  <div>\n    <div class="flex-col" :class="{\'v-invert\': APP.services.palette.invert}">\n      \x3c!-- <dialog>dialog</dialog> --\x3e\n\n      <div class="c-field">\n        <label for="i1">Label</label>\n        <input id="i1" class="c-input" value="input">\n      </div>\n\n      <div class="c-field t-error">\n        <label for="i3">Label</label></dt>\n        <button class="c-action">Action x</button>\n        <button class="c-action">Action x</button>\n        <div class="c-input"><input id="i3" value="field 1"></div>\n        <input id="i4" type="checkbox">\n        <button class="c-action">Action 2</button>\n        <input id="i6" type="radio">\n        <button class="c-action t-primary">Action x</button>\n        <button class="c-action">Action 2</button>\n        <button class="c-action">Action 2</button>\n        <button class="c-action s-disabled">disabled 2</button>\n      </div>\n\n      <div class="c-field">\n        <label for="i3">Label</label></dt>\n        <button class="c-action">Action x</button>\n        <button class="c-action">Action x</button>\n        <div class="c-input"><input id="i3" value="field 1"></div>\n        <div class="c-input"><input id="i4" value="field 1"></div>\n        <button class="c-action t-primary">Action 2</button>\n        <button class="c-action">Action 2</button>\n        <label for="i4">Label</label></dt>\n        <input id="i4" type="checkbox">\n        <button class="c-action t-secondary">Action 2</button>\n        <button class="c-action s-disabled">disabled 2</button>\n        <button class="c-action t-warning">Action 2</button>\n      </div>\n\n      <div class="c-field">\n        <input id="i4" type="checkbox">\n        <input id="i6" type="radio">\n        <div class="c-input">\n          <div class="c-chip v-solid">\n            <div class="c-action"><span class="fi fi-rs-heart"></span></div>\n            <span>Chip</span>\n            <div class="c-action"><span class="fi fi-rs-user"></span></div>\n          </div>\n        </div>\n        <div class="c-input t-warning">\n          <div class="c-chip v-solid">\n            <div class="c-action"><span class="fi fi-rs-heart"></span></div>\n            <span>Chip</span>\n            <div class="c-action"><span class="fi fi-rs-user"></span></div>\n          </div>\n        </div>\n        <label for="i3">Label</label></dt>\n      </div>\n\n      <div class="c-field">\n        <label class="s-loading" for="i1">Label</label>\n        <input id="i1" class="c-input" value="input">\n        <input id="i6" type="radio">\n      </div>\n\n      <div class="c-field">\n        <label for="i2">Label</label></dt>\n        <div class="c-input"><input id="i2" value="field"></div>\n        <button class="c-action t-info"><span class="fi fi-rs-calendar"></span></button>\n      </div>\n\n      <div class="c-emergent c-emergent--open">\n        <menu class="c-menu">\n          <li><button class="c-action c-option">option</button></li>\n          <li><button class="c-action c-option t-error">option</button></li>\n          <li><button class="c-action c-option s-disabled">option</button></li>\n        </menu>\n      </div>\n\n      \x3c!--\n      <div>\n        <div class="c-ranges"><input type="range" v-model="range1"><input type="range" v-model="range2"></div>\n        <br><br>\n        <div class="c-ranges --vertical"><input type="range" v-model="range1"><input type="range" v-model="range2"></div>\n      </div>\n\n      <div>\n        <input type="range" v-model="range1">\n        <input type="range" v-model="range1">\n      </div>\n\n      {{ range1 }} {{ range2 }}\n      --\x3e\n\n    </div>\n  </div>\n</template>\n<script>\n({\n  range1: 5,\n  range2: 10\n})\n<\/script>\n```'}}]);