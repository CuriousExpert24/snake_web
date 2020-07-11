const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var endCanvas = document.getElementById('endCanvas');
var context = endCanvas.getContext('2d');
var x = endCanvas.width / 2;
var z = endCanvas.height / 1.2;
var y = endCanvas.height / 2.5;
context.font = '22px serif';
context.textAlign = 'center';
context.fillStyle = '#fff';
context.fillText('Game Over!', x, y);
context.fillText('Game restarts in 4 seconds!', x, z);

const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;

function swapClass() {
    canvas.className = "canvas";
    endCanvas.className = "endCanvas";
}

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision()

        if (snake.valueReturn === true) {
            endCanvas.className = "canvas";
            canvas.className = "endCanvas";
            setTimeout(swapClass, 4000);
            snake.valueReturn = false;
        }

        document.querySelector('.score')
            .innerText = snake.total;

    }, 250);
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));



class Typewriter {
    constructor(id, arr) {
        this.el = document.getElementById(id);
        this.period = 200;
        this.interval = '';
        this.deleteInterval = '';
        this.word = '';
        this.add = true;
        this.textArray = arr;
    }
    type() {
        var self = this;
        this.letter = 0;
        this.counter = 0;
        clearInterval(this.interval);
        this.interval = setInterval(function () { self.addLetters(); }, this.period);
    }
    setWord() {
        this.word = this.textArray[this.counter];
    }
    deleteLetters() {
        if (this.letter > 0 && !this.add) {
            this.letter--;
            var textContent = this.el.textContent;
            this.el.textContent = textContent.substring(0, this.letter);
        } else if (this.letter === 0 && !this.add) {
            this.add = true;
            this.el.innerHTML = '';
            this.counter++;
            this.setWord();
            this.startAdd();
        }
    }
    addLetters() {
        var self = this;
        if (this.counter === this.textArray.length) {
            this.type();
        } else {
            this.setWord();
            if (this.letter < this.word.length && this.add) {
                this.el.textContent += this.word[this.letter];
                this.letter++;
            } else if (this.letter === this.word.length && this.add) {
                this.add = false;
                document.getElementById('blinker').classList = "blink";
                setTimeout(function () { self.startDelete(); }, 1500);
            }
        }
    }
    startDelete() {
        var self = this;
        document.getElementById('blinker').classList = "";
        clearInterval(this.interval);
        this.interval = setInterval(function () { self.deleteLetters(); }, this.period);
    }
    startAdd() {
        var self = this;
        clearInterval(this.interval);
        this.interval = setInterval(function () { self.addLetters(); }, this.period);
    }
}

var type = new Typewriter('type', ["Made in HTML", "Made in CSS", "Made in JavaScript"]);
type.type();