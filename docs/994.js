"use strict";(self.webpackChunkfrontboard=self.webpackChunkfrontboard||[]).push([[994],{6994:e=>{e.exports='<template>\n  <div class="c-modal c-emergent__modal-overlay">\n    <div class="c-emergent c-emergent--small">\n      <div class="c-emergent__header">\n        <h1 class="c-emergent__title" :class="{\'c-emergent__title--error\': error}">{{ title }}</h1>\n        <button @click="dismiss" class="c-emergent__close">close</button>\n      </div>\n      <div class="c-emergent__body">\n        <p>{{ message }}</p>\n      </div>\n      <div class="c-emergent__footer">\n        <div class="c-emergent__actions">\n          <button class="c-action t-primary" @click="dismiss" tabindex="0">OK</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \'Modal\',\n\n  props: {\n    error: { type: Object },\n    title: { type: String },\n    message: { type: String }\n  },\n\n  methods: {\n    dismiss() {\n      if (this.error) {\n        this.error.onClose?.()\n        this.$emit(\'dismiss\')\n      }\n    }\n  }\n}\n<\/script>\n'}}]);