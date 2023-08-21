'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

// onload
$(onInit)

function onInit() {
  console.log('Started...')
  createQuestsTree()
  addEventListeners()
}

function addEventListeners() {
  $('.btn-start').click(onStartGuessing)
  // Insert data to element's data-list
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse)
  $('.btn-no').click({ ans: 'no' }, onUserResponse)
  $('.btn-add-guess').click(onAddGuess)
  $('.btn-restart').click(onRestartGame)
}


function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()

  renderQuest()
  // DONE: show the quest section
  $('.quest').show()

}

function renderQuest() {
  // DONE: select the <h2> inside quest and update its text by the currQuest text
  const currQuest = getCurrQuest()
  $('.question').text(currQuest.txt)
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // alert('Yes, I knew it!')
      $('.quest').hide()
      $('.win').show()
      // DONE: improve UX
    } else {
      alert('I dont know...teach me!')
      // DONE: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // DONE: update the lastRes global var
    gLastRes = res
    // console.log('gLastRes', gLastRes)
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // console.log(newGuess)
  // console.log(newQuest)

  // DONE: Get the inputs' values
  // DONE: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
  location.reload()
}

