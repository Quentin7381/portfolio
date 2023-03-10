import board from "./board.js";

const VERBOSE = true;

class Piece {
	/**
	 * creates a Piece. Use the childs objects to generate Pawn, King, etc.
	 * @param {String} team the team of the piece
	 * @param {Number} x the x position on the board
	 * @param {Number} y the y position on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	constructor(team, x, y, verbose = VERBOSE) {
		//parameters
		this.team = team;
		this.x = x;
		this.y = y;
		this.mooves = [];
		this.selected = false;

		//dom insertion
		this.imgPath = `./imgs/${this.team}_${this.constructor.name}.png`;
		this.elt = document.createElement("img");
		this.elt.src = this.imgPath;
		board.squares[this.x][this.y].setPiece(this);

		//verbose
		if (verbose) {
			console.groupCollapsed(
				"new " +
					this.constructor.name +
					"(" +
					team +
					", " +
					x +
					", " +
					y +
					") : "
			);
			console.log(this);
			console.groupEnd(
				"new " +
					this.constructor.name +
					"(" +
					team +
					", " +
					x +
					", " +
					y +
					") : "
			);
		}

		//event listener
		this.clickListener = this.elt.addEventListener("click", (e) =>
			this.onClick()
		);
	}

	/**
	 * highlight the Squares where the piece can moove on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	showMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Piece.showMooves()");
		this.mooves.forEach((elt) => {
			if (elt.piece != null) {
				elt.highlight("attack");
			} else {
				elt.highlight("moove");
			}
		});
		if (verbose) console.groupEnd("Piece.showMooves()");
	}

	/**
	 * remooves the highlight from the Squares where the piece can moove
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	hideMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Piece.showMooves()");
		this.mooves.forEach((elt) => {
			elt.highlightRemove("moove");
			elt.highlightRemove("attack");
		});
		if (verbose) console.groupEnd("Piece.showMooves()");
	}

	/**
	 * reset mooves Array then push every Square where the Piece can moove into mooves Array
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	checkMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Piece.checkMooves()");

		this.mooves = [];

		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Piece.checkMooves()");
	}

    /**
     * checks a whole line for moovement
     * @param {Number} directionX the X direction, can be -1, 0 or 1
     * @param {Number} directionY the Y direction, can ve -1, 0 or 1
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
	checkLine(directionX, directionY, verbose = VERBOSE) {
		if (verbose)
			console.groupCollapsed(
				"Piece.checkLine(" + directionX + ", " + directionY + ")"
			);

		let x = this.x + directionX,
			y = this.y + directionY,
			test = true;

		//first definition of square
		try {
			let square = board.squares[x][y];
			if (square.piece != null) {
				test = false;
			}

			while (test) {
				console.groupCollapsed("x : " + x + " | y : " + y);
				this.mooves.push(square);
				(x += directionX), (y += directionY);
				console.groupEnd("x : " + x + " | y : " + y);

				square = board.squares[x][y];
				if (square.piece != null) {
					test = false;
				}
			}

			if (square.piece.team != this.team) {
				this.mooves.push(square);
			}
		} catch (e) {
			if (e instanceof TypeError) {
				test = false;
			} else {
				console.error(e);
			}
		}

		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Piece.checkLine(" + directionX + ", " + directionY + ")");
	}

    checkList(list, verbose = VERBOSE){
        if (verbose) console.groupCollapsed("Piece.checkList()");

        list.forEach(elt=> {
            if(
                this.x+elt[0]>=0 &
                this.x+elt[0]<=7 &
                this.y+elt[1]>=0 &
                this.y+elt[1]<=7
            ) {
                let square = board.squares[this.x+elt[0]][this.y+elt[1]];
                if(square.piece == null){
                    this.mooves.push(square);
                } else {
                    if(square.piece.team!=this.team) this.mooves.push(square);
                }
            }
        })

        if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Piece.checkList()");
    }

	select() {}

	die() {}
}

export class Pawn extends Piece {
	/**
	 * creates a Pawn.
	 * @param {String} team the team of the piece
	 * @param {Number} x the x position on the board
	 * @param {Number} y the y position on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	constructor(team, x, y, verbose = VERBOSE) {
		super(team, x, y, verbose);
	}

	checkMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Pawn.checkMooves()");
		super.checkMooves(verbose);

		//moove
		let square = null;
		let direction = this.team == "white" ? -1 : 1;
		if (this.y != (this.team == "white" ? 0 : 7)) {
            //check first square
			square = board.squares[this.x][this.y + direction];
			if (square.piece == null) {
				this.mooves.push(square);
                //check second square if didn't moove
				if (this.y == 6) {
					square = board.squares[this.x][this.y + direction * 2];
					if (square.piece == null) {
						this.mooves.push(square);
					}
				}
			}
            //check left for attack
            if(this.x != 0){
                square = board.squares[this.x-1][this.y + direction];
                if(square.piece!=null){
                    if(square.piece.team!=this.team){
                        this.mooves.push(square);
                    }
                }
            }
            //check right for attack
            if(this.x != 7){
                square = board.squares[this.x+1][this.y + direction];
                if(square.piece!=null){
                    if(square.piece.team!=this.team){
                        this.mooves.push(square);
                    }
                }
            }
		}
		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Pawn.checkMooves()");
	}
}

export class Bishop extends Piece {
	/**
	 * creates a Bishop.
	 * @param {String} team the team of the piece
	 * @param {Number} x the x position on the board
	 * @param {Number} y the y position on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	constructor(team, x, y, verbose = VERBOSE) {
		super(team, x, y, verbose);
	}

	checkMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Rook.checkMooves()");
		super.checkMooves(verbose);

		const lines = [
			[1, 1],
			[-1, 1],
			[1, -1],
			[-1, -1],
		];
		lines.forEach((line) => {
			this.checkLine(...line, verbose);
		});

		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Rook.checkMooves()");
	}
}

export class Knight extends Piece {
	/**
	 * creates a Knight.
	 * @param {String} team the team of the piece
	 * @param {Number} x the x position on the board
	 * @param {Number} y the y position on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	constructor(team, x, y, verbose = VERBOSE) {
		super(team, x, y, verbose);
	}

    checkMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Rook.checkMooves()");
		super.checkMooves(verbose);

		const list = [
			[-2, -1], [-2, 1],
			[2, -1], [2, 1],
			[-1, -2], [1, -2],
			[-1, 2], [1, 2]
		];
		
        this.checkList(list);

		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Rook.checkMooves()");
	}
}

export class Rook extends Piece {
	/**
	 * creates a Rook.
	 * @param {String} team the team of the piece
	 * @param {Number} x the x position on the board
	 * @param {Number} y the y position on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	constructor(team, x, y, verbose = VERBOSE) {
		super(team, x, y, verbose);
	}

	checkMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Rook.checkMooves()");
		super.checkMooves(verbose);

		const lines = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		];
		lines.forEach((line) => {
			this.checkLine(...line, verbose);
		});

		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Rook.checkMooves()");
	}
}

export class King extends Piece {
	/**
	 * creates a King.
	 * @param {String} team the team of the piece
	 * @param {Number} x the x position on the board
	 * @param {Number} y the y position on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	constructor(team, x, y, verbose = VERBOSE) {
		super(team, x, y, verbose);
	}

    checkMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Rook.checkMooves()");
		super.checkMooves(verbose);

		const list = [
			[-1, -1], [-1, 0], [-1, 1], 
			[0, -1], [0, 1],
			[1, -1], [1, 0], [1, 1]
		];
		
        this.checkList(list);

		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Rook.checkMooves()");
	}
}

export class Queen extends Piece {
	/**
	 * creates a Queen.
	 * @param {String} team the team of the piece
	 * @param {Number} x the x position on the board
	 * @param {Number} y the y position on the board
	 * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
	 */
	constructor(team, x, y, verbose = VERBOSE) {
		super(team, x, y, verbose);
	}

	checkMooves(verbose = VERBOSE) {
		if (verbose) console.groupCollapsed("Rook.checkMooves()");
		super.checkMooves(verbose);

		const lines = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
			[1, 1],
			[-1, 1],
			[1, -1],
			[-1, -1],
		];
		lines.forEach((line) => {
			this.checkLine(...line, verbose);
		});

		if (verbose) console.log(this.mooves);
		if (verbose) console.groupEnd("Rook.checkMooves()");
	}
}
