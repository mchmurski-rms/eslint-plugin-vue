/**
 * @fileoverview enforce ordering of classes
 * @author Maciej Chmurski
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/static-class-names-order')
var RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})
tester.run('static-class-names-order', rule, {

  valid: [
    {
      filename: 'no-classes.vue',
      code: '<template><div></div></template>'
    },
    {
      filename: 'one-class.vue',
      code: '<template><div class="a"></div></template>'
    },
    {
      filename: 'single-space.vue',
      code: '<template><div class="a b c"></div></template>'
    },
    {
      filename: 'multiple-spaces.vue',
      code: '<template><div class="a       b       c"></div></template>'
    },
    {
      filename: 'tabs.vue',
      code: '<template><div class="a  b  c"></div></template>'
    }
  ],

  invalid: [
    {
      filename: 'two-classes.vue',
      code: '<template><div class="b a"></div></template>',
      output: '<template><div class="a b"></div></template>',
      errors: [{
        message: 'Classes should be ordered alphabetically.',
        type: 'VAttribute'
      }]
    },
    {
      filename: 'three-classes.vue',
      code:
        `<template>
          <div class="c b a">
          </div>
        </template>`,
      output:
        `<template>
          <div class="a b c">
          </div>
        </template>`,
      errors: [
        {
          message: 'Classes should be ordered alphabetically.',
          type: 'VAttribute'
        }
      ]
    }
  ]
})