// From http://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-an-object-in-javascript
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

var dataModel = function () {

    var self = this;

    this.resetValues = function () {
        this.gameValues = [];
        for (var i = 0; i < 9; i++) {
            this.gameValues.push([i, null]);
        }
        this.whoPlays = null;
    };

    this.resetValues();

    this.nextPlayer = function () {
        if (this.whoPlays == null) {
            if (Math.random() < 0.5) {
                this.whoPlays = 1; // user
            } else {
                this.whoPlays = 0; // AI
            }
        } else {
            this.whoPlays = Math.abs(this.whoPlays - 1);
        }
    };

    this.checkWhoWon = function () {

        if (self.gameValues[0][1] == 1 && self.gameValues[1][1] == 1 && self.gameValues[2][1] == 1) {
            return 'ai';
        }
        if (self.gameValues[3][1] == 1 && self.gameValues[4][1] == 1 && self.gameValues[5][1] == 1) {
            return 'ai';
        }
        if (self.gameValues[6][1] == 1 && self.gameValues[7][1] == 1 && self.gameValues[8][1] == 1) {
            return 'ai';
        }
        if (self.gameValues[0][1] == 1 && self.gameValues[3][1] == 1 && self.gameValues[6][1] == 1) {
            return 'ai';
        }
        if (self.gameValues[1][1] == 1 && self.gameValues[4][1] == 1 && self.gameValues[7][1] == 1) {
            return 'ai';
        }
        if (self.gameValues[2][1] == 1 && self.gameValues[5][1] == 1 && self.gameValues[8][1] == 1) {
            return 'ai';
        }
        if (self.gameValues[0][1] == 1 && self.gameValues[4][1] == 1 && self.gameValues[8][1] == 1) {
            return 'ai';
        }
        if (self.gameValues[2][1] == 1 && self.gameValues[4][1] == 1 && self.gameValues[6][1] == 1) {
            return 'ai';
        }


        if (self.gameValues[0][1] == 0 && self.gameValues[1][1] == 0 && self.gameValues[2][1] == 0) {
            return 'you';
        }
        if (self.gameValues[3][1] == 0 && self.gameValues[4][1] == 0 && self.gameValues[5][1] == 0) {
            return 'you';
        }
        if (self.gameValues[6][1] == 0 && self.gameValues[7][1] == 0 && self.gameValues[8][1] == 0) {
            return 'you';
        }
        if (self.gameValues[0][1] == 0 && self.gameValues[3][1] == 0 && self.gameValues[6][1] == 0) {
            return 'you';
        }
        if (self.gameValues[1][1] == 0 && self.gameValues[4][1] == 0 && self.gameValues[7][1] == 0) {
            return 'you';
        }
        if (self.gameValues[2][1] == 0 && self.gameValues[5][1] == 0 && self.gameValues[8][1] == 0) {
            return 'you';
        }
        if (self.gameValues[0][1] == 0 && self.gameValues[4][1] == 0 && self.gameValues[8][1] == 0) {
            return 'you';
        }
        if (self.gameValues[2][1] == 0 && self.gameValues[4][1] == 0 && self.gameValues[6][1] == 0) {
            return 'you';
        }

        return false;
    };

    this.checkIfDraw = function () {
        var i = 0;
        self.gameValues.forEach(function (v) {
            if (v[1] in [0, 1]) {
                i++;
            }
        });
        return (i == 9);
    };

    this.AI = function () {

        var j = 0;
        var partialArray;
        var playerArray;
        var aiArray;
        var rand;

        self.gameValues.forEach(function (v) {
            if (v[1] in [0, 1]) {
                j++;
            }
        });

        // If AI begins, start with any corner
        if (j == 0) {
            partialArray = [0, 2, 6, 8];
            rand = partialArray[Math.floor(Math.random() * partialArray.length)];
            self.gameValues[rand][1] = 1;
            return;
        }

        // If player begins with a corner, play center, always
        if (j == 1) {
            playerArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === 0) {
                    playerArray.push(v[0]);
                }
            });

            if (playerArray.contains(4)) {
                partialArray = [0, 2, 6, 8];
                rand = partialArray[Math.floor(Math.random() * partialArray.length)];
                self.gameValues[rand][1] = 1;
                return;
            }

            var nullArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === null) {
                    nullArray.push(v[0]);
                }
            });

            if (nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return;
            }
        }

        // Check for partial cross (0X0 across) && center null
        if (j == 3) {
            nullArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === null) {
                    nullArray.push(v[0]);
                }
            });

            if (nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return;
            }

            aiArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === 1) {
                    aiArray.push(v[0]);
                }
            });

            playerArray = [];
            self.gameValues.forEach(function (v) {
               if (v[1] === 0) {
                   playerArray.push(v[0]);
               }
            });

            if (aiArray.contains(4) && playerArray.contains(0) && playerArray.contains(8)) {
                self.gameValues[5][1] = 1;
                return;
            }
            if (aiArray.contains(4) && playerArray.contains(2) && playerArray.contains(6)) {
                self.gameValues[5][1] = 1;
                return;
            }
        }

        // random AI (this is not the best AI)
        var randomAI = function () {
            var partialArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] == null) {
                    partialArray.push(v[0]);
                }
            });
            rand = partialArray[Math.floor(Math.random() * partialArray.length)];
            self.gameValues[rand][1] = 1;
        };

        var isWinnable = function () {

            var localArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === 1) {
                    localArray.push(v[0]);
                }
            });

            var nullArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === null) {
                    nullArray.push(v[0]);
                }
            });

            // lines
            if (localArray.contains(0) && localArray.contains(1) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(1) && localArray.contains(2) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(0) && localArray.contains(2) && nullArray.contains(1)) {
                self.gameValues[1][1] = 1;
                return true;
            }

            if (localArray.contains(3) && localArray.contains(4) && nullArray.contains(5)) {
                self.gameValues[5][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(5) && nullArray.contains(3)) {
                self.gameValues[3][1] = 1;
                return true;
            }
            if (localArray.contains(3) && localArray.contains(5) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }

            if (localArray.contains(6) && localArray.contains(7) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }
            if (localArray.contains(7) && localArray.contains(8) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(6) && localArray.contains(8) && nullArray.contains(7)) {
                self.gameValues[7][1] = 1;
                return true;
            }

            // Diagonals
            if (localArray.contains(0) && localArray.contains(4) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(8) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(0) && localArray.contains(8) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }

            if (localArray.contains(2) && localArray.contains(4) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(6) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(2) && localArray.contains(6) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }

            // rows
            if (localArray.contains(0) && localArray.contains(3) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(3) && localArray.contains(6) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(0) && localArray.contains(6) && nullArray.contains(3)) {
                self.gameValues[3][1] = 1;
                return true;
            }

            if (localArray.contains(1) && localArray.contains(4) && nullArray.contains(7)) {
                self.gameValues[7][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(7) && nullArray.contains(1)) {
                self.gameValues[1][1] = 1;
                return true;
            }
            if (localArray.contains(1) && localArray.contains(7) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }

            if (localArray.contains(2) && localArray.contains(5) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }
            if (localArray.contains(5) && localArray.contains(8) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(2) && localArray.contains(8) && nullArray.contains(5)) {
                self.gameValues[5][1] = 1;
                return true;
            }

            return false;
        };

        // Check for dangerous doublets, play accordingly
        var doubletCheck = function () {

            var localArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === 0) {
                    localArray.push(v[0]);
                }
            });

            var nullArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === null) {
                    nullArray.push(v[0]);
                }
            });

            // Lines
            if (localArray.contains(0) && localArray.contains(1) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(1) && localArray.contains(2) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(0) && localArray.contains(2) && nullArray.contains(1)) {
                self.gameValues[1][1] = 1;
                return true;
            }
            if (localArray.contains(3) && localArray.contains(4) && nullArray.contains(5)) {
                self.gameValues[5][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(5) && nullArray.contains(3)) {
                self.gameValues[3][1] = 1;
                return true;
            }
            if (localArray.contains(3) && localArray.contains(5) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }
            if (localArray.contains(6) && localArray.contains(7) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }
            if (localArray.contains(7) && localArray.contains(8) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(6) && localArray.contains(8) && nullArray.contains(7)) {
                self.gameValues[7][1] = 1;
                return true;
            }

            // Diagonals
            if (localArray.contains(0) && localArray.contains(4) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(8) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(0) && localArray.contains(8) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }
            if (localArray.contains(2) && localArray.contains(4) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(6) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(2) && localArray.contains(6) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }

            // Rows
            if (localArray.contains(0) && localArray.contains(3) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(3) && localArray.contains(6) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(0) && localArray.contains(6) && nullArray.contains(3)) {
                self.gameValues[3][1] = 1;
                return true;
            }
            if (localArray.contains(1) && localArray.contains(4) && nullArray.contains(7)) {
                self.gameValues[7][1] = 1;
                return true;
            }
            if (localArray.contains(4) && localArray.contains(7) && nullArray.contains(1)) {
                self.gameValues[1][1] = 1;
                return true;
            }
            if (localArray.contains(1) && localArray.contains(7) && nullArray.contains(4)) {
                self.gameValues[4][1] = 1;
                return true;
            }
            if (localArray.contains(2) && localArray.contains(5) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }
            if (localArray.contains(5) && localArray.contains(8) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(2) && localArray.contains(8) && nullArray.contains(5)) {
                self.gameValues[5][1] = 1;
                return true;
            }

            return false;

        };

        // If free, play opposite
        var playCorners = function () {

            var localArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === 1) {
                    localArray.push(v[0]);
                }
            });

            var nullArray = [];
            self.gameValues.forEach(function (v) {
                if (v[1] === null) {
                    nullArray.push(v[0]);
                }
            });

            // Play corners...
            if (localArray.contains(0) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(0) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(0) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }

            if (localArray.contains(2) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(2) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }
            if (localArray.contains(2) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }

            if (localArray.contains(6) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(6) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(6) && nullArray.contains(8)) {
                self.gameValues[8][1] = 1;
                return true;
            }

            if (localArray.contains(8) && nullArray.contains(0)) {
                self.gameValues[0][1] = 1;
                return true;
            }
            if (localArray.contains(8) && nullArray.contains(2)) {
                self.gameValues[2][1] = 1;
                return true;
            }
            if (localArray.contains(8) && nullArray.contains(6)) {
                self.gameValues[6][1] = 1;
                return true;
            }

            if (localArray.contains(4) && nullArray.contains(  ))

            return false;
        };

        if (isWinnable()) {
            //
        } else {
            if (doubletCheck()) {
            } else {
                if (playCorners()) {
                    //
                } else {
                    randomAI();
                }
            }
        }
    }

};

