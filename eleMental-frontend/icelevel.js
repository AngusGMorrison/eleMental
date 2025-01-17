class IceLevel extends Sprites {

  constructor() {
    super({ key: 'iceLevel' });
  }

  create() {

    const snowBalls = this.physics.add.group()
    const iceSpikes = this.physics.add.group()
    this.background = this.add.image(600, 400, 'background-snow');
    this.levelText()
    this.timers()
    this.playerControls()
    this.loadPlayer()

    gameState.nextLevel = gameState.level.sample()
    gameState.time = gameState.timeOrigin


    gameState.iceWallBottom = iceSpikes.create(600, 850, 'spike-bottom').body.setAllowGravity(false)
    gameState.iceWallLeft = iceSpikes.create(-50, 400, 'spike-left').body.setAllowGravity(false)
    gameState.iceWallRight = iceSpikes.create(1250, 400, 'spike-right').body.setAllowGravity(false)
    gameState.iceWallTop = iceSpikes.create(600, -50, 'spike-top').body.setAllowGravity(false)



    function snowBallsGen() {
      if (currentlyPlaying === true) {
        const yCoord = randomLocation(100, 1100)
        const velocity = Math.random() * 500
        projectiles.snowBalls = snowBalls.create(-50, yCoord, 'snowball-right').setScale(.4);
        projectiles.snowBalls.body.setAllowGravity(false);
        projectiles.snowBalls.setVelocityX(velocity)
        projectiles.snowBalls.body.setSize(250, 30)
        projectiles.snowBalls.body.setOffset(75, 50)
      }
    }

    function snowBallsGen2() {
      if (currentlyPlaying === true) {
        const yCoord = randomLocation(100, 1100)
        const velocity = Math.random() * 500
        projectiles.snowBalls = snowBalls.create(-50, yCoord, 'snowball-right').setScale(.4);
        projectiles.snowBalls.body.setAllowGravity(false);
        projectiles.snowBalls.setVelocityX(velocity)
        projectiles.snowBalls.body.setSize(250, 30)
        projectiles.snowBalls.body.setOffset(10, 40)
      }
    }

    function snowBallsGen3() {
      if (currentlyPlaying === true) {
        const yCoord = randomLocation(100, 1100)
        const velocity = Math.random() * 500
        projectiles.snowBalls = snowBalls.create(1250, yCoord, 'snowball-left').setScale(.4);
        projectiles.snowBalls.body.setAllowGravity(false);
        projectiles.snowBalls.setVelocityX(-velocity)
        projectiles.snowBalls.body.setSize(250, 30)
        projectiles.snowBalls.body.setOffset(10, 40)
      }
    }

    function snowBallsGen4() {
      if (currentlyPlaying === true) {
        const yCoord = randomLocation(100, 1100)
        const velocity = Math.random() * 500
        projectiles.snowBalls = snowBalls.create(1250, yCoord, 'snowball-left').setScale(.4);
        projectiles.snowBalls.body.setAllowGravity(false);
        projectiles.snowBalls.setVelocityX(-velocity)
        projectiles.snowBalls.body.setSize(250, 30)
        projectiles.snowBalls.body.setOffset(10, 40)
      }
    }

    const snowBallsLoop = this.time.addEvent({
      delay: gameState.fireDelay,
      callback: snowBallsGen,
      callbackScope: this,
      loop: true,
    });

    const snowBallsLoop2 = this.time.addEvent({
      delay: gameState.fireDelay,
      callback: snowBallsGen2,
      callbackScope: this,
      loop: true,
    });

    const snowBallsLoop3 = this.time.addEvent({
      delay: gameState.fireDelay,
      callback: snowBallsGen3,
      callbackScope: this,
      loop: true,
    });

    const snowBallsLoop4 = this.time.addEvent({
      delay: gameState.fireDelay,
      callback: snowBallsGen4,
      callbackScope: this,
      loop: true,
    });








    this.physics.add.overlap(snowBalls, gameState.smiley, () => {
      currentlyPlaying = false
      gameState.smiley.body.setAllowGravity(true)

      const gameOverTimer = this.time.addEvent({
        delay: 1300,
        callback: gameOver,
        callbackScope: this,
        loop: false,
      });
    })

    this.physics.add.overlap(iceSpikes, gameState.smiley, () => {
      currentlyPlaying = false
      gameState.smiley.body.setAllowGravity(true)
      gameState.smiley.body.setGravity(0, 600)
      const gameOverTimer = this.time.addEvent({
        delay: 1300,
        callback: gameOver,
        callbackScope: this,
        loop: false,
      });
    })

    function gameOver() {
      this.scene.start('gameOver')
    }

  }

  update(delta) {

    this.playerInput()

    if (gameState.time === 0) {
      gameState.positionX = gameState.smiley.x
      gameState.positionY = gameState.smiley.y
      gameState.fireDelay = gameState.fireDelay * 0.8
      gameState.speed = gameState.speed + 25
      gameState.timeOrigin += 1
      gameState.scoreTimer = gameState.scoreTimer * 1.1
      gameState.playerSpeed = gameState.playerSpeed + 25

      this.scene.start(gameState.nextLevel)
    }

    function moveWalls() {
      if (currentlyPlaying === true) {
        if (gameState.iceWallBottom.y > 675) {
          gameState.iceWallBottom.y -= 1
        }
        if (gameState.iceWallTop.y < -25) {
          gameState.iceWallTop.y += 1
        }
        if (gameState.iceWallLeft.x < -25) {
          gameState.iceWallLeft.x += 1
        } 5
        if (gameState.iceWallRight.x > 1075) {
          gameState.iceWallRight.x -= 1
        }
      }
    }

    const wallMover = this.time.addEvent({
      delay: 1,
      callback: moveWalls(),
      callbackScope: this,
      loop: true,
    });


  }
}