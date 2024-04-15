"use strict";(self.webpackChunkfrontboard=self.webpackChunkfrontboard||[]).push([[917],{8917:a=>{a.exports="# Data grid\n\n`DataGrid` `c-data-grid`\n\nData grid component allow you to compose any kind of tabular data visualization.\n\nDatagrid supports:\n\n* Sticky columns\n* Custom column resize\n* Column _drag&drop_ positioning\n* Row _drag&drop_\n* Bulk operations and row multiselect\n* Available **slots** for header cells, regular cells and named cells\n\n```html\n<template>\n  <Datagrid :cols=\"cols\" :records=\"records\"/>\n</template>\n<script>\n({\n records: [\n    {id: '1', name: 'name', data: 10, value: true},\n    {id: '2', name: 'name', data: 10, value: true},\n    {id: '3', name: 'name', data: 10, value: true},\n    {id: '4', name: 'name', data: 10, value: true},\n    {id: '5', name: 'name', data: 10, value: true},\n    {id: '6', name: 'name', data: 10, value: true},\n    {id: '7', name: 'name', data: 10, value: true},\n    {id: '8', name: 'name', data: 10, value: true},\n    {id: '9', name: 'name', data: 10, value: true},\n    {id: '10', name: 'name', data: 10, value: true},\n    {id: '11', name: 'name', data: 10, value: true},\n    {id: '12', name: 'name', data: 10, value: true},\n    {id: '13', name: 'name', data: 10, value: true},\n    {id: '14', name: 'name', data: 10, value: true},\n    {id: '15', name: 'name', data: 10, value: true},\n    {id: '16', name: 'name', data: 10, value: true},\n    {id: '17', name: 'name', data: 10, value: true},\n    {id: '18', name: 'name end', data: 10, value: true}\n  ],\n  cols: [\n    {key: 'id', size: 50, sticky: 'left', label: 'Id'},\n    {key: 'name', size: 200, sticky: false, label: 'Name'},\n    {key: 'data', size: 200, sticky: false, label: 'Data'},\n    {key: 'value', size: 90, sticky: 'right', label: 'Value'}\n  ]\n})\n<\/script>\n```\n\x3c!--- section ---\x3e\n# Properties\n\x3c!--- section ---\x3e\n# Slots\n\x3c!--- section ---\x3e\n# Events"}}]);