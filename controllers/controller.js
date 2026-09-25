
export default class Controller {
    static #FiltrationOperatorsSymboles = {
        gte: "gte",
        gt: "gt",
        lte: "lte",
        lt: "lt",
        eq: "eq",
        ne: "ne"
    };

    static get FiltrationOperatorsSymboles() {
        return Controller.#FiltrationOperatorsSymboles;
    }

    static GetRequestBodyFieldsWithItsFilters(
        request,
        separator = ':',
        replaceSeparatorBy = '":') {

        const queryStrAsStr = JSON.stringify(request.query);
        const queryStrAsObj = JSON.parse(queryStrAsStr);

        for (const objKey of Object.keys(queryStrAsObj)) {

            if (typeof queryStrAsObj[objKey] !== "string") {
                continue;
            }

            for (const opKey of Object.keys(Controller.FiltrationOperatorsSymboles)) {

                if (!queryStrAsObj[objKey]
                    .includes(Controller
                        .FiltrationOperatorsSymboles[opKey])) {
                    continue;
                }

                queryStrAsObj[objKey] = queryStrAsObj[objKey]
                    .replace(separator, replaceSeparatorBy);

                queryStrAsObj[objKey] = `{ "$${queryStrAsObj[objKey]} }`;

                queryStrAsObj[objKey] = JSON.parse(queryStrAsObj[objKey]);

                break;
            }
        }

        return queryStrAsObj;
    }

}