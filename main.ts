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
    if (score < maxScore) {
        score += 1
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
    ship = game.createSprite(2, 0)
    ship.set(LedSpriteProperty.Blink, 100)
    list = []
    basic.pause(1000)
    ship.delete()
    explosionParticleLeft = game.createSprite(1, 0)
    explosionParticleLeft.set(LedSpriteProperty.Direction, 270)
    list.push(explosionParticleLeft)
    explosionParticleDownLeft = game.createSprite(1, 1)
    explosionParticleDownLeft.set(LedSpriteProperty.Direction, 225)
    list.push(explosionParticleDownLeft)
    explosionParticleRight = game.createSprite(3, 0)
    explosionParticleRight.set(LedSpriteProperty.Direction, 90)
    list.push(explosionParticleRight)
    explosionParticleDownRight = game.createSprite(3, 1)
    explosionParticleDownRight.set(LedSpriteProperty.Direction, 135)
    list.push(explosionParticleDownRight)
    explosionParticleDown = game.createSprite(2, 1)
    explosionParticleDown.set(LedSpriteProperty.Direction, 180)
    list.push(explosionParticleDown)
    basic.pause(100)
    for (let index = 0; index < 4; index++) {
        basic.pause(200)
        for (let value of list) {
            value.change(LedSpriteProperty.Brightness, -75)
            value.move(1)
        }
    }
    basic.pause(500)
    basic.showString("WON SCORE")
    basic.showNumber(score)
}
input.onButtonPressed(Button.AB, function () {
    if (bossIsDefeated < 1) {
        playerBullet = game.createSprite(playerSprite.get(LedSpriteProperty.X), 3)
        playerBullet.set(LedSpriteProperty.Blink, 350)
        while (playerBullet) {
            basic.pause(eventInterval)
            playerBullet.change(LedSpriteProperty.Y, -1)
            if (playerBullet.isDeleted()) {
                break;
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    playerSprite.move(1)
    if (score < maxScore) {
        score += 1
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
let list: game.LedSprite[] = []
let ship: game.LedSprite = null
let enemyShipLargeBullet: game.LedSprite = null
let enemyShipLargeBodyRight: game.LedSprite = null
let enemyShipLargeBodyFront: game.LedSprite = null
let enemyShipLargeBodyLeft: game.LedSprite = null
let enemyShipLargeBodyHeart: game.LedSprite = null
let bossIsDefeated = 0
let maxScore = 0
let enemyShipLargeBulletInterval = 0
let playerSprite: game.LedSprite = null
let score = 0
let eventInterval = 0
eventInterval = 1000
game.setLife(3)
score = 0
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
    while (score < maxScore && game.isRunning()) {
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
/**
 * Kijkt of een enemyShipSmall de kogel van de speler aanraakt. Als dit zo is worden de enemyShipSmall en kogel verwijderd en krijgt de speler 5 punten.
 */
basic.forever(function () {
    for (let value7 of enemyShipSmallList) {
        if (playerBullet && value7.isTouching(playerBullet)) {
            playerBullet.delete()
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(value7))
            value7.delete()
            score += 5
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
            score += lives * 15
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
/**
 * Verplaatst de enemyShipSmall naar beneden elke (0.3*eventInterval) seconden.
 */
basic.forever(function () {
    for (let value4 of enemyShipSmallList) {
        basic.pause(eventInterval * 0.3)
        value4.change(LedSpriteProperty.Y, 1)
        value4.set(LedSpriteProperty.Brightness, 150)
    }
})
basic.forever(function () {
    for (let value5 of enemyShipSmallList) {
        if (value5.get(LedSpriteProperty.Y) == 4) {
            basic.pause(200)
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(value5))
            value5.delete()
        }
    }
})
basic.forever(function () {
    for (let value6 of enemyShipSmallList) {
        if (value6.isTouching(playerSprite)) {
            game.removeLife(1)
            value6.delete()
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(value6))
        }
    }
})
basic.forever(function () {
    game.setScore(score)
    eventInterval = 1000 - score * 10
    if (score >= maxScore && bossBattleHasStarted < 1) {
        for (let value3 of enemyShipSmallList) {
            enemyShipSmallList = []
            value3.delete()
        }
        spawnEnemyShipLarge()
        bossBattleHasStarted += 1
    }
})
