import { Expect, Test, Setup} from "alsatian";
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Position, position } from '../../main/ts/position';
import { Move } from '../../main/ts/movements';

let chessboard : Chessboard;

const positionA4 : Position = position(0, 3) // A4
const positionA5 : Position = position(0, 4) // A5
const positionA6 : Position = position(0, 5) // A6
const positionA7 : Position = position(0, 6) // A7
const positionA8 : Position = position(0, 7) // A8

const positionB6 : Position = position(1, 5) // B6

const positionC4 : Position = position(2, 3) // C4
const positionC6 : Position = position(2, 5) // C6


export class TestBlackPawnMoves {

    chessboard : Chessboard
    @Setup
    beforeEach(){
        chessboard = createEmptyChessboard();
    }

    @Test("Pawns can move forward")
    testPawnCanMoveForward() {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let singleForward: Move = {from: positionA7, to: positionA6, isValid: true};
        Expect(isPossible.blackPawnMove(chessboard, singleForward)).toBeTruthy(); 
    }

    @Test("Pawns cannot move backward")
    testPawnCannotMoveBackward() {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let singleForward: Move = {from: positionA7, to: positionA8, isValid: true};
        Expect(isPossible.blackPawnMove(chessboard, singleForward)).not.toBeTruthy();       
    }

    @Test("When in the initial position, paws can move 2 squares forward")
    testPawnInitialMove() {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let doubleForward: Move = {from: positionA7, to: positionA5, isValid: true};
        Expect(isPossible.blackPawnMove(chessboard, doubleForward)).toBeTruthy();        
    }

    @Test("When a paws has already moved, it cannot move 2 squares forward")
    testCannotMoveTwoSquaresIfAlreadyMoved() {
        putPiece(chessboard, positionC6, pieces.blackPawn);
        let doubleForward: Move = {from: positionC6, to: positionC4, isValid: true}
        Expect(isPossible.blackPawnMove(chessboard, doubleForward)).not.toBeTruthy();  
    }

    @Test("When in the initial position, pawns cannot move 3 squares forward")
    testCannotMoveThreeSquares() {
        putPiece(chessboard, positionC6, pieces.blackPawn);
        let tripleForward: Move = {from: positionA7, to: positionA4, isValid: true}
        Expect(isPossible.blackPawnMove(chessboard, tripleForward)).not.toBeTruthy();
    }

    @Test("When in face of another piece, pawns cannot move foreward")
    testPawnCannotMoveForwardToFullSquare() {
        putPiece(chessboard, positionA6, pieces.whitePawn);
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let singleForward: Move = {from: positionA7, to: positionA6, isValid: true}
        Expect(isPossible.blackPawnMove(chessboard, singleForward)).not.toBeTruthy();
    }

    @Test("Pawns cannot capture an empty square ") 
    testPawnCannotCaptureEmptySquare() {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let diagonalCapture: Move = {from: positionA7, to: positionB6, isValid: true}
        Expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).not.toBeTruthy();
    }

    @Test("Pawns cannot capture pieces of the same color")
    testPawnCannotCaptureSameColor() {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        putPiece(chessboard, positionB6, pieces.blackKing);

        let diagonalCapture: Move = {from: positionA7, to: positionB6, isValid: true}
        Expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).not.toBeTruthy();
    }

    @Test("Pawns can capture pieces of a different color")
    testPawnCanCaptureDifferentColorPieces() {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        putPiece(chessboard, positionB6, pieces.whiteQueen);

        let diagonalCapture: Move = {from: positionA7, to: positionB6, isValid: true}
        Expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).toBeTruthy();
    }
}
