import { defineNitroPlugin } from "nitropack/runtime";

interface JsonBuffer {
  type: "Buffer";
  data: number[];
}

const isJsonBuffer = (data: unknown): data is JsonBuffer =>
  // @ts-ignore
  data?.type === "Buffer" && Array.isArray(data?.data);

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", (event, response) => {
    if (event.path.startsWith("/_ipx/") && isJsonBuffer(response.body)) {
      response.body = Buffer.from(response.body.data);
    }
  });
});
