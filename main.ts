/**
 * De variabele worden op de beginwaarden ingesteld.
 */
/**
 * Beweegt de speler naar links of rechts.
 */
/**
 * Maakt een kogel aan als de speler op A+B drukt.
 */
/**
 * Genereert een getal tussen de 0 en 3, als dit 2 is wordt er een enemtShipSmall gespawned.
 */
/**
 * Ik gebruik hier expres geen else if statements, omdat er soms meerdere voorwaarden gecontroleerd moeten worden.
 */
/**
 * - Update de score
 * 
 * - Hoe meer punten de speler heeft gehaald, hoe sneller het spel gaat
 * 
 * - Als de speler meer dan 50 punten heeft gehaald begint de eindbaas.
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
 * Kijkt of een enemyShipSmall de kogel van de speler aanraakt. Als dit zo is worden de enemyShipSmall en kogel verwijderd en krijgt de speler 5 punten.
 */
/**
 * Als de eindbaas verslagen is krijgt de speler 15 punten per overgebleven leven.
 */
input.onButtonPressed(Button.A, function () {
    playerSprite.move(-1)
    if (score < maxScore) {
        score += 1
    }
})
/**
 * Kijkt of dingen elkaar aanraken en wat er dan moet gebeuren.
 */
function spawnEnemyShipLarge () {
    enemyShipLargeBodyHeart = game.createSprite(2, 0)
    enemyShipLargeBodyLeft = game.createSprite(1, 0)
    enemyShipLargeBodyFront = game.createSprite(2, 1)
    enemyShipLargeBodyRight = game.createSprite(3, 0)
    while (enemyShipLargeBodyHeart.isTouchingEdge()) {
        enemyShipLargeShootingNumber = 5
        if (enemyShipLargeShootingNumber == 5) {
            enemyShipLargeBullet = game.createSprite(2, 1)
            for (let index = 0; index < 3; index++) {
                basic.pause(enemyShipLargeBulletInterval)
                enemyShipLargeBullet.change(LedSpriteProperty.Y, 1)
            }
        }
        basic.pause(eventInterval)
        enemyShipLargeBullet.delete()
    }
}
input.onButtonPressed(Button.AB, function () {
    playerBullet = game.createSprite(playerSprite.get(LedSpriteProperty.X), 3)
    playerBullet.set(LedSpriteProperty.Blink, 350)
    while (playerBullet) {
        basic.pause(eventInterval)
        playerBullet.change(LedSpriteProperty.Y, -1)
        if (playerBullet.isDeleted()) {
            break;
        }
    }
})
input.onButtonPressed(Button.B, function () {
    playerSprite.move(1)
    if (score < maxScore) {
        score += 1
    }
})
let randomNumber = 0
let playerBullet: game.LedSprite = null
let enemyShipLargeBullet: game.LedSprite = null
let enemyShipLargeShootingNumber = 0
let enemyShipLargeBodyRight: game.LedSprite = null
let enemyShipLargeBodyFront: game.LedSprite = null
let enemyShipLargeBodyLeft: game.LedSprite = null
let enemyShipLargeBodyHeart: game.LedSprite = null
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
playerSprite.set(LedSpriteProperty.Brightness, 175)
eventInterval = 1000
let enemyShipSmallList: game.LedSprite[] = []
let bossBattleHasStarted = 0
enemyShipLargeBulletInterval = 400
maxScore = 50
/**
 * Spawned een eindbaas.
 */
basic.forever(function () {
    while (score < maxScore && game.isRunning()) {
        randomNumber = randint(0, 3)
        if (randomNumber == 2) {
            if (enemyShipSmallList.length < 5) {
                enemyShipSmallList.unshift(game.createSprite(randint(0, 4), 0))
            }
        }
        basic.pause(eventInterval * 0.5)
    }
})
basic.forever(function () {
    if (enemyShipLargeBodyHeart && playerBullet) {
        if (playerBullet.isTouching(enemyShipLargeBodyLeft)) {
            enemyShipLargeBodyLeft.delete()
            playerBullet.delete()
            enemyShipLargeBulletInterval += 100
        }
        if (playerBullet.isTouching(enemyShipLargeBodyRight)) {
            enemyShipLargeBodyRight.delete()
            playerBullet.delete()
            enemyShipLargeBulletInterval += 100
        }
        if (playerBullet.isTouching(enemyShipLargeBodyFront)) {
            enemyShipLargeBodyFront.delete()
            playerBullet.delete()
            enemyShipLargeBulletInterval += 100
        }
        if (playerBullet.isTouching(enemyShipLargeBodyHeart)) {
            enemyShipLargeBodyHeart.delete()
            playerBullet.delete()
        }
        if (playerBullet.isTouching(enemyShipLargeBullet)) {
            enemyShipLargeBullet.delete()
            playerBullet.delete()
        }
    }
    if (enemyShipLargeBullet) {
        if (playerSprite.isTouching(enemyShipLargeBullet)) {
            lives += -1
            game.removeLife(1)
            enemyShipLargeBullet.delete()
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
    game.setScore(score)
    eventInterval = 1000 - score * 10
    if (score >= maxScore && bossBattleHasStarted < 1) {
        for (let value of enemyShipSmallList) {
            enemyShipSmallList = []
            value.delete()
        }
        spawnEnemyShipLarge()
        bossBattleHasStarted += 1
    }
})
basic.forever(function () {
    for (let value of enemyShipSmallList) {
        basic.pause(eventInterval * 0.3)
        value.change(LedSpriteProperty.Y, 1)
        value.set(LedSpriteProperty.Brightness, 100)
    }
})
basic.forever(function () {
    for (let value of enemyShipSmallList) {
        if (value.get(LedSpriteProperty.Y) == 4) {
            basic.pause(200)
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(value))
            value.delete()
        }
    }
})
basic.forever(function () {
    for (let value of enemyShipSmallList) {
        if (value.isTouching(playerSprite)) {
            game.removeLife(1)
            value.delete()
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(value))
        }
    }
})
basic.forever(function () {
    for (let value of enemyShipSmallList) {
        if (playerBullet && value.isTouching(playerBullet)) {
            value.delete()
            enemyShipSmallList.removeAt(enemyShipSmallList.indexOf(value))
            playerBullet.delete()
            score += 5
        }
    }
})
basic.forever(function () {
    if (bossBattleHasStarted == 1 && enemyShipLargeBodyHeart.isDeleted()) {
        score += lives * 15
        game.gameOver()
    }
})
