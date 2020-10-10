/**
 * Maakt een kogel aan als de speler op A+B drukt.
 */
/**
 * Beweegt de speler naar links of rechts.
 */
/**
 * De variabele worden op de beginwaarden ingesteld.
 */
/**
 * Start een animatie als de eindbaas verslagen is.
 */
/**
 * Genereert een getal tussen de 1 en 3, als dit 2 is wordt er een enemtShipSmall gespawned.
 */
/**
 * Ik gebruik hier expres geen else if statements, omdat er soms meerdere voorwaarden gecontroleerd moeten worden.
 */
/**
 * Spawned een eindbaas.
 */
/**
 * Kijkt of een enemyShipSmall de kogel van de speler aanraakt. Als dit zo is worden de enemyShipSmall en kogel verwijderd en krijgt de speler 5 punten.
 */
/**
 * Verplaatst de enemyShipSmall naar beneden elke (0.3*eventInterval) seconden.
 */
/**
 * Kijkt of er een enemyShipSmall de onderste rand aanraakt. Als dit zo is wordt het schip verwijderd.
 */
/**
 * Kijkt of er een enemyShipSmall de speler aanraakt. Als dit zo is verliest de speler een leven.
 */
/**
 * - Update de score
 * 
 * - Hoe meer punten de speler heeft gehaald, hoe sneller het spel gaat
 * 
 * - Als de speler meer dan 50 punten heeft gehaald begint de eindbaas.
 */
