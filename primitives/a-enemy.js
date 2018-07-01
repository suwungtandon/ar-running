const extendDeep = AFRAME.utils.extendDeep

const meshMixin = AFRAME.primitives.getMeshMixin()

AFRAME.registerPrimitive('a-enemy', {
  defaultComponents: {
    enemy: { speed: '1000' },
    'animation-mixer': '',
    position: '-1 0 0',
    scale: '0.3 0.3 0.3',
    rotation: "0 90 0"
  },
  mappings: {
    speed: 'enemy.speed'
  }
})
