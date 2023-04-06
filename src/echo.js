"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.echo = void 0;
function echo(msg, args) {
    msg.reply(msg.content.slice(5)); // 5 = length of "echo" + 1 (1 accounting for the space)
}
exports.echo = echo;
