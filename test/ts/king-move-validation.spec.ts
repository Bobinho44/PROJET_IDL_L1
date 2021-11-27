import { Expect, Test, Setup} from "alsatian";
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Position, position } from '../../main/ts/position';
import { Move } from '../../main/ts/movements';

let chessboard : Chessboard;

const positionC2 : Position = position(2, 1) // C2
const positionC3 : Position = position(2, 2) // C3
const positionC4 : Position = position(2, 3) // C4
const positionC6 : Position = position(2, 5) // C6

const positionD3 : Position = position(3, 2) // D3
const positionD4 : Position = position(3, 3) // D4
const positionD5 : Position = position(3, 4) // D5
const positionD6 : Position = position(3, 5) // D6

const positionE3 : Position = position(4, 2) // E3
const positionE4 : Position = position(4, 3) // E4
const positionE5 : Position = position(4, 4) // E5

const positionF3 : Position = position(5, 2) // F3
const positionF4 : Position = position(5, 3) // F4
const positionF5 : Position = position(5, 4) // F5
const positionF6 : Position = position(5, 5) // F6

export class TestKingMoves {

    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positionE4, pieces.blackKing);
    }

    @Test("A King can move 1 square in all directions")
    testCanMoveOneSquare() {
        let moveE4_D3: Move = {from: positionE4, to: positionD3, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_D3)).toBeTruthy(); 

        let moveE4_D4: Move = {from: positionE4, to: positionD4, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_D4)).toBeTruthy();    

        let moveE4_D5: Move = {from: positionE4, to: positionD5, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_D5)).toBeTruthy(); 

        let moveE4_E3: Move = {from: positionE4, to: positionE3, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_E3)).toBeTruthy();  

        let moveE4_E5: Move = {from: positionE4, to: positionE5, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_D4)).toBeTruthy();    

        let moveE4_F3: Move = {from: positionE4, to: positionF3, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_F3)).toBeTruthy(); 

        let moveE4_F4: Move = {from: positionE4, to: positionF4, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_F4)).toBeTruthy();  
        
        let moveE4_F5: Move = {from: positionE4, to: positionF5, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_F5)).toBeTruthy();  
    }

    @Test("A King cannot move more than 1 square")
    testCannotMoveMoreThanOneSquare() {
        let moveE4_C2: Move = {from: positionE4, to: positionC2, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_C2)).not.toBeTruthy();  

        let moveE4_C3: Move = {from: positionE4, to: positionC3, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_C3)).not.toBeTruthy();  

        let moveE4_C4: Move = {from: positionE4, to: positionC4, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_C4)).not.toBeTruthy();  

        let moveE4_C6: Move = {from: positionE4, to: positionC6, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_C6)).not.toBeTruthy();  

        let moveE4_D6: Move = {from: positionE4, to: positionD6, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_D6)).not.toBeTruthy();  

        let moveE4_F6: Move = {from: positionE4, to: positionF6, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_F6)).not.toBeTruthy();  
 
    }

    @Test("A King cannot capure pieces from the same color")
    testCannotCaptureSameColor() {
        putPiece(chessboard, positionE5, pieces.blackPawn);   
        let moveE4_E5: Move = {from: positionE4, to: positionE5, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_E5)).not.toBeTruthy();   
    }

    @Test("A King can capure pieces from a different color")
    testCanCaptureSameColor() {
        putPiece(chessboard, positionE5, pieces.whitePawn);   
        let moveE4_E5: Move = {from: positionE4, to: positionE5, isValid: true};
        Expect(isPossible.kingMove(chessboard, moveE4_E5)).toBeTruthy();   
    }
}