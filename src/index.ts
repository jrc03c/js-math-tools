import { DataFrame, Series } from "./dataframe"

import abs from "./abs"
import add from "./add"
import apply from "./apply"
import arccos from "./arccos"
import arcsin from "./arcsin"
import arctan from "./arctan"
import argmax from "./argmax"
import argmin from "./argmin"
import assert from "./assert"
import ceil from "./ceil"
import chop from "./chop"
import clamp from "./clamp"
import combinations from "./combinations"
import copy from "./copy"
import correl from "./correl"
import cos from "./cos"
import count from "./count"
import covariance from "./covariance"
import diff from "./diff"
import distance from "./distance"
import divide from "./divide"
import dot from "./dot"
import dropMissing from "./dropMissing"
import dropMissingPairwise from "./dropMissingPairwise"
import dropNaN from "./dropNaN"
import dropNaNPairwise from "./dropNaNPairwise"
import dropUndefined from "./dropUndefined"
import exp from "./exp"
import factorial from "./factorial"
import find from "./find"
import findAll from "./findAll"
import flatten from "./flatten"
import float from "./float"
import floor from "./floor"
import identity from "./identity"
import indexOf from "./indexOf"
import int from "./int"
import intersect from "./intersect"
import inverse from "./inverse"
import isArray from "./isArray"
import isBoolean from "./isBoolean"
import isDataFrame from "./isDataFrame"
import isEqual from "./isEqual"
import isFunction from "./isFunction"
import isJagged from "./isJagged"
import isNested from "./isNested"
import isNumber from "./isNumber"
import isObject from "./isObject"
import isSeries from "./isSeries"
import isString from "./isString"
import isUndefined from "./isUndefined"
import lerp from "./lerp"
import log from "./log"
import MathError from "./MathError"
import max from "./max"
import mean from "./mean"
import median from "./median"
import min from "./min"
import mod from "./mod"
import mode from "./mode"
import multiply from "./multiply"
import ndarray from "./ndarray"
import normal from "./normal"
import ones from "./ones"
import permutations from "./permutations"
import pow from "./pow"
import print from "./print"
import product from "./product"
import random from "./random"
import range from "./range"
import remap from "./remap"
import reshape from "./reshape"
import reverse from "./reverse"
import round from "./round"
import scale from "./scale"
import seed from "./seed"
import set from "./set"
import shape from "./shape"
import shuffle from "./shuffle"
import sign from "./sign"
import sin from "./sin"
import sort from "./sort"
import sqrt from "./sqrt"
import std from "./std"
import stdev from "./stdev"
import subtract from "./subtract"
import sum from "./sum"
import tan from "./tan"
import time from "./time"
import timeSync from "./timeSync"
import timeAsync from "./timeAsync"
import transpose from "./transpose"
import union from "./union"
import variance from "./variance"
import vectorize from "./vectorize"
import zeros from "./zeros"
import zip from "./zip"

const out = {
  abs,
  add,
  apply,
  arccos,
  arcsin,
  arctan,
  argmax,
  argmin,
  assert,
  ceil,
  chop,
  clamp,
  combinations,
  copy,
  correl,
  cos,
  count,
  covariance,
  DataFrame,
  diff,
  distance,
  divide,
  dot,
  dropMissing,
  dropMissingPairwise,
  dropNaN,
  dropNaNPairwise,
  dropUndefined,
  exp,
  factorial,
  find,
  findAll,
  flatten,
  float,
  floor,
  identity,
  indexOf,
  int,
  intersect,
  inverse,
  isArray,
  isBoolean,
  isDataFrame,
  isEqual,
  isFunction,
  isJagged,
  isNested,
  isNumber,
  isObject,
  isSeries,
  isString,
  isUndefined,
  lerp,
  log,
  MathError,
  max,
  mean,
  median,
  min,
  mod,
  mode,
  multiply,
  ndarray,
  normal,
  ones,
  permutations,
  pow,
  print,
  product,
  random,
  range,
  remap,
  reshape,
  reverse,
  round,
  scale,
  seed,
  Series,
  set,
  shape,
  shuffle,
  sign,
  sin,
  sort,
  sqrt,
  std,
  stdev,
  subtract,
  sum,
  tan,
  time,
  timeSync,
  timeAsync,
  transpose,
  union,
  variance,
  vectorize,
  zeros,
  zip,

  dump() {
    const pub = typeof global !== "undefined" ? global : window

    if (!pub) {
      throw new MathError(
        "Cannot dump functions into global scope because neither `global` nor `window` exist in the current context!"
      )
    }

    Object.keys(this).forEach(key => {
      try {
        Object.defineProperty(pub, key, {
          configurable: false,
          enumerable: true,
          writable: false,
          value: this[key],
        })
      } catch (e) {
        pub[key] = this[key]
      }
    })
  },
}

if (typeof window !== "undefined") {
  window.JSMathTools = out
}

export default out
