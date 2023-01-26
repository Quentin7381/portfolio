import board from './board.js';

const VERBOSE = true;

class Piece{
    /**
     * creates a Piece. Use the childs objects to generate Pawn, King, etc.
     * @param {String} team the team of the piece
     * @param {Number} x the x position on the board
     * @param {Number} y the y position on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        //parameters
        this.team = team;
        this.x = x;
        this.y = y;
        this.mooves = [];
        this.selected = false;

        //dom insertion
        this.imgPath = `./imgs/${this.team}_${this.constructor.name}.png`
        this.elt = document.createElement('img');
        this.elt.src = this.imgPath;
        board.squares[this.x][this.y].setPiece(this);
        
        //verbose
        if(verbose){
            console.groupCollapsed('new ' + this.constructor.name + '(' + team + ', ' + x + ', ' + y + ') : ');
            console.log(this);
            console.groupEnd('new ' + this.constructor.name + '(' + team + ', ' + x + ', ' + y + ') : ');
        }

        //event listener
        this.clickListener = this.elt.addEventListener('click', (e)=>this.onClick())
        
    }

    /**
     * highlight the Squares where the piece can moove on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    showMooves(verbose = VERBOSE){
        if(verbose) console.groupCollapsed('Pawn.showMooves()');
        this.mooves.forEach(elt => {
            elt.highlight('moove');
        });
        if(verbose) console.groupEnd('Pawn.showMooves()');
    }

    /**
     * remooves the highlight from the Squares where the piece can moove
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    hideMooves(verbose = VERBOSE){
        if(verbose) console.groupCollapsed('Pawn.showMooves()');
        this.mooves.forEach(elt => {
            elt.highlightRemove('moove');
        });
        if(verbose) console.groupEnd('Pawn.showMooves()');
    }

    /**
     * reset mooves Array then push every Square where the Piece can moove into mooves Array
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    checkMooves(verbose = VERBOSE){
        if(verbose) console.groupCollapsed('Piece.checkMooves()');
        this.mooves = [];
        if(verbose) console.log(this.mooves);
        if(verbose) console.groupEnd('Piece.checkMooves()');
    }

    select(){

    }

    die(){

    }
}

export class Pawn extends Piece{
    /**
     * creates a Pawn.
     * @param {String} team the team of the piece
     * @param {Number} x the x position on the board
     * @param {Number} y the y position on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }

    
    checkMooves(verbose = VERBOSE){
        if(verbose) console.groupCollapsed('Pawn.checkMooves()');
        super.checkMooves(verbose);
        this.mooves.push(board.squares[this.x][this.y+(this.team=='white' ? -1 : 1)]);
        if(this.y == (this.team=='white' ? 6 : 1)) this.mooves.push(board.squares[this.x][this.y+(this.team=='white' ? -2 : 2)])
        if(verbose) console.log(this.mooves);
        if(verbose) console.groupEnd('Pawn.checkMooves()');
    }
}

export class Bishop extends Piece{
    /**
     * creates a Bishop.
     * @param {String} team the team of the piece
     * @param {Number} x the x position on the board
     * @param {Number} y the y position on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class Knight extends Piece{
    /**
     * creates a Knight.
     * @param {String} team the team of the piece
     * @param {Number} x the x position on the board
     * @param {Number} y the y position on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class Rook extends Piece{
    /**
     * creates a Rook.
     * @param {String} team the team of the piece
     * @param {Number} x the x position on the board
     * @param {Number} y the y position on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class King extends Piece{
    /**
     * creates a King.
     * @param {String} team the team of the piece
     * @param {Number} x the x position on the board
     * @param {Number} y the y position on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class Queen extends Piece{
    /**
     * creates a Queen.
     * @param {String} team the team of the piece
     * @param {Number} x the x position on the board
     * @param {Number} y the y position on the board
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}