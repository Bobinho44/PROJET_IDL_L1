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

const positionC3 : Position = position(2, 2) // C3
const positionC5 : Position = position(2, 4) // C5

const positionD2 : Position = position(3, 1) // D2
const positionD6 : Position = position(3, 5) // D6

const positionE1 : Position = position(4, 0) // E1
const positionE3 : Position = position(4, 2) // E3
const positionE4 : Position = position(4, 3) // E4
const positionE8 : Position = position(4, 7) // E8

const positionF2 : Position = position(5, 1) // F2
const positionF4 : Position = position(5, 3) // F4
const positionF6 : Position = position(5, 5) // F6

const positionG3 : Position = position(6, 2) // G3
const positionG5 : Position = position(6, 4) // G5

const positionH1 : Position = position(7, 0) // H1
const positionH4 : Position = position(7, 3) // H4
const positionH7 : Position = position(7, 6) // H7

export class TestEmpressMoves {
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positionE4, pieces.whiteEmpress);
    }

    @Test("An Empress can move horizontally")
    testCanMoveHorizontally() {
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_H4)).toBeTruthy(); 

        let moveE4_A4: Move = {from: positionE4, to: positionA4, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_A4)).toBeTruthy(); 
    }

    @Test("A Empress can move vertically")
    testCanMoveVertically() {
        let moveE4_E1: Move = {from: positionE4, to: positionE1, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_E1)).toBeTruthy(); 

        let moveE4_E8: Move = {from: positionE4, to: positionE8, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_E8)).toBeTruthy();   
    }

    @Test("An Empress can move two squares horizontally and one square vertically")
    testCanMoveTwoHorizontalAndOneVertical() {
        let moveE4_G3: Move = {from: positionE4, to: positionG3, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_G3)).toBeTruthy(); 

        let moveE4_G5: Move = {from: positionE4, to: positionG5, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_G5)).toBeTruthy();    

        let moveE4_C3: Move = {from: positionE4, to: positionC3, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_C3)).toBeTruthy(); 

        let moveE4_C5: Move = {from: positionE4, to: positionC5, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_C5)).toBeTruthy();    
    }

    @Test("An Empress can move two squares vertically  and one square horizontally")
    testCanMoveTwoVerticalAndOneHorizontal() {
        let moveE4_F2: Move = {from: positionE4, to: positionF2, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_F2)).toBeTruthy(); 

        let moveE4_F6: Move = {from: positionE4, to: positionF6, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_F6)).toBeTruthy();    

        let moveE4_D2: Move = {from: positionE4, to: positionD2, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_D2)).toBeTruthy(); 

        let moveE4_D6: Move = {from: positionE4, to: positionD6, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_D6)).toBeTruthy();   
    }

    @Test("A Empress cannot move diagonally")
    testCannotMoveDiagonally() {
        let moveE4_A8: Move = {from: positionE4, to: positionA8, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_A8)).not.toBeTruthy(); 

        let moveE4_B1: Move = {from: positionE4, to: positionB1, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_B1)).not.toBeTruthy();    

        let moveE4_H7: Move = {from: positionE4, to: positionH7, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_H7)).not.toBeTruthy(); 

        let moveE4_H1: Move = {from: positionE4, to: positionH1, isValid: true};
        Expect(isPossible.empressMove(chessboard, moveE4_H1)).not.toBeTruthy();  
    }

    @Test("A Empress can capture a piece from different color")
    testCanCaptureDifferentColor() {
        putPiece(chessboard, positionH4, pieces.blackPawn);    
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true}
        Expect(isPossible.empressMove(chessboard, moveE4_H4)).toBeTruthy();
    }

    @Test("A Empress cannot capture a piece from the same color")
    testCannotCaptureSameColor() {
        putPiece(chessboard, positionH4, pieces.whitePawn);    
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true}
        Expect(isPossible.empressMove(chessboard, moveE4_H4)).not.toBeTruthy();       
    }

    @Test("A Empress cannot leap other pieces, when moving horizontally")
    testCannotLeapHorizontally() {   
        putPiece(chessboard, positionF4, pieces.blackPawn);    
        let moveE4_H4: Move = {from: positionE4, to: positionH4, isValid: true}
        Expect(isPossible.empressMove(chessboard, moveE4_H4)).not.toBeTruthy();   
    }

    @Test("A Empress cannot leap other pieces, when moving vertically")
    testCannotLeapvertically() {
        putPiece(chessboard, positionE3, pieces.blackPawn);    
        let moveE4_E1: Move = {from: positionE4, to: positionE1, isValid: true}
        Expect(isPossible.empressMove(chessboard, moveE4_E1)).not.toBeTruthy();       
    }
}
