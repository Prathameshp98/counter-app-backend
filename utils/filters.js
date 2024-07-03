
exports.filterByName = (response, name) => {
    const filteredByName = response[0].data.AuthorWorklog.rows.filter(user => user.name === name);
    response[0].data.AuthorWorklog.rows = filteredByName;
    return response;
}