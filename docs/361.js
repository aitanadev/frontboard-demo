"use strict";(self.webpackChunkfrontboard=self.webpackChunkfrontboard||[]).push([[361],{6361:e=>{e.exports='<template>\n  <div\n    class="c-datagrid"\n    tabindex="0"\n    :class="{\n      \'--scroll-none\': !scroll.left && !scroll.right,\n      \'--scroll-bottom\': scroll.bottom,\n      \'--scroll-right\': scroll.right,\n      \'--scroll-top\': scroll.top,\n      \'--scroll-left\': scroll.left\n    }"\n  >\n    <table\n      ref="table"\n      v-if="records"\n      :style="{\n        width: tableWidth + \'px\' // $el.offsetWidth + \'px\' //\n      }"\n    >\n      <thead>\n        <draggable tag="tr" class="c-dragable" handle=".c-draggable__handler" :list="cols" @end="colsOrderUpdate">\n          <template v-for="(col, index) in cols">\n            <th\n              v-if="col.col"\n              :style="colStyle(col)"\n              :class="(col.sticky ? (\'--sticky-\'+ col.sticky) : \'\') + (canSitcky(col) ? \' --stickable\' : \'c-draggable__item\')"\n              v-bind="col.attributes"\n              @mousedown="mouseDown(col, $event)"\n              @mouseenter="mouseEnter(col, $event)"\n              @mousemove="mouseMove(col, $event)"\n              @mouseleave="mouseLeave(col, $event)"\n              @dblclick="toggleSticky(col)"\n            ><div class="c-datagrid__cell"><span class="c-draggable__handler" @mousedown.stop>{{ col.label }}</span></div></th>\n            \x3c!-- <input type="checkbox" class="c-checkbox" @input="onColumVisibility" v-model="col.col"> --\x3e\n          </template>\n          <template #header>\n            <th\n              v-for="(col, index) in colsPrepend"\n              :style="colStyle(col)"\n              :class="(col.sticky ? (\'--sticky-\'+ col.sticky) : \'\') + (canSitcky(col) ? \' --stickable\' : \'\')"\n              v-bind="col.attributes"\n              @mousedown="mouseDown(col, $event)"\n              @mouseenter="mouseEnter(col, $event)"\n              @mousemove="mouseMove(col, $event)"\n              @mouseleave="mouseLeave(col, $event)"\n\n            ><div class="c-datagrid__cell">{{ col.label }}</div></th>\n          </template>\n          <template #footer>\n            <th\n              v-for="(col, index) in colsAppend"\n              :style="colStyle(col)"\n              :class="(col.sticky ? (\'--sticky-\'+ col.sticky) : \'\') + (canSitcky(col) ? \' --stickable\' : \'\')"\n              v-bind="col.attributes"\n              @mousedown="mouseDown(col, $event)"\n              @mouseenter="mouseEnter(col, $event)"\n              @mousemove="mouseMove(col, $event)"\n              @mouseleave="mouseLeave(col, $event)"\n\n            ><div class="c-datagrid__cell">{{ col.label }}</div></th>\n          </template>\n        </draggable>\n      </thead>\n      <draggable tag="tbody" class="c-dragable" draggable=".c-draggable__item" handle=".c-draggable__handler" :list="records">\n        <template v-for="record in records">\n          <template v-if="record === expand">\n            <slot name="record" v-bind="{ record, cols: allCols, selectable, selected: isSelected(record) }">\n              <DatagridRecord :record="record" :cols="allCols" :selectable="selectable" :sortable="sortable" :selected="isSelected(record)" :key="record.uid"/>\n            </slot>\n            <tr class="c-datagrid__expand">\n              <td :colspan="allCols.length">\n                <div\n                  class="c-datagrid__expand-content"\n                  :style="{\n                    width: offsetWidth + \'px\'\n                  }"\n                >\n                  <slot name="expand" v-bind="{ record, cols: allCols, selectable, selected: isSelected(record) }"></slot>\n                </div>\n              </td>\n            </tr>\n          </template>\n          <template v-else>\n            <slot name="record" v-bind="{ record, cols: allCols, selectable, selected: isSelected(record) }">\n              <DatagridRecord :record="record" :cols="allCols" :selectable="selectable" :sortable="sortable" :selected="isSelected(record)" :key="record.uid"/>\n            </slot>\n          </template>\n        </template>\n        <template v-if="draftLine" #footer>\n          <slot name="record" v-bind="{ record: draftLine, cols: allCols, selectable }">\n            <DatagridRecord :record="draftLine" :cols="allCols" :selectable="selectable" :sortable="sortable" :key="draftLine.uid"/>\n          </slot>\n          <tr class="c-datagrid__expand" v-if="draftLine === expand">\n            <td :colspan="allCols.length">\n              <div\n                class="c-datagrid__expand-content"\n                :style="{\n                  width: offsetWidth + \'px\'\n                }"\n              >\n                <slot name="expand" v-bind="{ record: draftLine, cols: allCols, selectable }"></slot>\n              </div>\n            </td>\n          </tr>\n        </template>\n      </draggable>\n      <tfoot><tr><td :colspan="allCols.length"></td></tr></tfoot>\n    </table>\n  </div>\n</template>\n\n<script>\n\nimport Vue from \'vue\'\nimport draggable from \'vuedraggable\'\nimport DatagridRecord from \'components/DatagridRecord\'\n\nexport default {\n  name: \'Datagrid\',\n\n  components: {\n    draggable,\n    DatagridRecord\n  },\n\n  props: {\n    records: { type: Array },\n    cols: { type: Array },\n    colsPrepend: { type: Array },\n    colsAppend: { type: Array },\n    selectable: { type: Boolean},\n    sortable: { type: Boolean},\n    expand: { type: Object },\n    draftLine: { type: Object }\n  },\n\n  data: () => ({\n    mouseStatus: {},\n    selection: [],\n    scroll: {},\n    tableSpace: 0,\n    offsetWidth: 0\n  }),\n\n  created() {\n    window.Datagrid = this\n  },\n\n  mounted() {\n    document.addEventListener(\'mousemove\', this.allMouseMove)\n    document.addEventListener(\'mouseup\', this.allMouseUp)\n    this.$el.addEventListener(\'keydown\', this.onKeydown)\n    this.$el.addEventListener(\'scroll\', this.onTableChange)\n    this.$el.addEventListener(\'wheel\', this.onTableChange)\n    this.$nextTick().then(() => this.onTableChange())\n    this.sizingControl()\n  },\n\n  beforeDestroy() {\n    document.removeEventListener(\'mousemove\', this.allMouseMove)\n    document.removeEventListener(\'mouseup\', this.allMouseUp)\n    this.$el.removeEventListener(\'keydown\', this.onKeydown)\n    this.$el.removeEventListener(\'scroll\', this.onTableChange)\n    this.$el.removeEventListener(\'wheel\', this.onTableChange)\n  },\n\n  computed: {\n    tableWidth() {\n      return this.allCols.reduce((acumulator, col) => acumulator + col.size, 0)\n    },\n    allCols() {\n      return [...(this.colsPrepend || []), ...this.cols, ...(this.colsAppend || [])].filter(col => col.col)\n    }\n  },\n\n  methods: {\n    sizingControl () {\n      if (!this.$el.isConnected) return\n      if (this.$el.offsetWidth !== this.offsetWidth) {\n        // console.log(\'requestAnimationFrame\')\n        this.offsetWidth = this.$el.offsetWidth\n        this.onTableChange()\n      }\n      window.requestAnimationFrame(this.sizingControl)\n    },\n    onKeydown (event) {\n      if (event.key === \'ArrowDown\') {\n        event.preventDefault()\n        event.stopPropagation()\n        this.focusNext()\n      } else if (event.key === \'ArrowUp\') {\n        event.preventDefault()\n        event.stopPropagation()\n        this.focusNext(true)\n      }\n    },\n    colsOrderUpdate() {\n      console.log(\'update cols order\')\n      // this.$emit(\'cols:update\')\n      this.$forceUpdate()\n    },\n    onColumVisibility() {\n      // TODO\n    },\n    colStyle(col) {\n      const allCols = this.allCols\n      const index = allCols.indexOf(col)\n      return {\n        width: col.size + (index === allCols.length - 1 ? this.tableSpace : 0) + \'px\',\n        left: col.sticky === \'left\' ? (allCols.slice(0, index).reduce((acumulator, col) => acumulator + col.size, 0) + \'px\') : \'unset\',\n        right: col.sticky === \'right\' ? (allCols.slice(index + 1).reduce((acumulator, col) => acumulator + col.size, 0) + \'px\') : \'unset\'\n      }\n    },\n    focusNext(reverse) {\n      const allRows = [...this.$el.querySelectorAll(\'.c-datagrid__row\')]\n      const focusedIndex = allRows.indexOf(document.activeElement)\n      if (focusedIndex >= 0) {\n        const nextIndex = (allRows.length + focusedIndex + (reverse ? -1 : 1)) % allRows.length\n        // console.log(\'....>\', {focusedIndex, nextIndex})\n        allRows[nextIndex].focus()\n      } else {\n        const nextIndex = reverse ? allRows.length - 1 : 0\n        allRows[nextIndex].focus()\n      }\n    },\n    selectRecord(record) {\n      const index = this.selection.indexOf(record)\n      if (index >= 0) {\n        this.selection.splice(index, 1)\n      } else {\n        this.selection.push(record)\n      }\n    },\n    isSelected(record) {\n      return this.selection.includes(record)\n    },\n    canSitcky(col) {\n      let stickablesLeft = []\n      let stickablesRight = []\n      this.allCols.every((col, index) => {\n        if (!stickablesLeft.length || (stickablesLeft.length === index && stickablesLeft[index - 1].sticky)) {\n          stickablesLeft.push(col)\n          return true\n        }\n      })\n      this.allCols.toReversed().every((col, index) => {\n        if (!stickablesRight.length || (stickablesRight.length === index && stickablesRight[index - 1].sticky)) {\n          stickablesRight.push(col)\n          return true\n        }\n      })\n      if (stickablesLeft.includes(col)) return \'left\'\n      if (stickablesRight.includes(col)) return \'right\'\n    },\n    toggleSticky(col) {\n      col.sticky = col.sticky ? false : this.canSitcky(col)\n      this.$forceUpdate()\n    },\n    onTableChange() {\n      const scrollElement = this.$el\n      Object.assign(this.scroll, {\n        bottom: scrollElement.scrollHeight - scrollElement.scrollTop > scrollElement.offsetHeight,\n        right: scrollElement.scrollWidth - scrollElement.scrollLeft > scrollElement.offsetWidth,\n        top: scrollElement.scrollTop > 0,\n        left: scrollElement.scrollLeft > 0\n      })\n      // console.log(\'onTableChange\', this.scroll)\n      const space = this.$el.offsetWidth - this.tableWidth\n      this.tableSpace = space > 0 ? space : 0\n      this.$forceUpdate()\n    },\n\n    mouseEnter (col) {\n      // console.log(\'mouseEnter\', col.key)\n      if (!this.mouseStatus.down) {\n        this.mouseStatus.col = col\n      }\n    },\n    mouseLeave (col) {\n      // console.log(\'mouseLeave\', col.key)\n      if (!this.mouseStatus.down) {\n        this.mouseStatus.col = false\n      }\n    },\n    mouseMove (col, event) {\n      if (!this.mouseStatus.down) {\n        const resizeActiveSpace = 8\n        const colIndex = this.allCols.indexOf(col)\n        const isFirst = colIndex === 0\n        const isLast = colIndex + 1 === this.allCols.length\n        const leftResizeArea = event.offsetX < resizeActiveSpace && !isFirst\n        const rightResizeArea = event.currentTarget.offsetWidth - event.offsetX < resizeActiveSpace // && !isLast\n        // console.log(\'moving\', { leftResizeArea, rightResizeArea })\n        if (leftResizeArea || rightResizeArea) {\n          this.mouseStatus.resize = {\n            left: leftResizeArea,\n            right: rightResizeArea,\n            colIndex,\n            isFirst,\n            isLast\n          }\n        } else {\n          this.mouseStatus.resize = false\n        }\n      }\n    },\n    mouseDown (col, event) {\n      // console.log(\'colDown\', col)\n      event.preventDefault()\n      this.mouseStatus.down = {\n        x: event.x\n      }\n    },\n    allMouseMove (event) {\n      const mouseStatus = this.mouseStatus\n      if (mouseStatus.col && mouseStatus.resize) {\n        if (mouseStatus.resize.left) {\n          this.$el.style.setProperty(\'cursor\', \'ew-resize\', \'important\')\n        } else {\n          this.$el.style.setProperty(\'cursor\', \'ew-resize\', \'important\')\n        }\n      } else {\n        this.$el.style.removeProperty(\'cursor\')\n      }\n      if (mouseStatus.down && mouseStatus.resize) {\n        const scroll = false // !this.scroll.right && !this.scroll.left\n        const leftResize = mouseStatus.resize.left && mouseStatus.col.sticky !== \'right\'\n        const col = leftResize ? this.allCols[mouseStatus.resize.colIndex - 1] : mouseStatus.col\n        const diff = event.x - mouseStatus.down.x\n        mouseStatus.down.x = event.x\n        const currentColSize = col.size\n        const move = ((mouseStatus.resize.left && !leftResize) ? -diff : diff)\n        // TODO: Needs a refactor\n        // Try different aproach using the table offsetWidth (using a width auto table) and a last adjustable empty row\n        // Other option: Use a switch to turn on scroll on a no scrolled tale using a width auto table too\n        // Other option: Use diferent cursor on resizable columns headers noticing the type of the resizing method per column (left/right arrows cursor?)\n        /*\n        if (scroll && !mouseStatus.resize.isLast) {\n          const next = leftResize ? this.allCols[mouseStatus.resize.colIndex] : this.allCols[mouseStatus.resize.colIndex + 1]\n          const nextColSize = next.size\n          next.size = (nextColSize - move) || 1\n        }\n        */\n\n        if (mouseStatus.resize.isLast && mouseStatus.resize.left) {\n          const prev = this.allCols[mouseStatus.resize.colIndex - 1]\n          const prevColSize = prev.size\n          prev.size = (prevColSize - move) || 1\n        }\n\n        col.size = (currentColSize + move) || 1\n\n        // console.log(\'allMouseMove\', mouseStatus.resize, mouseStatus.down.x, diff, currentColSize, col.size, col)\n\n        this.onTableChange()\n      }\n    },\n    allMouseUp (event) {\n      this.mouseStatus.down = false\n    }\n  }\n}\n<\/script>\n'}}]);