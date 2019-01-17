import * as $ from 'jquery/dist/jquery.js'
import 'popper.js/dist/popper.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'hammerjs'

$(() => {
  $('.dropdown').hover(() => {
    $('.dropdown-menu', this).stop(true, true).fadeIn('fast')
  }, () => {
    $('.dropdown-menu', this).stop(true, true).fadeOut('fast')
  })
})
