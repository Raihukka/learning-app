import test from "node:test";
import assert from "node:assert/strict";
import { isValidConfidence, isNonBlankString } from "./validation.ts";

test("confidence must be an integer from 1 to 5", () => {
  assert.equal(isValidConfidence(0), false);
  assert.equal(isValidConfidence(6), false);
  assert.equal(isValidConfidence(100), false);
  assert.equal(isValidConfidence(3.5), false);
  assert.equal(isValidConfidence("3"), false);
  assert.equal(isValidConfidence(1), true);
  assert.equal(isValidConfidence(5), true);
});

test("topic must be a non-blank string", () => {
  assert.equal(isNonBlankString(""), false);
  assert.equal(isNonBlankString("   "), false);
  assert.equal(isNonBlankString(undefined), false);
  assert.equal(isNonBlankString(123), false);
  assert.equal(isNonBlankString("React"), true);
});