var viewModel = function () {

    var refresh = function (w) {
        var data = w().slice(0);
        w([]);
        w(data);
    };

    var aiNext = function () {
        data.AI();
        self.gameValuesView(data.gameValues);
        refresh(self.gameValuesView);
        data.nextPlayer();
        self.whoPlaysView(data.whoPlays);
        self.aiTurn(0);
    };

    var checkBoard = function () {
        var r, s;

        r = data.checkWhoWon();
        if (r) {
            if (r == 'you') {
                self.winText('YOU WIN');
                finished();
            } else {
                self.winText('YOU LOOSE');
                finished();
            }
        } else {
            s = data.checkIfDraw();
            if (s) {
                self.winText('DRAW AGAIN?');
                finished();
            }
        }
    };

    var self = this;

    this.aiTurn = ko.observable();
    this.winText = ko.observable('WELL DONE!');
    this.btnText = ko.observable('Restart');
    this.gameValuesView = ko.observableArray(data.gameValues);
    this.playing = ko.observable(0);

    this.restartGame = function () {
        data.resetValues();
        self.gameValuesView(data.gameValues);
        refresh(self.gameValuesView);
        data.nextPlayer();
        self.aiTurn(data.whoPlays);
        self.whoPlaysView(data.whoPlays);
        $('#over').hide();
        if (self.aiTurn() == 1) {
            aiNext();
        }
        self.playing(1);
    };

    if (data.whoPlays == null) {
        data.nextPlayer();
        self.aiTurn(data.whoPlays);
        self.whoPlaysView = ko.observable(data.whoPlays);
        if (self.aiTurn() == 1) {
            aiNext();
        }
        self.playing(1);
    }

    var finished = function () {
        self.playing(0);
        $('#over').show();
    };

    this.tileClick = function (v) {

        var r, s;

        if (v[1] != null) {
            console.log('Tile already played');
            return;
        }

        self.aiTurn(1);
        var w = v[1];
        data.gameValues[v[0]][1] = data.whoPlays;
        self.gameValuesView(data.gameValues);
        refresh(self.gameValuesView);

        checkBoard();

        if (self.playing() == 1) {

            data.nextPlayer();
            self.whoPlaysView(data.whoPlays);

            aiNext();
            checkBoard();

            self.aiTurn(0);
        }
    };

};

$('#over').hide();

var data = new dataModel();

ko.applyBindings(new viewModel());
