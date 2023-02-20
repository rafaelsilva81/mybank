import { EventEmitter } from "events";
import createDefaultAccount from "../subscribers/createDefaultAccount";

const eventEmitter = new EventEmitter();

// Events
eventEmitter.on("register", createDefaultAccount);

export default eventEmitter;
