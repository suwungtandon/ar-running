// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
AFRAME.registerComponent('enemy', {
  schema: {
    speed: { type: 'number' }
  },
  init: function init() {
    var _this = this;

    this.directionVec3 = new THREE.Vector3();

    this.el.addEventListener('mousedown', function () {
      window.dispatchEvent(new CustomEvent('add-score', { detail: { value: _this.el.getAttribute('position') } }));
      var entity = _this.el;
      entity.parentNode.removeChild(entity);
    });
  },
  tick: function tick() {
    var directionVec3 = this.directionVec3;
    var targetPosition = new THREE.Vector3();
    targetPosition.x = 1.3;
    targetPosition.y = 0;
    targetPosition.z = 0;

    var currentPosition = this.el.object3D.position;

    directionVec3.copy(targetPosition).sub(currentPosition);

    var distance = directionVec3.length();

    if (distance < 1) {
      var entity = this.el;
      entity.parentNode.removeChild(entity);
      window.dispatchEvent(new CustomEvent('remove-score', { detail: { value: this.el.getAttribute('position') } }));
      return;
    }

    var factor = this.data.speed / distance;
    var axis = ['x', 'y', 'z'];
    axis.forEach(function (axis) {
      directionVec3[axis] *= factor * (0.01 / 1000);
    });

    this.el.setAttribute('position', {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y + directionVec3.y,
      z: currentPosition.z + directionVec3.z
    });
  }
});
},{}],7:[function(require,module,exports) {
var extendDeep = AFRAME.utils.extendDeep;

var meshMixin = AFRAME.primitives.getMeshMixin();

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
});
},{}],4:[function(require,module,exports) {
'use strict';

require('./components/enemy');

require('./primitives/a-enemy');

var enemyData = [{
  model: '#bad-boss'
}, {
  model: '#caveman'
}, {
  model: '#dictator'
}];

var GAME_TIMER = 15;

window.onload = function () {
  var intervalFunc = '';

  var gameStart = false;
  var score = 0;
  var countdown = GAME_TIMER;
  var startButtonElm = document.getElementById('start-button');
  var scoreElm = document.getElementById('score');
  var scoreEnemyElm = document.getElementById('score-enemy');
  var startingElm = document.getElementById('starting');
  var gameoverElm = document.getElementById('gameover');

  startingElm.setAttribute('visible', false);

  startButtonElm.addEventListener('mousedown', function (evt) {
    if (!gameStart) {
      gameStart = true;
      score = 0;
      countdown = GAME_TIMER;
      evt.target.setAttribute('visible', false);
      startingElm.setAttribute('visible', true);
      startingElm.setAttribute('value', countdown);
      scoreEnemyElm.setAttribute('visible', true);
      scoreEnemyElm.setAttribute('position', '0 -1 0');
      scoreElm.setAttribute('value', score);
      gameoverElm.setAttribute('visible', false);

      intervalFunc = setInterval(function () {
        for (var i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
          var newEnemy = document.createElement('a-enemy');
          var ramdomEnemy = Math.floor(Math.random() * 3);
          var seletedEnemyData = enemyData[ramdomEnemy];
          newEnemy.setAttribute('gltf-model', seletedEnemyData.model);
          newEnemy.setAttribute('position', '-1 0.5 ' + (Math.random() * 2 - 0.5));
          newEnemy.setAttribute('speed', Math.random() * 1000 + 1000);
          newEnemy.setAttribute('animation-mixer', {});
          document.getElementById('scene').appendChild(newEnemy);
        }

        countdown -= 1;
        startingElm.setAttribute('value', countdown);
      }, 1000);

      setTimeout(function () {
        evt.target.setAttribute('visible', true);
        startingElm.setAttribute('visible', false);
        scoreEnemyElm.setAttribute('visible', false);
        gameoverElm.setAttribute('visible', true);

        document.querySelectorAll('a-enemy').forEach(function (e) {
          return e.parentNode.removeChild(e);
        });

        clearInterval(intervalFunc);
        gameStart = false;
      }, GAME_TIMER * 1000);
    }
  });

  window.addEventListener('add-score', function (evt) {
    score += 1;
    scoreElm.setAttribute('value', score);

    var enemyPosition = evt.detail.value;
    enemyPosition.y += 0.5;

    scoreEnemyElm.setAttribute('value', '+1');
    scoreEnemyElm.setAttribute('position', enemyPosition);
  });

  window.addEventListener('remove-score', function (evt) {
    score -= 1;
    scoreElm.setAttribute('value', score);

    scoreEnemyElm.setAttribute('value', '-1');
    var enemyPosition = evt.detail.value;
    enemyPosition.y += 0.5;

    scoreEnemyElm.setAttribute('position', enemyPosition);
  });
};
},{"./components/enemy":6,"./primitives/a-enemy":7}],5:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '59990' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[5,4], null)
//# sourceMappingURL=/example.a5069edc.map