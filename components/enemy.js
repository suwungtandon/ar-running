AFRAME.registerComponent('enemy', {
  schema: {
    speed: {type: 'number'}
  },
  init: function () {
    this.directionVec3 = new THREE.Vector3()

    this.el.addEventListener('mousedown', () => {
      window.dispatchEvent(new CustomEvent('add-score', { detail: { value: this.el.getAttribute('position') } }))
      let entity = this.el
      entity.parentNode.removeChild(entity)
    })
  },
  tick: function () {
    let directionVec3 = this.directionVec3
    let targetPosition = new THREE.Vector3()
    targetPosition.x = 1.3
    targetPosition.y = 0
    targetPosition.z = 0

    let currentPosition = this.el.object3D.position

    directionVec3.copy(targetPosition).sub(currentPosition);

    let distance = directionVec3.length();

    if (distance < 1) {
      let entity = this.el
      entity.parentNode.removeChild(entity)
      window.dispatchEvent(new CustomEvent('remove-score', { detail: { value: this.el.getAttribute('position') } }))
      return
    }

    let factor = this.data.speed / distance
    let axis = ['x', 'y', 'z']
    axis.forEach(function (axis) {
      directionVec3[axis] *= factor * (0.01 / 1000)
    })

    this.el.setAttribute('position', {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y + directionVec3.y,
      z: currentPosition.z + directionVec3.z
    })
  }
})