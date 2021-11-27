import { Chessboard, isEmpty, Square, squareAtPosition } from "./chessboard";
import { Move } from "./movements";
import { equals, left, right, top, bottom, Position } from "./position";

/**
 * Checks whether a piece can perform a given move.
 * A piece can only move to a square if it is empty.
 * Or if this one is occupied by an enemy piece.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function canMove(board: Chessboard, move: Move): boolean {
    let provenance: Square = squareAtPosition(board, move.from!);
    let destination: Square = squareAtPosition(board, move.to!);
    return (destination.isEmpty || destination.piece!.isWhite != provenance.piece!.isWhite);
}

/**
 * Checks if the path taken by one piece is not blocked by another piece.
 * For piece who cannot leap over other pieces, a move is only possible if there are no piece on the way.
 * If the path is blocked, the move is cancelled.
 *
 * @param board The chessboard of the current game
 * @param move 
 */
export function onTheRoad(board: Chessboard, move: Move): boolean {

    //Evolving coordinate that will follow the path taken by the piece
    let onTheRoad : Position = {rank: move.from!.rank, file: move.from!.file};

    while (!equals(onTheRoad, move.to!)) {
        if (!isEmpty(board, onTheRoad)) {

            //To not stop the loop from the beginning
            if (!equals(onTheRoad, move.from!)) {
                return false;
            }
        }
        
        //Avoid zero denominators for vertical and horizontal moves of the queen or empress.
        let denominateurRank : number = move.to!.rank - onTheRoad.rank === 0 ? 1 : move.to!.rank - onTheRoad.rank;
        let denominateurFile : number = move.to!.file - onTheRoad.file === 0 ? 1 : move.to!.file - onTheRoad.file;

        /** If the move is on 2 dimensions:
         *    When moving downwards: the rank decreases, numerator < 0 --> we subtract 1 from the rank.
         *    Else we add 1 to the rank
         *    When moving to the left: the file decreases, numerator < 0 --> 1 is removed from the file.
         *    Else we add 1 to the file
         *  If the move is on 1 dimension:
         *    We keep the same principle, but we add 0 to the dimension "not used" during the move.
        **/
        onTheRoad.rank = onTheRoad.rank + (move.to!.rank - onTheRoad.rank)/(Math.abs(denominateurRank));
        onTheRoad.file = onTheRoad.file + (move.to!.file - onTheRoad.file)/(Math.abs(denominateurFile)); 
    }
    return canMove(board, move);
}

/**
 * Checks whether a Bishop can perform a given move.
 * A bishop can move any number of squares diagonally, 
 * but cannot leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function bishopMove(board: Chessboard, move: Move): boolean {

    //Diagonally, you move the same number of squares vertically and horizontally.
    if (Math.abs(move.from!.rank - move.to!.rank) === Math.abs(move.from!.file - move.to!.file)) {
       return onTheRoad(board, move);
    }
    return false;
}

/**
 * Checks whether a Custom knight can perform a given move.
 * A Custom knight can move to any of the closest squares that are not on the 
 * same rank, file, or diagonal. (Thus the move forms an "L"-shape: 
 * "jump" squares vertically and one square horizontally, or "jump"
 * squares horizontally and one square vertically.)
 * 
 * @param board The chessboard of the current game
 * @param move 
 * @param jump The number of squares to be jumped over the "long length" of the L-shaped move
 */
export function customKnightMove(board: Chessboard, move: Move, jump: number): boolean {
    let movedRank: number = Math.abs(move.from!.rank - move.to!.rank);
    let movedFile: number = Math.abs(move.from!.file - move.to!.file);

    //Move of "jump" square vertically and one square horizontally or vice versa
    if (movedRank === jump && movedFile === 1 || movedFile === jump && movedRank=== 1) {
        return canMove(board, move);
    }
    return false;
}