input.onButtonPressed(Button.A, function () {
    playerSprite.move(-1)
    if (playerScore < maxScore) {
        playerScore += 1
    }
})
function spawnEnemyShipLarge () {
    enemyShipLargeBodyHeart = game.createSprite(2, 0)
    enemyShipLargeBodyLeft = game.createSprite(1, 0)
    enemyShipLargeBodyFront = game.createSprite(2, 1)
    enemyShipLargeBodyRight = game.createSprite(3, 0)
    while (enemyShipLargeBodyHeart.isTouchingEdge() && bossIsDefeated < 1) {
        basic.pause(enemyShipLargeBulletInterval)
        enemyShipLargeBullet = game.createSprite(2, 1)
        for (let index = 0; index < 3; index++) {
            basic.pause(eventInterval)
            enemyShipLargeBullet.change(LedSpriteProperty.Y, 1)
        }
        basic.pause(200)
        enemyShipLargeBullet.delete()
    }
}
function gameWonAnimation () {
    if (enemyShipLargeBullet) {
        enemyShipLargeBullet.delete()
    }
    enemyShipToExplode = game.createSprite(2, 0)
    enemyShipToExplode.set(LedSpriteProperty.Blink, 100)
    explosionParticlesList = []
    basic.pause(1000)
    enemyShipToExplode.delete()
    explosionParticleLeft = game.createSprite(1, 0)
    explosionParticleLeft.set(LedSpriteProperty.Direction, 270)
    explosionParticlesList.push(explosionParticleLeft)
    explosionParticleDownLeft = game.createSprite(1, 1)
    explosionParticleDownLeft.set(LedSpriteProperty.Direction, 225)
    explosionParticlesList.push(explosionParticleDownLeft)
    explosionParticleRight = game.createSprite(3, 0)
    explosionParticleRight.set(LedSpriteProperty.Direction, 90)
    explosionParticlesList.push(explosionParticleRight)
    explosionParticleDownRight = game.createSprite(3, 1)
    explosionParticleDownRight.set(LedSpriteProperty.Direction, 135)
    explosionParticlesList.push(explosionParticleDownRight)
    explosionParticleDown = game.createSprite(2, 1)
    explosionParticleDown.set(LedSpriteProperty.Direction, 180)
    explosionParticlesList.push(explosionParticleDown)
    basic.pause(100)
    for (let index = 0; index < 4; index++) {
        basic.pause(200)
        for (let explosionParticle of explosionParticlesList) {
            explosionParticle.change(LedSpriteProperty.Brightness, -75)
            explosionParticle.move(1)
        }
    }
    basic.pause(500)
    basic.showString("WON SCORE")
    basic.showNumber(playerScore)
}
input.onButtonPressed(Button.AB, function () {
    if (bossIsDefeated < 1) {
        playerBullet = game.createSprite(playerSprite.get(LedSpriteProperty.X), 3)
        playerBullet.set(LedSpriteProperty.Blink, 350)
        while (playerBullet) {
            basic.pause(eventInterval * 0.7)
            playerBullet.change(LedSpriteProperty.Y, -1)
            if (playerBullet.isDeleted()) {
                break;
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    playerSprite.move(1)
    if (playerScore < maxScore) {
        playerScore += 1
    }
})
let bossBattleHasStarted = 0
let enemyShipSmallList: game.LedSprite[] = []
let randomNumber = 0
let playerBullet: game.LedSprite = null
let explosionParticleDown: game.LedSprite = null
let explosionParticleDownRight: game.LedSprite = null
let explosionParticleRight: game.LedSprite = null
let explosionParticleDownLeft: game.LedSprite = null
let explosionParticleLeft: game.LedSprite = null
let explosionParticlesList: game.LedSprite[] = []
let enemyShipToExplode: game.LedSprite = null
let enemyShipLargeBullet: game.LedSprite = null
let enemyShipLargeBodyRight: game.LedSprite = null
let enemyShipLargeBodyFront: game.LedSprite = null
let enemyShipLargeBodyLeft: game.LedSprite = null
let enemyShipLargeBodyHeart: game.LedSprite = null
let bossIsDefeated = 0
let maxScore = 0
let enemyShipLargeBulletInterval = 0
let playerSprite: game.LedSprite = null
let playerScore = 0
let eventInterval = 0
eventInterval = 1000
game.setLife(3)
playerScore = 0
let lives = 3
playerSprite = game.createSprite(2, 4)
playerSprite.set(LedSpriteProperty.Brightness, 130)
eventInterval = 1000
enemyShipLargeBulletInterval = 400
maxScore = 50
bossIsDefeated = 0
/**
 * Kijkt of het gevecht met de eindbaas begonnen is en als dit zo is haalt hij de oude kogel van het schip weg.
 */
/**
 * Kijkt of dingen elkaar aanraken en wat er dan moet gebeuren.
 */
basic.forever(function () {
    while (playerScore < maxScore && game.isRunning()) {
        randomNumber = randint(1, 3)
        if (randomNumber == 2) {
            if (enemyShipSmallList.length < 5) {
                enemyShipSmallList.unshift(game.createSprite(randint(0, 4), 0))
            }
        }
        basic.pause(eventInterval * 0.5)
    }
})
basic.forever(function () {
    if (bossIsDefeated == 1) {
        enemyShipLargeBullet.delete()
    }
})
basic.forever(function () {
    for (let enemyShipSmallTouchesBullet of enemyShipSmallList) {
        if (playerBullet && enemyShipSmallTouchesBullet.isTouching(playerBullet)) {
            playerBullet.delete()
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(enemyShipSmallTouchesBullet))
            enemyShipSmallTouchesBullet.delete()
            playerScore += 5
        }
    }
})
basic.forever(function () {
    if (enemyShipLargeBodyHeart && playerBullet) {
        if (playerBullet.isTouching(enemyShipLargeBodyLeft)) {
            enemyShipLargeBodyLeft.delete()
            playerBullet.delete()
            enemyShipLargeBulletInterval += 300
        }
        if (playerBullet.isTouching(enemyShipLargeBodyRight)) {
            enemyShipLargeBodyRight.delete()
            playerBullet.delete()
            enemyShipLargeBulletInterval += 300
        }
        if (playerBullet.isTouching(enemyShipLargeBodyFront)) {
            enemyShipLargeBodyFront.delete()
            playerBullet.delete()
            enemyShipLargeBulletInterval += 100
        }
        if (playerBullet.isTouching(enemyShipLargeBodyHeart)) {
            enemyShipLargeBullet.delete()
            bossIsDefeated = 1
            enemyShipLargeBodyHeart.delete()
            enemyShipLargeBodyLeft.delete()
            enemyShipLargeBodyRight.delete()
            playerBullet.delete()
            playerScore += lives * 15
            gameWonAnimation()
        }
        if (enemyShipLargeBullet && playerBullet.isTouching(enemyShipLargeBullet)) {
            enemyShipLargeBullet.delete()
            playerBullet.delete()
        }
    }
    if (enemyShipLargeBullet) {
        if (playerSprite.isTouching(enemyShipLargeBullet)) {
            enemyShipLargeBullet.delete()
            lives += -1
            game.removeLife(1)
        }
    }
    if (playerBullet) {
        if (playerBullet.get(LedSpriteProperty.Y) == 0) {
            basic.pause(eventInterval / 2)
            playerBullet.set(LedSpriteProperty.Y, 4)
            playerBullet.delete()
        }
    }
})
basic.forever(function () {
    for (let enemyShipSmallMoveDown of enemyShipSmallList) {
        basic.pause(eventInterval * 0.3)
        enemyShipSmallMoveDown.change(LedSpriteProperty.Y, 1)
        enemyShipSmallMoveDown.set(LedSpriteProperty.Brightness, 150)
    }
})
basic.forever(function () {
    for (let enemyShipSmallTouchesBottom of enemyShipSmallList) {
        if (enemyShipSmallTouchesBottom.get(LedSpriteProperty.Y) == 4) {
            basic.pause(200)
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(enemyShipSmallTouchesBottom))
            enemyShipSmallTouchesBottom.delete()
        }
    }
})
basic.forever(function () {
    for (let enemyShipSmallTouchesPlayer of enemyShipSmallList) {
        if (enemyShipSmallTouchesPlayer.isTouching(playerSprite)) {
            game.removeLife(1)
            enemyShipSmallTouchesPlayer.delete()
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(enemyShipSmallTouchesPlayer))
        }
    }
})
basic.forever(function () {
    game.setScore(playerScore)
    eventInterval = 1000 - playerScore * 10
    if (playerScore >= maxScore && bossBattleHasStarted < 1) {
        for (let enemyShipSmallClearAll of enemyShipSmallList) {
            enemyShipSmallList = []
            enemyShipSmallClearAll.delete()
        }
        spawnEnemyShipLarge()
        bossBattleHasStarted += 1
    }
})
