var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const BOUND_FLAG = String.fromCharCode(0);
const table = [
  {
    uchar: "\u0626",
    volwes: false,
    uly: BOUND_FLAG,
    khan: "?"
  },
  {
    uchar: "\u0627",
    volwes: true,
    uly: "a",
    khan: "a"
  },
  {
    uchar: "\u06D5",
    volwes: true,
    uly: "e",
    khan: "e"
  },
  {
    uchar: "\u06D0",
    volwes: true,
    uly: "\xEB",
    khan: "eh"
  },
  {
    uchar: "\u0649",
    volwes: true,
    uly: "i",
    khan: "i"
  },
  {
    uchar: "\u0648",
    volwes: true,
    uly: "o",
    khan: "o"
  },
  {
    uchar: "\u06C7",
    volwes: true,
    uly: "u",
    khan: "u"
  },
  {
    uchar: "\u06C6",
    volwes: true,
    uly: "\xF6",
    khan: "c"
  },
  {
    uchar: "\u06C8",
    volwes: true,
    uly: "\xFC",
    khan: "v"
  },
  {
    uchar: "\u0628",
    volwes: false,
    uly: "b",
    khan: "b"
  },
  {
    uchar: "\u067E",
    volwes: false,
    uly: "p",
    khan: "p"
  },
  {
    uchar: "\u062A",
    volwes: false,
    uly: "t",
    khan: "t"
  },
  {
    uchar: "\u062C",
    volwes: false,
    uly: "j",
    khan: "j"
  },
  {
    uchar: "\u0686",
    volwes: false,
    uly: "ch",
    khan: "ch"
  },
  {
    uchar: "\u062E",
    volwes: false,
    uly: "x",
    khan: "kh"
  },
  {
    uchar: "\u062F",
    volwes: false,
    uly: "d",
    khan: "d"
  },
  {
    uchar: "\u0631",
    volwes: false,
    uly: "r",
    khan: "r"
  },
  {
    uchar: "\u0632",
    volwes: false,
    uly: "z",
    khan: "z"
  },
  {
    uchar: "\u0698",
    volwes: false,
    uly: "zh",
    khan: "zh"
  },
  {
    uchar: "\u0633",
    volwes: false,
    uly: "s",
    khan: "s"
  },
  {
    uchar: "\u0634",
    volwes: false,
    uly: "sh",
    khan: "sh"
  },
  {
    uchar: "\u063A",
    volwes: false,
    uly: "gh",
    khan: "gh"
  },
  {
    uchar: "\u0642",
    volwes: false,
    uly: "q",
    khan: "q"
  },
  {
    uchar: "\u0641",
    volwes: false,
    uly: "f",
    khan: "f"
  },
  {
    uchar: "\u0643",
    volwes: false,
    uly: "k",
    khan: "k"
  },
  {
    uchar: "\u06AF",
    volwes: false,
    uly: "g",
    khan: "g"
  },
  {
    uchar: "\u06AD",
    volwes: false,
    uly: "ng",
    khan: "ng"
  },
  {
    uchar: "\u0644",
    volwes: false,
    uly: "l",
    khan: "l"
  },
  {
    uchar: "\u0645",
    volwes: false,
    uly: "m",
    khan: "m"
  },
  {
    uchar: "\u0646",
    volwes: false,
    uly: "n",
    khan: "n"
  },
  {
    uchar: "\u06BE",
    volwes: false,
    uly: "h",
    khan: "x"
  },
  {
    uchar: "\u06CB",
    volwes: false,
    uly: "w",
    khan: "w"
  },
  {
    uchar: "\u064A",
    volwes: false,
    uly: "y",
    khan: "y"
  }
];
class Syllable {
  constructor() {
    __publicField(this, "_table");
    this._table = table;
  }
  getTable() {
    return this._table;
  }
  tokenize(word) {
    const volwes = this._table.filter((item) => item.volwes).map((item) => item.uchar);
    return word.split("").map((char) => volwes.indexOf(char) !== -1 ? 1 : 0).join("");
  }
  tokenToGroup(token) {
    return token.replaceAll("1", "1#").split("#");
  }
  groupToPositional(group) {
    return group.reverse().map((item, index) => {
      if (index === 0 || index === group.length - 1)
        return item;
      switch (item.replace("1", "").length) {
        case 1:
          return "#" + item;
        case 2:
          return [item[0], "#", item.slice(1, 3)].join("");
        case 3:
          return [item[0], "#", item.slice(1, 3), item.slice(-1)].join("");
        case 4:
          return [item[0], "#", item.slice(1, 3), "#", item.slice(-1)].join("");
        case 5:
          return [item[0], "#", item.slice(1, 4), "#", item.slice(-1)].join("");
        default:
          return item;
      }
    }).reverse();
  }
  positinalGroupToWord(positinalGroup, word) {
    const syllableList = [];
    let counter = 0;
    positinalGroup.join("").split("").forEach((item, index) => {
      if (item === "#") {
        counter += 1;
        syllableList.push("#");
        return;
      }
      syllableList.push(word[index - counter]);
    });
    return syllableList.join("").split("#");
  }
  syllable(word) {
    const token = this.tokenize(word);
    let group = this.tokenToGroup(token);
    const positionalGroup = this.groupToPositional(group);
    const sylableWord = this.positinalGroupToWord(positionalGroup, word);
    return sylableWord;
  }
}
export { Syllable as default };
