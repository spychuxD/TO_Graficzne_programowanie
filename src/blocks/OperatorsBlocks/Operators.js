export const Operators = {
  arithmetic: {
    addition: "+",
    subtraction: "-",
    multiplication: "*",
    division: "/",
    modulo: "%",
  },
  assignment: {
    assignment: "=",
    additionAssignment: "+=",
    subtractionAssignment: "-=",
    multiplicationAssignment: "*=",
    divisionAssignment: "/=",
    moduloAssignment: "%=",
  },
  comparison: {
    equal: "==",
    //equalValueAndType: "===",
    notEqual: "!=",
    //notEqualValueAndType: "!==",
    greater: ">",
    less: "<",
    greaterOrEqual: ">=",
    lessOrEqual: "<=",
    ternary: "?",
  },
  logical: {
    and: "&&",
    or: "||",
    not: "!",
  },
  bitwise: {
    and: "&",
    or: "|",
    not: "~",
  },
  other: { increment: "++", decrement: "--" },
};
