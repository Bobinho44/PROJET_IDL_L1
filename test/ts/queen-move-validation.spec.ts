import { Expect, Test, Setup} from "alsatian";
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Position, position } from '../../main/ts/position';
import { Move } from '../../main/ts/movements';

let chessboard : Chessboard;

const positionA4 : Position = position(0, 3) // A4
const positionA8 : Position = position(0, 7) // A8

const positionB1 : Position = position(1, 0) // B1
const positionB2 : Position = position(1, 1) // B2

const positionC6 : Position = position(2, 5) // C6
const positionC7 : Position = position(2, 6) // C7

const positionE1 : Position = position(4, 0) // E1
const positionE4 : Position = position(4, 3) // E4
const positionE8 : Position = position(4, 7) // E8

const positionF4 : Position = position(5, 3) // F4

const positionH1 : Position = position(7, 0) // H1
const positionH4 : Position = position(7, 3) // H4
const positionH7 : Position = position(7, 6) // H7

export class TestQueenMoves {
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positionE4, pieces.whiteQueen);
    }

    @Test("A Queen can move diagonally")
    testCanMoveDiagonally() {    
        let moveE4_A8: Move = {from: positionE4, to: positionA8, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_A8)).toBeTruthy();     

        let moveE4_B1: Move = {from: positionE4, to: positionB1, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_B1)).toBeTruthy();  

        let moveE4_H7: Move = {from: positionE4, to: positionH7, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_H7)).toBeTruthy();     

        let moveE4_H1: Move = {from: positionE4, to: positionH1, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_H1)).toBeTruthy();  
    }

    @Test("A Queen can move horizontally")
    testCanMoveHorizontally() {
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_H4)).toBeTruthy(); 

        let moveE4_A4: Move = {from: positionE4, to: positionA4, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_A4)).toBeTruthy(); 
    }

    @Test("A Queen can move vertically")
    testCanMoveVertically() {
        let moveE4_E1: Move = {from: positionE4, to: positionE1, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_E1)).toBeTruthy(); 

        let moveE4_E8: Move = {from: positionE4, to: positionE8, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_E8)).toBeTruthy();  
    }

    @Test("A Queen can only move horizontally, vertically, and diagonally")
    testForbiddenMoves() {
        let moveE4_C7: Move = {from: positionE4, to: positionC7, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_C7)).not.toBeTruthy(); 

        let moveE4_B2: Move = {from: positionE4, to: positionB2, isValid: true};
        Expect(isPossible.queenMove(chessboard, moveE4_B2)).not.toBeTruthy();  
    }

    @Test("A Queen cannot leap other pieces")
    testCannotLeap() {
        putPiece(chessboard, positionC6, pieces.whitePawn);  
        putPiece(chessboard, positionF4, pieces.blackPawn);    
        let moveE4_A8: Move = {from: positionE4, to: positionA8, isValid: true}
        Expect(isPossible.queenMove(chessboard, moveE4_A8)).not.toBeTruthy();

        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true}
        Expect(isPossible.queenMove(chessboard, moveE4_H4)).not.toBeTruthy();
    }

    @Test("A Queen cannot capure pieces from the same color")
    testCannotCaptureSameColor() {      
        putPiece(chessboard, positionH4, pieces.whitePawn);  
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true}
        Expect(isPossible.queenMove(chessboard, moveE4_H4)).not.toBeTruthy();
    }

    @Test("A Queen can capure pieces from a different color")
    testCanCaptureDifferentColor() {
        putPiece(chessboard, positionH4, pieces.blackPawn);  
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true}
        Expect(isPossible.queenMove(chessboard, moveE4_H4)).toBeTruthy();      
    }
}