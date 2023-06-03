class BrainfuckInterpreter {
  constructor() {
    this.memory = new Uint8Array(30000); // Brainfuck memory
    this.pointer = 0; // Memory pointer
    this.inputBuffer = ''; // Input buffer
    this.outputBuffer = ''; // Output buffer
    this.maxIterations = 1000000; // Maximum number of iterations to prevent infinite loops
  }

  interpret(code, input = '') {
    this.reset();
    this.inputBuffer = input;
    let output = '';
    let iterations = 0;

    for (let i = 0; i < code.length; i++) {
      const command = code.charAt(i);

      switch (command) {
        case '>':
          this.pointer++;
          break;
        case '<':
          this.pointer--;
          break;
        case '+':
          this.memory[this.pointer]++;
          break;
        case '-':
          this.memory[this.pointer]--;
          break;
        case '.':
          output += String.fromCharCode(this.memory[this.pointer]);
          break;
        case ',':
          if (this.inputBuffer.length === 0) {
            throw new Error('Input buffer is empty!');
          }
          this.memory[this.pointer] = this.inputBuffer.charCodeAt(0);
          this.inputBuffer = this.inputBuffer.slice(1);
          break;
        case '[':
          if (this.memory[this.pointer] === 0) {
            let loopCount = 1;
            while (loopCount > 0 && iterations < this.maxIterations) {
              i++;
              iterations++;
              const c = code.charAt(i);
              if (c === '[') loopCount++;
              else if (c === ']') loopCount--;
            }
            if (iterations >= this.maxIterations) {
              throw new Error('Maximum iteration limit exceeded!');
            }
          }
          break;
        case ']':
          if (this.memory[this.pointer] !== 0) {
            let loopCount = 1;
            while (loopCount > 0 && iterations < this.maxIterations) {
              i--;
              iterations++;
              const c = code.charAt(i);
              if (c === ']') loopCount++;
              else if (c === '[') loopCount--;
            }
            if (iterations >= this.maxIterations) {
              throw new Error('Maximum iteration limit exceeded!');
            }
          }
          break;
        default:
          // Ignore any non-Brainfuck characters
          break;
      }
    }

    return output;
  }

  reset() {
    this.memory.fill(0);
    this.pointer = 0;
    this.inputBuffer = '';
    this.outputBuffer = '';
  }
}

// Example usage
const bfCode = '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.'; // Brainfuck code
const interpreter = new BrainfuckInterpreter();
const output = interpreter.interpret(bfCode);
console.log(output); //Hello World
