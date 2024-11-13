import Elysia, { t } from "elysia"

export const example = new Elysia()
    .get("/", () => "Hello world", {
        detail: {
            tags: ["Example"],
            summary: "Get Hello World",
            description: "O MY God"
        }
    })
    .post("/about", ({ body }) => {
        return {

            id: 'xxx',
            name: 'hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        }),
        detail: {
            tags: ["Example"],
            summary: "About",
            description: "O MY God"
        }
    })
