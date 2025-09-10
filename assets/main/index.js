System.register("chunks:///_virtual/ArrowPointer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, Quat, Component, Player;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Component = module.Component;
    }, function (module) {
      Player = module.Player;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "61494DmaMJKZ6KQNRyuYMdG", "ArrowPointer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ArrowPointer = exports('ArrowPointer', (_dec = ccclass('ArrowPointer'), _dec2 = property({
        type: Player
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ArrowPointer, _Component);
        function ArrowPointer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "Player", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TargetNode", _descriptor2, _assertThisInitialized(_this));
          _this._tmpDir = new Vec3();
          return _this;
        }
        var _proto = ArrowPointer.prototype;
        _proto.update = function update() {
          var targetPos = this.GetTargetPosition();
          if (!targetPos) return;
          var selfPos = this.node.worldPosition;
          Vec3.subtract(this._tmpDir, targetPos, selfPos);
          if (this._tmpDir.lengthSqr() < 1e-6) return;
          var angleY = Math.atan2(this._tmpDir.x, this._tmpDir.z);
          var quat = new Quat();
          Quat.fromEuler(quat, 0, angleY * 180 / Math.PI, 0);
          this.node.setWorldRotation(quat);
        };
        _proto.SetTargetNode = function SetTargetNode(target) {
          this.TargetNode = target;
        };
        _proto.GetTargetPosition = function GetTargetPosition() {
          if (this.TargetNode) {
            return this.TargetNode.worldPosition.clone();
          }
          return null;
        };
        return ArrowPointer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "TargetNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioPlayer.ts", ['cc'], function (exports) {
  var cclegacy, Node, AudioSource;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      AudioSource = module.AudioSource;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0fed7dW7F1GH7cf7asOknE0", "AudioPlayer", undefined);

      // Интерфейс для хранения информации о звуке

      var AudioPlayer = exports('AudioPlayer', /*#__PURE__*/function () {
        function AudioPlayer() {}
        AudioPlayer.init = function init(audioRootNode) {
          this._audioRoot = audioRootNode;
        };
        AudioPlayer.addSound = function addSound(key, clip, volume, pitch, loop) {
          if (volume === void 0) {
            volume = 1.0;
          }
          if (pitch === void 0) {
            pitch = 1.0;
          }
          if (loop === void 0) {
            loop = false;
          }
          if (!clip) {
            console.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0437\u0432\u0443\u043A \u0441 \u043A\u043B\u044E\u0447\u043E\u043C '" + key + "': \u043A\u043B\u0438\u043F \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D");
            return;
          }
          this._sounds.set(key, {
            clip: clip,
            volume: volume,
            pitch: pitch,
            loop: loop
          });
        }

        /**
         * Воспроизведение звука по ключу
         * @param key Ключ звука
         * @param volume Опциональная громкость (переопределяет установленную)
         * @param pitch Опциональная высота тона (переопределяет установленную)
         * @param loop Опционально зациклить (переопределяет установленное)
         * @returns Уникальный идентификатор источника звука или null в случае ошибки
         */;
        AudioPlayer.play = function play(key, volume, pitch, loop) {
          if (!this._audioRoot) {
            console.error('AudioManager не инициализирован. Вызовите AudioManager.init() в начале игры.');
            return null;
          }
          var sound = this._sounds.get(key);
          if (!sound) {
            console.error("\u0417\u0432\u0443\u043A \u0441 \u043A\u043B\u044E\u0447\u043E\u043C '" + key + "' \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
            return null;
          }

          // Создаем новый узел для источника звука
          var sourceNode = new Node("AudioSource_" + this._sourceCounter++);
          this._audioRoot.addChild(sourceNode);

          // Добавляем компонент AudioSource
          var audioSource = sourceNode.addComponent(AudioSource);

          // Настраиваем источник звука
          var finalVolume = volume !== undefined ? volume : sound.volume;
          var finalLoop = loop !== undefined ? loop : sound.loop;
          audioSource.clip = sound.clip;
          audioSource.volume = finalVolume;
          audioSource.loop = finalLoop;

          // Сохраняем ссылку на источник звука
          sound.source = audioSource;

          // Воспроизводим звук
          audioSource.play();

          // Если звук не зацикленный, удаляем источник после завершения
          if (!finalLoop) {
            audioSource.node.once(AudioSource.EventType.ENDED, function () {
              sourceNode.destroy();
            });
          }
          return sourceNode.uuid;
        }

        /**
         * Остановка воспроизведения звука
         * @param key Ключ звука или идентификатор источника
         */;
        AudioPlayer.stop = function stop(key) {
          var _this$_audioRoot;
          // Если передан UUID источника
          var sourceNode = (_this$_audioRoot = this._audioRoot) == null ? void 0 : _this$_audioRoot.getChildByUuid(key);
          if (sourceNode) {
            var audioSource = sourceNode.getComponent(AudioSource);
            if (audioSource) {
              audioSource.stop();
            }
            sourceNode.destroy();
            return;
          }

          // Если передан ключ звука
          var sound = this._sounds.get(key);
          if (sound != null && sound.source) {
            sound.source.stop();
            sound.source.node.destroy();
            sound.source = undefined;
          }
        }

        /**
         * Остановка всех звуков
         */;
        AudioPlayer.stopAll = function stopAll() {
          var _this$_audioRoot2;
          (_this$_audioRoot2 = this._audioRoot) == null || _this$_audioRoot2.destroyAllChildren();

          // Сбрасываем ссылки на источники
          this._sounds.forEach(function (sound) {
            sound.source = undefined;
          });
        }

        /**
         * Пауза воспроизведения звука
         * @param key Ключ звука или идентификатор источника
         */;
        AudioPlayer.pause = function pause(key) {
          var _this$_audioRoot3;
          // Если передан UUID источника
          var sourceNode = (_this$_audioRoot3 = this._audioRoot) == null ? void 0 : _this$_audioRoot3.getChildByUuid(key);
          if (sourceNode) {
            var audioSource = sourceNode.getComponent(AudioSource);
            audioSource == null || audioSource.pause();
            return;
          }

          // Если передан ключ звука
          var sound = this._sounds.get(key);
          if (sound != null && sound.source) {
            sound.source.pause();
          }
        }

        /**
         * Возобновление воспроизведения звука
         * @param key Ключ звука или идентификатор источника
         */;
        AudioPlayer.resume = function resume(key) {
          var _this$_audioRoot4;
          // Если передан UUID источника
          var sourceNode = (_this$_audioRoot4 = this._audioRoot) == null ? void 0 : _this$_audioRoot4.getChildByUuid(key);
          if (sourceNode) {
            var audioSource = sourceNode.getComponent(AudioSource);
            audioSource == null || audioSource.play();
            return;
          }

          // Если передан ключ звука
          var sound = this._sounds.get(key);
          if (sound != null && sound.source) {
            sound.source.play();
          }
        }

        /**
         * Проверка, воспроизводится ли звук
         * @param key Ключ звука или идентификатор источника
         */;
        AudioPlayer.isPlaying = function isPlaying(key) {
          var _this$_audioRoot5, _sound$source;
          // Если передан UUID источника
          var sourceNode = (_this$_audioRoot5 = this._audioRoot) == null ? void 0 : _this$_audioRoot5.getChildByUuid(key);
          if (sourceNode) {
            var audioSource = sourceNode.getComponent(AudioSource);
            return (audioSource == null ? void 0 : audioSource.playing) || false;
          }

          // Если передан ключ звука
          var sound = this._sounds.get(key);
          return (sound == null || (_sound$source = sound.source) == null ? void 0 : _sound$source.playing) || false;
        }

        /**
         * Установка громкости звука
         * @param key Ключ звука или идентификатор источника
         * @param volume Новая громкость (от 0 до 1)
         */;
        AudioPlayer.setVolume = function setVolume(key, volume) {
          var _this$_audioRoot6;
          // Если передан UUID источника
          var sourceNode = (_this$_audioRoot6 = this._audioRoot) == null ? void 0 : _this$_audioRoot6.getChildByUuid(key);
          if (sourceNode) {
            var audioSource = sourceNode.getComponent(AudioSource);
            if (audioSource) {
              audioSource.volume = Math.max(0, Math.min(1, volume));
            }
            return;
          }

          // Если передан ключ звука
          var sound = this._sounds.get(key);
          if (sound) {
            sound.volume = Math.max(0, Math.min(1, volume));
            if (sound.source) {
              sound.source.volume = sound.volume;
            }
          }
        }

        /**
         * Очистка всех звуков из менеджера
         */;
        AudioPlayer.clear = function clear() {
          this.stopAll();
          this._sounds.clear();
        }

        /**
         * Удаление звука по ключу
         * @param key Ключ звука для удаления
         */;
        AudioPlayer.removeSound = function removeSound(key) {
          this.stop(key);
          this._sounds["delete"](key);
        };
        return AudioPlayer;
      }());
      // Корневой узел для всех аудио источников
      AudioPlayer._audioRoot = null;
      // Словарь для хранения звуков и их настроек
      AudioPlayer._sounds = new Map();
      // Счетчик для генерации уникальных имен источников звука
      AudioPlayer._sourceCounter = 0;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuyPlatform.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TomatoPlace.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, TomatoPlace;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      TomatoPlace = module.TomatoPlace;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "cd39d2H/bpFZ7VWAvVynyro", "BuyPlatform", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BuyPlatform = exports('BuyPlatform', (_dec = ccclass('BuyPlatform'), _dec2 = property({
        type: TomatoPlace
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuyPlatform, _Component);
        function BuyPlatform() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "MoneyPlace", _descriptor, _assertThisInitialized(_this));
          _this._isEndGame = false;
          _this._buyTrigger = void 0;
          _this._currentMoney = 0;
          _this._player = void 0;
          _this._isWorking = false;
          _this._moneyForPack = 10;
          _this.LocationOpening = null;
          return _this;
        }
        var _proto = BuyPlatform.prototype;
        _proto.update = function update() {
          if (this._buyTrigger.IsTriggered && this._isWorking == false) {
            this._isWorking = true;
            this.IncreaseMoney();
          }
        };
        _proto.Init = function Init(trigger, player) {
          this._buyTrigger = trigger;
          this._player = player;
        };
        _proto.IncreaseMoney = /*#__PURE__*/function () {
          var _IncreaseMoney = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this._buyTrigger.IsTriggered) {
                    _context.next = 10;
                    break;
                  }
                  if (!(this._player.Money <= 9 || !this._buyTrigger.IsTriggered)) {
                    _context.next = 5;
                    break;
                  }
                  console.log(this._isWorking);
                  this._isWorking = false;
                  return _context.abrupt("break", 10);
                case 5:
                  if (this.MoneyPlace.DefineCurrentActivateTomato() != null) {
                    this._currentMoney += this._moneyForPack;
                    this._player.DecreaseMoney(this._moneyForPack, this.MoneyPlace.DefineCurrentActivateTomato().worldPosition);
                    this.MoneyPlace.ActivateTomato();
                  } else {
                    if (this._isEndGame == false) {
                      this.OpenLocation();
                      this._isEndGame = true;
                    }
                  }
                  _context.next = 8;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 60);
                  });
                case 8:
                  _context.next = 0;
                  break;
                case 10:
                  this._isWorking = false;
                case 11:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function IncreaseMoney() {
            return _IncreaseMoney.apply(this, arguments);
          }
          return IncreaseMoney;
        }();
        _proto.OpenLocation = /*#__PURE__*/function () {
          var _OpenLocation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 600);
                  });
                case 2:
                  this.LocationOpening();
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function OpenLocation() {
            return _OpenLocation.apply(this, arguments);
          }
          return OpenLocation;
        }();
        return BuyPlatform;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "MoneyPlace", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Camera, view, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Camera = module.Camera;
      view = module.view;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "de50e8oHt1CuoB5SS0R6cCJ", "CameraController", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CameraController = exports('CameraController', (_dec = ccclass('CameraController'), _dec2 = property(Camera), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CameraController, _Component);
        function CameraController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "camera", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = CameraController.prototype;
        _proto.start = function start() {
          this.adjustCamera();
          view.on('canvas-resize', this.adjustCamera, this);
        };
        _proto.onDestroy = function onDestroy() {
          view.off('canvas-resize', this.adjustCamera, this);
        };
        _proto.adjustCamera = function adjustCamera() {
          if (!this.camera) return;
          var canvas = view.getDesignResolutionSize();
          var ratio = canvas.width / canvas.height;
          this.camera.orthoHeight = canvas.height / 2;
        };
        return CameraController;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraFollower.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "63397Il97ZERrvQSyjeiKQ+", "CameraFollower", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CameraFollower = exports('CameraFollower', (_dec = ccclass('CameraFollower'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        tooltip: 'Смещение камеры по оси X'
      }), _dec4 = property({
        tooltip: 'Высота камеры над целью (смещение по Y)'
      }), _dec5 = property({
        tooltip: 'Расстояние от камеры до цели (смещение по Z)'
      }), _dec6 = property({
        tooltip: 'Скорость следования камеры (чем больше, тем быстрее)'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CameraFollower, _Component);
        function CameraFollower() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "offsetX", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "offsetY", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "offsetZ", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "followSpeed", _descriptor5, _assertThisInitialized(_this));
          _this._currentPosition = new Vec3();
          return _this;
        }
        var _proto = CameraFollower.prototype;
        _proto.start = function start() {
          if (this.target) {
            this._updateCameraPosition(this.target.worldPosition);
          }
        };
        _proto.update = function update(deltaTime) {
          if (!this.target) return;

          // Вычисляем целевую позицию камеры
          var targetPos = this.target.worldPosition;
          var desiredPosition = new Vec3(targetPos.x + this.offsetX, targetPos.y + this.offsetY, targetPos.z + this.offsetZ);

          // Плавное перемещение камеры
          Vec3.lerp(this._currentPosition, this.node.position, desiredPosition, this.followSpeed * deltaTime);

          // Устанавливаем новую позицию камеры
          this.node.setWorldPosition(this._currentPosition);

          // Направляем камеру на цель
          this.node.lookAt(targetPos);
        }

        // Обновление позиции камеры
        ;

        _proto._updateCameraPosition = function _updateCameraPosition(targetPos) {
          this._currentPosition.set(targetPos.x + this.offsetX, targetPos.y + this.offsetY, targetPos.z + this.offsetZ);
          this.node.setWorldPosition(this._currentPosition);
        };
        return CameraFollower;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "offsetX", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "offsetY", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "offsetZ", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "followSpeed", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterMovement.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Vec2, animation, input, Input, Vec3, KeyCode, Component, Player;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec2 = module.Vec2;
      animation = module.animation;
      input = module.input;
      Input = module.Input;
      Vec3 = module.Vec3;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      Player = module.Player;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "2b7421V4nJMar9FknvvA0KM", "CharacterMovement", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CharacterMovement = exports('CharacterMovement', (_dec = ccclass('CharacterMovement'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Boolean
      }), _dec4 = property({
        type: Number
      }), _dec5 = property({
        type: Number
      }), _dec6 = property({
        type: Number
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CharacterMovement, _Component);
        function CharacterMovement() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "characterNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "useMobileInput", _descriptor2, _assertThisInitialized(_this));
          // Включено мобильное управление по умолчанию
          _initializerDefineProperty(_this, "moveSpeed", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rotationSpeed", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "smoothFactor", _descriptor5, _assertThisInitialized(_this));
          // Плавность движения джойстика
          _initializerDefineProperty(_this, "characterModel", _descriptor6, _assertThisInitialized(_this));
          // Ссылка на модель персонажа для анимаций
          _initializerDefineProperty(_this, "joystickNode", _descriptor7, _assertThisInitialized(_this));
          // Ссылка на ноду с джойстиком
          _this._animator = null;
          // Для управления анимациями
          _this._joystick = null;
          _this._currentVelocity = new Vec2();
          // Для плавного движения
          _this._moveDirection = new Vec2(0, 0);
          _this._targetRotation = 0;
          _this._currentRotation = 0;
          _this._isMoving = false;
          _this._rotationSpeed = 10.0;
          // Скорость поворота (градусов в секунду)
          _this._isInitialized = false;
          _this._player = void 0;
          _this._keyMap = new Map();
          return _this;
        }
        var _proto = CharacterMovement.prototype;
        _proto.init = function init(joystick) {
          if (joystick === void 0) {
            joystick = null;
          }
          if (this._isInitialized) return;
          this._joystick = joystick;
          this._setupInput();
          this._isInitialized = true;
          if (!this.characterNode) {
            this.characterNode = this.node;
          }
        };
        _proto.onLoad = function onLoad() {
          this._player = this.getComponent(Player);
          this._animator = this.getComponent(animation.AnimationController);
          this._setupInput();
          if (this.joystickNode) {
            this._joystick = this.joystickNode.getComponent('Joystick');
          }
        };
        _proto.onDestroy = function onDestroy() {
          this._cleanupInput();
        };
        _proto.update = function update(deltaTime) {
          this._updateMovement(deltaTime);
        };
        _proto._setupInput = function _setupInput() {
          // Set up keyboard event listeners
          input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this._onKeyUp, this);
        };
        _proto._cleanupInput = function _cleanupInput() {
          // Clean up keyboard event listeners
          input.off(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this._onKeyUp, this);
        };
        _proto._onKeyDown = function _onKeyDown(event) {
          this._keyMap.set(event.keyCode, true);
        };
        _proto._onKeyUp = function _onKeyUp(event) {
          this._keyMap.set(event.keyCode, false);
        };
        _proto._isKeyDown = function _isKeyDown(keyCode) {
          return this._keyMap.get(keyCode) || false;
        };
        _proto._updateMovement = function _updateMovement(deltaTime) {
          this._updateDirection(deltaTime);
          this._applyMovement(deltaTime);
        };
        _proto._applyMovement = function _applyMovement(deltaTime) {
          if (this._isMoving) {
            // For non-mobile input, use the original movement
            if (!this.useMobileInput) {
              var moveDelta = new Vec3(this._moveDirection.x, 0, this._moveDirection.y).multiplyScalar(this.moveSpeed * deltaTime);
              this.characterNode.translate(moveDelta, Node.NodeSpace.LOCAL);
              this._targetRotation = Math.atan2(this._moveDirection.x, this._moveDirection.y) * 180 / Math.PI;
              var currentRotation = this.characterNode.eulerAngles.y;
              var rotation = this.lerpAngle(currentRotation, this._targetRotation, this.rotationSpeed * deltaTime);
              this.characterNode.eulerAngles = new Vec3(0, rotation, 0);
            }
            // Mobile movement is now handled in _updateDirection
          }
        };

        _proto.lerpAngle = function lerpAngle(current, target, speed) {
          var diff = target - current;

          // Normalize the difference to the shortest path
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;

          // Apply smoothing
          return current + diff * Math.min(speed, 1.0);
        };
        _proto._updateDirection = function _updateDirection(deltaTime) {
          var _this$_joystick;
          // Reset movement
          this._moveDirection.set(0, 0);
          this._isMoving = false;

          // Обработка ПК управления (только если мобильный ввод выключен)
          if (!this.useMobileInput) {
            if (this._isKeyDown(KeyCode.KEY_W) || this._isKeyDown(KeyCode.ARROW_UP)) {
              this._moveDirection.y += 1;
              this._isMoving = true;
            }
            if (this._isKeyDown(KeyCode.KEY_S) || this._isKeyDown(KeyCode.ARROW_DOWN)) {
              this._moveDirection.y -= 1;
              this._isMoving = true;
            }
            if (this._isKeyDown(KeyCode.KEY_A) || this._isKeyDown(KeyCode.ARROW_LEFT)) {
              this._moveDirection.x -= 1;
              this._isMoving = true;
            }
            if (this._isKeyDown(KeyCode.KEY_D) || this._isKeyDown(KeyCode.ARROW_RIGHT)) {
              this._moveDirection.x += 1;
              this._isMoving = true;
            }
          }

          // Обработка мобильного ввода (джойстик)
          if (this.useMobileInput && (_this$_joystick = this._joystick) != null && _this$_joystick.IsActive) {
            var joyDir = this._joystick.Direction.clone();

            // Проверяем, есть ли отклонение стика
            this._isMoving = joyDir.lengthSqr() > 0.0001;
            if (this._isMoving) {
              // Переводим экранное направление стика в мировое (изометрия 45°)
              // Инвертируем Y, так как в Unity/CC ось Y направлена вниз
              var isoDir = new Vec2(joyDir.x + joyDir.y,
              // ось X мира
              -joyDir.x + joyDir.y // ось Z мира (как Y во внутреннем 2D)
              );

              // Нормализуем полученный вектор
              if (isoDir.lengthSqr() > 0) isoDir.normalize();

              // Плавно интерполируем направление для устранения резких скачков
              this._currentVelocity.lerp(isoDir, this.smoothFactor * deltaTime);
              this._moveDirection = this._currentVelocity.clone();

              // Обновляем параметры анимации
              if (this._animator) {
                var _this$_player$IsCarry, _this$_player;
                this._animator.setValue('IsMoving', true);
                this._animator.setValue('IsCarry', (_this$_player$IsCarry = (_this$_player = this._player) == null ? void 0 : _this$_player.IsCarry) != null ? _this$_player$IsCarry : false);
              }

              // Поворачиваем персонажа лицом к направлению движения
              // Используем atan2 для получения угла в радианах, затем конвертируем в градусы
              // Ось Z (вперед) = (0,1) в локальных координатах, поэтому atan2(x, y)
              var targetAngle = Math.atan2(this._moveDirection.x, this._moveDirection.y) * 180 / Math.PI;

              // Плавно интерполируем текущий угол к целевому
              this._currentRotation = this.lerpAngle(this._currentRotation, targetAngle, this.rotationSpeed * deltaTime);

              // Применяем поворот к персонажу
              this.characterNode.eulerAngles = new Vec3(0, this._currentRotation, 0);

              // Перемещаем персонажа
              var moveSpeed = this.moveSpeed * deltaTime;
              var moveDelta = new Vec3(this._moveDirection.x * moveSpeed, 0, this._moveDirection.y * moveSpeed);
              this.characterNode.translate(moveDelta, Node.NodeSpace.WORLD);
            } else {
              // Когда стик в покое, сбрасываем параметры движения
              if (this._animator) {
                this._animator.setValue('IsMoving', false);
              }
              this._moveDirection.set(0, 0);
            }
          }

          // Normalize movement vector if needed
          if (this._isMoving && this._moveDirection.lengthSqr() > 1) {
            this._moveDirection.normalize();
          }
        };
        _createClass(CharacterMovement, [{
          key: "IsMoving",
          get: function get() {
            return !this._moveDirection.equals(Vec2.ZERO);
          }
        }, {
          key: "MoveDirection",
          get: function get() {
            return new Vec3(this._moveDirection.x, 0, this._moveDirection.y);
          }
        }]);
        return CharacterMovement;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "characterNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "useMobileInput", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rotationSpeed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "smoothFactor", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5.0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "characterModel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "joystickNode", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CharacterMovement2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts', './AudioPlayer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, animation, input, Input, RigidBody, CharacterController, Vec3, KeyCode, Component, Player, AudioPlayer;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      animation = module.animation;
      input = module.input;
      Input = module.Input;
      RigidBody = module.RigidBody;
      CharacterController = module.CharacterController;
      Vec3 = module.Vec3;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      AudioPlayer = module.AudioPlayer;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "ff220hwnoBFWqxOwB/XEUGU", "CharacterMovement", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CharacterMovement = exports('CharacterMovement', (_dec = ccclass('CharacterMovement'), _dec2 = property({
        type: animation.AnimationController
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CharacterMovement, _Component);
        function CharacterMovement() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "MoveSpeed", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "RotationSpeed", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "animController", _descriptor3, _assertThisInitialized(_this));
          _this._keyStates = {};
          _this._currentRotation = 0;
          _this._isMoving = false;
          _this._player = void 0;
          _this._rigidBody = null;
          _this._charController = null;
          _this._lastStepTime = 0;
          _this._stepInterval = 0.4;
          return _this;
        }
        var _proto = CharacterMovement.prototype;
        _proto.onLoad = function onLoad() {
          input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.OnKeyUp, this);
          this._player = this.getComponent(Player);
          this._rigidBody = this.getComponent(RigidBody);
          this._charController = this.getComponent(CharacterController);
          if (this._rigidBody) this._rigidBody.angularFactor = Vec3.ZERO;
        };
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.OnKeyUp, this);

          // No need to clean up individual sounds as they're one-shot
        };

        _proto.OnKeyDown = function OnKeyDown(event) {
          this._keyStates[event.keyCode] = true;
        };
        _proto.OnKeyUp = function OnKeyUp(event) {
          this._keyStates[event.keyCode] = false;
        };
        _proto.lerp = function lerp(a, b, t) {
          return a + (b - a) * Math.min(1, Math.max(0, t));
        };
        _proto.angleLerp = function angleLerp(a, b, t) {
          a = this.normalizeAngle(a);
          b = this.normalizeAngle(b);
          var diff = this.normalizeAngle(b - a);
          return this.normalizeAngle(a + diff * Math.min(t, 1));
        };
        _proto.normalizeAngle = function normalizeAngle(angle) {
          return ((angle + 180) % 360 + 360) % 360 - 180;
        };
        _proto.update = function update(deltaTime) {
          var moveDirection = new Vec3(0, 0, 0);
          if (this._keyStates[KeyCode.KEY_W]) {
            moveDirection.x -= 1;
            moveDirection.z -= 1;
          }
          if (this._keyStates[KeyCode.KEY_S]) {
            moveDirection.x += 1;
            moveDirection.z += 1;
          }
          if (this._keyStates[KeyCode.KEY_A]) {
            moveDirection.x -= 1;
            moveDirection.z += 1;
          }
          if (this._keyStates[KeyCode.KEY_D]) {
            moveDirection.x += 1;
            moveDirection.z -= 1;
          }
          var hasMovementInput = moveDirection.lengthSqr() > 0;
          if (hasMovementInput) {
            moveDirection.normalize();
            this._isMoving = true;
            var currentTime = performance.now() / 1000;
            if (currentTime - this._lastStepTime >= this._stepInterval) {
              AudioPlayer.play('step');
              this._lastStepTime = currentTime;
            }
            var targetVelocity = new Vec3(moveDirection.x * this.MoveSpeed, 0, moveDirection.z * this.MoveSpeed);
            if (this._rigidBody) {
              var currentVelocity = new Vec3();
              this._rigidBody.getLinearVelocity(currentVelocity);
              var newVelocity = new Vec3(currentVelocity.x, currentVelocity.y, currentVelocity.z);
              var acceleration = 20.0;
              newVelocity.x = this.lerp(currentVelocity.x, targetVelocity.x, acceleration * deltaTime);
              newVelocity.z = this.lerp(currentVelocity.z, targetVelocity.z, acceleration * deltaTime);
              this._rigidBody.setLinearVelocity(newVelocity);
              var targetY = Math.atan2(moveDirection.x, moveDirection.z) * 180 / Math.PI;
              this._currentRotation = this.angleLerp(this._currentRotation, targetY, this.RotationSpeed * deltaTime);
              this.node.setRotationFromEuler(0, this._currentRotation, 0);
            } else if (this._charController) {
              var displacement = new Vec3(moveDirection.x * this.MoveSpeed * deltaTime, 0, moveDirection.z * this.MoveSpeed * deltaTime);
              this._charController.move(displacement);
              var _targetY = Math.atan2(moveDirection.x, moveDirection.z) * 180 / Math.PI;
              this._currentRotation = this.angleLerp(this._currentRotation, _targetY, this.RotationSpeed * deltaTime);
              this.node.setRotationFromEuler(0, this._currentRotation, 0);
            }
          } else {
            this._isMoving = false;

            // Reset step timer when not moving
            this._lastStepTime = 0;
            if (this._rigidBody) {
              var _currentVelocity = new Vec3();
              this._rigidBody.getLinearVelocity(_currentVelocity);
              var deceleration = 30.0; // Higher value = faster stopping
              var _newVelocity = new Vec3(this.lerp(_currentVelocity.x, 0, deceleration * deltaTime), _currentVelocity.y, this.lerp(_currentVelocity.z, 0, deceleration * deltaTime));
              if (Math.abs(_newVelocity.x) < 0.1) _newVelocity.x = 0;
              if (Math.abs(_newVelocity.z) < 0.1) _newVelocity.z = 0;
              this._rigidBody.setLinearVelocity(_newVelocity);
            } else if (this._charController) {
              var stopVec = new Vec3(0, 0, 0);
              this._charController.move(stopVec);
            }
          }
          if (this.animController) {
            this.animController.setValue('IsMoving', this._isMoving);
            this.animController.setValue('IsCarry', this._player.IsCarry);
          }
        };
        return CharacterMovement;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "MoveSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "RotationSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animController", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Client.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TomatoPlace.ts', './AudioPlayer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, animation, Vec3, Quat, tween, Component, TomatoPlace, AudioPlayer;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      animation = module.animation;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      TomatoPlace = module.TomatoPlace;
    }, function (module) {
      AudioPlayer = module.AudioPlayer;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "21d7a8gbsRKtrLG9J0837IO", "Client", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Client = exports('Client', (_dec = ccclass('Client'), _dec2 = property(), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Client, _Component);
        function Client() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "QueueNumber", _descriptor, _assertThisInitialized(_this));
          _this._tomatoPlace = void 0;
          _this._moveDirection = 2;
          _this._isEndMoving = false;
          _this._isFree = true;
          _this._animator = null;
          _this.ClientMoveEnded = null;
          return _this;
        }
        var _proto = Client.prototype;
        _proto.onLoad = function onLoad() {
          this._tomatoPlace = this.getComponentInChildren(TomatoPlace);
          this._animator = this.getComponent(animation.AnimationController);
        };
        _proto.MoveToPoint = function MoveToPoint(placePosition) {
          if (this._isEndMoving) return;
          this._animator.setValue('IsCarry', false);
          this._animator.setValue("IsMoving", true);
          this._isFree = false;
          this.Move(placePosition);
        };
        _proto.MoveToEndPoint = function MoveToEndPoint(placePosition) {
          var randomNumber = Math.floor(Math.random() * 4) + 1;
          AudioPlayer.play('wow' + randomNumber, 0.2);
          this._isEndMoving = true;
          this._animator.setValue("IsMoving", true);
          this.EndMove(placePosition);
        };
        _proto.ReturnData = function ReturnData(startPosition) {
          this.node.worldPosition = startPosition;
          this._tomatoPlace.DeactivateAllTomatos();
        };
        _proto.ActivateTomatoPack = function ActivateTomatoPack() {
          this._animator.setValue('IsCarry', true);
          this._tomatoPlace.ActivateTomato();
        };
        _proto.Move = function Move(placePosition) {
          var _this2 = this;
          var originalRotation = this.node.rotation.clone();
          var direction = new Vec3(placePosition.x - this.node.worldPosition.x, 0, placePosition.z - this.node.worldPosition.z);
          var targetAngle = Math.atan2(direction.x, direction.z) * 180 / Math.PI;
          var targetRotation = new Quat();
          Quat.fromEuler(targetRotation, 0, targetAngle, 0);
          tween(this.node).to(0.2, {
            worldRotation: targetRotation
          }).call(function () {
            tween(_this2.node).to(1.5, {
              worldPosition: placePosition
            }).call(function () {
              _this2._animator.setValue("IsMoving", false);
              _this2.node.rotation = new Quat(0, 0, 0);
              if (_this2._isEndMoving) {
                _this2._animator.setValue('IsCarry', false);
                _this2._isEndMoving = false;
                _this2._isFree = true;
                _this2.ClientMoveEnded(_this2);
              }
            }).start();
          }).start();
        };
        _proto.EndMove = function EndMove(placePosition) {
          var _this3 = this;
          var targetPosition = new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, this.node.worldPosition.z + 1);
          /* const newRotation = new Quat(0, 180, 0);
           this.node.setRotation(newRotation);*/

          tween(this.node).to(0.4, {
            worldPosition: targetPosition
          }).call(function () {
            _this3.Move(placePosition);
          }).start();
        };
        return Client;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "QueueNumber", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClientContainer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Client.ts', './ClientPlace.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, Component, Client, ClientPlace;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      Client = module.Client;
    }, function (module) {
      ClientPlace = module.ClientPlace;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "a46a4+vHKRFcLt3jjfsILjn", "ClientContainer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ClientContainer = exports('ClientContainer', (_dec = ccclass('ClientContainer'), _dec2 = property({
        type: [Client]
      }), _dec3 = property({
        type: [ClientPlace]
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClientContainer, _Component);
        function ClientContainer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "Clients", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ClientPlaces", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "SpawnPoint", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "StartQueue1", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "StartQueue2", _descriptor5, _assertThisInitialized(_this));
          _this._currentFreeClient = void 0;
          _this._freeClients = [];
          return _this;
        }
        var _proto = ClientContainer.prototype;
        _proto.onLoad = function onLoad() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.Clients), _step; !(_step = _iterator()).done;) {
            var client = _step.value;
            client.ClientMoveEnded = this.ReturnClientToStart.bind(this);
          }
        };
        _proto.update = function update() {
          this.CheckFreePlaces();
        };
        _proto.CheckFreePlaces = function CheckFreePlaces() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.ClientPlaces), _step2; !(_step2 = _iterator2()).done;) {
            var place = _step2.value;
            if (place.IsFree && this.DefineClient()) {
              place.SetClient(this._currentFreeClient);
              this._currentFreeClient.MoveToPoint(place.node.worldPosition);
            }
          }
        };
        _proto.DefineClient = function DefineClient() {
          if (this.Clients.length <= 0) return false;
          this._currentFreeClient = this.Clients[0];
          this.Clients.splice(0, 1);
          return true;
        };
        _proto.ReturnClientToStart = function ReturnClientToStart(Client) {
          Client.ReturnData(this.SpawnPoint.worldPosition);
          this.Clients.push(Client);
        };
        return ClientContainer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Clients", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ClientPlaces", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "SpawnPoint", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "StartQueue1", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "StartQueue2", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClientPlace.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "72381TSKnVHeI3lDsT4t+BY", "ClientPlace", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ClientPlace = exports('ClientPlace', (_dec = ccclass('ClientPlace'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClientPlace, _Component);
        function ClientPlace() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "EndPlace", _descriptor, _assertThisInitialized(_this));
          _this._isFree = true;
          _this._currentClient = null;
          return _this;
        }
        var _proto = ClientPlace.prototype;
        _proto.SetClient = function SetClient(Client) {
          this._isFree = false;
          this._currentClient = Client;
        };
        _proto.UnsetClient = function UnsetClient() {
          this._currentClient.MoveToEndPoint(this.EndPlace.worldPosition);
          this._currentClient = null;
          this._isFree = true;
        };
        _proto.ActivateTomatoOnClient = function ActivateTomatoOnClient() {
          this._currentClient.ActivateTomatoPack();
        };
        _createClass(ClientPlace, [{
          key: "Client",
          get: function get() {
            return this._currentClient;
          }
        }, {
          key: "IsFree",
          get: function get() {
            return this._isFree;
          }
        }]);
        return ClientPlace;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "EndPlace", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EndGameState.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ScaleAnimator.ts', './CameraFollower.ts', './BuyPlatform.ts', './AudioPlayer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Sprite, Node, tween, Vec3, Component, color, ScaleAnimator, CameraFollower, BuyPlatform, AudioPlayer;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Node = module.Node;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
      color = module.color;
    }, function (module) {
      ScaleAnimator = module.ScaleAnimator;
    }, function (module) {
      CameraFollower = module.CameraFollower;
    }, function (module) {
      BuyPlatform = module.BuyPlatform;
    }, function (module) {
      AudioPlayer = module.AudioPlayer;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "649190KR5BCHKvU4y2GFk6b", "EndGameState", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var EndGameState = exports('EndGameState', (_dec = ccclass('EndGameState'), _dec2 = property({
        type: BuyPlatform
      }), _dec3 = property({
        type: ScaleAnimator
      }), _dec4 = property({
        type: CameraFollower
      }), _dec5 = property({
        type: Sprite
      }), _dec6 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EndGameState, _Component);
        function EndGameState() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "BuyPlatform", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ScaleAnimator", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "CameraFollower", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "FinalScreen", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "PointForCamera", _descriptor5, _assertThisInitialized(_this));
          _this.cameraMoveDuration = 1;
          return _this;
        }
        var _proto = EndGameState.prototype;
        _proto.onLoad = function onLoad() {
          this.BuyPlatform.LocationOpening = this.StartEndScript.bind(this);
        };
        _proto.StartEndScript = function StartEndScript() {
          this.CameraFollower.enabled = false;
          this.MoveCameraToPoint();
        };
        _proto.MoveCameraToPoint = function MoveCameraToPoint() {
          var _this2 = this;
          if (!this.PointForCamera) {
            console.error('PointForCamera is not assigned!');
            return;
          }
          var cameraNode = this.CameraFollower.node;
          if (!cameraNode) {
            console.error('Camera node not found!');
            return;
          }
          var startPosition = cameraNode.position.clone();
          var targetPosition = this.PointForCamera.position.clone();

          // Create a new tween for smooth camera movement
          tween(cameraNode).to(this.cameraMoveDuration, {
            position: targetPosition
          }, {
            onUpdate: function onUpdate(target, ratio) {
              // Smoothly interpolate position
              var newPos = new Vec3();
              Vec3.lerp(newPos, startPosition, targetPosition, ratio);
              cameraNode.setPosition(newPos);

              // Optional: Add slight easing for more natural movement
              // You can adjust this based on your needs
              var smoothRatio = ratio < 0.5 ? 2 * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 2) / 2;
              cameraNode.setPosition(startPosition.x + (targetPosition.x - startPosition.x) * smoothRatio, startPosition.y + (targetPosition.y - startPosition.y) * smoothRatio, startPosition.z + (targetPosition.z - startPosition.z) * smoothRatio);
            }
          }).call(function () {
            _this2.ScaleAnimator.PlayScaleAnimation();
            AudioPlayer.play('win', 0.5);
            _this2.TurnOnPackshot();
          }).start();
        };
        _proto.TurnOnPackshot = /*#__PURE__*/function () {
          var _TurnOnPackshot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 1000);
                  });
                case 2:
                  this.FinalScreen.node.active = true;
                case 3:
                  if (!(this.FinalScreen.color.a < 254)) {
                    _context.next = 9;
                    break;
                  }
                  this.FinalScreen.color = color(255, 255, 255, this.FinalScreen.color.a + 10);
                  _context.next = 7;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 10);
                  });
                case 7:
                  _context.next = 3;
                  break;
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function TurnOnPackshot() {
            return _TurnOnPackshot.apply(this, arguments);
          }
          return TurnOnPackshot;
        }();
        return EndGameState;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "BuyPlatform", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ScaleAnimator", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "CameraFollower", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "FinalScreen", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "PointForCamera", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FocusWindow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, director, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a82b5ClSHRBaJB7ly6f1Y+U", "FocusWindow", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FocusWindow = exports('FocusWindow', (_dec = ccclass('FocusWindow'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FocusWindow, _Component);
        function FocusWindow() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.isGamePaused = false;
          _this.handleVisibilityChange = function () {
            if (document.hidden) {
              // Вкладка стала неактивной
              _this.pauseGame();
            } else {
              // Вкладка снова активна
              _this.resumeGame();
            }
          };
          _this.handleWindowFocus = function () {
            // Окно получило фокус
            _this.resumeGame();
          };
          _this.handleWindowBlur = function () {
            // Окно потеряло фокус
            _this.pauseGame();
          };
          _this.handlePageHide = function () {
            // Страница скрыта (например, при переключении вкладок или сворачивании браузера)
            _this.pauseGame();
          };
          _this.handlePageShow = function () {
            // Страница снова видна
            _this.resumeGame();
          };
          return _this;
        }
        var _proto = FocusWindow.prototype;
        _proto.onLoad = function onLoad() {
          // Подписываемся на события видимости страницы
          document.addEventListener('visibilitychange', this.handleVisibilityChange);

          // Обработчик события, когда вкладка становится активной после паузы
          document.addEventListener('focus', this.handleWindowFocus);
          document.addEventListener('blur', this.handleWindowBlur);

          // Обработчик события, когда окно сворачивается/разворачивается
          window.addEventListener('pagehide', this.handlePageHide);
          window.addEventListener('pageshow', this.handlePageShow);
        };
        _proto.onDestroy = function onDestroy() {
          // Отписываемся от событий при уничтожении компонента
          document.removeEventListener('visibilitychange', this.handleVisibilityChange);
          document.removeEventListener('focus', this.handleWindowFocus);
          document.removeEventListener('blur', this.handleWindowBlur);
          window.removeEventListener('pagehide', this.handlePageHide);
          window.removeEventListener('pageshow', this.handlePageShow);
        };
        _proto.pauseGame = function pauseGame() {
          if (this.isGamePaused) return;
          this.isGamePaused = true;
          director.pause();

          // Здесь можно добавить дополнительную логику при паузе
          // Например, показать UI паузы, приглушить звуки и т.д.
          console.log('Game paused - tab switched');
        };
        _proto.resumeGame = function resumeGame() {
          if (!this.isGamePaused) return;
          this.isGamePaused = false;
          director.resume();

          // Здесь можно добавить дополнительную логику при возобновлении
          // Например, скрыть UI паузы, возобновить звуки и т.д.
          console.log('Game resumed - tab active');
        }

        // Метод для принудительной паузы/возобновления игры из других скриптов
        ;

        _proto.setPauseState = function setPauseState(paused) {
          if (paused) {
            this.pauseGame();
          } else {
            this.resumeGame();
          }
        }

        // Проверка, находится ли игра на паузе
        ;

        _proto.isGamePausedState = function isGamePausedState() {
          return this.isGamePaused;
        };
        return FocusWindow;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Initer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts', './TomatoMachine.ts', './TomatoContainer.ts', './ItemSpawner.ts', './Trigger.ts', './TomatoPlace.ts', './TableOrder.ts', './MoneyContainer.ts', './BuyPlatform.ts', './MoneyView.ts', './Tutorial.ts', './AudioPlayer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Component, resources, AudioClip, Player, TomatoMachine, TomatoContainer, ItemSpawner, Trigger, TomatoPlace, TableOrder, MoneyContainer, BuyPlatform, MoneyView, Tutorial, AudioPlayer;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
      resources = module.resources;
      AudioClip = module.AudioClip;
    }, function (module) {
      Player = module.Player;
    }, function (module) {
      TomatoMachine = module.TomatoMachine;
    }, function (module) {
      TomatoContainer = module.TomatoContainer;
    }, function (module) {
      ItemSpawner = module.ItemSpawner;
    }, function (module) {
      Trigger = module.Trigger;
    }, function (module) {
      TomatoPlace = module.TomatoPlace;
    }, function (module) {
      TableOrder = module.TableOrder;
    }, function (module) {
      MoneyContainer = module.MoneyContainer;
    }, function (module) {
      BuyPlatform = module.BuyPlatform;
    }, function (module) {
      MoneyView = module.MoneyView;
    }, function (module) {
      Tutorial = module.Tutorial;
    }, function (module) {
      AudioPlayer = module.AudioPlayer;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;
      cclegacy._RF.push({}, "2f3eaVa+DhKwpZWj0ITyay3", "Initer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Initer = exports('Initer', (_dec = ccclass('Initer'), _dec2 = property({
        type: Player
      }), _dec3 = property({
        type: TomatoMachine
      }), _dec4 = property({
        type: TomatoContainer
      }), _dec5 = property({
        type: Trigger
      }), _dec6 = property({
        type: Trigger
      }), _dec7 = property({
        type: Trigger
      }), _dec8 = property({
        type: Trigger
      }), _dec9 = property({
        type: Trigger
      }), _dec10 = property({
        type: Trigger
      }), _dec11 = property({
        type: ItemSpawner
      }), _dec12 = property({
        type: TomatoPlace
      }), _dec13 = property({
        type: TomatoPlace
      }), _dec14 = property({
        type: TomatoPlace
      }), _dec15 = property({
        type: TableOrder
      }), _dec16 = property({
        type: MoneyContainer
      }), _dec17 = property({
        type: BuyPlatform
      }), _dec18 = property({
        type: Node
      }), _dec19 = property({
        type: Node
      }), _dec20 = property({
        type: TomatoPlace
      }), _dec21 = property({
        type: MoneyView
      }), _dec22 = property({
        type: Tutorial
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Initer, _Component);
        function Initer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "Player", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TomatoMachine", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TomatoContainer", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MachineTakeTrigger", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TomatoContainerTrigger", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "PackTomatoTrigger", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "OrderTrigger", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MoneyTrigger", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "BuyTrigger", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ItemSpawner", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TomatoPlace", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "PackTomatoPlace", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MoneyPlace", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TableOrder", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MoneyContainer", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "BuyPlatform", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MachinePoint", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MoneyPointOnBuyPlatform", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MoneyContainerPlace", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MoneyView", _descriptor20, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "Tutorial", _descriptor21, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Initer.prototype;
        _proto.onLoad = function onLoad() {
          this.Init();
        };
        _proto.Init = function Init() {
          this.TomatoMachine.Init(this.Player, this.MachineTakeTrigger, this.PackTomatoTrigger);
          this.TomatoContainer.Init(this.Player, this.TomatoContainerTrigger);
          this.ItemSpawner.Init(this.TomatoPlace, this.PackTomatoPlace, this.MoneyPlace, this.MachinePoint, this.MoneyPointOnBuyPlatform);
          this.TableOrder.Init(this.OrderTrigger, this.Player);
          this.MoneyContainer.Init(this.Player, this.MoneyTrigger, this.MoneyContainerPlace);
          this.BuyPlatform.Init(this.BuyTrigger, this.Player);
          this.MoneyView.Init(this.Player);
          this.Tutorial.Init(this.Player);
          this.InitAudio();
        };
        _proto.InitAudio = /*#__PURE__*/function () {
          var _InitAudio = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var audioRoot;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  audioRoot = new Node('AudioRoot');
                  this.node.addChild(audioRoot);
                  AudioPlayer.init(audioRoot);
                  resources.load('Sounds/Click01', AudioClip, function (err, clip) {
                    AudioPlayer.addSound('click', clip, 0.5, 1.0, false);
                  });
                  resources.load('Sounds/Footsteps01', AudioClip, function (err, clip) {
                    AudioPlayer.addSound('step', clip, 0.1, 1.0, false);
                  });
                  resources.load('Sounds/ImpactBubbles02', AudioClip, function (err, clip) {
                    AudioPlayer.addSound('get', clip, 0.1, 1.0, false);
                  });
                  resources.load('Sounds/Collectible02', AudioClip, function (err, clip) {
                    AudioPlayer.addSound('take', clip, 0.1, 1.0, false);
                  });
                  resources.load('Sounds/Win04', AudioClip, function (err, clip) {
                    AudioPlayer.addSound('win', clip, 0.5, 1.0, false);
                  });
                  resources.load('Sounds/Wow01', AudioClip, function (err, clip) {
                    AudioPlayer.addSound('wow1', clip, 0.5, 1.0, false);
                  });
                  resources.load('Sounds/Wow02', AudioClip, function (err, clip) {
                    AudioPlayer.addSound('wow2', clip, 0.5, 1.0, false);
                  });
                /*  resources.load('Sounds/Wow03', AudioClip, (err, clip) => {
                      AudioManager.addSound('wow3', clip, 0.5, 1.0, false);
                  });
                  resources.load('Sounds/Wow04', AudioClip, (err, clip) => {
                      AudioManager.addSound('wow4', clip, 0.5, 1.0, false);
                  });*/
                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function InitAudio() {
            return _InitAudio.apply(this, arguments);
          }
          return InitAudio;
        }();
        return Initer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "TomatoMachine", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "TomatoContainer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "MachineTakeTrigger", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "TomatoContainerTrigger", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "PackTomatoTrigger", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "OrderTrigger", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "MoneyTrigger", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "BuyTrigger", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "ItemSpawner", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "TomatoPlace", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "PackTomatoPlace", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "MoneyPlace", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "TableOrder", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "MoneyContainer", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "BuyPlatform", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "MachinePoint", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "MoneyPointOnBuyPlatform", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "MoneyContainerPlace", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "MoneyView", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "Tutorial", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ItemSpawner.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "51df8VdgkFLKpbzueXpSwPH", "ItemSpawner", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // @ts-ignore
      var ItemSpawner = exports('ItemSpawner', (_dec = ccclass('ItemSpawner'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ItemSpawner, _Component);
        function ItemSpawner() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._tomatoMachinePoint = void 0;
          _this._tomatoPlace = void 0;
          _this._packTomatoPlace = void 0;
          _this._moneyPlace = void 0;
          _this._moneyPointOnBuyPlatform = void 0;
          return _this;
        }
        var _proto = ItemSpawner.prototype;
        _proto.Init = function Init(tomatoPlace, packPlace, moneyPlace, machinePoint, moneyPointOnBuyPlatform) {
          this._tomatoPlace = tomatoPlace;
          this._packTomatoPlace = packPlace;
          this._moneyPlace = moneyPlace;
          this._tomatoMachinePoint = machinePoint;
          this._moneyPointOnBuyPlatform = moneyPointOnBuyPlatform;
        };
        _proto.ActivateTomato = function ActivateTomato() {
          this._tomatoPlace.ActivateTomatoSmooth(80, 100);
        };
        _proto.OffTomato = function OffTomato() {
          this._tomatoPlace.FlyTomatoTo(this._tomatoMachinePoint.position);
        };
        _proto.ActivatePackTomato = function ActivatePackTomato() {
          this._packTomatoPlace.ActivateTomatoSmooth();
        };
        _proto.OffPackTomato = function OffPackTomato(position) {
          this._packTomatoPlace.FlyTomatoTo(position);
        };
        _proto.ActivateMoney = function ActivateMoney() {
          this._moneyPlace.ActivateTomatoSmooth();
        };
        _proto.OffMoney = function OffMoney(position) {
          this._moneyPlace.FlyTomatoTo(position);
        };
        _proto.GetActivateNode = function GetActivateNode() {
          return this._moneyPlace.DefineCurrentActivateTomato();
        };
        return ItemSpawner;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Joystick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Vec2, UITransform, v3, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec2 = module.Vec2;
      UITransform = module.UITransform;
      v3 = module.v3;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "2c2deYH65RHaZQQCdiNim51", "Joystick", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Joystick = exports('Joystick', (_dec = ccclass('Joystick'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Joystick, _Component);
        function Joystick() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "stick", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "background", _descriptor2, _assertThisInitialized(_this));
          _this._direction = new Vec2(0, 0);
          _this._radius = 0;
          _this._isActive = false;
          return _this;
        }
        var _proto = Joystick.prototype;
        _proto.onLoad = function onLoad() {
          this._radius = this.background.getComponent(UITransform).width * 0.5;
          this._registerEvent();
          this._setVisible(false);
        };
        _proto._registerEvent = function _registerEvent() {
          // Используем canvas для обработки касаний по всему экрану
          var canvas = this.node.parent;
          if (canvas) {
            canvas.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
            canvas.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
            canvas.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
            canvas.on(Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
          }
        };
        _proto._onTouchStart = function _onTouchStart(event) {
          this._isActive = true;
          var touchPos = event.getUILocation();
          var touchPosInWorld = v3(touchPos.x, touchPos.y, 0);

          // Преобразуем точку касания в локальные координаты ноды джойстика
          var localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(touchPosInWorld);

          // Устанавливаем позицию фона джойстика в точку касания
          this.background.setPosition(localPos.x, localPos.y, 0);

          // Показываем джойстик
          this._setVisible(true);

          // Обновляем позицию стика
          this._updateStickPosition(event);
        };
        _proto._onTouchMove = function _onTouchMove(event) {
          this._updateStickPosition(event);
        };
        _proto._onTouchEnd = function _onTouchEnd() {
          this._isActive = false;
          this.stick.setPosition(0, 0);
          this._direction.set(0, 0);
          this._setVisible(false);
        };
        _proto._updateStickPosition = function _updateStickPosition(event) {
          if (!this._isActive) return;
          var touchPos = event.getUILocation();
          var touchPosInWorld = v3(touchPos.x, touchPos.y, 0);

          // Получаем позицию касания в локальных координатах фона джойстика
          var backgroundWorldPos = this.background.worldPosition;
          var localTouchPos = this.background.inverseTransformPoint(new Vec3(), touchPosInWorld);

          // Ограничиваем позицию стика в пределах радиуса
          var distance = Math.min(localTouchPos.length(), this._radius);
          var direction = localTouchPos.normalize();

          // Обновляем направление и позицию стика
          this._direction.set(direction.x, direction.y);
          this.stick.setPosition(direction.x * distance, direction.y * distance, 0);
        };
        _proto._setVisible = function _setVisible(visible) {
          this.background.active = visible;
          this.stick.active = visible;
        };
        _createClass(Joystick, [{
          key: "Direction",
          get: function get() {
            return this._direction;
          }
        }, {
          key: "IsActive",
          get: function get() {
            return this._isActive;
          }
        }]);
        return Joystick;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "stick", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./ArrowPointer.ts', './AudioPlayer.ts', './BuyPlatform.ts', './CameraController.ts', './CameraFollower.ts', './CharacterMovement.ts', './CharacterMovement2.ts', './Client.ts', './ClientContainer.ts', './ClientPlace.ts', './EndGameState.ts', './FocusWindow.ts', './Initer.ts', './ItemSpawner.ts', './TomatoContainer.ts', './Trigger.ts', './MoneyContainer.ts', './MoneyView.ts', './OrientationSwitcher.ts', './Player.ts', './ScaleAnimator.ts', './SoundSwitcher.ts', './TableOrder.ts', './TomatoMachine.ts', './TomatoPlace.ts', './TomatoZone.ts', './Tutorial.ts', './Joystick.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MoneyContainer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "94dfelww1JNm6/Yoahz1Ed6", "MoneyContainer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MoneyContainer = exports('MoneyContainer', (_dec = ccclass('MoneyContainer'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MoneyContainer, _Component);
        function MoneyContainer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._moneyPlace = void 0;
          _this._moneyTrigger = void 0;
          _this._player = void 0;
          _this._money = 0;
          _this._maxMoney = 721;
          _this._moneyForPackTomato = 10;
          _this._isCollectWorking = false;
          return _this;
        }
        var _proto = MoneyContainer.prototype;
        _proto.update = function update() {
          if (this._isCollectWorking == false && this._moneyTrigger.IsTriggered && this._money > 0) {
            this._isCollectWorking = true;
            this.DecreaseMoney();
          }
        };
        _proto.Init = function Init(player, trigger, moneyPlace) {
          this._player = player;
          this._moneyTrigger = trigger;
          this._moneyPlace = moneyPlace;
        };
        _proto.IncreaseMoney = function IncreaseMoney(startPosition) {
          this._money += this._moneyForPackTomato;
          this.ActivateNodeMoney(startPosition);
        };
        _proto.DecreaseMoney = /*#__PURE__*/function () {
          var _DecreaseMoney = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var currentTomato;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(this._money > 0)) {
                    _context.next = 12;
                    break;
                  }
                  if (!(this._moneyTrigger.IsTriggered == false || this._money <= 9)) {
                    _context.next = 4;
                    break;
                  }
                  this._isCollectWorking = false;
                  return _context.abrupt("break", 12);
                case 4:
                  this._money -= this._moneyForPackTomato;
                  currentTomato = this._player.GetActivateNode();
                  if (currentTomato != null) this._moneyPlace.FlyTomatoTo(currentTomato.worldPosition);else this._isCollectWorking = false;
                  this._player.IncreaseMoney(this._moneyForPackTomato);
                  _context.next = 10;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 60);
                  });
                case 10:
                  _context.next = 0;
                  break;
                case 12:
                  this._isCollectWorking = false;
                case 13:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function DecreaseMoney() {
            return _DecreaseMoney.apply(this, arguments);
          }
          return DecreaseMoney;
        }();
        _proto.ActivateNodeMoney = function ActivateNodeMoney(startPosition) {
          if (this._money >= this._maxMoney) return;
          this._moneyPlace.FlyTomatoFrom(startPosition);
        };
        return MoneyContainer;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MoneyView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, RichText, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RichText = module.RichText;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "193edeoeYRC3qWOz9J36D6I", "MoneyView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MoneyView = exports('MoneyView', (_dec = ccclass('MoneyView'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MoneyView, _Component);
        function MoneyView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._moneyText = void 0;
          _this._player = void 0;
          return _this;
        }
        var _proto = MoneyView.prototype;
        _proto.Init = function Init(player) {
          this._moneyText = this.getComponent(RichText);
          this._player = player;
          this._player.UpdateMoney = this.UpdateMoneyText.bind(this);
        };
        _proto.UpdateMoneyText = function UpdateMoneyText() {
          this._moneyText.string = this._player.CurrentMoney.toString();
        };
        return MoneyView;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OrientationSwitcher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, _inheritsLoose, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, EventTarget, Node, Vec3, screen, view, ResolutionPolicy, Component, Size;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventTarget = module.EventTarget;
      Node = module.Node;
      Vec3 = module.Vec3;
      screen = module.screen;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      Component = module.Component;
      Size = module.Size;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class4, _class5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;
      cclegacy._RF.push({}, "68ffcZzTmpGj6vMyX4Khzoi", "OrientationSwitcher", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ScreenOrientation = exports('ScreenOrientation', /*#__PURE__*/function (ScreenOrientation) {
        ScreenOrientation[ScreenOrientation["PORTRAIT"] = 0] = "PORTRAIT";
        ScreenOrientation[ScreenOrientation["LANDSCAPE"] = 1] = "LANDSCAPE";
        return ScreenOrientation;
      }({}));
      var orientationEvent = exports('orientationEvent', new EventTarget());

      // Класс для хранения данных о позиции UI элемента
      var UILayoutData = (_dec = ccclass('UILayoutData'), _dec2 = property({
        type: Node,
        tooltip: "UI элемент"
      }), _dec3 = property({
        type: Vec3,
        tooltip: "Позиция в портретной ориентации"
      }), _dec4 = property({
        type: Vec3,
        tooltip: "Позиция в альбомной ориентации"
      }), _dec5 = property({
        tooltip: "Масштаб в портретной ориентации"
      }), _dec6 = property({
        tooltip: "Масштаб в альбомной ориентации"
      }), _dec(_class = (_class2 = function UILayoutData() {
        _initializerDefineProperty(this, "targetNode", _descriptor, this);
        _initializerDefineProperty(this, "portraitPosition", _descriptor2, this);
        _initializerDefineProperty(this, "landscapePosition", _descriptor3, this);
        _initializerDefineProperty(this, "portraitScale", _descriptor4, this);
        _initializerDefineProperty(this, "landscapeScale", _descriptor5, this);
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "portraitPosition", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 0, 0);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "landscapePosition", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 0, 0);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "portraitScale", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "landscapeScale", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class);
      var OrientationSwitcher = exports('OrientationSwitcher', (_dec7 = ccclass('OrientationSwitcher'), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Node
      }), _dec10 = property({
        type: [UILayoutData],
        tooltip: "Список UI элементов с их позициями"
      }), _dec11 = property({
        tooltip: "Изменить размеры экрана при смене ориентации"
      }), _dec12 = property({
        visible: function visible() {
          return this.changeResolution;
        },
        tooltip: "Разрешение для портретной ориентации"
      }), _dec13 = property({
        visible: function visible() {
          return this.changeResolution;
        },
        tooltip: "Разрешение для альбомной ориентации"
      }), _dec14 = property({
        tooltip: "Задержка между проверками ориентации (секунды)"
      }), _dec7(_class4 = (_class5 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OrientationSwitcher, _Component);
        function OrientationSwitcher() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "UIButton", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "UIButtonH", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "uiElements", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "changeResolution", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "portraitResolution", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "landscapeResolution", _descriptor11, _assertThisInitialized(_this));
          _this.currentOrientation = ScreenOrientation.LANDSCAPE;
          _this.lastWidth = 0;
          _this.lastHeight = 0;
          _initializerDefineProperty(_this, "checkInterval", _descriptor12, _assertThisInitialized(_this));
          _this.checkTimer = 0;
          return _this;
        }
        var _proto = OrientationSwitcher.prototype;
        _proto.onLoad = function onLoad() {
          this.updateScreenSize();
          this.detectOrientation(true);
        };
        _proto.update = function update(deltaTime) {
          this.checkTimer += deltaTime;
          if (this.checkTimer >= this.checkInterval) {
            this.checkTimer = 0;
            this.checkOrientationChange();
          }
        };
        _proto.checkOrientationChange = function checkOrientationChange() {
          var windowSize = screen.windowSize;
          var currentWidth = windowSize.width;
          var currentHeight = windowSize.height;
          if (currentWidth !== this.lastWidth || currentHeight !== this.lastHeight) {
            this.lastWidth = currentWidth;
            this.lastHeight = currentHeight;
            this.detectOrientation();
          }
        };
        _proto.updateScreenSize = function updateScreenSize() {
          var windowSize = screen.windowSize;
          this.lastWidth = windowSize.width;
          this.lastHeight = windowSize.height;
        };
        _proto.detectOrientation = function detectOrientation(forceUpdate) {
          if (forceUpdate === void 0) {
            forceUpdate = false;
          }
          var isPortrait = this.lastHeight > this.lastWidth;
          var newOrientation = isPortrait ? ScreenOrientation.PORTRAIT : ScreenOrientation.LANDSCAPE;
          if (newOrientation !== this.currentOrientation || forceUpdate) {
            this.currentOrientation = newOrientation;
            this.onOrientationChanged(this.currentOrientation);
          }
        };
        _proto.onOrientationChanged = function onOrientationChanged(orientation) {
          orientationEvent.emit('orientation-change', orientation);

          // Устанавливаем разрешение экрана, если включено
          if (this.changeResolution) {
            var resolution = orientation === ScreenOrientation.PORTRAIT ? this.portraitResolution : this.landscapeResolution;
            view.setDesignResolutionSize(resolution.width, resolution.height, ResolutionPolicy.SHOW_ALL);
          }

          // Обновляем позиции UI элементов
          this.updateUIPositions(orientation);
        };
        _proto.updateUIPositions = function updateUIPositions(orientation) {
          for (var _iterator = _createForOfIteratorHelperLoose(this.uiElements), _step; !(_step = _iterator()).done;) {
            var uiElement = _step.value;
            if (!uiElement.targetNode) continue;
            if (orientation === ScreenOrientation.PORTRAIT) {
              uiElement.targetNode.setPosition(uiElement.portraitPosition);
              uiElement.targetNode.setScale(uiElement.portraitScale, uiElement.portraitScale, 1);
            } else {
              uiElement.targetNode.setPosition(uiElement.landscapePosition);
              uiElement.targetNode.setScale(uiElement.landscapeScale, uiElement.landscapeScale, 1);
            }
          }
        };
        _proto.getCurrentOrientation = function getCurrentOrientation() {
          return this.currentOrientation;
        };
        return OrientationSwitcher;
      }(Component), (_descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "UIButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "UIButtonH", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "uiElements", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "changeResolution", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "portraitResolution", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(720, 1280);
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "landscapeResolution", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(1280, 720);
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class5.prototype, "checkInterval", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      })), _class5)) || _class4));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Player.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ItemSpawner.ts', './CharacterMovement.ts', './Joystick.ts', './AudioPlayer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Collider, Component, ItemSpawner, CharacterMovement, Joystick, AudioPlayer;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Collider = module.Collider;
      Component = module.Component;
    }, function (module) {
      ItemSpawner = module.ItemSpawner;
    }, function (module) {
      CharacterMovement = module.CharacterMovement;
    }, function (module) {
      Joystick = module.Joystick;
    }, function (module) {
      AudioPlayer = module.AudioPlayer;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "b50387wEIhJQbOLCsWtHos6", "Player", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Player = exports('Player', (_dec = ccclass('Player'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Player, _Component);
        function Player() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._itemSpawner = void 0;
          _this._tomato = 0;
          _this._money = 0;
          _this._maxMoneyForVisual = 800;
          _this._packTomato = 0;
          _this._maxTomato = 48;
          _this._maxPackTomato = 24;
          _this._isTomatoFull = false;
          _this._isPackTomatoFull = false;
          _this._isCarry = false;
          _this._collider = null;
          _this._characterMovement = null;
          _initializerDefineProperty(_this, "joystickNode", _descriptor, _assertThisInitialized(_this));
          _this.UpdateMoney = null;
          return _this;
        }
        var _proto = Player.prototype;
        _proto.onLoad = function onLoad() {
          var _this$joystickNode, _this$node$parent;
          this._itemSpawner = this.getComponent(ItemSpawner);
          this._characterMovement = this.getComponent(CharacterMovement) || this.addComponent(CharacterMovement);

          // Initialize movement with joystick
          var joystick = ((_this$joystickNode = this.joystickNode) == null ? void 0 : _this$joystickNode.getComponent(Joystick)) || ((_this$node$parent = this.node.parent) == null || (_this$node$parent = _this$node$parent.getChildByName('UI')) == null || (_this$node$parent = _this$node$parent.getChildByName('Joystick')) == null ? void 0 : _this$node$parent.getComponent(Joystick));
          if (this._characterMovement && joystick) {
            this._characterMovement.init(joystick);
          }
        };
        _proto.start = function start() {
          this._collider = this.getComponent(Collider);
          if (this._collider) {
            this._collider.on('onCollisionEnter', this.onCollisionEnter, this);
          }
          if (this.UpdateMoney) {
            this.UpdateMoney(this._money);
          }
        };
        _proto.onDestroy = function onDestroy() {
          if (this._collider) {
            this._collider.off('onCollisionEnter', this.onCollisionEnter, this);
          }

          // Clean up movement component
          if (this._characterMovement) {
            this._characterMovement.node.destroy();
            this._characterMovement = null;
          }
        };
        _proto.onCollisionEnter = function onCollisionEnter(event) {
          // Collision handling without console.log
        };
        _proto.update = function update(deltaTime) {
          if (this._tomato === 0 && this._packTomato === 0) {
            this._isCarry = false;
          } else {
            this._isCarry = true;
          }
        };
        _proto.IncreaseTomato = function IncreaseTomato() {
          if (this._tomato >= this._maxTomato) {
            this._isTomatoFull = true;
            return;
          }
          AudioPlayer.play('get', 0.2);
          this._tomato++;
          this._itemSpawner.ActivateTomato();
        };
        _proto.IncreasePackTomato = function IncreasePackTomato() {
          if (this._packTomato >= this._maxPackTomato) {
            this._isPackTomatoFull = true;
            return;
          }
          AudioPlayer.play('get', 0.2);
          this._packTomato++;
          this._itemSpawner.ActivatePackTomato();
        };
        _proto.IncreaseMoney = function IncreaseMoney(money) {
          if (this._money >= this._maxMoneyForVisual) {
            AudioPlayer.play('get', 0.2);
            this._money += money;
            this.OnMoneyChanged();
            return;
          }
          AudioPlayer.play('get', 0.2);
          this._money += money;
          this.OnMoneyChanged();
          this._itemSpawner.ActivateMoney();
        };
        _proto.DecreaseMoney = function DecreaseMoney(money, position) {
          if (this._money <= 9) {
            this._money = 0;
            return;
          }
          AudioPlayer.play('take', 0.2);
          this._money -= money;
          this.OnMoneyChanged();
          if (this._money <= this._maxMoneyForVisual) this._itemSpawner.OffMoney(position);
        };
        _proto.DecreaseTomato = function DecreaseTomato() {
          if (this._tomato <= 0) return 0;
          AudioPlayer.play('take', 0.2);
          this._tomato--;
          this._itemSpawner.OffTomato();
          if (this._tomato < this._maxTomato) this._isTomatoFull = false;
          return 1;
        };
        _proto.DecreasePackTomato = function DecreasePackTomato(position) {
          if (this._packTomato <= 0) return 0;
          AudioPlayer.play('take', 0.2);
          this._packTomato--;
          this._itemSpawner.OffPackTomato(position);
          if (this._packTomato < this._maxPackTomato) this._isPackTomatoFull = false;
          return 1;
        };
        _proto.GetActivateNode = function GetActivateNode() {
          return this._itemSpawner.GetActivateNode();
        };
        _proto.OnMoneyChanged = function OnMoneyChanged() {
          this.UpdateMoney(this._money);
        };
        _createClass(Player, [{
          key: "CurrentMoney",
          get: function get() {
            return this._money;
          }
        }, {
          key: "IsCarry",
          get: function get() {
            return this._isCarry;
          }
        }, {
          key: "Money",
          get: function get() {
            return this._money;
          }
        }, {
          key: "PackTomato",
          get: function get() {
            return this._packTomato;
          }
        }, {
          key: "CountTomato",
          get: function get() {
            return this._tomato;
          }
        }, {
          key: "IsTomatoFull",
          get: function get() {
            return this._isTomatoFull;
          }
        }]);
        return Player;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "joystickNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScaleAnimator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "a1c52+lxBFFg4ozRkMTeamu", "ScaleAnimator", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ScaleAnimator = exports('ScaleAnimator', (_dec = ccclass('ScaleAnimator'), _dec2 = property({
        type: [Node],
        tooltip: 'Массив объектов для анимации'
      }), _dec3 = property({
        tooltip: 'Длительность анимации в секундах'
      }), _dec4 = property({
        tooltip: 'Тип анимации'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScaleAnimator, _Component);
        function ScaleAnimator() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "TargetObjects", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "AnimationDuration", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EaseType", _descriptor3, _assertThisInitialized(_this));
          _this._originalScales = new Map();
          _this._currentTweens = [];
          return _this;
        }
        var _proto = ScaleAnimator.prototype;
        _proto.onLoad = function onLoad() {
          this.SaveOriginalScales();
        };
        _proto.PlayScaleAnimation = function PlayScaleAnimation() {
          var _this2 = this;
          this.stopCurrentAnimations();
          this.TargetObjects.forEach(function (node) {
            if (!node) return;
            var originalScale = _this2._originalScales.get(node) || node.scale.clone();
            var startScale = new Vec3(originalScale.x * 0.2, originalScale.y * 0.2, originalScale.z * 0.2);
            node.active = true;
            node.setScale(startScale);
            var t = tween(node).to(_this2.AnimationDuration, {
              scale: originalScale
            }, {
              easing: _this2.EaseType,
              onUpdate: function onUpdate(target, ratio) {
                var scale = new Vec3();
                Vec3.lerp(scale, startScale, originalScale, ratio);
                node.setScale(scale);
              }
            }).start();
            _this2._currentTweens.push(t);
          });
        };
        _proto.SaveOriginalScales = function SaveOriginalScales() {
          var _this3 = this;
          this._originalScales.clear();
          this.TargetObjects.forEach(function (node) {
            if (node) {
              _this3._originalScales.set(node, node.scale.clone());
              node.active = false;
            }
          });
        };
        _proto.stopCurrentAnimations = function stopCurrentAnimations() {
          this._currentTweens.forEach(function (tween) {
            return tween.stop();
          });
          this._currentTweens = [];
        };
        _proto.onDestroy = function onDestroy() {
          this.stopCurrentAnimations();
        };
        return ScaleAnimator;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "TargetObjects", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "AnimationDuration", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EaseType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'backOut';
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SoundSwitcher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, AudioSource, Button, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      AudioSource = module.AudioSource;
      Button = module.Button;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "6d0e9vPVPVKo5/DuJN9w3rX", "SoundSwitcher", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SoundSwitcher = exports('SoundSwitcher', (_dec = ccclass('SoundSwitcher'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: AudioSource
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SoundSwitcher, _Component);
        function SoundSwitcher() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "OnSoundImage", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "OffSoundImage", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "BackSource", _descriptor3, _assertThisInitialized(_this));
          _this._button = void 0;
          _this._isSound = true;
          return _this;
        }
        var _proto = SoundSwitcher.prototype;
        _proto.onLoad = function onLoad() {
          this._button = this.getComponent(Button);
        };
        _proto.start = function start() {
          this.OnSoundImage.active = true;
          this.OffSoundImage.active = false;
          this._button.node.on(Button.EventType.CLICK, this.ToggleSound, this);
        };
        _proto.onDestroy = function onDestroy() {
          this._button.node.off(Button.EventType.CLICK, this.ToggleSound, this);
        };
        _proto.ToggleSound = function ToggleSound() {
          this._isSound = !this._isSound;
          this.OnSoundImage.active = this._isSound;
          this.OffSoundImage.active = !this._isSound;
          if (this._isSound) {
            this.BackSource.volume = 0.15;
          } else {
            this.BackSource.volume = 0;
          }
        };
        return SoundSwitcher;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "OnSoundImage", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "OffSoundImage", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "BackSource", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TableOrder.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ClientPlace.ts', './MoneyContainer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, ClientPlace, MoneyContainer;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      ClientPlace = module.ClientPlace;
    }, function (module) {
      MoneyContainer = module.MoneyContainer;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "72ec4jmnHxItIKG3H09MC3B", "TableOrder", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TableOrder = exports('TableOrder', (_dec = ccclass('TableOrder'), _dec2 = property([ClientPlace]), _dec3 = property({
        type: MoneyContainer
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TableOrder, _Component);
        function TableOrder() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "ClientPlaces", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "MoneyContainer", _descriptor2, _assertThisInitialized(_this));
          _this._orderTrigger = void 0;
          _this._player = void 0;
          _this._currentPlace = void 0;
          _this._isOrderTaking = false;
          return _this;
        }
        var _proto = TableOrder.prototype;
        _proto.update = function update() {
          this.CheckPlayerOrder();
        };
        _proto.Init = function Init(trigger, player) {
          this._orderTrigger = trigger;
          this._player = player;
        };
        _proto.CheckPlayerOrder = function CheckPlayerOrder() {
          if (this._orderTrigger.IsTriggered && this._isOrderTaking == false) {
            this._isOrderTaking = true;
            this.GetOrder();
          }
        };
        _proto.GetOrder = /*#__PURE__*/function () {
          var _GetOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var countPackTomato, i;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  countPackTomato = 0;
                case 1:
                  if (!(this._player.PackTomato > 0 && this._orderTrigger.IsTriggered)) {
                    _context.next = 19;
                    break;
                  }
                  _context.next = 4;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 100);
                  });
                case 4:
                  if (this._player.PackTomato >= 4) countPackTomato = 4;else if (this._player.PackTomato == 3) countPackTomato = 3;else if (this._player.PackTomato == 2) countPackTomato = 2;else if (this._player.PackTomato == 1) countPackTomato = 1;
                  this.DefinePlace();
                  i = 0;
                case 7:
                  if (!(i < countPackTomato + 4)) {
                    _context.next = 16;
                    break;
                  }
                  this.MoneyContainer.IncreaseMoney(this._currentPlace.Client.node.worldPosition);
                  this._player.DecreasePackTomato(this._currentPlace.node.position);
                  this._currentPlace.ActivateTomatoOnClient();
                  _context.next = 13;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 80);
                  });
                case 13:
                  i++;
                  _context.next = 7;
                  break;
                case 16:
                  this._currentPlace.UnsetClient();
                  _context.next = 1;
                  break;
                case 19:
                  this._isOrderTaking = false;
                case 20:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function GetOrder() {
            return _GetOrder.apply(this, arguments);
          }
          return GetOrder;
        }();
        _proto.DefinePlace = function DefinePlace() {
          this._currentPlace = this.ClientPlaces[0];
          this.ClientPlaces.splice(0, 1);
          this.ClientPlaces.push(this._currentPlace);
        };
        return TableOrder;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ClientPlaces", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "MoneyContainer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TomatoContainer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioPlayer.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, AudioPlayer;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      AudioPlayer = module.AudioPlayer;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8987bl9RQhMB5IiHylYKO9r", "TomatoContainer", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TomatoContainer = exports('TomatoContainer', (_dec = ccclass('TomatoContainer'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TomatoContainer, _Component);
        function TomatoContainer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._tomatoTrigger = void 0;
          _this._player = void 0;
          _this._isCollectWorking = false;
          _this._collectSpeed = 50;
          return _this;
        }
        var _proto = TomatoContainer.prototype;
        _proto.update = function update() {
          if (this._isCollectWorking == false && this._tomatoTrigger.IsTriggered && this._player.IsTomatoFull == false) {
            this._isCollectWorking = true;
            this.Collect();
          }
        };
        _proto.Init = function Init(player, trigger) {
          this._player = player;
          this._tomatoTrigger = trigger;
        };
        _proto.Collect = /*#__PURE__*/function () {
          var _Collect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(this._player.IsTomatoFull == false)) {
                    _context.next = 9;
                    break;
                  }
                  if (!(this._tomatoTrigger.IsTriggered == false || this._player.PackTomato > 0)) {
                    _context.next = 4;
                    break;
                  }
                  AudioPlayer.stop();
                  return _context.abrupt("break", 9);
                case 4:
                  _context.next = 6;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, _this2._collectSpeed);
                  });
                case 6:
                  this._player.IncreaseTomato();
                  _context.next = 0;
                  break;
                case 9:
                  this._isCollectWorking = false;
                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function Collect() {
            return _Collect.apply(this, arguments);
          }
          return Collect;
        }();
        return TomatoContainer;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TomatoMachine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TomatoPlace.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, TomatoPlace;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      TomatoPlace = module.TomatoPlace;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ad59b5InEhOSbTBXGVDt354", "TomatoMachine", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TomatoMachine = exports('TomatoMachine', (_dec = ccclass('TomatoMachine'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TomatoMachine, _Component);
        function TomatoMachine() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._takeTomatoTrigger = void 0;
          _this._packTomatoTrigger = void 0;
          _this._player = void 0;
          _this._packTomatoPlace = void 0;
          _this._isGetWorking = false;
          _this._isPackWorking = false;
          _this._countTomato = 0;
          _this._maxPackTomato = 24;
          _this._countPackTomato = 0;
          _this._countTomatoForPackTomato = 2;
          _this._collectSpeed = 50;
          _this._getSpeed = 50;
          return _this;
        }
        var _proto = TomatoMachine.prototype;
        _proto.update = function update() {
          if (this._takeTomatoTrigger.IsTriggered && this._isGetWorking == false) {
            this._isGetWorking = true;
            this.GetTomatoFromPlayer();
          }
          if (this._packTomatoTrigger.IsTriggered && this._isPackWorking == false) {
            this._isPackWorking = true;
            this.TakePackTomato();
          }
        };
        _proto.Init = function Init(player, trigger, triggerPack) {
          this._player = player;
          this._takeTomatoTrigger = trigger;
          this._packTomatoTrigger = triggerPack;
          this._packTomatoPlace = this.getComponentInChildren(TomatoPlace);
        };
        _proto.GetTomatoFromPlayer = /*#__PURE__*/function () {
          var _GetTomatoFromPlayer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this._takeTomatoTrigger.IsTriggered) {
                    _context.next = 8;
                    break;
                  }
                  _context.next = 3;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, _this2._getSpeed);
                  });
                case 3:
                  this._countTomato += this._player.DecreaseTomato();
                  if (this._countPackTomato >= this._maxPackTomato) this._countTomato = 0;
                  if (this._countTomato >= this._countTomatoForPackTomato) this.PackTomato();
                  _context.next = 0;
                  break;
                case 8:
                  this._isGetWorking = false;
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function GetTomatoFromPlayer() {
            return _GetTomatoFromPlayer.apply(this, arguments);
          }
          return GetTomatoFromPlayer;
        }();
        _proto.TakePackTomato = /*#__PURE__*/function () {
          var _TakePackTomato = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _this3 = this;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this._packTomatoTrigger.IsTriggered) {
                    _context2.next = 11;
                    break;
                  }
                  if (!(this._countPackTomato <= 0 || this._player.CountTomato > 0)) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("break", 11);
                case 3:
                  _context2.next = 5;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, _this3._collectSpeed);
                  });
                case 5:
                  this._countPackTomato--;
                  this._packTomatoPlace.DeactivateTomato();
                  this._player.DecreaseTomato();
                  this._player.IncreasePackTomato();
                  _context2.next = 0;
                  break;
                case 11:
                  this._isPackWorking = false;
                case 12:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function TakePackTomato() {
            return _TakePackTomato.apply(this, arguments);
          }
          return TakePackTomato;
        }();
        _proto.PackTomato = function PackTomato() {
          if (this._countPackTomato >= this._maxPackTomato) return;
          this._countTomato = 0;
          this._countPackTomato++;
          this._packTomatoPlace.ActivateTomato();
        };
        return TomatoMachine;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TomatoPlace.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, Vec3, tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "13b9eutNvNMzJf2U0HUDO+9", "TomatoPlace", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TomatoPlace = exports('TomatoPlace', (_dec = ccclass('TomatoPlace'), _dec2 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TomatoPlace, _Component);
        function TomatoPlace() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "Tomatos", _descriptor, _assertThisInitialized(_this));
          _this._flying = new Set();
          return _this;
        }
        var _proto = TomatoPlace.prototype;
        _proto.ActivateTomato = function ActivateTomato() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.Tomatos), _step; !(_step = _iterator()).done;) {
            var tomato = _step.value;
            if (tomato.active == false) {
              tomato.active = true;
              break;
            }
          }
        };
        _proto.ActivateTomatoSmooth = function ActivateTomatoSmooth(fromScale, targetScale, duration) {
          if (fromScale === void 0) {
            fromScale = 0.2;
          }
          if (targetScale === void 0) {
            targetScale = 1;
          }
          if (duration === void 0) {
            duration = 0.3;
          }
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.Tomatos), _step2; !(_step2 = _iterator2()).done;) {
            var tomato = _step2.value;
            if (!tomato.active) {
              tomato.setScale(new Vec3(fromScale, fromScale, fromScale));
              tomato.active = true;
              tween(tomato).to(duration, {
                scale: new Vec3(targetScale, targetScale, targetScale)
              }, {
                easing: 'backOut'
              }).start();
              break;
            }
          }
        };
        _proto.DeactivateTomato = function DeactivateTomato() {
          for (var i = this.Tomatos.length - 1; i >= 0; i--) {
            if (this.Tomatos[i].active === true) {
              this.Tomatos[i].active = false;
              break;
            }
          }
        };
        _proto.DeactivateAllTomatos = function DeactivateAllTomatos() {
          for (var i = this.Tomatos.length - 1; i >= 0; i--) {
            if (this.Tomatos[i].active === true) {
              this.Tomatos[i].active = false;
            }
          }
        };
        _proto.FlyTomatoTo = function FlyTomatoTo(targetWorldPos, height, duration) {
          var _this2 = this;
          if (height === void 0) {
            height = 2;
          }
          if (duration === void 0) {
            duration = 0.35;
          }
          var _loop = function _loop() {
            var tomato = _this2.Tomatos[i];
            if (tomato.active && !_this2._flying.has(tomato)) {
              _this2._flying.add(tomato);
              var originalParent = tomato.parent;
              var originalLocal = tomato.position.clone();
              var originalRotation = tomato.rotation.clone();
              var startWorld = tomato.worldPosition.clone();
              var midWorld = new Vec3((startWorld.x + targetWorldPos.x) / 2, (startWorld.y + targetWorldPos.y) / 2 + height, (startWorld.z + targetWorldPos.z) / 2);
              var sceneRoot = tomato.scene;
              tomato.setParent(sceneRoot, true);
              var startLocal = startWorld.clone();
              var endLocal = targetWorldPos;
              var cp1 = new Vec3((startWorld.x + midWorld.x) / 2, midWorld.y, (startWorld.z + midWorld.z) / 2);
              var cp2 = new Vec3((midWorld.x + targetWorldPos.x) / 2, midWorld.y, (midWorld.z + targetWorldPos.z) / 2);
              tomato.setPosition(startLocal);
              tween(tomato).to(duration / 3, {
                position: cp1
              }, {
                easing: 'quadOut'
              }).to(duration / 3, {
                position: cp2
              }, {
                easing: 'linear'
              }).to(duration / 3, {
                position: endLocal
              }, {
                easing: 'quadIn'
              }).call(function () {
                tomato.setParent(originalParent, false);
                tomato.setPosition(originalLocal);
                tomato.setRotation(originalRotation);
                tomato.active = false;
                _this2._flying["delete"](tomato);
              }).start();
              return 1; // break
            }
          };

          for (var i = this.Tomatos.length - 1; i >= 0; i--) {
            if (_loop()) break;
          }
        };
        _proto.FlyTomatoFrom = function FlyTomatoFrom(startWorldPos, height, duration) {
          var _this3 = this;
          if (height === void 0) {
            height = 2;
          }
          if (duration === void 0) {
            duration = 0.35;
          }
          var _loop2 = function _loop2() {
            var tomato = _this3.Tomatos[i];
            if (tomato.active == false && !_this3._flying.has(tomato)) {
              tomato.active = true;
              _this3._flying.add(tomato);
              var originalParent = tomato.parent;
              var originalLocal = tomato.position.clone();
              var originalRotation = tomato.rotation.clone();
              var targetWorld = tomato.worldPosition.clone();
              var midWorld = new Vec3((startWorldPos.x + targetWorld.x) / 2, Math.max(startWorldPos.y, targetWorld.y) + height, (startWorldPos.z + targetWorld.z) / 2);
              var sceneRoot = tomato.scene;

              // Сохраняем текущее состояние томата
              var currentPosition = targetWorld.clone();

              // Устанавливаем стартовую позицию
              tomato.setParent(sceneRoot, true);
              tomato.setPosition(startWorldPos);
              var cp1 = new Vec3((startWorldPos.x + midWorld.x) / 2, midWorld.y, (startWorldPos.z + midWorld.z) / 2);
              var cp2 = new Vec3((midWorld.x + targetWorld.x) / 2, midWorld.y, (midWorld.z + targetWorld.z) / 2);
              tween(tomato).to(duration / 3, {
                position: cp1
              }, {
                easing: 'quadOut'
              }).to(duration / 3, {
                position: cp2
              }, {
                easing: 'linear'
              }).to(duration / 3, {
                position: currentPosition
              }, {
                easing: 'quadIn'
              }).call(function () {
                tomato.setParent(originalParent, false);
                tomato.setPosition(originalLocal);
                tomato.setRotation(originalRotation);
                tomato.active = true;
                _this3._flying["delete"](tomato);
              }).start();
              return 1; // break
            }
          };

          for (var i = 0; i <= this.Tomatos.length; i++) {
            if (_loop2()) break;
          }
        };
        _proto.DefineCurrentActivateTomato = function DefineCurrentActivateTomato() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.Tomatos), _step3; !(_step3 = _iterator3()).done;) {
            var tomato = _step3.value;
            if (tomato.active == false) {
              return tomato;
            }
          }
          return null;
        };
        return TomatoPlace;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "Tomatos", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TomatoZone.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, BoxCollider, RigidBody, Collider, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      BoxCollider = module.BoxCollider;
      RigidBody = module.RigidBody;
      Collider = module.Collider;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "4d627a+4GtK7KmnM/07Xu8J", "TomatoZone", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TomatoZone = exports('TomatoZone', (_dec = ccclass('TomatoZone'), _dec2 = property({
        type: [Node]
      }), _dec3 = property({
        type: BoxCollider
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TomatoZone, _Component);
        function TomatoZone() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "Tomatoes", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ZoneCollider", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = TomatoZone.prototype;
        _proto.start = function start() {
          if (!this.ZoneCollider) {
            this.ZoneCollider = this.getComponent(BoxCollider) || this.addComponent(BoxCollider);
            this.ZoneCollider.isTrigger = true;
          }
          this.initializeTomatoes();
          this.ZoneCollider.on('onTriggerEnter', this.onTriggerEnter, this);
          this.ZoneCollider.on('onTriggerExit', this.onTriggerExit, this);
        };
        _proto.initializeTomatoes = function initializeTomatoes() {
          this.Tomatoes.forEach(function (tomato) {
            if (!tomato) return;
            if (!tomato.getComponent(RigidBody)) {
              var rb = tomato.addComponent(RigidBody);
              rb.mass = 1;
              rb.type = RigidBody.Type.DYNAMIC;
            }
            if (!tomato.getComponent(Collider)) {
              var collider = tomato.addComponent(BoxCollider);
              collider.size = new Vec3(1, 1, 1);
            }
          });
        };
        _proto.onTriggerEnter = function onTriggerEnter(event) {
          var other = event.otherCollider.node;
        };
        _proto.onTriggerExit = function onTriggerExit(event) {
          var other = event.otherCollider.node;
        };
        _proto.update = function update(deltaTime) {
          if (!this.ZoneCollider) return;
          var zoneSize = this.ZoneCollider.size;
          var zonePos = this.node.worldPosition;
          this.Tomatoes.forEach(function (tomato) {
            if (!tomato || !tomato.getComponent(RigidBody)) return;
            var rb = tomato.getComponent(RigidBody);
            var pos = new Vec3();
            Vec3.copy(pos, tomato.worldPosition);
            var halfSize = 0.5;
            if (pos.x < zonePos.x - zoneSize.x / 2 + halfSize) {
              pos.x = zonePos.x - zoneSize.x / 2 + halfSize;
              var vel = new Vec3();
              rb.getLinearVelocity(vel);
              vel.x = 0;
              rb.setLinearVelocity(vel);
            } else if (pos.x > zonePos.x + zoneSize.x / 2 - halfSize) {
              pos.x = zonePos.x + zoneSize.x / 2 - halfSize;
              var _vel = new Vec3();
              rb.getLinearVelocity(_vel);
              _vel.x = 0;
              rb.setLinearVelocity(_vel);
            }
            if (pos.z < zonePos.z - zoneSize.z / 2 + halfSize) {
              pos.z = zonePos.z - zoneSize.z / 2 + halfSize;
              var _vel2 = new Vec3();
              rb.getLinearVelocity(_vel2);
              _vel2.z = 0;
              rb.setLinearVelocity(_vel2);
            } else if (pos.z > zonePos.z + zoneSize.z / 2 - halfSize) {
              pos.z = zonePos.z + zoneSize.z / 2 - halfSize;
              var _vel3 = new Vec3();
              rb.getLinearVelocity(_vel3);
              _vel3.z = 0;
              rb.setLinearVelocity(_vel3);
            }
            tomato.setWorldPosition(pos);
          });
        };
        return TomatoZone;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Tomatoes", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ZoneCollider", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Trigger.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Player.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, MeshRenderer, Color, Collider, Component, Player;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      MeshRenderer = module.MeshRenderer;
      Color = module.Color;
      Collider = module.Collider;
      Component = module.Component;
    }, function (module) {
      Player = module.Player;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "0ae59d2h7ROdIzpJ73k1dDg", "Trigger", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Trigger = exports('Trigger', (_dec = ccclass('Trigger'), _dec2 = property({
        type: MeshRenderer
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Trigger, _Component);
        function Trigger() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "TriggerMaterialNode", _descriptor, _assertThisInitialized(_this));
          _this._currentColor = new Color(255, 255, 255);
          _this._targetColor = new Color(255, 255, 255);
          _this._colorLerpSpeed = 7;
          _this._isTriggered = false;
          return _this;
        }
        var _proto = Trigger.prototype;
        _proto.start = function start() {
          var collider = this.getComponent(Collider);
          if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
            collider.on('onTriggerExit', this.onTriggerExit, this);
          }
        };
        _proto.update = function update(deltaTime) {
          this.updateColor(deltaTime);
        };
        _proto.onDestroy = function onDestroy() {
          var collider = this.getComponent(Collider);
          if (collider) {
            collider.off('onTriggerEnter', this.onTriggerEnter, this);
            collider.off('onTriggerExit', this.onTriggerExit, this);
          }
        };
        _proto.onTriggerEnter = function onTriggerEnter(event) {
          var player = event.otherCollider.node.getComponent(Player);
          if (player) {
            this._isTriggered = true;
            this.setTargetColor(new Color(100, 220, 255));
          }
        };
        _proto.onTriggerExit = function onTriggerExit(event) {
          var player = event.otherCollider.node.getComponent(Player);
          if (player) {
            this._isTriggered = false;
            this.setTargetColor(new Color(255, 255, 255));
          }
        };
        _proto.updateColor = function updateColor(deltaTime) {
          var _this$TriggerMaterial;
          if (!((_this$TriggerMaterial = this.TriggerMaterialNode) != null && _this$TriggerMaterial.material)) return;
          Color.lerp(this._currentColor, this._currentColor, this._targetColor, Math.min(1.0, deltaTime * this._colorLerpSpeed));
          this.TriggerMaterialNode.material.setProperty('mainColor', this._currentColor);
        };
        _proto.setTargetColor = function setTargetColor(targetColor) {
          this._targetColor = targetColor;
        };
        _createClass(Trigger, [{
          key: "IsTriggered",
          get: function get() {
            return this._isTriggered;
          }
        }]);
        return Trigger;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "TriggerMaterialNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Tutorial.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ArrowPointer.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component, ArrowPointer;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      ArrowPointer = module.ArrowPointer;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "35718seCKRM64NkQa+MKVU2", "Tutorial", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TutorialSteps = exports('TutorialSteps', /*#__PURE__*/function (TutorialSteps) {
        TutorialSteps[TutorialSteps["GetTomato"] = 0] = "GetTomato";
        TutorialSteps[TutorialSteps["TakeTomato"] = 1] = "TakeTomato";
        TutorialSteps[TutorialSteps["GetPack"] = 2] = "GetPack";
        TutorialSteps[TutorialSteps["TakePack"] = 3] = "TakePack";
        TutorialSteps[TutorialSteps["GetMoney"] = 4] = "GetMoney";
        TutorialSteps[TutorialSteps["TakeMoney"] = 5] = "TakeMoney";
        TutorialSteps[TutorialSteps["TutorialCompleted"] = 6] = "TutorialCompleted";
        return TutorialSteps;
      }({}));
      var HelpSteps = exports('HelpSteps', /*#__PURE__*/function (HelpSteps) {
        HelpSteps[HelpSteps["None"] = 0] = "None";
        HelpSteps[HelpSteps["NeedMoreTomatoes"] = 1] = "NeedMoreTomatoes";
        HelpSteps[HelpSteps["NeedToPackTomatoes"] = 2] = "NeedToPackTomatoes";
        HelpSteps[HelpSteps["NeedToSellPacks"] = 3] = "NeedToSellPacks";
        HelpSteps[HelpSteps["NeedToUpgrade"] = 4] = "NeedToUpgrade";
        return HelpSteps;
      }({}));
      var Tutorial = exports('Tutorial', (_dec = ccclass('Tutorial'), _dec2 = property({
        type: ArrowPointer
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Tutorial, _Component);
        function Tutorial() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "Arrow", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "GetTomatoPoint", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TakeTomatoPoint", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "GetPackTomatoPoint", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TakePackTomatoPoint", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "GetMoneyPoint", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "TakeMoneyPoint", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "Arrows", _descriptor8, _assertThisInitialized(_this));
          _this._player = void 0;
          _this._currentStep = TutorialSteps.GetTomato;
          _this._currentHelpStep = HelpSteps.None;
          _this._isTutorialCompleted = false;
          return _this;
        }
        var _proto = Tutorial.prototype;
        _proto.update = function update() {
          if (!this._isTutorialCompleted) {
            this.UpdateTutorial();
          } else {
            this.UpdateHelpSystem();
          }
        };
        _proto.Init = function Init(player) {
          this._player = player;
        };
        _proto.UpdateTutorial = function UpdateTutorial() {
          switch (this._currentStep) {
            case TutorialSteps.GetTomato:
              this.Arrows[0].active = true;
              if (this._player.CountTomato >= 2) {
                this.Arrow.SetTargetNode(this.TakeTomatoPoint);
                this.Arrows[0].active = false;
                this.Arrows[1].active = true;
                this.NextStep();
              }
              break;
            case TutorialSteps.TakeTomato:
              if (this._player.CountTomato <= 0) {
                this.Arrow.SetTargetNode(this.GetPackTomatoPoint);
                this.Arrows[1].active = false;
                this.Arrows[2].active = true;
                this.NextStep();
              }
              break;
            case TutorialSteps.GetPack:
              if (this._player.PackTomato > 0) {
                this.Arrow.SetTargetNode(this.TakePackTomatoPoint);
                this.Arrows[2].active = false;
                this.Arrows[3].active = true;
                this.NextStep();
              }
              break;
            case TutorialSteps.TakePack:
              if (this._player.PackTomato <= 0) {
                this.Arrow.SetTargetNode(this.GetMoneyPoint);
                this.Arrows[3].active = false;
                this.Arrows[4].active = true;
                this.NextStep();
              }
              break;
            case TutorialSteps.GetMoney:
              if (this._player.Money > 0) {
                this.Arrow.SetTargetNode(this.TakeMoneyPoint);
                this.Arrows[4].active = false;
                this.Arrows[5].active = true;
                this.NextStep();
              }
              break;
            case TutorialSteps.TakeMoney:
              if (this._player.Money <= 0) {
                this.Arrow.node.active = false;
                this.Arrows[5].active = false;
                this._isTutorialCompleted = true;
                this._currentHelpStep = this.DetermineHelpNeeded();
                this.NextStep();
              }
              break;
          }
        };
        _proto.UpdateHelpSystem = function UpdateHelpSystem() {
          var newHelpStep = this.DetermineHelpNeeded();
          if (newHelpStep !== this._currentHelpStep) {
            this._currentHelpStep = newHelpStep;
            this.UpdateHelpArrow();
          }
        };
        _proto.DetermineHelpNeeded = function DetermineHelpNeeded() {
          if (this._player.CountTomato < 2 && this._player.PackTomato === 0) {
            return HelpSteps.NeedMoreTomatoes;
          } else if (this._player.CountTomato > 0 && this._player.PackTomato === 0) {
            return HelpSteps.NeedToPackTomatoes;
          } else if (this._player.PackTomato > 0) {
            return HelpSteps.NeedToSellPacks;
          } else if (this._player.Money > 0) {
            return HelpSteps.NeedToUpgrade;
          }
          return HelpSteps.None;
        };
        _proto.UpdateHelpArrow = function UpdateHelpArrow() {
          this.Arrows.forEach(function (arrow) {
            return arrow.active = false;
          });
          this.Arrow.node.active = false;
          switch (this._currentHelpStep) {
            case HelpSteps.NeedMoreTomatoes:
              this.Arrow.SetTargetNode(this.GetTomatoPoint);
              this.Arrow.node.active = true;
              break;
            case HelpSteps.NeedToPackTomatoes:
              this.Arrow.SetTargetNode(this.GetPackTomatoPoint);
              this.Arrow.node.active = true;
              break;
            case HelpSteps.NeedToSellPacks:
              this.Arrow.SetTargetNode(this.TakePackTomatoPoint);
              this.Arrow.node.active = true;
              break;
            case HelpSteps.NeedToUpgrade:
              this.Arrow.SetTargetNode(this.GetMoneyPoint);
              this.Arrow.node.active = true;
              break;
            case HelpSteps.None:
            default:
              this.Arrow.node.active = false;
              break;
          }
        };
        _proto.NextStep = function NextStep() {
          if (this._currentStep < TutorialSteps.TutorialCompleted) {
            this._currentStep = this._currentStep + 1;
          }
        };
        return Tutorial;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Arrow", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "GetTomatoPoint", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "TakeTomatoPoint", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "GetPackTomatoPoint", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "TakePackTomatoPoint", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "GetMoneyPoint", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "TakeMoneyPoint", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "Arrows", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});