/**
 * Checks whether a Rook can perform a given move.
 * An Rook can move any number of squares along a rank or file, 
 * but cannot leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function rookMove(board: Chessboard, move: Move): boolean {
    if (move.from!.rank - move.to!.rank === 0 || move.from!.file - move.to!.file === 0) {
        return onTheRoad(board, move);
    }
    return false;
}

/**
 * Checks whether a Black Pawn can perform a given move.
 * A pawn can move forward to the unoccupied square immediately in front of 
 * it on the same file, or on its first move it can advance two squares along 
 * the same file, provided both squares are unoccupied (black dots in the 
 * diagram); or the pawn can capture an opponent's piece on a square diagonally 
 * in front of it on an adjacent file, by moving to that square (black "x"s). 
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function blackPawnMove(board: Chessboard, move: Move): boolean {

    if (equals(move.to!, bottom(move.from!))) {
        //console.log("Single forward");
        return isEmpty(board, move.to!);
    }

    if (move.from!.rank === 6 && equals(move.to!, bottom(bottom(move.from!)))) {
        //console.log("Double forward");
        return isEmpty(board, bottom(move.from!)) && isEmpty(board, move.to!);
    }

    if (equals(move.to!, left(bottom(move.from!))) || equals(move.to!, right(bottom(move.from!)))) {
        let destination: Square = squareAtPosition(board, move.to!);
        return !(destination.isEmpty || !destination.piece!.isWhite)
    }

    return false;
}

/**
 * A pawn can move forward to the unoccupied square immediately in front of 
 * it on the same file, or on its first move it can advance two squares along 
 * the same file, provided both squares are unoccupied (black dots in 
 * the diagram); or the pawn can capture an opponent's piece on a square diagonally 
 * in front of it on an adjacent file, by moving to that square (black "x"s). 
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function whitePawnMove(board: Chessboard, move: Move): boolean {

    if (equals(move.to!, top(move.from!))) {
        return isEmpty(board, move.to!);
    }

    if (move.from!.rank === 1 && equals(move.to!, top(top(move.from!)))) {
        return isEmpty(board, top(move.from!)) && isEmpty(board, move.to!);
    }

    if (equals(move.to!, left(top(move.from!))) || equals(move.to!, right(top(move.from!)))) {
        let destination: Square = squareAtPosition(board, move.to!);
        return !(destination.isEmpty || destination.piece!.isWhite)
    }

    return false;
}

/**
 * Checks whether a King can perform a given move.
 * The king moves one square in any direction. 
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function kingMove(board: Chessboard, move: Move): boolean {

    //Moving a maximum of one square on each coordinate
    if (Math.abs(move.from!.rank - move.to!.rank) <= 1 && Math.abs(move.from!.file - move.to!.file) <= 1) {
        return canMove(board, move);
    }
    return false;
}

/**
 * Checks whether a Queen can perform a given move.
 * The queen combines the power of a rook and bishop and can move any 
 * number of squares along a rank, file, or diagonal, but cannot leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function queenMove(board: Chessboard, move: Move): boolean {
    return rookMove(board, move) || bishopMove(board, move);
}

/**
 * Checks whether a Empress can perform a given move.
 * An Empress can move any number of squares along a rank or file, 
 * but cannot leap over other pieces.
 * An Empress can also move to any of the closest squares that are not on the 
 * same rank, file, or diagonal. (Thus the move forms an "L"-shape: 
 * two squares vertically and one square horizontally, or two 
 * squares horizontally and one square vertically.) 
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function empressMove(board: Chessboard, move: Move): boolean {
    return rookMove(board, move) || customKnightMove(board, move, 2);
}

/**
 * Checks whether a Princess can perform a given move.
 * A princess can move any number of squares diagonally, 
 * but cannot leap over other pieces.
 * A princess can also move to any of the closest squares that are not on the 
 * same rank, file, or diagonal. (Thus the move forms an "L"-shape: 
 * two squares vertically and one square horizontally, or two 
 * squares horizontally and one square vertically.) 
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function princessMove(board: Chessboard, move: Move): boolean {
    return (bishopMove(board, move) || customKnightMove(board, move, 2));
}

/**
 * Checks whether a Camel can perform a given move.
 * The Camel move forms an "L"-shape: 
 * three squares vertically and one square horizontally, or three 
 * squares horizontally and one square vertically.) 
 * 
 * The camel can leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function camelMove(board: Chessboard, move: Move): boolean {
    return customKnightMove(board, move, 3);
}