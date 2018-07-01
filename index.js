import './components/enemy'

import './primitives/a-enemy'

const enemyData = [
  {
    model: '#bad-boss'
  },
  {
    model: '#caveman'
  },
  {
    model: '#dictator'
  }
]

const GAME_TIMER = 15

window.onload = function () {
  let intervalFunc = ''

  let gameStart = false
  let score = 0
  let countdown = GAME_TIMER
  let startButtonElm = document.getElementById('start-button')
  let scoreElm = document.getElementById('score')
  let scoreEnemyElm = document.getElementById('score-enemy')
  let startingElm = document.getElementById('starting')
  let gameoverElm = document.getElementById('gameover')

  startingElm.setAttribute('visible', false)

  startButtonElm.addEventListener('mousedown', evt => {
    if (!gameStart) {
      gameStart = true
      score = 0
      countdown = GAME_TIMER
      evt.target.setAttribute('visible', false)
      startingElm.setAttribute('visible', true)
      startingElm.setAttribute('value', countdown)
      scoreEnemyElm.setAttribute('visible', true)
      scoreEnemyElm.setAttribute('position', '0 -1 0')
      scoreElm.setAttribute('value', score)
      gameoverElm.setAttribute('visible', false)

      intervalFunc = setInterval(() => {
        for (let i = 0; i < (Math.floor(Math.random() * 3) + 1); i++){
          let newEnemy  = document.createElement('a-enemy')
          let ramdomEnemy = Math.floor(Math.random() * 3)
          let seletedEnemyData = enemyData[ramdomEnemy]
          newEnemy.setAttribute('gltf-model', seletedEnemyData.model)
          newEnemy.setAttribute('position', '-1 0.5 ' + ((Math.random() * 2) - 0.5))
          newEnemy.setAttribute('speed', ((Math.random() * 1000) + 1000))
          newEnemy.setAttribute('animation-mixer', {})
          document.getElementById('scene').appendChild(newEnemy)
        }

        countdown -= 1
        startingElm.setAttribute('value', countdown)
      }, 1000)

      setTimeout(() => {
        evt.target.setAttribute('visible', true)
        startingElm.setAttribute('visible', false)
        scoreEnemyElm.setAttribute('visible', false)
        gameoverElm.setAttribute('visible', true)

        document.querySelectorAll('a-enemy').forEach(e => e.parentNode.removeChild(e));

        clearInterval(intervalFunc)
        gameStart = false
      }, GAME_TIMER * 1000)
    }
  })

  window.addEventListener('add-score', evt => {
    score += 1
    scoreElm.setAttribute('value', score)

    let enemyPosition = evt.detail.value
    enemyPosition.y += 0.5

    scoreEnemyElm.setAttribute('value', '+1')
    scoreEnemyElm.setAttribute('position', enemyPosition)
  })

  window.addEventListener('remove-score', evt => {
    score -= 1
    scoreElm.setAttribute('value', score)

    scoreEnemyElm.setAttribute('value', '-1')
    let enemyPosition = evt.detail.value
    enemyPosition.y += 0.5

    scoreEnemyElm.setAttribute('position', enemyPosition)
  })
}