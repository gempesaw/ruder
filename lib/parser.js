export default parsePayload;

function parsePayload (stringToParse) {
    return constructOpts(stringToParse.split("\n"));
}

function constructOpts(
    [head, ...rest],
    state = { isUrl: true, isHeader: false, isBody: false},
    options = { url: '', method: '' }
) {
    // blank lines indicate the beginning of the body, and the end of
    // the headers
    const isNextBlank = !rest[0];
    const isHeader = !isNextBlank;
    const isBody = isNextBlank;

    if (state.isUrl && head) {
        const [method, url] = splitOnce(head);
        return constructOpts(
            rest,
            { isUrl: false, isHeader, isBody },
            { ...options, method, url }
        );
    }
    else if (state.isHeader && head) {
        const [key, value] = splitOnce(head, ':');
        const headers = {
            ...options.headers,
            [key]: value
        };
        return constructOpts(
            rest,
            { ...state, isHeader, isBody },
            { ...options, headers }
        );
    }
    else if (state.isBody && head) {
        const bodyOpts = parseBody([head, ...rest].join(''));

        return constructOpts(
            [],
            { ...state, isBody: false },
            { ...options, ...bodyOpts }
        );
    }
    else if (rest.length) { // skip blank lines
        return constructOpts(rest, state, options);
    }
    else { // there are no more lines left
        return options;
    }
}

function splitOnce (string, separator = ' ') {
    const [head, ...rest] = string.trim().split(separator);
    return [ head, rest.join(separator).trim() ];
};

function parseBody (stringBody) {
    try {
        const body = JSON.parse(stringBody);
        return { body, json: true };
    }
    catch (e) {
        return { body: stringBody };
    }
}
