import { knex as SetupKnex } from "knex";

export const config = {
    client: "sqlite",
    connection: {
        filename: './db/app.db',
    },
    useNullAsDefault: true,
};

export const knex = SetupKnex(config);