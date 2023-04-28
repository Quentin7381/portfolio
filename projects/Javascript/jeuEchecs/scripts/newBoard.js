/*  
    0000    null
    001     Roi        +0  noir
    010     Dame        +1  blanc
    011     Tour
    100     Fou
    101     Cavalier
    110     Pion
 */

export const Board = {
    bitboard : BigInt(0),
    init : function(){
        
    },
    addPiece : function(piece = 0000){
        if(typeof piece == 'String'){
            switch(piece){
                case 'Roi' :
                case 'Dame' :
                case 'Fou' :
                case 'Tour' :
                case 'Cavalier' :
                case 'Pion' :
            }
        }
    },
    getSquareMultiple : function(x = 1, y = 1){
        return 2^(((x - 1) + (y - 1) * 8) * 4)
    }
}

console.log(Board.getSquareMultiple(1, 1))