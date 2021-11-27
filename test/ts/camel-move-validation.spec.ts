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
const positionB3 : Position = position(1, 2) // B3
const positionB5 : Position = position(1, 4) // B5

const positionD1 : Position = position(3, 0) // D1
const positionD7 : Position = position(3, 6) // D7

const positionE1 : Position = position(4, 0) // E1
const positionE4 : Position = position(4, 3) // E4
const positionE8 : Position = position(4, 7) // E8

const positionF1 : Position = position(5, 0) // F1
const positionF7 : Position = position(5, 6) // F7

const positionH1 : Position = position(7, 0) // H1
const positionH3 : Position = position(7, 2) // H3
const positionH4 : Position = position(7, 3) // H4
const positionH5 : Position = position(7, 4) // H5
const positionH7 : Position = position(7, 6) // H7

export class TestCamelMoves {
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positionE4, pieces.whiteCamel);
    }

    @Test("A Camel can move three squares horizontally and one square vertically")
    testCanMoveThreeHorizontalAndOneVertical() {
        let moveE4_H3: Move = {from: positionE4, to: positionH3, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_H3)).toBeTruthy(); 

        let moveE4_H5: Move = {from: positionE4, to: positionH5, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_H5)).toBeTruthy(); 

        let moveE4_B3: Move = {from: positionE4, to: positionB3, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_B3)).toBeTruthy(); 

        let moveE4_B5: Move = {from: positionE4, to: positionB5, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_B5)).toBeTruthy(); 
    }

    @Test("A Camel can move three squares vertically and one square horizontally")
    testCanMoveThreeVerticalAndOneHorizontal() {
        let moveE4_F1: Move = {from: positionE4, to: positionF1, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_F1)).toBeTruthy(); 

        let moveE4_F7: Move = {from: positionE4, to: positionF7, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_F7)).toBeTruthy(); 

        let moveE4_D1: Move = {from: positionE4, to: positionD1, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_D1)).toBeTruthy(); 

        let moveE4_D7: Move = {from: positionE4, to: positionD7, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_D7)).toBeTruthy(); 
    }

    @Test("A Camel can leap other pieces")
    testCanLeapOtherPieces() {
        putPiece(chessboard, positionH4, pieces.whitePawn);    
        let moveE4_H3: Move = {from: positionE4, to: positionH3, isValid: true}
        Expect(isPossible.camelMove(chessboard, moveE4_H3)).toBeTruthy();        
    }

    @Test("A Camel cannot move diagonally")
    testCannotMoveDiagonally() {
        let moveE4_A8: Move = {from: positionE4, to: positionA8, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_A8)).not.toBeTruthy(); 

        let moveE4_B1: Move = {from: positionE4, to: positionB1, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_B1)).not.toBeTruthy(); 

        let moveE4_H7: Move = {from: positionE4, to: positionH7, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_H7)).not.toBeTruthy(); 

        let moveE4_H1: Move = {from: positionE4, to: positionH1, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_H1)).not.toBeTruthy(); 
    }

    @Test("A Camel cannot move horizontally")
    testCannotMoveHorizontally() {
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_H4)).not.toBeTruthy(); 

        let moveE4_A4: Move = {from: positionE4, to: positionA4, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_A4)).not.toBeTruthy();   
    }

    @Test("A Camel cannot move vertically")
    testCannotMoveVertically() {
        let moveE4_E1: Move = {from: positionE4, to: positionE1, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_E1)).not.toBeTruthy(); 

        let moveE4_E8: Move = {from: positionE4, to: positionE8, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_E8)).not.toBeTruthy();   
    }

    @Test("A Camel can capture a piece from another color")
    testCanCaptureAnotherColor() {
        putPiece(chessboard, positionH3, pieces.blackPawn);    
        let moveE4_H3: Move = {from: positionE4, to: positionH3, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_H3)).toBeTruthy(); 

    }

    @Test("A Camel cannot capture a piece from the same color")
    testCannotCaptureSameColor() {
        putPiece(chessboard, positionH3, pieces.whitePawn);    
        let moveE4_H3: Move = {from: positionE4, to: positionH3, isValid: true};
        Expect(isPossible.camelMove(chessboard, moveE4_H3)).not.toBeTruthy(); 
    }
}
