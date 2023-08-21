'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null
const STOARGE_KEY = 'questDB'


function createQuestsTree() {
  gQuestsTree = loadFromStorage(STOARGE_KEY)
  if(!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    saveToStorage(STOARGE_KEY,gQuestsTree)
  }
  gPrevQuest = null
  gCurrQuest = gQuestsTree
  console.log(gCurrQuest)
  // console.log('gQuestsTree', gQuestsTree)
}

function createQuest(txt) {
  return {
    txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // DONE: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
  // console.log('gPrevQuest', gPrevQuest)
  // console.log('gCurrQuest', gCurrQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // DONE: Create and Connect the 2 Quests to the quetsions tree
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest
  saveToStorage(STOARGE_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}
