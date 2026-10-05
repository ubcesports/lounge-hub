import { getRecentActivity } from "./activity";

const activity = {
  student_number: "12345678",
  pc_number: "4",
  game: "Valorant",
  started_at: "2026-10-04T10:00:00Z",
  ended_at: "",
  first_name: "Test",
  last_name: "Player",
  exec_name: "",
};

const responseWith = (payload: unknown, status = 200) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(payload),
  }) as unknown as Response;

describe("getRecentActivity", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("accepts an array response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(responseWith([activity]));

    await expect(getRecentActivity(1, "")).resolves.toEqual([activity]);
  });

  it("accepts a data envelope", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      responseWith({ data: [activity] }),
    );

    await expect(getRecentActivity(1, "")).resolves.toEqual([activity]);
  });

  it("reports an unsuccessful response instead of returning it to the store", async () => {
    (global.fetch as jest.Mock).mockResolvedValue(
      responseWith({ error: "unauthorized" }, 401),
    );

    await expect(getRecentActivity(1, "")).rejects.toThrow(
      "Unable to load activity. (HTTP 401)",
    );
  });
});
