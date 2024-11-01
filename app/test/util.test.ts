import { describe, expect, it } from "vitest";
import { greet } from "../src/utils.js";

describe("greet function", () => {
  it("returns a greeting message", () => {
    expect(greet("World")).toBe("Hello, World!");
  });
});
