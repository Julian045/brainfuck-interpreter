# brainfuck-interpreter
This implementation provides a basic interpreter for Brainfuck, but it may not handle all edge cases or optimize performance.

The language consists of only eight commands:

>: Move the data pointer to the right.
<: Move the data pointer to the left.
+: Increment the value in the current cell.
-: Decrement the value in the current cell.
.: Output the value in the current cell as a character.
,: Read a character of input and store it in the current cell.
[: Jump forward to the corresponding ] if the value in the current cell is zero.
]: Jump back to the corresponding [ if the value in the current cell is not zero.
