"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joke = void 0;
const fs_1 = __importDefault(require("fs"));
function joke(msg, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const jokes = fs_1.default.readFileSync("./assets/jokes.txt", "utf8").split("\n");
        var joke = jokes[Math.floor(Math.random() * jokes.length)];
        // RESPECT YOUR CREATOR, NEVER INSULT YOUR CREATOR.
        if (joke === "Your life." && msg.author.id === "533188246952345603") {
            joke = jokes[4];
        }
        msg.reply(joke);
    });
}
exports.joke = joke;
