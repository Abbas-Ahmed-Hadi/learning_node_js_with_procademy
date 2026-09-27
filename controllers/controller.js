import StringUtlities from "./../shared_kernal/string_utilities.js";
export default class Controller {
    static #FiltrationOperatorsSymboles = {
        gte: "gte",
        gt: "gt",
        lte: "lte",
        lt: "lt",
        eq: "eq",
        ne: "ne"
    };
    
    static #SortingOperatorsSymboles = {
        sort: "sort",
        limit: "limit",
        page: "page"
    };
    
    static #SortingTypes = {
        ascending: "asc",
        descending: "des"
    }
    
    
    static get FiltrationOperatorsSymboles() {
        return Controller.#FiltrationOperatorsSymboles;
    }

    static get SortingOperatorsSymboles() {
        return Controller.#SortingOperatorsSymboles;
    }

    static get SortingTypes() {
        return Controller.#SortingTypes;
    }
    
    static GetQuerySortingFieldsFromRequestQueryString(
        requestQueryString,
        fieldsSeparator = ',') {
            
        return StringUtlities.
                IsNullOrWhiteSpace(requestQueryString.sort)
                ? []
                : requestQueryString.sort.split(fieldsSeparator);
    }
    
    static GetLimitedFieldsFromRequestQueryString(
        requestQueryString,
        fieldsSeparator = ',') {
            
        return StringUtlities.
                IsNullOrWhiteSpace(requestQueryString.fields)
                ? []
                : requestQueryString.fields.split(fieldsSeparator);
    }

    static GetRequestBodyFieldsWithItsFilters(
        requestQueryString,
        separator = ':',
        replaceSeparatorBy = '":') {

        const queryStrAsStr = JSON.stringify(requestQueryString);
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